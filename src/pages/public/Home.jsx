import React from "react";
import { motion } from "framer-motion";
import { HomeIcon,SparklesIcon, Squares2X2Icon,InformationCircleIcon} from '@heroicons/react/24/outline';

// Composants sections
import Footer from "../../Layouts/public/Footer";
import Navbar from "../../Layouts/public/Navbar";
import VisionSection from "../../components/public/VisionSection";
import CategoriesSection from "../../components/public/CategoriesSection";
import FAQSection from "../../components/public/FAQSection";
import HeroSection from "../../components/public/HeroSection";

const HomePage = () => {


  return (
    <div className="min-h-screen bg-black font-sans">
        <Navbar />
        <HeroSection></HeroSection>
      <VisionSection />
      <CategoriesSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default HomePage;