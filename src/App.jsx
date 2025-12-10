import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import ProfilePageStudent from './pages/ProfilePageStudent';
import ProfilePageCompany from './pages/ProfilePageCompany';
import SignupPage from './pages/SignupPage';
import ApplicationPage from './pages/ApplicationPage';
import LoadingSpinner from './components/LoadingSpinner';

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
            path="/profile_student"
            element={
              <ProtectedRoute requiredRole="STUDENT">
                <ProfilePageStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/offers"
            element={
              <ProtectedRoute requiredRole="STUDENT">
                {/* pages offres d'emploi */}
              </ProtectedRoute>
            }
          />
          
          { /* ... */ }

          {/* Routes pour les entreprises */}

          <Route
            path="/profile_company"
            element={
              <ProtectedRoute requiredRole="COMPANY">
                <ProfilePageCompany />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-offers"
            element={
              <ProtectedRoute requiredRole="COMPANY">
                {/* page mes offres */}
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
                  <ApplicationPage />
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