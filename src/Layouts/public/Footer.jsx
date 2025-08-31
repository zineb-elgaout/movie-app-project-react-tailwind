import React from "react";
import { FaGithub, FaInstagram, FaTwitter, FaYoutube, FaFacebook } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import {motion} from 'framer-motion';
import { Link } from "react-router-dom";


export default function Footer (){
    return (
        <footer className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
            <motion.div 
                
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}>
                <h3 className="text-xl font-bold mb-4">ToonTime</h3>
                <p className="text-sm text-gray-300 mb-4">Votre plateforme préférée pour redécouvrir les classiques et explorer les nouveautés de l'animation.</p>
            
            </motion.div>
            
            <motion.div 
                
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}>
                <h3 className="text-xl font-bold mb-4">Navigation</h3>
                <ul className="space-y-2 text-sm">
                <li><a href="#nav" className="hover:text-pink-400 transition">Accueil</a></li>
                <li><a href="#vision" className="hover:text-pink-400 transition">Notre vision</a></li>
                <li><a href="#categories" className="hover:text-pink-400 transition">Catégories</a></li>
                <li><a href="#about" className="hover:text-pink-400 transition">À  propos</a></li>
                </ul>
            </motion.div>
            
            <motion.div 
                
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}>
                <h3 className="text-xl font-bold mb-4">Contact</h3>
                <ul className="space-y-2 text-sm"><li>
                <Link to="/contact" className="hover:text-pink-400 transition">
                    Contact
                </Link>
                </li>
                <li><a href="mailto:contact@toontime.com" className="hover:text-pink-400 transition">contact@toontime.com</a></li>
                <li><a href="#" className="hover:text-pink-400 transition">+212 123456789</a></li>
                </ul>
            </motion.div>
            
            <motion.div 
                
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}>
                <h3 className="text-xl font-bold mb-4">Réseaux sociaux</h3>
                <p className="mb-4 text-sm text-gray-300">Reçois les dernières sorties et nos sélections spéciales chaque semaine !</p>
                    <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-pink-400 transition text-xl">
                    <FaFacebook />
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-400 transition text-xl">
                    <FaInstagram />
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-400 transition text-xl">
                    <FaTwitter />
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-400 transition text-xl">
                    <FaYoutube />
                </a>
                </div>
                
            </motion.div>
            </div>
            
            <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="mb-4 md:mb-0">
                © {new Date().getFullYear()} ToonTime. Tous droits réservés.
            </div>
            <div className="flex space-x-6">
                <a href="#" className="hover:text-pink-400 transition">Confidentialité</a>
                <a href="#" className="hover:text-pink-400 transition">Conditions d'utilisation</a>
                <a href="#" className="hover:text-pink-400 transition">Préférences de cookies</a>
            </div>
            </div>
        </div>
        </footer>
    );
}