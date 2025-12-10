// Configuration de l'API
export const API_CONFIG = {
  BASE_URL: 'https://ekod-dev-interface-tp4-backend-production.up.railway.app',
  GROUP: 'group3', // TODO: Changez cela selon votre groupe (group1, group2, group3) exemple : GROUP: 'group1',
  TIMEOUT: 10000,
};

// Construction de l'URL de base avec le groupe
export const getApiBaseUrl = () => {
  return `${API_CONFIG.BASE_URL}/api/${API_CONFIG.GROUP}`;
};

export const CONTRACT_TYPES = {
  STAGE: 'STAGE', 
  ALTERNANCE: 'ALTERNANCE', 
  CDI: 'CDI', 
  CDD: 'CDD', 
  FREELANCE: 'FREELANCE'
};

export const APPLICATION_STATUS = { 
  PENDING: 'PENDING', 
  REVIEWED: 'REVIEWED', 
  INTERVIEW: 'INTERVIEW', 
  ACCEPTED: 'ACCEPTED', 
  REJECTED: 'REJECTED' 
};

// Labels français pour les statuts
export const APPLICATION_STATUS_LABELS = {
  PENDING: 'En attente',
  REVIEWED: 'En revue',
  INTERVIEW: 'Entretien',
  ACCEPTED: 'Accepté',
  REJECTED: 'Refusé'
};

export const USER_ROLES = {
  STUDENT: 'STUDENT',
  COMPANY: 'COMPANY'
};