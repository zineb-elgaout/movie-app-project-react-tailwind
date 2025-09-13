import React from "react";
import Footer from "../../Layouts/public/Footer";
import ContactForm from "../../components/public/ContactForm";
import Navbar from "../../Layouts/public/Navbar";
export default function Contact (){
    const ShowMenu = false;
    return (
        <div id="contact">
        <Navbar ShowMenu= {ShowMenu}/>
        <ContactForm />
        <Footer />
        </div>
    );
}