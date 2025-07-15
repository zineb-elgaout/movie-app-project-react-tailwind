import { useState, useEffect } from "react";
import { getAllCartoons } from "../../services/cartoonService";

export default function useCartoons(autoFetch = true) {
  const [cartoons, setCartoons] = useState([]);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const fetchCartoons = async () => {
    try {
      setLoading(true);
      const res = await getAllCartoons();
      setCartoons(res.data);
    } catch (err) {
      setError("Erreur lors du chargement des cartoons.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) fetchCartoons();
  }, []);

  return { cartoons, loading, error, fetchCartoons };
}
