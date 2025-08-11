
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/public/Home';
import Contact from "./pages/public/Contact";
import Policy from "./pages/public/Policy";
import Dashboard from './pages/admin/Dashboard';
import Categories from './pages/admin/Categories';
import Users from './pages/admin/UsersPage';
import CategoryContent from './pages/admin/CategoryContent';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import ProfilePage from './pages/admin/ProfilePage';
import NotFound from './pages/public/NotFound';
import SettingsPage from './pages/admin/settings';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:id" element={<CategoryContent />} />
        <Route path="login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
