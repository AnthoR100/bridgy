import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import RouteProtegee from './components/RouteProtegee';
import LayoutDashboard from './components/LayoutDashboard.jsx';
import PageAccueil from './pages/PageAccueil';
import PageConnexion from './pages/PageConnexion';
import PageProfilEtudiant from './pages/PageProfilEtudiant';
import PageProfilEntreprise from './pages/PageProfilEntreprise';
import PageInscription from './pages/PageInscription';
import PageCandidaturesEntreprise from './pages/PageCandidaturesEntreprise';
import PageCandidaturesEtudiant from './pages/PageCandidaturesEtudiant';
import SpinnerChargement from './components/SpinnerChargement';
import PageListeOffres from "./pages/PageListeOffres.jsx";
import PageOffresEntreprise from "./pages/PageOffresEntreprise.jsx";
import PageFormOffreEntreprise from "./pages/PageFormOffreEntreprise.jsx";
import PageDetailOffre from "./pages/PageDetailOffre.jsx";
import PagePostuler from "./pages/PagePostuler.jsx";


function AppRoutes() {
  const { isAuthenticated, isStudent, isCompany, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <SpinnerChargement message="Chargement..." />
      </div>
    );
  }

  return (
    <div>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <LayoutDashboard>
                  <PageAccueil />
                </LayoutDashboard>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to={isStudent ? "/offers" : isCompany ? "/my-offers" : "/"} replace />
              ) : (
                <PageConnexion />
              )
            }
          />

          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to={isStudent ? "/offers" : isCompany ? "/my-offers" : "/"} replace />
              ) : (
                <PageInscription />
              )
            }
          />

          <Route
            path="/profile"
            element={
              isStudent ? (
                <RouteProtegee requiredRole="STUDENT">
                  <LayoutDashboard>
                    <PageProfilEtudiant />
                  </LayoutDashboard>
                </RouteProtegee>
              ) : isCompany ? (
                <RouteProtegee requiredRole="COMPANY">
                  <LayoutDashboard>
                    <PageProfilEntreprise />
                  </LayoutDashboard>
                </RouteProtegee>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/offers"
            element={
              <RouteProtegee requiredRole="STUDENT">
                <LayoutDashboard>
                  <PageListeOffres />
                </LayoutDashboard>
              </RouteProtegee>
            }
          />

          <Route
            path="/offers/:id"
            element={
              <RouteProtegee requiredRole="STUDENT">
                <LayoutDashboard>
                  <PageDetailOffre />
                </LayoutDashboard>
              </RouteProtegee>
            }
          />

          <Route
            path="/my-offers"
            element={
              <RouteProtegee requiredRole="COMPANY">
                <LayoutDashboard>
                  <PageOffresEntreprise />
                </LayoutDashboard>
              </RouteProtegee>
            }
          />

          <Route
            path="/company/offers"
            element={
              <RouteProtegee requiredRole="COMPANY">
                <LayoutDashboard>
                  <PageOffresEntreprise />
                </LayoutDashboard>
              </RouteProtegee>
            }
          />

          <Route
            path="/company/offers/create"
            element={
              <RouteProtegee requiredRole="COMPANY">
                <LayoutDashboard>
                  <PageFormOffreEntreprise />
                </LayoutDashboard>
              </RouteProtegee>
            }
          />

          <Route
            path="/company/offers/edit/:id"
            element={
              <RouteProtegee requiredRole="COMPANY">
                <LayoutDashboard>
                  <PageFormOffreEntreprise />
                </LayoutDashboard>
              </RouteProtegee>
            }
          />

          <Route path="/apply/:id" 
            element={
              <RouteProtegee requiredRole="STUDENT">
                <LayoutDashboard>
                  <PagePostuler />
                </LayoutDashboard>
              </RouteProtegee>
            }
          />

          <Route
            path="/applications"
            element={
              isStudent ? (
                <RouteProtegee requiredRole="STUDENT">
                  <LayoutDashboard>
                    <PageCandidaturesEtudiant />
                  </LayoutDashboard>
                </RouteProtegee>
              ) : isCompany ? (
                <RouteProtegee requiredRole="COMPANY">
                  <LayoutDashboard>
                    <PageCandidaturesEntreprise />
                  </LayoutDashboard>
                </RouteProtegee>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route path="*" element={<>{/* à implémenter */}</>} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;