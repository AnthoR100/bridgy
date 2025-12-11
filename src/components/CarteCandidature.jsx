import { APPLICATION_STATUS, APPLICATION_STATUS_LABELS } from '../services/config';
import { Calendar } from 'lucide-react';

const CarteCandidature = ({ application, onStatusChange }) => {
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

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    if (onStatusChange && newStatus !== application.status) {
      onStatusChange(application.id, newStatus);
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

      {/* Nom candidat */}
      <div className="mb-3">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Candidat :</span>{' '}
          {application.student?.name || 'Nom non disponible'}
        </p>
      </div>

      {/* Compétences */}
      <div className="mb-3">
        {application.student?.skills && application.student.skills.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {application.student.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Aucune compétence</p>
        )}
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
        <Calendar className="w-4 h-4" />
        <span>Postulé le {formatDate(application.createdAt)}</span>
      </div>

      {/* Lettre de motivation */}
      {application.coverLetter && (
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lettre de motivation :
          </label>
          <p className="text-sm text-gray-600 line-clamp-2">
            {application.coverLetter}
          </p>
        </div>
      )}

      {/* Lien CV */}
      {application.student?.cvLink && (
        <div className="mb-3">
          <a
            href={application.student.cvLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1"
          >
            <span>📄</span>
            <span>Voir le CV</span>
          </a>
        </div>
      )}

      {/* Dropdown statut */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Modifier le statut :
        </label>
        <select
          value={application.status || APPLICATION_STATUS.PENDING}
          onChange={handleStatusChange}
          className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
      </div>
    </div>
  );
};

export default CarteCandidature;

