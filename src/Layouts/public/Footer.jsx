import React from "react";
import { FaInstagram, FaTwitter, FaYoutube, FaFacebook } from 'react-icons/fa';
import {motion} from 'framer-motion';
import { Link, useLocation, useNavigate } from "react-router-dom";

const NAVIGATION_LINKS = [
  { label: "Accueil", target: "nav" },
  { label: "Notre vision", target: "vision" },
  { label: "Catégories", target: "categories" },
  { label: "À propos", target: "about" },
];

const LEGAL_LINKS = [
  { label: "Confidentialité", href: "#" },
  { label: "Conditions d'utilisation", href: "#" },
  { label: "Préférences de cookies", href: "#" },
];

const SOCIAL_LINKS = [
  { icon: FaFacebook, href: "#", ariaLabel: "Facebook" },
  { icon: FaInstagram, href: "#", ariaLabel: "Instagram" },
  { icon: FaTwitter, href: "#", ariaLabel: "Twitter" },
  { icon: FaYoutube, href: "#", ariaLabel: "YouTube" },
];

export default function Footer() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigation = (event, targetId) => {
        event.preventDefault();
        if (location.pathname !== "/") {
            navigate("/", { replace: false });
            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100);
            return;
        }

        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

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
                {NAVIGATION_LINKS.map((link) => (
                    <li key={link.target}>
                        <a
                            href={`#${link.target}`}
                            onClick={(event) => handleNavigation(event, link.target)}
                            className="hover:text-pink-400 transition"
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
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
                {SOCIAL_LINKS.map((social) => {
                    const Icon = social.icon;
                    return (
                        <a
                            key={social.ariaLabel}
                            href={social.href}
                            aria-label={social.ariaLabel}
                            className="text-gray-400 hover:text-pink-400 transition text-xl"
                        >
                            <Icon />
                        </a>
                    );
                })}
                </div>
                
            </motion.div>
            </div>
            
            <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="mb-4 md:mb-0">
                © {new Date().getFullYear()} ToonTime. Tous droits réservés.
            </div>
            <div className="flex space-x-6">
                {LEGAL_LINKS.map((link) => (
                    <a key={link.label} href={link.href} className="hover:text-pink-400 transition">
                        {link.label}
                    </a>
                ))}
            </div>
            </div>
        </div>
        </footer>
    );
}