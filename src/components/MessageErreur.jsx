const ErrorMessage = ({ message, error, status }) => {
  // Déterminer le message d'erreur à afficher
  const getErrorMessage = () => {
    if (error?.status) {
      return getErrorByStatus(error.status, error.message);
    }
    
    // Si un status est fourni directement
    if (status) {
      return getErrorByStatus(status, message);
    }
    
    // Si un message est fourni directement
    if (message) {
      return message;
    }
    
    return null;
  };

  // Obtenir le message d'erreur selon le code HTTP
  const getErrorByStatus = (statusCode, customMessage) => {
    // Si un message personnalisé est fourni, l'utiliser
    if (customMessage) {
      return customMessage;
    }

    const errorMessages = {
      400: 'Requête invalide',
      401: 'Token invalide ou expiré',
      403: 'Accès refusé',
      404: 'Ressource non trouvée',
      500: 'Erreur interne du serveur',
    };

    return errorMessages[statusCode] || 'Une erreur est survenue';
  };

  const errorMessage = getErrorMessage();

  if (!errorMessage) return null;

  return (
    <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {errorMessage}
    </div>
  );
};

export default ErrorMessage;

