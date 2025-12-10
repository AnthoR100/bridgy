import { useState, useEffect } from 'react';
import useApplications from '../hooks/useApplications';
import ApplicationCard from '../components/ApplicationCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { APPLICATION_STATUS, APPLICATION_STATUS_LABELS } from '../services/config';

const CandidatesPage = () => {
  const { applications, loading, error, fetchApplications, updateStatus } =
    useApplications();
  const [successMessage, setSuccessMessage] = useState(null);

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

  // Gérer le changement de statut
  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const result = await updateStatus(applicationId, newStatus);
      if (result.success) {
        setSuccessMessage('Statut mis à jour avec succès');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
        await fetchApplications();
      } else {
        // L'erreur sera gérée par le hook useApplications
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour du statut:', err);
    }
  };

  // Gestion des états de chargement et d'erreur
  if (loading && applications.length === 0) {
    return <LoadingSpinner message="Chargement des candidatures..." />;
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
        <h1 className="text-2xl font-bold text-gray-900">
          Candidatures reçues
        </h1>
      </header>

      {/* Container principal */}
      <div className="bg-gray-50 pb-20 lg:pb-0 px-4 py-6 lg:px-8">
        {/* Message de succès */}
        {successMessage && (
          <div className="mb-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {successMessage}
          </div>
        )}

        {/* Message d'erreur */}
        {error && <ErrorMessage message={error} />}

        {/* Affichage Desktop - Tableau */}
        <div className="hidden lg:block">
          {applications.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">Aucune candidature pour le moment</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Candidat
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Offre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Compétences
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* Colonne Candidat */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {app.student?.name || 'Nom non disponible'}
                        </div>
                        {app.student?.cvLink && (
                          <a
                            href={app.student.cvLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline mt-1 inline-block"
                          >
                            Voir CV
                          </a>
                        )}
                      </td>

                      {/* Colonne Offre */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {app.offer?.title || 'Offre sans titre'}
                        </div>
                      </td>

                      {/* Colonne Compétences */}
                      <td className="px-6 py-4">
                        {app.student?.skills &&
                        app.student.skills.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {app.student.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">
                            Aucune compétence
                          </span>
                        )}
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
                          {APPLICATION_STATUS_LABELS[app.status] ||
                            app.status}
                        </span>
                      </td>

                      {/* Colonne Actions */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={app.status || APPLICATION_STATUS.PENDING}
                          onChange={(e) =>
                            handleStatusChange(app.id, e.target.value)
                          }
                          className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value={APPLICATION_STATUS.PENDING}>
                            {APPLICATION_STATUS_LABELS.PENDING}
                          </option>
                          <option value={APPLICATION_STATUS.REVIEWED}>
                            {APPLICATION_STATUS_LABELS.REVIEWED}
                          </option>
                          <option value={APPLICATION_STATUS.INTERVIEW}>
                            {APPLICATION_STATUS_LABELS.INTERVIEW}
                          </option>
                          <option value={APPLICATION_STATUS.ACCEPTED}>
                            {APPLICATION_STATUS_LABELS.ACCEPTED}
                          </option>
                          <option value={APPLICATION_STATUS.REJECTED}>
                            {APPLICATION_STATUS_LABELS.REJECTED}
                          </option>
                        </select>
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
              <p className="text-lg">Aucune candidature pour le moment</p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <ApplicationCard
                  key={app.id}
                  application={app}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidatesPage;

