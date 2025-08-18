import React from "react";
import { motion } from "framer-motion";
import { HomeIcon,SparklesIcon, Squares2X2Icon,InformationCircleIcon} from '@heroicons/react/24/outline';

// Composants sections
import Footer from "../../Layouts/public/Footer";
import Navbar from "../../Layouts/public/Navbar";
import HeroSection from "../../components/public/HeroSection"
import VisionSection from "../../components/public/VisionSection";
import CategoriesSection from "../../components/public/CategoriesSection";
import FAQSection from "../../components/public/FAQSection";
import ScrollNav from "../../Layouts/public/ScrollNav";

const HomePage = () => {

   const sections = [
      { id: "nav", icon: <HomeIcon className="w-5 h-5" />, label: "Accueil" },
      { id: "vision", icon: <SparklesIcon className="w-5 h-5" />, label: "Notre vision" },
      { id: "categories", icon: <Squares2X2Icon className="w-5 h-5" />, label: "Catégories" },
      { id: "about", icon: <InformationCircleIcon className="w-5 h-5" />, label: "À propos" }
    ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-blue-100 font-sans">
      <ScrollNav sections={sections}/>
      <div style={{backgroundImage: `linear-gradient(rgba(0,0,0,95), rgba(0,0,0,0.8)), url('https://i.pinimg.com/originals/76/83/b3/7683b33f50192d98798befe66f2656d6.jpg')`, }}>
        <Navbar />
        <HeroSection />
      </div>
      <VisionSection />
      <CategoriesSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default HomePage;