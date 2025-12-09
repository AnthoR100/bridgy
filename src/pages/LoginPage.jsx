import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { success, data, error: loginError } = await login(email, password);

      if (!success) {
        setError(loginError || 'Connexion impossible. Vérifiez vos identifiants.');
        return;
      }

      const role = data?.user?.role;
      if (role === 'STUDENT') {
        navigate('/offers', { replace: true });
      } else if (role === 'COMPANY') {
        navigate('/my-offers', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      setError(err?.message || 'Une erreur est survenue. Merci de réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h1>Connexion</h1>

        <p>
          Identifiants exemple : student1.groupX@ekod.fr / password123 (remplacez groupX par votre groupe).
        </p>

        <ErrorMessage message={error} />

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border outline-none"
              placeholder="student1.group1@ekod.fr"
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border outline-none"
              placeholder="password123"
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="p-2 border outline-none"
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        {loading && (
          <div className="mt-4 flex justify-center">
            <LoadingSpinner message="Connexion en cours..." />
          </div>
        )}

        <p>
          Pas encore de compte ?{' '}
          <Link to="/register">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

