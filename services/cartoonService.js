const API_URL = "https://localhost:7274/api/Cartoons";

export const getAllCartoons = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Erreur lors de la récupération des cartoons");
  return await response.json();
};

export const getCartoonById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Cartoon non trouvé");
  return await response.json();
};

export const createCartoon = async (cartoon, token) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cartoon),
  });

  if (!response.ok) throw new Error("Erreur création cartoon");
  return await response.json();
};

export const updateCartoon = async (id, cartoon, token) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cartoon),
  });

  if (!response.ok) throw new Error("Erreur mise à jour cartoon");
};

export const deleteCartoon = async (id, token) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Erreur suppression cartoon");
};
