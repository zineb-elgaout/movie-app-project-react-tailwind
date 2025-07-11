import Navbar from "../../Layouts/public/Navbar";
import Footer from "../../Layouts/public/Footer";
import React from 'react';
import {motion} from 'framer-motion';
import ContactForm from "../../components/public/ContactForm";
export default function Contact (){
    return (
        <div id="contact">
        <Navbar />
        <ContactForm />
        <Footer />
        </div>
    );
}