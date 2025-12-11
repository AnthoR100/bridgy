import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import SpinnerChargement from './SpinnerChargement';

const RouteProtegee = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <SpinnerChargement message="Vérification de l'authentification..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RouteProtegee;
