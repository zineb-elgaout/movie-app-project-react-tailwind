

const Categories = ({ categories }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition cursor-pointer group"
          >
            
            <h3 className="font-semibold text-lg">{category.title}</h3>
            <p className="text-gray-400 text-sm">{category.description}</p>
            <p className="text-gray-500 text-xs mt-2">{category.count} titles</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;