import React from "react";
import plant from '../../assets/public/images/plant.png';
import ground from '../../assets/public/images/ground.png';
import moon from '../../assets/public/images/moon.png';
import house from '../../assets/public/images/house-dark.png';
import boy from '../../assets/public/images/boy.png';
import spark from '../../assets/public/images/spark.png';
import city from '../../assets/public/images/city.png';
import { motion } from "framer-motion";


export default function VisionSection (){
    return (
        <section id="vision" className="relative py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
            <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute top-0 right-0 w-[30vw] h-[60vh] bg-gradient-to-br from-pink-100 to-purple-100 rounded-full filter blur-[80px] opacity-30"
            />
            <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="absolute bottom-0 left-0 w-[20vw] h-[40vh] bg-gradient-to-br from-blue-50 to-cyan-100 rounded-full filter blur-[60px] opacity-30"
            />
        </div>

        {/* Content Container  */}
        <div className="relative max-w-6xl mx-auto px-6 flex flex-col lg:flex-row">
            {/* Text Content - Left Side */}
            <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:w-[55%] space-y-6 z-10 pr-8"
            >
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex items-center gap-4"
            >
                <div className="w-10 h-px bg-gradient-to-r from-pink-500 to-pink-600" />
                <span className="text-xs font-medium tracking-widest text-pink-500 uppercase">Notre Vision</span>
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
            >
                Réinventer l'expérience <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">des dessins animés</span>
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-base text-gray-600 leading-relaxed"
            >
                ToonTime fusionne technologie de pointe et héritage culturel pour offrir une plateforme où les classiques retrouvent leur éclat.
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="pt-6"
            >
                <div className="grid md:grid-cols-2 gap-6">
                {[
                    {
                    title: "Innovation Techno",
                    description: "Restauration et remasterisation 4K"
                    },
                    {
                    title: "Curateurs Experts",
                    description: "Spécialistes du patrimoine animé"
                    },
                    {
                    title: "Interface Adaptée",
                    description: "Pour tous les âges"
                    },
                    {
                    title: "Contenu Exclusif",
                    description: "Partenariats avec studios"
                    }
                ].map((item, index) => (
                    <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    className="border-l-2 border-pink-400 pl-3 py-1"
                    >
                    <h4 className="text-base font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    </motion.div>
                ))}
                </div>
            </motion.div>
            </motion.div>

            {/* Visual Content - Right Side (Compact) */}
            <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:w-[45%] relative h-[400px] lg:h-[500px] mt-10 lg:mt-0"
            >
            {/* Sky Background */}
            <div className="absolute inset-0 h-full w-full rounded-xl overflow-hidden">
                <img 
                src={house}
                alt="House" 
                className="w-full h-full object-cover object-right"
                />
            </div>

            {/* City Image */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute bottom-24 left-0 w-full rounded-xl"
            >
                <img src={city} alt="City" className="w-full" />
            </motion.div>

            {/* Boy Image */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute bottom-12 left-0 w-2/5 max-w-[200px]"
            >
                <img src={boy} alt="Boy" className="w-full" />
            </motion.div>

            {/* Spark Image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute top-6 left-6 w-12"
            >
                <img src={spark} alt="Spark" className="w-full" />
            </motion.div>

            {/* Ground Image */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute bottom-0 left-0 w-full "
            >
                <img src={ground} alt="Ground" className="w-full rounded-xl" />
            </motion.div>

            {/* Plant Image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute bottom-0 right-0 w-1/4 max-w-[150px]"
            >
                <img src={plant} alt="Plant" className="w-full rounded-xl" />
            </motion.div>

            {/* Moon Image */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="absolute top-4 right-4 w-1/5 max-w-[100px]"
            >
                <img src={moon} alt="Moon" className="w-full" />
            </motion.div>
            </motion.div>
        </div>
        </section>
    );
}