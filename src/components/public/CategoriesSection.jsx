import React from "react";
import { motion } from "framer-motion";
import nickelodeon from '../../assets/public/images/nickelodeon.jpg';
import cartoon  from '../../assets/public/images/cartoon.jpg';
import gibli from '../../assets/public/images/gibli.webp';
import disney from '../../assets/public/images/disney.webp';
import CartoonCard from "../ui/CartoonCard";
import ScrollNav from "../../Layouts/public/ScrollNav";

export default function CategoriesSection(){
    
const categories = [
    { id: 1, title: "Aventures Animées", description: "Plongez dans des univers colorés où héros courageux et créatures fantastiques vous emmènent dans des quêtes extraordinaires."},
    { id: 2, title: "Mondes Fantastiques", description: "Explorez des royaumes enchantés peuplés de créatures magiques et de paysages oniriques." },
    { id: 3, title: "Rêves Ghibli", description: "Un voyage magique au cœur de l’imagination japonaise, avec Chihiro, Totoro et bien plus encore." },
    { id: 4, title: "Classiques Intemporels", description: "Redécouvrez les films d'animation qui ont marqué des générations et continuent de captiver petits et grands." }, 
]
    return (
        
        <section id="categories" className="relative bg-black py-20 overflow-hidden">

        {/* Effets d'arrière-plan */}
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-5">
                <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gray-500 rounded-full filter blur-[100px]"></div>
                <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-purple-500 rounded-full filter blur-[100px]"></div>
            </div>
        </div>

        {/* Contenu */}
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
                Nos <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">Catégories</span>
            </h2>
            <p className=" text-lg text-gray-400 max-w-2xl ">
                Parcourez notre vaste collection organisée pour tous les âges et toutes les préférences.
            </p>
            </motion.div>
            {/* Grille de 4 catégories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <CartoonCard  title="Disney Classics" subtitle="Années 90-2000" image={disney}  />
            <CartoonCard  title="Studio Ghibli" subtitle="Chefs-d'œuvre japonais" image={gibli} />
            <CartoonCard  title="Cartoon Network" subtitle="Année 2000" image={cartoon} />
            <CartoonCard  title="Nickelodeon" subtitle="Émissions cultes" image={nickelodeon} />
            
            </div>
        </div>
        </section>
    );
}