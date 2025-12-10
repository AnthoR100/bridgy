import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { useAuth } from '../hooks/useAuth';
import Logo from '../assets/Logo.png'
import '../styles/signupPage.css'

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { success, data, error: registerError } = await register({
        name,
        email,
        password,
        role,
      });

      if (!success) {
        setError(registerError || 'Inscription impossible. Vérifiez vos informations.');
        return;
      }

      const userRole = data?.user?.role;
      if (userRole === 'STUDENT') {
        navigate('/offers', { replace: true });
      } else if (userRole === 'COMPANY') {
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
        <div className="bg-white w-full rounded-2xl p-[10%] space-y-6 sm:w-[500px] sm:p-8 lg:w-[500px] lg:p-8 lg:rounded-l-2xl lg:rounded-r-none">
          <div className="flex justify-center w-full">
            <img src={ Logo } alt="" className='h-32'/>
          </div>

          <ErrorMessage message={error} />

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-semibold text-gray-700">
                Rôle
              </label>

              <div className="flex relative">
                <select
                  id="role"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="role-selector-dropdown w-full h-14 flex items-center pl-6 rounded-lg bg-[#1fd2a8] text-white outline-none transition-all duration-200 hover:shadow-xl"
                  disabled={loading}
                >
                  <option value="STUDENT">Étudiant</option>
                  <option value="COMPANY">Entreprise</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center w-14 rounded-r-lg bg-[#21B395]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-5 w-5 stroke-white stroke-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                Nom
              </label>

              <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none transition-all duration-200 focus:border-[#2AB6CF] focus:ring-2 focus:ring-[#1abc9c]/20 hover:border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed placeholder:text-gray-400"
                placeholder="Jean Dupont"
                autoComplete="off"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email
              </label>

              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none transition-all duration-200 focus:border-[#2AB6CF] focus:ring-2 focus:ring-[#1abc9c]/20 hover:border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed placeholder:text-gray-400"
                placeholder="student1.group3@ekod.fr"
                autoComplete="off"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Mot de passe
              </label>

              <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none transition-all duration-200 focus:border-[#2AB6CF] focus:ring-2 focus:ring-[#1abc9c]/20 hover:border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed placeholder:text-gray-400"
                placeholder="password123"
                autoComplete="off"
                disabled={loading}
              />
            </div>

            <button type="submit" disabled={loading} className="w-full h-14 mt-4 text-white rounded-lg cursor-pointer duration-200 hover:shadow-xl">
              {loading ? (
                <span className="z-10 flex items-center justify-between">
                  <span className="flex-3 flex justify-center items-center h-14 text-lg bg-[#1fd2a8] rounded-l-lg">Inscription...</span>
                  <span className="flex-1 flex justify-center items-center h-14 bg-[#21B395] rounded-r-lg">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                </span>
              ) : (
                <span className="z-10 flex items-center justify-between">
                  <span className="flex-3 flex justify-center items-center h-14 text-lg bg-[#1fd2a8] rounded-l-lg">S'inscrire</span>
                  <span className="flex justify-center items-center h-14 w-14 bg-[#21B395] rounded-r-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-5 w-5 stroke-white stroke-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </span>
              )}
            </button>

            <div className='w-full flex justify-center items-center lg:hidden'>
              <Link to="/login" className="text-black font-bold underline">
                Se connecter
              </Link>
            </div>
          </form>
        </div>

        <div className="hidden gap-4 w-[400px] bg-linear-to-t from-[#209D84] via-[#21B395] to-[#28CFAC] rounded-r-2xl p-8 lg:flex lg:flex-col lg:justify-center lg:items-center">
          <h1 className='text-white text-2xl font-bold'>
            Créez votre compte
          </h1>
          
          <p className="text-white text-md font-normal text-center">
            Si vous avez déjà un compte, vous pouvez
            vous connecter en cliquant sur le bouton ci-dessous
          </p>

          <Link to="/login" className="w-5/6 text-center text-lg text-white bg-[#1abc9c] p-3 rounded-lg font-regular border border-white duration-200 hover:shadow-xl">
              Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

