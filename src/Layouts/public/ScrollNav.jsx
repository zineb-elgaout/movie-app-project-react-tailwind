import {motion} from 'framer-motion';
import React from 'react';

const ScrollNav = ({ sections }) => {
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 
               bg-gradient-to-t from-white/40 to-transparent backdrop-blur-md 
               rounded-full 
               p-1.5 md:p-2  
               flex flex-col items-center 
               space-y-4 md:space-y-5 
               m-2 
               w-10 h-auto md:w-12 
               ">
        {sections.map((s, i) => (
            <motion.button
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            key={i}
            onClick={() => handleScroll(s.id)}
            className="text-pink-300 hover:text-gray-500
                        text-base sm:text-lg 
                        p-0.5 
                        hover:scale-110
                        transition-transform duration-200"
            title={s.label}
            >
            {s.icon}
            </motion.button>
        ))}
    </div>
  );
};

export default ScrollNav;
