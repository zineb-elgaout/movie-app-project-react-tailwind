import { useState, useEffect, useCallback } from 'react';

const useSearch = (initialData = [], searchFields = []) => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(initialData);

  // Mise à jour des données initiales
  useEffect(() => {
    setData(initialData);
    setFilteredData(initialData);
  }, [initialData]);

  // Fonction de filtrage
  const filterData = useCallback((term) => {
    if (!term) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter(item => {
      return searchFields.some(field => {
        const fieldValue = String(item[field]).toLowerCase();
        return fieldValue.includes(term.toLowerCase());
      });
    });

    setFilteredData(filtered);
  }, [data, searchFields]);

  // Effet pour déclencher le filtrage
  useEffect(() => {
    filterData(searchTerm);
  }, [searchTerm, filterData]);

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
    filterData // Exporté pour un déclenchement manuel si nécessaire
  };
};

export default useSearch;