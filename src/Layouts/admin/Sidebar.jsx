import  { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {FiUser, FiLogOut, FiMenu, FiX, FiEdit, FiVideo,  FiInfo, FiFilm} from 'react-icons/fi';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { motion } from 'framer-motion';
import profil from '../../../public/vite.svg';
import { getUserProfile } from '../../../services/userService';
import {logout} from '../../../services/authService';

function Sidebar() {
 
  const nom = getUserProfile()?.lastName || '';
  const prenom = getUserProfile()?.firstName || '';
  const email = getUserProfile()?.email || ''; 
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const sidebarStyle = `relative h-screen flex flex-col transition-all duration-300  ${
    collapsed ? 'w-24' : 'w-64'
  } bg-gray-900 border border-r-gray-800 shadow-lg`;

  

  const linkStyle = ({ isActive }) => `
  flex  ${collapsed ? 'flex-col items-center' : 'flex-row items-center'} 
  w-full p-3 rounded-lg transition-all 
  ${isActive 
    ? 'bg-gradient-to-r from-pink-500/10 to-purple-600/10 text-white' 
    : 'text-gray-300'
  }
  ${collapsed ? 'space-y-1' : 'space-x-3'} 
`;

  const iconStyle = (isActive) => `
    ${isActive ? 'text-white' : 'text-gray-400'}
    ${collapsed ? 'text-xl mb-1' : 'text-lg mr-3'}
  `;

  const textStyle = `
  ${collapsed ? 'text-xs' : 'text-sm'}
    font-small text-center 
` ;

  return (
    <div 
      className={sidebarStyle} 
    >
      {/* Section Profil */}
      <div className={`p-4 border-b border-gray-900 ${collapsed ? 'flex flex-col items-center' : ''}`}>
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
                className="w-10 h-10 rounded-full object-cover  shadow-md "
              />
            </motion.div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3 ">
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
                to="/profil" 
                className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1 rounded-full flex-1 text-center transition-colors"
              >
                Profil
              </NavLink>
              <NavLink 
                to="/settings" 
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
            className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mt-2 mb-2"
          >
            Navigation
          </motion.p>
        )}
        
        <motion.div whileHover={{ scale: collapsed ? 1.05 : 1.02 }}>
          <NavLink to="/dashboard" className={linkStyle}>
            <MdOutlineSpaceDashboard className={iconStyle(false)} />
            <span className={textStyle}>Dashboard</span>
          </NavLink>
        </motion.div>

        <motion.div whileHover={{ scale: collapsed ? 1.05 : 1.02 }}>
          <NavLink to="/categories" className={linkStyle}>
            <FiVideo className={iconStyle(false)} />
            <span className={textStyle}>Catégories</span>
          </NavLink>
        </motion.div>

        <motion.div whileHover={{ scale: collapsed ? 1.05 : 1.02 }}>
          <NavLink to="/cartoon" className={linkStyle}>
            <FiFilm className={iconStyle(false)} />
            <span className={textStyle}>Cartoons</span>
          </NavLink>
        </motion.div>

        <motion.div whileHover={{ scale: collapsed ? 1.05 : 1.02 }}>
          <NavLink to="/users" className={linkStyle}>
            <FiUser className={iconStyle(false)} />
            <span className={textStyle}>Utilisateurs</span>
          </NavLink>
        </motion.div>

        <motion.div whileHover={{ scale: collapsed ? 1.05 : 1.02 }}>
          <NavLink to="/editors" className={linkStyle}>
            <FiEdit className={iconStyle(false)} />
            <span className={textStyle}>Éditeurs</span>
          </NavLink>
        </motion.div>

        <motion.div whileHover={{ scale: collapsed ? 1.05 : 1.02 }}>
          <NavLink to="/FAQ" className={linkStyle}>
            <FiInfo className={iconStyle(false)} />
            <span className={textStyle}>FAQ</span>
          </NavLink>
        </motion.div>
      </nav>

      {/* Déconnexion */}
      <div className="p-2">
        <NavLink  to="/logout"  onClick={logout} >
          <motion.button 
            
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`${linkStyle({ isActive: false })}  hover:bg-gray-700/70`}
          >
            <FiLogOut className={iconStyle(false)} />
            {!collapsed && <span className={textStyle}>Déconnexion</span>}
          </motion.button>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;