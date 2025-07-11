
import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa';
import {motion} from 'framer-motion';
const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Comment créer un compte sur ToonTime ?",
      answer: "Cliquez sur 'S'inscrire' en haut à droite de la page d'accueil. Entrez votre email, créez un mot de passe et validez votre compte via le lien que vous recevrez par email."
    },
    {
      question: "Quels modes de paiement acceptez-vous ?",
      answer: "Nous acceptons les cartes Visa, Mastercard, PayPal et les cartes cadeaux ToonTime. Les paiements sont sécurisés par chiffrement SSL."
    },
    {
      question: "Puis-je annuler mon abonnement à tout moment ?",
      answer: "Oui, vous pouvez annuler votre abonnement dans la section 'Compte' à tout moment. L'accès reste valide jusqu'à la fin de la période payée."
    },
    {
      question: "Comment changer la qualité de streaming ?",
      answer: "Pendant la lecture, cliquez sur l'icône d'engrenage et sélectionnez la qualité souhaitée dans le menu 'Paramètres de lecture'."
    },
    {
      question: "Les dessins animés ont-ils des sous-titres ?",
      answer: "La plupart de notre catalogue propose des sous-titres en français et plusieurs autres langues. Activez-les via le bouton 'Sous-titres' pendant la lecture."
    }
  ];

  return (
    <section id='about' className="bg-gray-900 text-white py-16 px-4">
        <div className="relative max-w-7xl mx-auto px-6">

       {/* En-tête */}
            <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-start mb-16"
            >
            <div className="inline-flex items-center mb-4 ">
                <div className="w-12 h-px bg-gradient-to-r from-pink-500 to-purple-500 m-4"></div>
                <span className="text-sm font-medium tracking-widest text-pink-400 uppercase">Explorez</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">Questions Fréquentes</span>
            </h2>
            
            </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border-l border-gray-700  overflow-hidden">
              <motion.button 
              
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-800 transition"
              >
                <span className="font-medium">{faq.question}</span>
                {activeIndex === index ? 
                  <FaChevronUp className="text-white" /> : 
                  <FaChevronDown className="text-white" />
                }
              </motion.button>
              
              {activeIndex === index && (
                <motion.div 
                
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="p-4 bg-dark text-gray-300">
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      
      </div>
    </section>
  );
};

export default FAQSection;