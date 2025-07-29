import { useState } from 'react'
import { FaGoogle, FaFacebook } from 'react-icons/fa'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Footer from '../../Layouts/public/Footer'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nationality: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const [errors, setErrors] = useState({})
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required!"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required!"
    if (!formData.nationality.trim()) newErrors.nationality = "Nationality is required!"
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required!"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required!"
    } else if (formData.password.length < 8 || formData.password.length > 40) {
      newErrors.password = "Password must be between 8 and 40 characters"
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match!"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    
    if (!validateForm()) return
    
    try {
      // Ici vous ajouterez l'appel à votre service d'inscription
      // const data = await register(formData);
      console.log("Inscription réussie:", formData)
      navigate("/login") // Rediriger vers la page de connexion après inscription
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.")
    }
  }

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

          <h2 className="text-white text-3xl mb-6">Créer un compte</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name */}
            <div className="relative">
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`peer w-full px-5 py-4 bg-gray-800 rounded text-white focus:outline-none focus:bg-gray-700 ${errors.firstName ? 'border border-red-500' : ''}`}
                required
              />
              <label 
                htmlFor="firstName"
                className={`absolute left-5 text-gray-400 transition-all duration-200 pointer-events-none 
                            ${formData.firstName ? '-top-3 text-xs bg-dark px-1' : 'top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:bg-dark peer-focus:px-1'}`}
              >
                Prénom
              </label>
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            
            {/* Last Name */}
            <div className="relative">
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`peer w-full px-5 py-4 bg-gray-800 rounded text-white focus:outline-none focus:bg-gray-700 ${errors.lastName ? 'border border-red-500' : ''}`}
                required
              />
              <label 
                htmlFor="lastName"
                className={`absolute left-5 text-gray-400 transition-all duration-200 pointer-events-none 
                            ${formData.lastName ? '-top-3 text-xs bg-dark px-1' : 'top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:bg-dark peer-focus:px-1'}`}
              >
                Nom
              </label>
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
            
            {/* Nationality */}
            <div className="relative">
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className={`peer w-full px-5 py-4 bg-gray-800 rounded text-white focus:outline-none focus:bg-gray-700 ${errors.nationality ? 'border border-red-500' : ''}`}
                required
              />
              <label 
                htmlFor="nationality"
                className={`absolute left-5 text-gray-400 transition-all duration-200 pointer-events-none 
                            ${formData.nationality ? '-top-3 text-xs bg-dark px-1' : 'top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:bg-dark peer-focus:px-1'}`}
              >
                Nationalité
              </label>
              {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>}
            </div>
            
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`peer w-full px-5 py-4 bg-gray-800 rounded text-white focus:outline-none focus:bg-gray-700 ${errors.email ? 'border border-red-500' : ''}`}
                required
              />
              <label 
                htmlFor="email"
                className={`absolute left-5 text-gray-400 transition-all duration-200 pointer-events-none 
                            ${formData.email ? '-top-3 text-xs bg-dark px-1' : 'top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:bg-dark peer-focus:px-1'}`}
              >
                Email
              </label>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            {/* Password */}
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`peer w-full px-5 py-4 bg-gray-800 rounded text-white focus:outline-none focus:bg-gray-700 ${errors.password ? 'border border-red-500' : ''}`}
                required
              />
              <label 
                htmlFor="password"
                className={`absolute left-5 text-gray-400 transition-all duration-200 pointer-events-none 
                            ${formData.password ? '-top-3 text-xs bg-dark px-1' : 'top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:bg-dark peer-focus:px-1'}`}
              >
                Mot de passe
              </label>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            
            {/* Confirm Password */}
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`peer w-full px-5 py-4 bg-gray-800 rounded text-white focus:outline-none focus:bg-gray-700 ${errors.confirmPassword ? 'border border-red-500' : ''}`}
                required
              />
              <label 
                htmlFor="confirmPassword"
                className={`absolute left-5 text-gray-400 transition-all duration-200 pointer-events-none 
                            ${formData.confirmPassword ? '-top-3 text-xs bg-dark px-1' : 'top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:bg-dark peer-focus:px-1'}`}
              >
                Confirmer le mot de passe
              </label>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary py-4 rounded font-bold text-white hover:bg-pink-900 transition-colors"
            >
              S'inscrire
            </button>
          </form>
          
          <div className="mt-10 text-gray-400">
            <p>Déjà membre? <Link to="/login" className="text-white hover:underline">Connectez-vous ici</Link>.</p>
          </div>
          
          <div className="mt-10">
            <div className="relative flex items-center justify-center mb-6">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="flex-shrink mx-4 text-gray-400">S'inscrire avec</span>
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