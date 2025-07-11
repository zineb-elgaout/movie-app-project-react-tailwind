import React from "react";
import { motion } from "framer-motion";
import pink from '../../assets/public/images/cloud2.png';
import violet from '../../assets/public/images/flower-violet.png';
import FAQSection from "./FAQSection";
function HeroSection (){
    return (
      <section id="hero" className="relative h-screen-minus-nav flex flex-col">
        
          {/* Contenu principal centré */}
          <div className="flex-grow flex items-center justify-center w-full min-h-full-[40vh]"> 
            <div className="max-w-6xl w-full px-6 py-16 md:py-24 mx-auto"> 
              <div className="flex flex-col items-center text-center"> 
                {/* Texte principal */}
                <div className="md:w mb-12 md:mb-0">
                  <motion.h1
                      initial={{ opacity: 0, y: -150 }}
                      transition={{ duration: 1 }}
                whileInView={{ opacity: 1, y: 0 }}

                      className="text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-6xl font-bold text-gray-800 leading-snug mb-12 text-center"
                      >
                      Plonge dans le monde magique des <span className="text-pink-500">cartoons !</span> 
                  </motion.h1>

                  <motion.p 
                      initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}

                      transition={{ duration: 1 }}
                      className="text-sm sm:text-base md:text-lg text-gray-600 mb-12 text-center">

                    Retrouve tes héros préférés, découvre de nouvelles aventures et revis les plus beaux souvenirs d'enfance.
                    <br></br>Des milliers de dessins animés et séries à portée de clic – pour petits et grands rêveurs 
                  </motion.p>
                  <div className="flex space-x-4 justify-center flex-wrap gap-3">
                    <motion.button 
                      
                      initial={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.1 }}
                whileInView={{ opacity: 1, y: 0 }}

                      className="
                        bg-pink-500 text-white 
                        px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 
                        text-sm sm:text-base md:text-lg
                        rounded-full 
                        hover:bg-pink-600 
                        transition-all
                        whitespace-nowrap
                        min-w-[120px] sm:min-w-[140px] md:min-w-[160px]
                      ">
                      Commencer maintenant
                    </motion.button>
                    <motion.button 
                      onClick={() => {
                        const el = document.getElementById("FAQSection");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}

                      transition={{ duration: 0.1 }}
                      className="
                        border border-pink-500 text-pink-500 
                        px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 
                        text-sm sm:text-base md:text-lg
                        rounded-full 
                        hover:bg-pink-100 
                        transition-all
                        whitespace-nowrap
                        min-w-[120px] sm:min-w-[140px] md:min-w-[160px]
                      ">
                      En savoir plus
                    </motion.button>
                  </div>
              </div>
        
            </div>
          </div>
        </div>

        {/* Images décoratives */}
        <div className="relative w-full mt-auto">
          <motion.img 
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 150 }}
            transition={{ duration: 1.5 }}

            src={pink} 
            alt="fleurs roses" 
            className="w-full opacity-70 object-fill "
            style={{ height: '30vh', maxHeight: '300px' }}
          />
          <motion.img 
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 3 }}
            src={violet} 
            alt="fleurs violettes" 
            className="absolute bottom-0 left-0 w-full object-fill "
            style={{ height: '30vh', maxHeight: '300px' }}
          />
          
        </div>

      </section>
    );
}
export default  HeroSection;