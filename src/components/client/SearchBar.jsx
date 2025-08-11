

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-8">
      <div className="relative max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search for movies, TV shows, categories..."
          className="w-full bg-gray-900 rounded-full py-3 px-6 pl-12 focus:outline-none focus:ring-2 focus:ring-purple-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute left-4 top-3.5 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;