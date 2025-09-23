import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiLogOut, FiMenu, FiX,  FiVideo,  FiInfo} from 'react-icons/fi';
import { FaChartBar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import profil from '../../../public/vite.svg';
import { getUserProfile } from '../../../services/userService';
import {logout} from '../../../services/authService';

function EditorSideBar() {
 
  const nom = getUserProfile()?.lastName || '';
  const prenom = getUserProfile()?.firstName || '';
  const email = getUserProfile()?.email || ''; 
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(collapsed => !collapsed);
  };
  
  const sidebarStyle = `relative h-screen flex flex-col transition-all duration-300  ${
    collapsed ? 'w-18' : 'w-64'
  } bg-gray-900 border border-r-gray-800 shadow-lg`;

  const linkStyle = ({ isActive }) => `
    flex ${collapsed ? 'flex-col items-center' : 'flex-row items-center'} 
    w-full p-1 rounded-full transition-all 
    ${isActive 
      ? 'text-white' 
      : 'text-gray-300'
    }
    ${collapsed ? 'space-y-1' : 'space-x-3'} 
  `;

  const iconContainerStyle = (isActive) => `
    flex items-center justify-center 
    ${collapsed ? 'w-10 h-10' : 'w-8 h-8'} 
    rounded-r-full rounded-t-full transition-all
    ${isActive 
      ? 'bg-gradient-to-r from-indigo-500 to-purple-600' 
      : 'hover:bg-gray-700/50'
    }
  `;

  const iconStyle = (isActive) => `
    ${isActive ? 'text-white' : 'text-gray-300'}
    ${collapsed ? 'text-lg' : 'text-sm'}
  `;

  const textStyle = `
    ${collapsed ? 'text-xs mt-1' : 'text-sm'}
    font-medium text-center 
  `;

  // Données de navigation pour éviter la répétition
  const navItems = [
    { to: "/editor/dashboard", icon: FaChartBar, text: "Tableau de bord" },
    { to: "/editor/categories", icon: FiVideo, text: "Catégories" },
    { to: "/editor/faq", icon: FiInfo, text: "FAQ" },
  ];

  return (
    <div className={sidebarStyle}>
      {/* Section Profil */}
      <div className={`p-4 border-b border-gray-800 ${collapsed ? 'flex flex-col items-center' : ''}`}>
        {collapsed ? (
          <>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={toggleSidebar} 
              className="p-2 rounded-full hover:bg-gray-700/50 mb-3 text-gray-300"
            >
              <FiMenu size={18} />
            </motion.button>
            <motion.div whileHover={{ scale: 1.05 }} className="relative">
              <img 
                src={profil} 
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover shadow-md "
              />
            </motion.div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <motion.div whileHover={{ scale: 1.05 }} className="relative">
                  <img 
                    src={profil}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover shadow-md"
                  />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-white">{nom} {prenom}</h3>
                  <p className="text-xs text-gray-400">{email}</p>
                </div>
              </div>
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={toggleSidebar} 
                className="p-2 rounded-full hover:bg-gray-700/50 text-gray-300"
              >
                <FiX size={18} />
              </motion.button>
            </div>
            <div className="flex space-x-2 mt-3 pt-3">
              <NavLink 
                to="/editor/profil" 
                className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1 rounded-full flex-1 text-center transition-colors"
              >
                Profil
              </NavLink>
              <NavLink 
                to="/editor/settings" 
                className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1 rounded-full flex-1 text-center transition-colors"
              >
                Paramètres
              </NavLink>
            </div>
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {!collapsed && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mt-2 mb-2"
          >
            Navigation
          </motion.p>
        )}
        
        {navItems.map((item) => (
          <motion.div key={item.to} whileHover={{ scale: collapsed ? 1.05 : 1.02 }}>
            <NavLink to={item.to} className={linkStyle}>
              {({ isActive }) => (
                <>
                  <div className={iconContainerStyle(isActive)}>
                    <item.icon className={iconStyle(isActive)} />
                  </div>
                  {!collapsed && <span className={textStyle}>{item.text}</span>}
                </>
              )}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Déconnexion */}
      <div className="p-2">
        <NavLink to="/logout" onClick={logout}>
          {({ isActive }) => (
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`${linkStyle({ isActive })}`}
            >
              <div className={iconContainerStyle(isActive)}>
                <FiLogOut className={iconStyle(isActive)} />
              </div>
              {!collapsed && <span className={textStyle}>Déconnexion</span>}
            </motion.button>
          )}
        </NavLink>
      </div>
    </div>
  );
}

export default EditorSideBar;