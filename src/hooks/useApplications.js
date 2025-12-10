import { useCallback, useEffect, useState } from 'react';
import { companyService, studentService } from '../services/api';
import { useAuth } from './useAuth';

const useApplications = () => {
  const { isStudent, isCompany } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let data = [];

      if (isStudent) {
        data = await studentService.getApplications();
      } else if (isCompany) {
        data = await companyService.getApplications();
      } else {
        throw new Error('Rôle non autorisé pour consulter les candidatures');
      }

      setApplications(data);
      return { success: true, data };
    } catch (err) {
      const message = err?.message || 'Impossible de récupérer les candidatures';
      setError(message);
      return { success: false, error: message, details: err?.data };
    } finally {
      setLoading(false);
    }
  }, [isCompany, isStudent]);

  const applyToOffer = useCallback(
    async (offerId, coverLetter) => {
      setError(null);

      if (!isStudent) {
        const message = 'Seuls les étudiants peuvent postuler';
        setError(message);
        return { success: false, error: message };
      }

      setLoading(true);

      try {
        const data = await studentService.applyToOffer(offerId, coverLetter);
        await fetchApplications();
        return { success: true, data };
      } catch (err) {
        const message = err?.message || "Impossible de postuler à l'offre";
        setError(message);
        return { success: false, error: message, details: err?.data };
      } finally {
        setLoading(false);
      }
    },
    [fetchApplications, isStudent]
  );

  const updateStatus = useCallback(
    async (applicationId, status) => {
      setError(null);

      if (!isCompany) {
        const message = 'Seules les entreprises peuvent modifier un statut';
        setError(message);
        return { success: false, error: message };
      }

      setLoading(true);

      try {
        const data = await companyService.updateApplicationStatus(applicationId, status);
        await fetchApplications();
        return { success: true, data };
      } catch (err) {
        const message = err?.message || 'Impossible de mettre à jour le statut';
        setError(message);
        return { success: false, error: message, details: err?.data };
      } finally {
        setLoading(false);
      }
    },
    [fetchApplications, isCompany]
  );

  useEffect(() => {
    if (isStudent || isCompany) {
      fetchApplications();
    }
  }, [fetchApplications, isCompany, isStudent]);

  return {
    applications,
    loading,
    error,
    fetchApplications,
    applyToOffer,
    updateStatus,
  };
};

export default useApplications;

