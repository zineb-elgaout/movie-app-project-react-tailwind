// utils/auth.js
export function getTokenFromCookie() {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
  if (!tokenCookie) return null;
  return tokenCookie.split("=")[1];
}

// Décoder le JWT pour récupérer payload
export function decodeToken() {
  const token = getTokenFromCookie();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload; // contient email, role, etc.
  } catch (err) {
    console.error("Erreur lors du décodage du token :", err);
    return null;
  }
}
