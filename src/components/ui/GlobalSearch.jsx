import { FiSearch, FiX } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';

const GlobalSearch = ({
  placeholder = "Rechercher...",
  delay = 300,
  onSearch,
  className = "",
  initialValue = "",
  showClear = true
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const timeoutRef = useRef(null);

  // Gestion du délai pour éviter de déclencher trop de recherches
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onSearch(searchTerm);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchTerm, delay, onSearch]);

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className={`relative   ${className}`} style={{ width: '50%'}} >
      <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${isFocused ? 'text-purple-500' : 'text-gray-400'}`}>
        <FiSearch size={18} />
      </div>
      
      <input
        type="text"
        placeholder={placeholder}
        className={`pl-10 pr-8 py-2.5 w-full text-white bg-gray-800 border ${isFocused ? 'border-purple-500 ring-2 ring-purple-500/30' : 'border-gray-700'} rounded-full focus:outline-none transition-all duration-200`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      
      {showClear && searchTerm && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
          aria-label="Effacer la recherche"
        >
          <FiX size={18} />
        </button>
      )}
    </div>
  );
};

export default GlobalSearch;