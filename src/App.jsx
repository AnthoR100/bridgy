import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LoadingSpinner from './components/LoadingSpinner';
import OffersList from "./pages/OffersList.jsx";
import CompanyOffers from "./pages/CompanyOffers.jsx";
import FormCompanyOffers from "./pages/FormCompanyOffers.jsx";
import OfferDetailsPage from "./pages/OfferDetailsPage.jsx";

// Pages communes

function AppRoutes() {
  const { isAuthenticated, isStudent, isCompany, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner message="Chargement..." />
      </div>
    );
  }

  return (
    <div>
      <main>
        <Routes>
          {/* Routes publiques */}
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" replace /> : <SignupPage />}
          />

          {/* Routes pour les étudiants */}
          <Route
            path="/offers"
            element={
              <ProtectedRoute requiredRole="STUDENT">
                {/* pages offres d'emploi */}
                  <OffersList />
              </ProtectedRoute>
            }
          />
            <Route
                path="/offers/:id"
                element={
                    <ProtectedRoute requiredRole="STUDENT">
                        <OfferDetailsPage />
                    </ProtectedRoute>
                }
            />
          
          { /* ... */ }

          {/* Routes pour les entreprises */}
          <Route
            path="/my-offers"
            element={
              <ProtectedRoute requiredRole="COMPANY">
                {/* page mes offres */}
                  <CompanyOffers />
              </ProtectedRoute>
            }
          />
            <Route
                path="/company/offers"
                element={
                    <ProtectedRoute requiredRole="COMPANY">
                        <CompanyOffers />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/company/offers/create"
                element={
                    <ProtectedRoute requiredRole="COMPANY">
                        <FormCompanyOffers />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/company/offers/edit/:id"
                element={
                    <ProtectedRoute requiredRole="COMPANY">
                        <FormCompanyOffers />
                    </ProtectedRoute>
                }
            />
          
          { /* ... */ }

          {/* Routes partagées - redirigent vers le bon composant selon le rôle */}
          <Route
            path="/applications"
            element={
              isStudent ? (
                <ProtectedRoute requiredRole="STUDENT">
                  {/* page candidature */}
                </ProtectedRoute>
              ) : isCompany ? (
                <ProtectedRoute requiredRole="COMPANY">
                  {/* page candidats */}
                </ProtectedRoute>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          
          { /* ... */ }

          {/* Route 404 */}
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