import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { useAuth } from '../hooks/useAuth';
import Logo from '../assets/Logo.png'

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
      console.log(role);
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
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center sm:bg-[url(./assets/Background.png)]'>
      <div className="flex justify-center w-full rounded-2xl animate-fade-in sm:w-auto sm:shadow-xl">
        <div className="bg-white w-full rounded-2xl p-[10%] space-y-6 sm:w-[500px] sm:p-8 lg:w-[400px] lg:p-8 lg:rounded-l-2xl lg:rounded-r-none">
          <div className='flex justify-between items-center'>
            <img src={ Logo } alt="" className='h-26'/>
          
            <div>
              <h1 className='text-4xl font-black uppercase text-emerald-500 font-display'>Bridgy</h1>
            </div>
          </div>

          <ErrorMessage message={error} />

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <label className="text-xs font-medium text-gray-600" htmlFor="name">
                Votre email
              </label>

              <input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className='mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100'
                placeholder="student1.group3@ekod.fr"
                autoComplete="off"
                disabled={loading}
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600" htmlFor="name">
                Votre email
              </label>

              <input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className='mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100'
                placeholder="password123"
                autoComplete="off"
                disabled={loading}
                required
              />
            </div>

            <button type="submit" disabled={loading} className="cursor-pointer rounded-full bg-emerald-500 px-4 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:opacity-60">
              {loading ? (
                <span className="z-10 flex items-center justify-between">
                  <span className="flex-3 flex justify-center items-center">Connexion...</span>
                  <span className="flex-1 flex justify-center items-center">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  </span>
                </span>
              ) : (
                <span className="z-10 flex items-center justify-between">
                  <span className="flex-3 flex justify-center items-center">Se connecter</span>
                  <span className="flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-5 w-5 stroke-white stroke-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </span>
              )}
            </button>

            <div className='w-full flex justify-center items-center shadow-sm lg:hidden'>
              <Link to="/register" className="text-black font-bold underline">
                Créer un compte
              </Link>
            </div>
          </form>
        </div>

        <div className="hidden gap-4 w-[400px] bg-linear-to-t from-emerald-600 via-emerald-500 to-emerald-400 rounded-r-2xl p-8 lg:flex lg:flex-col lg:justify-center lg:items-center">
          <h1 className='text-white text-2xl font-bold'>
            Heureux de vous revoir
          </h1>
          
          <p className="text-white text-md font-normal text-center">
            Si vous n’avez pas de compte, vous pouvez
            vous inscrire en cliquant sur le bouton ci-dessous
          </p>

          <Link to="/register" className="rounded-full bg-emerald-500 px-16 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:opacity-60">
              Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

