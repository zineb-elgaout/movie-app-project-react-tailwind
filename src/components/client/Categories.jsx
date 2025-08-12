const Categories = ({ categories }) => {
  return (
    <div className="mb-12 overflow-x-auto pb-4 hide-scrollbar">
      <div className="flex space-x-4 w-max px-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative bg-gray-800 rounded-xl p-5 w-48 hover:bg-gray-700 transition-all duration-300 hover:scale-105 cursor-pointer group"
          >
            <div className="space-y-2">
              <h3 className="font-medium text-white text-lg group-hover:text-white w-full block">
                {category.title}
              </h3>

              <p className="text-gray-400 text-sm line-clamp-2 py-2">
                {category.description}
              </p>

              {/* Bouton gris en bas à gauche */}
              <div className="absolute bottom-4 right-4">
                <button className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full hover:bg-gray-700">
                  {category.count} titres
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
