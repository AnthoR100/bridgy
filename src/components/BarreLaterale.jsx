import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import Logo from '../assets/Logo.png';

const BarreLaterale = ({ onNavigate }) => {
  const { isStudent, isCompany, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = useMemo(() => {
    if (isStudent) {
      return [
        { label: 'Accueil', to: '/offers', description: 'Toutes les offres' },
        { label: 'Mes candidatures', to: '/applications', description: 'Suivi des candidatures' },
        { label: 'Profil', to: '/profile', description: 'Informations personnelles' },
      ];
    }

    if (isCompany) {
      return [
        { label: 'Accueil', to: '/my-offers', description: 'Vos offres publiées' },
        { label: 'Candidatures reçues', to: '/applications', description: 'Candidats et statuts' },
        { label: 'Profil', to: '/profile', description: 'Profil entreprise' },
      ];
    }

    return [];
  }, [isStudent, isCompany]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handleNavigate = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <aside className="flex h-full w-72 flex-col bg-white shadow-sm lg:sticky lg:top-0 lg:h-screen">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
        <img src={Logo} alt="Bridgy" className="h-10 w-10 object-contain" />
        <div>
          <p className="text-lg font-bold text-emerald-600">Bridgy</p>
          <p className="text-xs text-gray-500">Pont entre étudiants & entreprises</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                onClick={handleNavigate}
                className={`block rounded-xl px-4 py-3 transition ${
                  isActive(item.to)
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-4 py-4">
        <button
          onClick={handleLogout}
          className="cursor-pointer w-full rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
          Déconnexion
        </button>
      </div>
    </aside>
  );
};
  
export default BarreLaterale;