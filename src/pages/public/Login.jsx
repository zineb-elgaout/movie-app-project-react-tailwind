import { useState, useEffect } from 'react'
import { FaGoogle, FaFacebook } from 'react-icons/fa'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Footer from '../../Layouts/public/Footer'
import { login } from '../../../services/authService'
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../../services/userService';
import { enableTwoFactor, confirmTwoFactor } from '../../../services/userService';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  
  // États pour la 2FA
  const [twoFactorStep, setTwoFactorStep] = useState('login'); // 'login', '2fa-code', 'success'
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [twoFactorLoading, setTwoFactorLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const data = await login(email, password, rememberMe);
      console.log("Utilisateur connecté :", data);

      // Vérifier si la 2FA est requise
      if (data.twoFactorRequired) {
        setUserData(data);
        setTwoFactorStep('2fa-code');
        // Envoyer automatiquement le code 2FA
        await handleSendTwoFactorCode();
      } else {
        // Pas de 2FA, rediriger directement
        redirectUser();
      }
    } catch (err) {
      setError(err.message || "Erreur inconnue");
    }
  };

  const handleSendTwoFactorCode = async () => {
    try {
      setTwoFactorLoading(true);
      const profile = getUserProfile();
      if (profile) {
        await enableTwoFactor(profile.id, email);
      }
    } catch (error) {
      console.error("Erreur envoi code 2FA:", error);
      setError("Erreur lors de l'envoi du code de vérification");
    } finally {
      setTwoFactorLoading(false);
    }
  };

  const handleTwoFactorSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!twoFactorCode || twoFactorCode.length !== 6) {
      setError("Le code doit contenir 6 chiffres");
      return;
    }

    setTwoFactorLoading(true);
    try {
      // Vérifier le code 2FA
      await confirmTwoFactor(email, twoFactorCode);
      setTwoFactorStep('success');
      
      // Rediriger après succès
      setTimeout(() => {
        redirectUser();
      }, 1000);
      
    } catch (err) {
      setError(err.message || "Code incorrect ou expiré");
    } finally {
      setTwoFactorLoading(false);
    }
  };

  const redirectUser = () => {
    const profile = getUserProfile();
    if (!profile) return;

    switch (profile.role) {
      case "Admin":
        navigate("/admin/dashboard");
        break;
      case "Editor":
        navigate("/editor/dashboard");
        break;
      case "Client":
        navigate("/toontime");
        break;
      default:
        navigate("/");
    }
  };

  const backToLogin = () => {
    setTwoFactorStep('login');
    setTwoFactorCode('');
    setError('');
  };

  const resendCode = async () => {
    setError('');
    try {
      setTwoFactorLoading(true);
      await handleSendTwoFactorCode();
      setError("Nouveau code envoyé avec succès");
    } catch (error) {
      setError("Erreur lors de l'envoi du nouveau code");
    } finally {
      setTwoFactorLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-dark bg-cover bg-center" 
           style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://wallpapers.com/images/hd/animation-movies-3840-x-2160-wallpaper-f3ra0cyl5yhwfv8c.jpg')" }}>
        
        <div className="w-full max-w-md bg-black bg-opacity-75 rounded-lg p-12 m-3">
          <Link 
            to="/" 
            className="flex items-center text-indigo-200 hover:text-indigo-400 transition-colors mb-8"
          >
            <FiArrowLeft className="mr-2" />
            Retour 
          </Link>

          {error && (
            <div className={`p-3 rounded mb-4 ${error.includes("succès") ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}>
              {error}
            </div>
          )}

          {/* ÉTAPE 1: Formulaire de login normal */}
          {twoFactorStep === 'login' && (
            <>
              <h2 className="text-white text-3xl mb-6">Identifiez vous</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer w-full px-5 py-4 bg-gray-800 rounded text-white focus:outline-none focus:bg-gray-700"
                    required
                  />
                  <label 
                    htmlFor="email"
                    className={`absolute left-5 text-gray-400 transition-all duration-200 pointer-events-none 
                                ${email ? '-top-3 text-xs bg-dark px-1' : 'top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:bg-dark peer-focus:px-1'}`}
                  >
                    Email
                  </label>
                </div>
                
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer w-full px-5 py-4 bg-gray-800 rounded text-white focus:outline-none focus:bg-gray-700"
                    required
                  />
                  <label 
                    htmlFor="password"
                    className={`absolute left-5 text-gray-400 transition-all duration-200 pointer-events-none 
                                ${password ? '-top-3 text-xs bg-dark px-1' : 'top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:bg-dark peer-focus:px-1'}`}
                  >
                    Mot de passe
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary py-4 rounded font-bold text-white hover:bg-pink-900 transition-colors"
                >
                  S'identifier
                </button>
                
                <div className="flex justify-between items-center text-gray-400 text-sm">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="remember">Se souvenir de moi</label>
                  </div>
                  <a href="#" className="hover:underline">Besoin d'aide?</a>
                </div>
              </form>
            </>
          )}

          {/* ÉTAPE 2: Code 2FA */}
          {twoFactorStep === '2fa-code' && (
            <>
              <h2 className="text-white text-3xl mb-2">Vérification de sécurité</h2>
              <p className="text-gray-400 text-sm mb-6">
                Un code de vérification a été envoyé à <span className="text-white">{email}</span>
              </p>
              
              <form onSubmit={handleTwoFactorSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    id="twoFactorCode"
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="peer w-full px-5 py-4 bg-gray-800 rounded text-white focus:outline-none focus:bg-gray-700 text-center text-xl tracking-widest"
                    placeholder="000000"
                    maxLength={6}
                    required
                  />
                  
                </div>

                <button
                  type="submit"
                  disabled={twoFactorLoading || twoFactorCode.length !== 6}
                  className="w-full bg-primary py-4 rounded font-bold text-white hover:bg-pink-900 transition-colors disabled:opacity-50"
                >
                  {twoFactorLoading ? 'Vérification...' : 'Vérifier le code'}
                </button>

                <div className="flex justify-between items-center text-gray-400 text-sm">
                  <button 
                    type="button" 
                    onClick={backToLogin}
                    className="hover:underline flex items-center"
                  >
                    <FiArrowLeft className="mr-1" /> Retour
                  </button>
                  <button 
                    type="button" 
                    onClick={resendCode}
                    disabled={twoFactorLoading}
                    className="hover:underline disabled:opacity-50"
                  >
                    Renvoyer le code
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ÉTAPE 3: Succès */}
          {twoFactorStep === 'success' && (
            <div className="text-center">
              <h2 className="text-white text-3xl mb-4">Connexion réussie!</h2>
              <p className="text-gray-400 mb-6">Redirection en cours...</p>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>
          )}

          {/* Section inscription (uniquement sur l'écran de login) */}
          {twoFactorStep === 'login' && (
            <div className="mt-10 text-gray-400 flex flex-grow justify-between items-center w-full">
              <p>Nouveau sur ToonTime?</p>
              <Link 
                to='/register' 
                className="px-4 py-1 text-sm font-medium text-white border border-white rounded-full shadow-2xl overflow-hidden backdrop-blur-sm hover:bg-gray-700 transition-all justify-center items-center"
              >
                s'inscrire
              </Link>
            </div>
          )}

          {/* Réseaux sociaux (uniquement sur l'écran de login) */}
          {twoFactorStep === 'login' && (
            <div className="mt-10">
              <div className="relative flex items-center justify-center mb-6">
                <div className="flex-grow border-t border-gray-600"></div>
                <span className="flex-shrink mx-4 text-gray-400">S'identifier avec</span>
                <div className="flex-grow border-t border-gray-600"></div>
              </div>
              
              <div className="flex justify-center space-x-6">
                <a href="#" className="text-white text-2xl hover:text-primary transition-colors">
                  <FaGoogle />
                </a>
                <a href="#" className="text-white text-2xl hover:text-primary transition-colors">
                  <FaFacebook />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}