import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useApplications from '../hooks/useApplications';
import StudentApplicationCard from '../components/StudentApplicationCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { APPLICATION_STATUS, APPLICATION_STATUS_LABELS } from '../services/config';

const StudentApplicationsPage = () => {
  const { applications, loading, error, fetchApplications } = useApplications();
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Formater la date en français
  const formatDate = (dateString) => {
    if (!dateString) return 'Date non disponible';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Obtenir les classes CSS selon le statut
  const getStatusClass = (status) => {
    switch (status) {
      case APPLICATION_STATUS.PENDING:
        return 'bg-yellow-100 text-yellow-700';
      case APPLICATION_STATUS.REVIEWED:
        return 'bg-blue-100 text-blue-700';
      case APPLICATION_STATUS.INTERVIEW:
        return 'bg-purple-100 text-purple-700';
      case APPLICATION_STATUS.ACCEPTED:
        return 'bg-green-100 text-green-700';
      case APPLICATION_STATUS.REJECTED:
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Gestion des états de chargement et d'erreur
  if (loading && applications.length === 0) {
    return <LoadingSpinner message="Chargement de vos candidatures..." />;
  }

  if (error && applications.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-6">
        <ErrorMessage message={error} />
        <div className="mt-4">
          <button
            onClick={fetchApplications}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header sticky */}
      <header className="sticky top-0 bg-white border-b border-gray-200 px-4 py-6 lg:px-8 z-10">
        <h1 className="text-2xl font-bold text-gray-900">Mes candidatures</h1>
      </header>

      {/* Container principal */}
      <div className="bg-gray-50 pb-20 lg:pb-0 px-4 py-6 lg:px-8">
        {/* Message d'erreur */}
        {error && <ErrorMessage message={error} />}

        {/* Affichage Desktop - Tableau */}
        <div className="hidden lg:block">
          {applications.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-4">Aucune candidature pour le moment</p>
              <button
                onClick={() => navigate('/offers')}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
              >
                Voir les offres disponibles
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Offre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Entreprise
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lettre de motivation
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/offers/${app.offer?.id}`)}
                    >
                      {/* Colonne Offre */}
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {app.offer?.title || 'Offre sans titre'}
                        </div>
                      </td>

                      {/* Colonne Entreprise */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {app.offer?.companyName || 'Non renseignée'}
                        </div>
                      </td>

                      {/* Colonne Date */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {formatDate(app.createdAt)}
                        </div>
                      </td>

                      {/* Colonne Statut */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                            app.status
                          )}`}
                        >
                          {APPLICATION_STATUS_LABELS[app.status] || app.status}
                        </span>
                      </td>

                      {/* Colonne Lettre de motivation */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 line-clamp-2 max-w-md">
                          {app.coverLetter || 'Aucune lettre de motivation'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Affichage Mobile - Cards */}
        <div className="lg:hidden">
          {applications.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-4">Aucune candidature pour le moment</p>
              <button
                onClick={() => navigate('/offers')}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
              >
                Voir les offres disponibles
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  onClick={() => navigate(`/offers/${app.offer?.id}`)}
                >
                  <StudentApplicationCard application={app} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentApplicationsPage;

