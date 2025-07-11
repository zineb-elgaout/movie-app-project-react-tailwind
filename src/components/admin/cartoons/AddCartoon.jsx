import React, {useEffect, useState} from "react";
import { addCartoon } from "../../../../services/cartoonService";
import { title } from "framer-motion/client";

export default function AddCartoon (){

    const [formData , setFormData] = useState ({
        id:'',
        title:'',
        mainCaracter:'',
        description : '', 
        year:'', 
        categoryId:'',
        image: null,
        creator:''
    })

    const [isSbmitting , setIsSubmitting] = useState(false);
    const formRef = useRef();

    //gestion des cliques exterieur 



    return (

        <section>
        </section>
    )
}