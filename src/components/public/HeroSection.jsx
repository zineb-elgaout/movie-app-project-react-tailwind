import React from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative h-screen-minus-nav flex flex-col bg-cover bg-center bg-no-repeat"
      
    >
      <div className="flex-grow flex items-center justify-center w-full px-6">
        <div className="max-w-5xl w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: -120 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-100 mb-6"
          >
            Plongez dans le monde des <span className="text-indigo-400">Cartoons</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-12"
          >
            Retrouve des dessins animés et séries cultes, immersifs et universels — accessibles à tous.
          </motion.p>

          <div className="flex justify-center flex-wrap gap-4">
            <Link
              to="/login">
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full sm:w-auto bg-indigo-400 text-white px-6 py-3 text-base sm:text-lg rounded-full hover:bg-indigo-500 transition"
            >
              Commencer maintenant
            </motion.div>
            </Link>

            <motion.button
              onClick={() => {
                const el = document.getElementById("FAQSection");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full sm:w-auto border border-indigo-400 text-indigo-400 px-6 py-3 text-base sm:text-lg rounded-full hover:bg-indigo-400 hover:text-white transition"
            >
              En savoir plus
            </motion.button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;