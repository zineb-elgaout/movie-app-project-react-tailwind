import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { getUserProfile } from "../../../services/userService"; // chemin selon ton projet

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const profile = getUserProfile();
    setUser(profile);

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black to-transparent px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-white">ToonTime</h1>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/toontime" className="text-white hover:text-gray-300">Accueil</Link>
          <Link to="/Favoris" className="text-white hover:text-gray-300">Favoris</Link>
          <a href="#" className="text-white hover:text-gray-300">Découvrir</a>
        </div>

        <div className="relative flex items-center space-x-4" ref={menuRef}>
          <button className="text-white hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Profil + dropdown */}
          <div
            onClick={() => setOpenMenu(!openMenu)}
            className="w-auto h-8 flex items-center justify-center space-x-2 px-2 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-70 cursor-pointer"
          >
            <FaUser className="text-white" />
            {user && <span className="text-white text-sm font-medium">{user.firstName}</span>}
          </div>

          {openMenu && user && (
            <div className="absolute top-2 right-0 mt-10 w-60 bg-black rounded-lg shadow-lg py-2 z-50 flex flex-col">
              {/* Infos utilisateur */}
              <div className="px-4 py-3 border-b border-gray-900">
                <p className="text-white font-semibold">{user.firstName} {user.lastName}</p>
                <p className="text-gray-400 text-sm truncate">{user.email}</p>
              </div>

              <Link
                to="/profil"
                className="px-4 py-2 text-white hover:bg-gray-900 rounded-md"
                onClick={() => setOpenMenu(false)}
              >
                Profil
              </Link>
              <Link
                to="/settings"
                className="px-4 py-2 text-white hover:bg-gray-900 rounded-md"
                onClick={() => setOpenMenu(false)}
              >
                Paramètres
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white hover:bg-gray-900 rounded-md text-left"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
