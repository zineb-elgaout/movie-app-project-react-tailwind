import Navbar from "../../Layouts/public/Navbar";
import Footer from "../../Layouts/public/Footer";
import React from 'react';
import {motion} from 'framer-motion';
import PrivacyPolicy from "../../components/public/PrivacyPolicy";
export default function Policy (){
    return (
        <div id="contact">
        <Navbar />
        <PrivacyPolicy />
        <Footer />
        </div>
    );
}