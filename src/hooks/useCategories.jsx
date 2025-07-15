import { useState, useEffect } from "react";
import { getAllCategories } from "../../services/categoryService";

export default function useCategories(autoFetch = true) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await getAllCategories();
      setCategories(res.data);
    } catch (err) {
      setError("Erreur lors du chargement des catégories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) fetchCategories();
  }, []);

  return { categories, loading, error, fetchCategories };
}
