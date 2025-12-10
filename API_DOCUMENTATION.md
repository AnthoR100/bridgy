# 📚 Documentation API - Bridgy TP4

**Base URL** : `https://ekod-dev-interface-tp4-backend-production.up.railway.app/api/group3`

---

## 🔐 Authentication

### Register (Inscription)
```
POST /api/group3/auth/register
```

**Body :**
```json
{
  "email": "user@example.com",
  "password": "string",
  "role": "STUDENT",  // ou "COMPANY"
  "name": "string"
}
```

**Response 201 :**
```json
{
  "message": "User registered successfully"
}
```

---

### Login (Connexion)
```
POST /api/group3/auth/login
```

**Body :**
```json
{
  "email": "user@example.com",
  "password": "string"
}
```

**Response 200 :**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "string",
    "email": "user@example.com",
    "role": "STUDENT",
    "name": "string"
  }
}
```

---

## 👨‍🎓 Students Endpoints

> **Authorization required** : `Bearer {token}` dans le header

### Get Offers (Liste des offres)
```
GET /api/group3/students/offers
```

**Query params (optionnels) :**
- `search` : Recherche par mot-clé
- `contractType` : Filtre par type de contrat
- `location` : Filtre par localisation

**Response 200 :**
```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "companyName": "string",
    "location": "string",
    "contractType": "INTERNSHIP",
    "salary": "string",
    "skills": ["React", "Node.js"],
    "createdAt": "2024-12-09T..."
  }
]
```

---

### Get Offer Detail (Détail d'une offre)
```
GET /api/group3/students/offers/{id}
```

**Response 200 :**
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "companyName": "string",
  "location": "string",
  "contractType": "INTERNSHIP",
  "salary": "string",
  "skills": ["React", "Node.js"],
  "requirements": "string",
  "benefits": "string",
  "createdAt": "2024-12-09T..."
}
```

---

### Apply to Offer (Postuler à une offre)
```
POST /api/group3/students/applications
```

**Body :**
```json
{
  "offerId": "string",
  "coverLetter": "string"
}
```

**Response 201 :**
```json
{
  "id": "string",
  "offerId": "string",
  "status": "PENDING",
  "coverLetter": "string",
  "createdAt": "2024-12-09T..."
}
```

---

### Get My Applications (Mes candidatures)
```
GET /api/group3/students/applications
```

**Response 200 :**
```json
[
  {
    "id": "string",
    "offer": {
      "id": "string",
      "title": "string",
      "companyName": "string"
    },
    "status": "PENDING",
    "coverLetter": "string",
    "createdAt": "2024-12-09T..."
  }
]
```

---

### Get Profile (Mon profil)
```
GET /api/group3/students/profile
```

**Response 200 :**
```json
{
  "id": "string",
  "name": "string",
  "email": "user@example.com",
  "skills": ["React", "Node.js"],
  "cvUrl": "https://...",
  "githubUrl": "https://github.com/..."
}
```

---

### Update Profile (Modifier mon profil)
```
PUT /api/group3/students/profile
```

**Body :**
```json
{
  "name": "string",
  "skills": ["React", "Node.js", "MongoDB"],
  "cvUrl": "https://...",
  "githubUrl": "https://github.com/..."
}
```

**Response 200 :**
```json
{
  "id": "string",
  "name": "string",
  "email": "user@example.com",
  "skills": ["React", "Node.js", "MongoDB"],
  "cvUrl": "https://...",
  "githubUrl": "https://github.com/..."
}
```

---

## 🏢 Companies Endpoints

> **Authorization required** : `Bearer {token}` dans le header

### Get My Offers (Mes offres publiées)
```
GET /api/group3/companies/offers
```

**Response 200 :**
```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "location": "string",
    "contractType": "INTERNSHIP",
    "salary": "string",
    "skills": ["React", "Node.js"],
    "applicationsCount": 5,
    "createdAt": "2024-12-09T..."
  }
]
```

---

### Create Offer (Créer une offre)
```
POST /api/group3/companies/offers
```

**Body :**
```json
{
  "title": "string",
  "description": "string",
  "location": "string",
  "contractType": "INTERNSHIP",
  "salary": "string",
  "skills": ["React", "Node.js"],
  "requirements": "string"
}
```

**Response 201 :**
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "location": "string",
  "contractType": "INTERNSHIP",
  "salary": "string",
  "skills": ["React", "Node.js"],
  "createdAt": "2024-12-09T..."
}
```

---

### Update Offer (Modifier une offre)
```
PUT /api/group3/companies/offers/{id}
```

**Body :**
```json
{
  "title": "string",
  "description": "string",
  "location": "string",
  "contractType": "CDI",
  "salary": "string",
  "skills": ["React", "Node.js", "TypeScript"],
  "requirements": "string"
}
```

**Response 200 :**
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  // ... updated fields
}
```

---

### Delete Offer (Supprimer une offre)
```
DELETE /api/group3/companies/offers/{id}
```

**Response 200 :**
```json
{
  "message": "Offer deleted successfully"
}
```

---

### Get Applications Received (Candidatures reçues)
```
GET /api/group3/companies/applications
```

**Query params (optionnels) :**
- `offerId` : Filtrer par offre spécifique
- `status` : Filtrer par statut

**Response 200 :**
```json
[
  {
    "id": "string",
    "student": {
      "id": "string",
      "name": "string",
      "email": "student@example.com",
      "skills": ["React", "Node.js"]
    },
    "offer": {
      "id": "string",
      "title": "string"
    },
    "status": "PENDING",
    "coverLetter": "string",
    "createdAt": "2024-12-09T..."
  }
]
```

---

### Update Application Status (Changer le statut d'une candidature)
```
PUT /api/group3/companies/applications/{id}/status
```

**Body :**
```json
{
  "status": "REVIEWED"
}
```

**Statuts possibles :**
- `PENDING` : En attente
- `REVIEWED` : En revue
- `INTERVIEW` : Entretien
- `ACCEPTED` : Accepté
- `REJECTED` : Refusé

**Response 200 :**
```json
{
  "id": "string",
  "status": "REVIEWED",
  "updatedAt": "2024-12-09T..."
}
```

---

## 📊 Types de contrats disponibles

- `INTERNSHIP` : Stage
- `APPRENTICESHIP` : Alternance
- `CDI` : CDI
- `CDD` : CDD
- `FREELANCE` : Freelance

---

## 🔑 Identifiants de test - Group 3

### Étudiants
- **Étudiant 1** : `student1.group3@ekod.fr` / `password123`
- **Étudiant 2** : `student2.group3@ekod.fr` / `password123`

### Entreprises
- **Entreprise 1** : `company1.group3@ekod.fr` / `password123`
- **Entreprise 2** : `company2.group3@ekod.fr` / `password123`

---

## ⚠️ Gestion des erreurs

### Codes d'erreur courants

**400 Bad Request**
```json
{
  "error": "Invalid request body"
}
```

**401 Unauthorized**
```json
{
  "error": "Invalid token or token expired"
}
```

**403 Forbidden**
```json
{
  "error": "Access denied"
}
```

**404 Not Found**
```json
{
  "error": "Resource not found"
}
```

**500 Internal Server Error**
```json
{
  "error": "Internal server error"
}
```

---

## 🔧 Configuration Axios (exemple)

```javascript
// src/services/config.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ekod-dev-interface-tp4-backend-production.up.railway.app/api/group3',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

---

## 📝 Notes importantes

1. **Tous les endpoints sauf `/auth/*` nécessitent un token Bearer**
2. **Le token est retourné lors du login et doit être stocké** (localStorage recommandé)
3. **Les filtres dans GET /students/offers sont optionnels**
4. **Le `offerId` dans GET /companies/applications permet de filtrer les candidatures d'une offre spécifique**
5. **Les skills sont des arrays de strings**
6. **Les dates sont au format ISO 8601**

---

**Documentation générée le 09/12/2024**  
**Projet TP4 - EKOD - Group 3**
