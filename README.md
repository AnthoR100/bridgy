# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# 🌉 Bridgy - Plateforme de mise en relation Étudiants/Entreprises

> **TP4 - Développement des interfaces utilisateur**  
> Projet réalisé dans le cadre du module CDA Bac+3

## 📋 Table des matières

- [Contexte du projet](#contexte-du-projet)
- [Objectifs pédagogiques](#objectifs-pédagogiques)
- [Équipe](#équipe)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Structure du projet](#structure-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [Workflow Git](#workflow-git)
- [API Documentation](#api-documentation)
- [Livrables](#livrables)

---

## 🎯 Contexte du projet

**Bridgy** est une application web mobile-first qui facilite la mise en relation entre :
- **Étudiants** recherchant un stage, une alternance ou leur premier emploi
- **Entreprises** à la recherche de talents

L'objectif est de permettre à un étudiant de trouver une offre adaptée et à une entreprise de trouver rapidement des profils pertinents.

---

## 🎓 Objectifs pédagogiques

- Concevoir une interface via benchmark, moodboard, wireframes et maquettes
- Appliquer une démarche **Mobile First**
- Développer une application React avec **hooks personnalisés**
- Consommer un backend distant avec **Axios et intercepteurs**
- Déployer automatiquement sur **Netlify (CI/CD)**
- Écrire des tests d'interface avec **Cypress**
- Présenter le projet : conception → dev → tests → déploiement

---

## 👥 Équipe

| Nom | Rôle | Branche Git | Responsabilités |
|-----|------|-------------|-----------------|
| **Anthony** | Chef de projet + Backend Dev | `anthony` | Architecture API, hooks backend, coordination |
| **Michael** | Backend Dev | `mickael` | Services API, authentification, gestion données |
| **William** | Frontend Dev | `william` | Composants UI, styles, pages, responsive |

**Groupe :** group3

---

## 🛠 Technologies utilisées

### Frontend
- **React 19** - Bibliothèque JavaScript
- **Vite** - Build tool moderne
- **React Router DOM** - Navigation
- **Axios** - Requêtes HTTP avec intercepteurs
- **CSS Modules / BEM** - Styles

### Backend (fourni)
- **API REST** - Railway.app
- **URL :** `https://ekod-dev-interface-tp4-backend-production.up.railway.app/api/group3`
- **Documentation :** [Swagger API](https://ekod-dev-interface-tp4-backend-production.up.railway.app/api-docs/#/)

### Outils
- **Git & GitHub** - Versionnage et collaboration
- **Netlify** - Déploiement continu (CI/CD)
- **Cypress** - Tests end-to-end
- **Figma** - Maquettes et wireframes

---

## 🚀 Installation

### Prérequis

- Node.js >= 18.x
- npm ou yarn
- Git

### Étapes d'installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/votre-username/bridgy.git
cd bridgy

# 2. Installer les dépendances
npm install

# 3. Se placer sur sa branche de travail
git checkout anthony  # ou michael / william

# 4. Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

---

## 📁 Structure du projet

```
bridgy/
├── public/                      # Fichiers statiques
├── src/
│   ├── components/              # Composants réutilisables
│   │   ├── LoadingSpinner.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/                   # Pages de l'application
│   │   ├── Home.jsx
│   │   ├── LoginPage.jsx
│   │   ├── student/             # Pages étudiants
│   │   │   ├── OffersListPage.jsx
│   │   │   ├── OfferDetailPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── ApplicationsPage.jsx
│   │   └── company/             # Pages entreprises
│   │       ├── DashboardPage.jsx
│   │       ├── ManageOffersPage.jsx
│   │       ├── CreateOfferPage.jsx
│   │       └── CandidatesPage.jsx
│   ├── hooks/                   # Hooks personnalisés
│   │   ├── useAuth.jsx
│   │   ├── useOffers.js
│   │   ├── useApplications.js
│   │   └── useProfile.js
│   ├── services/                # Services API
│   │   ├── config.js
│   │   └── api.js
│   ├── styles/                  # Styles CSS
│   │   ├── main.css
│   │   ├── components/
│   │   └── pages/
│   ├── App.jsx                  # Composant principal
│   └── main.jsx                 # Point d'entrée
├── cypress/                     # Tests E2E
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## ✨ Fonctionnalités

### 👨‍🎓 Côté Étudiant

- ✅ Créer et modifier son profil (nom, compétences, CV/portfolio)
- ✅ Parcourir les offres d'emploi
- ✅ Filtrer par mot-clé, type de contrat, localisation
- ✅ Consulter le détail d'une offre
- ✅ Postuler à une offre
- ✅ Suivre l'état de ses candidatures

### 🏢 Côté Entreprise

- ✅ Créer un compte entreprise
- ✅ Publier, modifier et supprimer des offres
- ✅ Consulter les candidatures reçues
- ✅ Mettre à jour le statut des candidatures

### 🔐 Authentification

- ✅ Connexion avec email/mot de passe
- ✅ Gestion des tokens JWT avec intercepteurs Axios
- ✅ Routes protégées selon le rôle (STUDENT/COMPANY)
- ✅ Déconnexion automatique en cas de token invalide

---

## 🔄 Workflow Git

### Structure des branches

```
main          → Version stable (déploiement)
  └── dev     → Développement commun
       ├── anthony    → Branche Anthony
       ├── mickael    → Branche Mickael
       └── william    → Branche William
```

### Workflow quotidien

```bash
# 1. Récupérer les dernières modifications
git checkout dev
git pull origin dev

# 2. Se placer sur sa branche
git checkout anthony  # ou michael / william

# 3. Récupérer les changements de dev
git merge dev

# 4. Travailler sur sa branche
# ... faire ses modifications ...

# 5. Commiter régulièrement
git add .
git commit -m "feat: description de la fonctionnalité"

# 6. Pousser sur sa branche
git push origin anthony
```

### Créer une Pull Request

1. Sur GitHub : **Pull requests** → **New pull request**
2. **Base:** `dev` ← **Compare:** `anthony` (votre branche)
3. Ajouter une description claire
4. Assigner les reviewers
5. Attendre la review et l'approbation
6. Merger la PR

### Convention de nommage des commits

```
feat:     Nouvelle fonctionnalité
fix:      Correction de bug
style:    Changements CSS/UI
refactor: Refactorisation du code
docs:     Documentation
test:     Tests
chore:    Maintenance (config, dépendances)
```

---

## 🔌 API Documentation

### URL de base

```
https://ekod-dev-interface-tp4-backend-production.up.railway.app/api/group3
```

### Identifiants de test

#### Étudiants
```
Email: student1.group3@ekod.fr
Password: password123

Email: student2.group3@ekod.fr
Password: password123
```

#### Entreprises
```
Email: company1.group3@ekod.fr
Password: password123

Email: company2.group3@ekod.fr
Password: password123
```

### Endpoints principaux

#### Authentification
- `POST /auth/login` - Connexion
- `POST /auth/register` - Inscription

#### Étudiants
- `GET /students/profile` - Récupérer son profil
- `PUT /students/profile` - Modifier son profil
- `GET /students/offers` - Liste des offres (avec filtres)
- `GET /students/offers/:id` - Détail d'une offre
- `POST /students/applications` - Postuler à une offre
- `GET /students/applications` - Ses candidatures

#### Entreprises
- `GET /companies/profile` - Récupérer son profil
- `PUT /companies/profile` - Modifier son profil
- `POST /companies/offers` - Créer une offre
- `GET /companies/offers` - Ses offres
- `GET /companies/offers/:id` - Détail d'une offre
- `PUT /companies/offers/:id` - Modifier une offre
- `DELETE /companies/offers/:id` - Supprimer une offre
- `GET /companies/applications` - Candidatures reçues
- `PUT /companies/applications/:id/status` - MAJ statut candidature

**Documentation complète :** [Swagger](https://ekod-dev-interface-tp4-backend-production.up.railway.app/api-docs/#/)

---

## 📦 Livrables

### 1. Code source

- ✅ Projet React complet
- ✅ README.md détaillé
- ✅ Rapport de tests PDF
- ✅ Maquettes et wireframes PDF
- ✅ Benchmark PDF
- ✅ Lien Netlify (fichier texte)

### 2. Application fonctionnelle

- ✅ Page de connexion
- ✅ Interface étudiant complète
- ✅ Interface entreprise complète
- ✅ Gestion des erreurs API
- ✅ États de chargement
- ✅ Design responsive (Mobile First)

### 3. Collaboration Git

- ✅ Historique Git propre
- ✅ Au moins 2 branches par membre
- ✅ Au moins 2 Pull Requests mergées
- ✅ Branches `main` et `dev`

### 4. Tests Cypress

```bash
# Installer Cypress
npm install cypress --save-dev

# Lancer Cypress
npx cypress open
```

### 5. Déploiement Netlify

Configuration du déploiement continu (CI/CD) via l'intégration GitHub.

---

## 📝 Scripts disponibles

```bash
npm run dev          # Lancer le serveur de développement
npm run build        # Build de production
npm run preview      # Preview du build
npm run lint         # Vérifier le code
npx cypress open     # Lancer les tests Cypress
```

---

## 📈 Suivi du projet

### Phase 1 : Conception (✅ Terminée)
- ✅ Benchmark fonctionnel
- ✅ Crazy 8
- ✅ Moodboard
- ✅ Wireframes Mobile & Desktop
- ✅ Maquettes finales

### Phase 2 : Setup technique (🚧 En cours)
- ✅ Initialisation du projet Vite
- ✅ Configuration Git et branches
- ✅ Intégration des fichiers de base
- ⏳ Création des hooks personnalisés
- ⏳ Développement des pages

### Phase 3 : Développement (⏳ À venir)
- ⏳ Pages étudiants
- ⏳ Pages entreprises
- ⏳ Composants réutilisables
- ⏳ Styles et responsive

### Phase 4 : Tests & Déploiement (⏳ À venir)
- ⏳ Tests Cypress
- ⏳ Configuration Netlify
- ⏳ Déploiement continu

---

## 🐛 Résolution des problèmes courants

### Erreur : "Cannot find module"
```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

### Erreur : "Port 5173 already in use"
```bash
# Tuer le processus utilisant le port
npx kill-port 5173
npm run dev
```

### Erreur : "401 Unauthorized" lors des appels API
- Vérifier que le token est bien stocké dans localStorage
- Vérifier que l'intercepteur Axios ajoute bien le header Authorization
- Se reconnecter si le token a expiré

### Conflits Git
```bash
# Récupérer les changements de dev
git checkout votre-branche
git fetch origin
git merge origin/dev

# Résoudre les conflits manuellement dans les fichiers
# Puis :
git add .
git commit -m "fix: resolve merge conflicts"
git push origin votre-branche
```

---

## 📚 Ressources utiles

- [Documentation React](https://react.dev)
- [React Router](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [Vite Documentation](https://vitejs.dev)
- [Cypress Documentation](https://docs.cypress.io)
- [Convention de commits](https://www.conventionalcommits.org)
- [API Swagger](https://ekod-dev-interface-tp4-backend-production.up.railway.app/api-docs/#/)

---

## 📧 Contact

**Chef de projet :** Anthony  
**Groupe :** group3  
**Formation :** CDA Bac+3  
**Formateur :** Lenny LOUIS (GitHub: LennyLouis)

---

## 📄 Licence

Projet académique - EKOD 2025-2026

---

**Dernière mise à jour :** Décembre 2025
