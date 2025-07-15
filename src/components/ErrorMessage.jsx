import React from "react";

export default function ErrorMessage({ message = "Une erreur s'est produite." }) {
  return (
    <div className="text-red-500 text-center py-8 px-4 bg-red-100 rounded-md shadow-sm max-w-xl mx-auto">
      <p className="text-sm md:text-base font-medium">{message}</p>
    </div>
  );
}