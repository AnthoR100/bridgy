# 🌉 Bridgy - Plateforme de mise en relation étudiants/entreprises

[![Netlify Status](https://api.netlify.com/api/v1/badges/c732a7da-37ba-48ca-8338-7fec6a769a16/deploy-status)](https://app.netlify.com/projects/bridgy-groupe3/deploys)

> Application web mobile-first React facilitant la mise en relation entre étudiants et entreprises

## 📦 Installation
```bash
git clone https://github.com/AnthoR100/bridgy.git
cd bridgy
npm install
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🔑 Identifiants de test

### Étudiant
- Email : `student1.group3@ekod.fr`
- Mot de passe : `password123`

### Entreprise
- Email : `company1.group3@ekod.fr`
- Mot de passe : `password123`

## 🚀 URL de production

**Application déployée** : [https://bridgy-groupe3.netlify.app](https://bridgy-groupe3.netlify.app)

## 👥 Équipe - Group 3

| Nom | Rôle | GitHub |
|-----|------|--------|
| **Anthony** | Chef de projet + Backend | [@anthony](https://github.com/anthony) |
| **Mickael** | Backend | [@mickael](https://github.com/mickael) |
| **William** | Frontend | [@william](https://github.com/william) |

**Formateur** : Lenny LOUIS ([@LennyLouis](https://github.com/LennyLouis))

## 🛠️ Technologies

- **React** 19.0.0
- **Vite** 6.0.0
- **React Router** 7.1.0
- **Axios** 1.7.0
- **Netlify** (CI/CD)
- **Cypress** (Tests E2E)

## 📋 Structure du projet
```
bridgy/
├── src/
│   ├── components/        # Composants réutilisables
│   ├── pages/
│   │   ├── student/      # Pages étudiant
│   │   └── company/      # Pages entreprise
│   ├── hooks/            # Hooks personnalisés
│   ├── services/         # Services API
│   ├── constants/        # Constantes
│   ├── utils/            # Utilitaires (helpers)
│   └── styles/           # CSS (convention BEM)
├── docs/                 # Documentation
├── cypress/              # Tests E2E
└── public/               # Assets statiques
```

## 🌿 Workflow Git
```
main          → Production (déploiement Netlify)
  └── dev     → Développement
       ├── anthony
       ├── mickael
       └── william
```

### Convention de commits
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `style:` CSS/Styling
- `refactor:` Refactorisation
- `docs:` Documentation
- `test:` Tests
- `chore:` Maintenance

## ✨ Fonctionnalités

### 👨‍🎓 Côté Étudiant
- ✅ Profil modifiable (nom, compétences, CV, GitHub)
- ✅ Liste des offres avec filtres (mot-clé, contrat, localisation)
- ✅ Détail d'une offre
- ✅ Postuler à une offre
- ✅ Suivi de ses candidatures

### 🏢 Côté Entreprise
- ✅ Créer, modifier, supprimer une offre
- ✅ Liste des offres publiées
- ✅ Voir les candidatures reçues
- ✅ Changer le statut d'une candidature

## 🧪 Tests
```bash
# Lancer les tests Cypress
npm run cypress:open
```

## 📱 Mobile First

L'application est développée avec une approche Mobile First et responsive :
- 📱 Mobile : 320px - 767px
- 📱 Tablet : 768px - 1023px
- 💻 Desktop : 1024px+

## 🎨 Convention CSS

Le projet utilise la convention **BEM** (Block Element Modifier) pour tous les styles CSS.

Exemple :
```css
.offer-card { }
.offer-card__title { }
.offer-card__title--highlighted { }
```

## 📝 Scripts disponibles
```bash
npm run dev          # Lancer le serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualiser le build
npm run lint         # Linter le code
```

## 🔗 API

L'application consomme l'API backend fournie :
- **URL** : https://ekod-dev-interface-tp4-backend-production.up.railway.app/api/group3
- **Documentation** : [Swagger API](https://ekod-dev-interface-tp4-backend-production.up.railway.app/api-docs/#/)

## 📄 Livrables

- [x] Code source complet
- [x] Application déployée sur Netlify
- [ ] Rapport de tests PDF
- [ ] Maquettes et wireframes PDF
- [ ] Benchmark PDF

---

**Projet réalisé dans le cadre du TP4 - Développement des Interfaces Utilisateur**  
**EKOD - 2025**