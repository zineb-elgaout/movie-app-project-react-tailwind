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
import ProfileAdminPage from './pages/admin/ProfileAdminPage';
import NotFound from './pages/public/NotFound';
import SettingsPage from './pages/public/settings';
import LandingPage from './pages/client/LandingPage';
import CartoonDetailPage from './components/client/CartoonDetailPage';
import FAQ from './pages/admin/FaqPage';
import ProtectedRoute from './components/ProtectedRoute';
import FavoritePage from './pages/client/FavoritePage';
import ProfileClientPage from './pages/client/ProfileClientPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected */}
        <Route path="/profil" element={
          <ProtectedRoute rolesAllowed={[ "Client"]}>
            <ProfileClientPage />
          </ProtectedRoute>
        } />

        <Route path="/toontime" element={
          <ProtectedRoute rolesAllowed={["Client"]}>
            <LandingPage />
          </ProtectedRoute>
        } />

        <Route path="/Favoris" element={
          <ProtectedRoute rolesAllowed={["Client"]}>
            <FavoritePage />
          </ProtectedRoute>
        } />

        <Route path="/cartoon/:id" element={
          <ProtectedRoute rolesAllowed={["Client"]}>
            <CartoonDetailPage />
          </ProtectedRoute>
        } />

        {/* Admin */}
        <Route path="/profil" element={
          <ProtectedRoute rolesAllowed={[ "Admin",]}>
            <ProfileAdminPage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute rolesAllowed={["Admin"]}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/users" element={
          <ProtectedRoute rolesAllowed={["Admin"]}>
            <Users />
          </ProtectedRoute>
        } />
        <Route path="/categories" element={
          <ProtectedRoute rolesAllowed={["Admin", "Editor"]}>
            <Categories />
          </ProtectedRoute>
        } />
        <Route path="/FAQ" element={
          <ProtectedRoute rolesAllowed={["Admin"]}>
            <FAQ />
          </ProtectedRoute>
        } />
        <Route path="/category/:id" element={
          <ProtectedRoute rolesAllowed={["Admin", "Editor"]}>
            <CategoryContent />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute rolesAllowed={["Admin", "Editor"]}>
            <SettingsPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
