import React from "react";
import {motion} from "framer-motion";

export default function Header ({header}){
    return (
        <div className="mb-12 group">
            <div className="flex items-end gap-4 mb-4">
                <h1 className="text-4xl md:text-5xl font-light text-gray-400 dark:text-gray-200 tracking-tight">
                {header.prefix}
                <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 ml-2">
                    {header.title}
                </span>
                </h1>
                <div className="h-0.5 flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 mb-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                {header.subtitle}
            </p>
        </div>
    )
}