import { useState } from 'react'
import { FaGoogle, FaFacebook } from 'react-icons/fa'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Footer from '../../Layouts/public/Footer'
import { login } from '../../../services/authService'
import { useNavigate } from 'react-router-dom';



export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const navigate = useNavigate();
  const [error, setError] = useState(null);


  
  
const handleSubmit = async (e) => {
  e.preventDefault();
  setError(''); 

  try {
    const data = await login(email, password, rememberMe);
    console.log("Utilisateur connecté :", data);
    navigate("/users");
  } catch (err) {
    setError(err.message || "Erreur inconnue");
  }
};

{error && <p className="text-red-500 text-sm mb-4">{error}</p>}

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-dark bg-cover bg-center" 
         style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://wallpapers.com/images/hd/animation-movies-3840-x-2160-wallpaper-f3ra0cyl5yhwfv8c.jpg')" }}>
      
      <div className="w-full max-w-md bg-black bg-opacity-75 rounded-lg p-12">
        <Link 
            to="/" 
            className="flex items-center text-indigo-200 hover:text-indigo-400 transition-colors mb-8"
          >
            <FiArrowLeft className="mr-2" />
            Retour 
        </Link>
        {error && (
          <div className="bg-red-100 text-red-500 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <h2 className="text-white text-3xl mb-6">Identifiez vous</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full px-5 py-4 bg-gray-800 rounded text-white focus:outline-none focus:bg-gray-700 "
                required
                />
                <label 
                htmlFor="email"
                className={`absolute left-5  text-gray-400 transition-all duration-200 pointer-events-none 
                            ${email ? '-top-3  text-xs bg-dark px-1' : 'top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:bg-dark peer-focus:px-1'}`}
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
                className=" w-full bg-primary py-4 rounded font-bold text-white hover:bg-pink-900 transition-colors"
            >
                S'identifier
            </button>
          
            <div className="flex justify-between items-center text-gray-400 text-sm ">
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
        
        <div className="mt-10 text-gray-400 flex flex-grow justify-between items-center w-full">
          <p>Nouveau sur ToonTime?</p>
          <Link 
            to='/register' 
            className="px-4 py-1 text-sm font-medium text-white border border-white rounded-full shadow-2xl overflow-hidden backdrop-blur-sm hover:bg-gray-700 transition-all justify-center items-center "
          >
            s'inscrire
          </Link>
        </div>
        
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
      </div>
      
    </div>
    <Footer />
    </>
  )
}