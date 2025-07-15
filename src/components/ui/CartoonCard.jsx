import {motion} from "framer-motion";

function CartoonCard ({title,subtitle,image}){

    return (
        <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative rounded-xl overflow-hidden h-80 group"
            >
                <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/30 to-transparent backdrop-blur-sm px-4 py-3 ">
                    <h3 className="text-xl font-bold text-white drop-shadow-md">{title}</h3>
                    <p className="text-sm text-white drop-shadow-sm">{subtitle}</p>
                </div>
        </motion.div>
    );

}
export default CartoonCard;