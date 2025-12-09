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
  RECEIVED: 'RECEIVED', 
  IN_REVIEW: 'IN_REVIEW', 
  INTERVIEW: 'INTERVIEW', 
  REJECTED: 'REJECTED', 
  ACCEPTED: 'ACCEPTED' 
};

export const USER_ROLES = {
  STUDENT: 'STUDENT',
  COMPANY: 'COMPANY'
};