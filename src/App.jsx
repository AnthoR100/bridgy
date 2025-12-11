import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import ProfilePageStudent from './pages/ProfilePageStudent';
import ProfilePageCompany from './pages/ProfilePageCompany';
import SignupPage from './pages/SignupPage';
import ApplicationPage from './pages/ApplicationPage';
import StudentApplicationsPage from './pages/StudentApplicationsPage';
import LoadingSpinner from './components/LoadingSpinner';
import OffersList from "./pages/OffersList.jsx";
import CompanyOffers from "./pages/CompanyOffers.jsx";
import FormCompanyOffers from "./pages/FormCompanyOffers.jsx";
import OfferDetailsPage from "./pages/OfferDetailsPage.jsx";
import ApplyPage from "./pages/ApplyPage.jsx";


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
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <div className="flex min-h-screen bg-gray-50">
                  <Sidebar />
                  <div className="flex-1 overflow-x-hidden">
                    <Home />
                  </div>
                </div>
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
                <LoginPage />
              )
            }
          />

          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to={isStudent ? "/offers" : isCompany ? "/my-offers" : "/"} replace />
              ) : (
                <SignupPage />
              )
            }
          />

          <Route
            path="/profile"
            element={
              isStudent ? (
                <ProtectedRoute requiredRole="STUDENT">
                  <div className="flex min-h-screen bg-gray-50">
                    <Sidebar />
                    <div className="flex-1 overflow-x-hidden">
                      <ProfilePageStudent />
                    </div>
                  </div>
                </ProtectedRoute>
              ) : isCompany ? (
                <ProtectedRoute requiredRole="COMPANY">
                  <div className="flex min-h-screen bg-gray-50">
                    <Sidebar />
                    <div className="flex-1 overflow-x-hidden">
                      <ProfilePageCompany />
                    </div>
                  </div>
                </ProtectedRoute>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/offers"
            element={
              <ProtectedRoute requiredRole="STUDENT">
                <div className="flex min-h-screen bg-gray-50">
                  <Sidebar />
                  <div className="flex-1 overflow-x-hidden">
                    <OffersList />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/offers/:id"
            element={
              <ProtectedRoute requiredRole="STUDENT">
                <div className="flex min-h-screen bg-gray-50">
                  <Sidebar />
                  <div className="flex-1 overflow-x-hidden">
                    <OfferDetailsPage />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-offers"
            element={
              <ProtectedRoute requiredRole="COMPANY">
                <div className="flex min-h-screen bg-gray-50">
                  <Sidebar />
                  <div className="flex-1 overflow-x-hidden">
                    <CompanyOffers />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/company/offers"
            element={
              <ProtectedRoute requiredRole="COMPANY">
                <div className="flex min-h-screen bg-gray-50">
                  <Sidebar />
                  <div className="flex-1 overflow-x-hidden">
                    <CompanyOffers />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/company/offers/create"
            element={
              <ProtectedRoute requiredRole="COMPANY">
                <div className="flex min-h-screen bg-gray-50">
                  <Sidebar />
                  <div className="flex-1 overflow-x-hidden">
                    <FormCompanyOffers />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/company/offers/edit/:id"
            element={
              <ProtectedRoute requiredRole="COMPANY">
                <div className="flex min-h-screen bg-gray-50">
                  <Sidebar />
                  <div className="flex-1 overflow-x-hidden">
                    <FormCompanyOffers />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/applications"
            element={
              isStudent ? (
                <ProtectedRoute requiredRole="STUDENT">
                  <div className="flex min-h-screen bg-gray-50">
                    <Sidebar />
                    <div className="flex-1 overflow-x-hidden">
                      <StudentApplicationsPage />
                    </div>
                  </div>
                </ProtectedRoute>
              ) : isCompany ? (
                <ProtectedRoute requiredRole="COMPANY">
                  <div className="flex min-h-screen bg-gray-50">
                    <Sidebar />
                    <div className="flex-1 overflow-x-hidden">
                      <ApplicationPage />
                    </div>
                  </div>
                </ProtectedRoute>
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