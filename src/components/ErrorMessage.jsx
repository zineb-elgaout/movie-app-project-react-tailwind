import React from "react";
import { ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function ErrorMessage({ 
  message = "Une erreur s'est produite. Veuillez réessayer.", 
  onDismiss 
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50 z-50">
      <div 
        className="relative p-6 pr-10 rounded-lg bg-white shadow-xl max-w-md w-full border border-indigo-100"
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <ExclamationCircleIcon className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-base font-semibold text-indigo-900 mb-1">
              Erreur système
            </h3>
            <p className="text-sm text-gray-700">
              {message}
            </p>
            
          </div>
        </div>
        
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="absolute top-4 right-4 p-1 rounded-md hover:bg-indigo-50 transition-colors"
            aria-label="Fermer"
          >
            <XMarkIcon className="h-5 w-5 text-indigo-400" />
          </button>
        )}
      </div>
    </div>
  );
}