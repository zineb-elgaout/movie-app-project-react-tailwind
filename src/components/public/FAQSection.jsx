
import { useState , useEffect} from 'react';
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa';
import {motion} from 'framer-motion';
import { getFaqs } from '../../../services/faqService';
const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Charger les FAQ depuis le backend
    useEffect(() => {
      const fetchFaqs = async () => {
        setLoading(true);
        try {
          const faqs = await getFaqs();
          setFaqs(faqs);
        } catch (err) {
          setError("Erreur lors du chargement des FAQ");
        } finally {
          setLoading(false);
        }
      };
  
      fetchFaqs();
    }, []);


  return (
    <section id='about' className="bg-black text-white py-16 px-4">
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
                <span className="text-sm font-medium tracking-widest text-pink-200 uppercase">Explorez</span>
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