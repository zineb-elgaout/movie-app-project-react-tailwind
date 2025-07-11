import React, { useState } from "react";
import { motion } from 'framer-motion';
import { FiSend, FiPhone, FiMail, FiMapPin, FiUser, FiMessageSquare } from 'react-icons/fi';
import { FaTelegramPlane } from 'react-icons/fa';
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi de formulaire
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Réinitialiser le message de succès après 5 secondes
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 py-16 md:py-24">
      {/* Section Contact - version moderne avec animation */}
      <section className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 ">
            Contactez <span className="text-pink-500">ToonTime</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Une question, une suggestion ? Nous sommes à votre écoute !
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Formulaire de contact */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Votre nom</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    placeholder="Nom complet"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">Message</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                    <FiMessageSquare className="text-gray-400" />
                  </div>
                  <textarea
                    id="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    placeholder="Votre message..."
                    required
                  ></textarea>
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full font-medium transition-all duration-300 ${
                  isSubmitting 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <FaTelegramPlane className="text-lg" />
                    Envoyer le message
                  </>
                )}
              </motion.button>

              {submitSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-100 text-green-700 rounded-lg text-center"
                >
                  Message envoyé avec succès ! Nous vous répondrons bientôt.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Informations de contact */}
          <div className="space-y-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 h-full border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos coordonnées</h2>
              
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-3 rounded-xl mr-4">
                    <FiPhone className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Téléphone</h3>
                    <a href="tel:+15551234567" className="text-gray-600 hover:text-pink-600 transition-colors">+1 (555) 123-4567</a>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-3 rounded-xl mr-4">
                    <FiMail className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Email</h3>
                    <a href="mailto:contact@toontime.com" className="text-gray-600 hover:text-pink-600 transition-colors">contact@toontime.com</a>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-3 rounded-xl mr-4">
                    <FiMapPin className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Adresse</h3>
                    <p className="text-gray-600">123 Rue des Dessins Animés, Paris, France</p>
                  </div>
                </motion.div>
              </div>

            </motion.div>
            
          </div>
        </motion.div>
      </section>
    </main>
  );
}