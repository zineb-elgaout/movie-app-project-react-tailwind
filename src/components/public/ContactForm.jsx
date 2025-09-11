import React, { useState } from "react";
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiArrowLeft, FiClock, FiHelpCircle } from 'react-icons/fi';
import { FaDiscord } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import backgroundImage from '../../../src/assets/public/images/contactPageBack.png';
import {sendContactForm} from '../../../services/contactService';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const result = await sendContactForm(formData);
      console.log(result);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage:  `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Overlay noir semi-transparent */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm"
      >
        <div className="p-8 md:p-12">
          
          <div className="text-center mb-12">
            <Link  to="/" 
                    className="flex items-center text-indigo-200 hover:text-indigo-400 transition-colors mb-8">
                    <FiArrowLeft className="mr-2" /> Retour 
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Contactez ToonTime</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">Notre équipe est à votre disposition pour répondre à toutes vos questions</p>
          </div>

          <div className="flex flex-col gap-12">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Formulaire */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-6">
                  Envoyez-nous un message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Votre nom complet"
                        required
                      />
                    </div>

                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Adresse email"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Objet du message"
                      required
                    />
                  </div>

                  <div className="relative">
                    <textarea
                      id="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Votre message"
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-yellow-500  to-pink-600 hover:opacity-90 py-4 rounded-full font-bold text-white transition-all duration-300"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  </motion.button>

                  {submitSuccess && (
                    <p className="text-green-500 font-medium">
                      Your message has been sent successfully 
                    </p>
                  )}

                  {errorMessage && (
                    <p className="text-red-500 font-medium">
                      {errorMessage}
                    </p>
                  )}

                </form>
              </div>

              {/* Informations de contact */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-6">
                    Comment nous contacter
                  </h2>
                  
                  <div className="space-y-5">
                    <div className="flex items-start p-4 rounded-lg">
                      <div className="bg-gradient-to-r from-yellow-500  to-pink-600 p-3 rounded-full mr-4">
                        <FiPhone className="text-white text-lg" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Support téléphonique</h3>
                        <p className="text-gray-300">+212 1 23 45 67 89</p>
                        <p className="text-gray-400 text-sm mt-1 flex items-center">
                          <FiClock className="mr-1" /> Lundi-Vendredi, 9h-18h
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start p-4 rounded-lg">
                      <div className="bg-gradient-to-r from-yellow-500  to-pink-600 p-3 rounded-full mr-4">
                        <FiMail className="text-white text-lg" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Email</h3>
                        <p className="text-gray-300">contact@toontime.com</p>
                        <p className="text-gray-400 text-sm mt-1">Réponse sous 24h</p>
                      </div>
                    </div>

                    <div className="flex items-start p-4 rounded-lg">
                      <div className="bg-gradient-to-r from-yellow-500  to-pink-600 p-3 rounded-full mr-4">
                        <FiMapPin className="text-white text-lg" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Bureau principal</h3>
                        <p className="text-gray-300">15 Rue des Dessins Animés</p>
                        <p className="text-gray-400">14000 Kénitra, Maroc</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support instantané - Nouvelle disposition */}
<div className="w-full border-t border-gray-700 pt-8 mt-8">
  <div className="space-y-6">
    <h2 className="text-2xl font-semibold text-white mb-4 text-center md:text-left">
      Support instantané
    </h2>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <motion.a 
        whileHover={{ y: -3, scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        href="#" 
        className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg flex flex-col items-center transition-colors border border-gray-700"
      >
        <div className="bg-gradient-to-r from-yellow-500  to-pink-600 p-3 rounded-full ">
          <FaDiscord className="text-white text-lg" />
        </div>
        <span className="text-white font-medium">Discord</span>
        <span className="text-gray-400 text-sm mt-1 text-center">Communauté active</span>
      </motion.a>

      <motion.a 
        whileHover={{ y: -3, scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        href="#" 
        className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg flex flex-col items-center transition-colors border border-gray-700"
      >
        <div className="bg-gradient-to-r from-yellow-500  to-pink-600 p-3 rounded-full ">
          <FiHelpCircle className="text-white text-lg" />
        </div>
        <span className="text-white font-medium">Centre d'aide</span>
        <span className="text-gray-400 text-sm mt-1 text-center">Guides & tutoriels</span>
      </motion.a>

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-medium text-white mb-2 text-lg flex items-center">
            <FiHelpCircle className="text-gray-300 mr-2 text-xl" />
            FAQ & Assistance
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Consultez notre centre d'aide pour des réponses rapides aux questions fréquentes.
          </p>
        </div>
        <Link 
          to="/#FAQSection" 
          className="text-indigo-300 hover:text-indigo-400 text-sm font-medium transition-colors flex items-center"
        >
          <span>Voir les questions fréquentes</span>
          
        </Link>
      </div>
    </div>
  </div>
              
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}