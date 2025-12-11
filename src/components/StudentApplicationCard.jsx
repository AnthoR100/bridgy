import { Calendar, Building2, FileText } from 'lucide-react';
import { APPLICATION_STATUS, APPLICATION_STATUS_LABELS } from '../services/config';

const StudentApplicationCard = ({ application }) => {
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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* Header : Titre offre + Badge statut */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex-1 mr-2">
          {application.offer?.title || 'Offre sans titre'}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusClass(
            application.status
          )}`}
        >
          {APPLICATION_STATUS_LABELS[application.status] || application.status}
        </span>
      </div>

      {/* Entreprise */}
      <div className="mb-3 flex items-center gap-2">
        <Building2 className="w-4 h-4 text-gray-500" />
        <p className="text-sm text-gray-600">
          <span className="font-medium">Entreprise :</span>{' '}
          {application.offer?.companyName || 'Non renseignée'}
        </p>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
        <Calendar className="w-4 h-4" />
        <span>Postulé le {formatDate(application.createdAt)}</span>
      </div>

      {/* Lettre de motivation */}
      {application.coverLetter && (
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-gray-500" />
            <label className="block text-sm font-medium text-gray-700">
              Lettre de motivation :
            </label>
          </div>
          <p className="text-sm text-gray-600 line-clamp-3 pl-6">
            {application.coverLetter}
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentApplicationCard;

