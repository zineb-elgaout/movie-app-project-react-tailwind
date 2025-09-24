import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/public/Home";
import Contact from "./pages/public/Contact";
import Policy from "./pages/public/Policy";
import Dashboard from "./pages/admin/Dashboard";
import Categories from "./pages/admin/Categories";
import Users from "./pages/admin/UsersPage";
import CategoryContent from "./pages/admin/CategoryContent";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import NotFound from "./pages/public/NotFound";
import LandingPage from "./pages/client/LandingPage";
import CartoonDetailPage from "./components/client/CartoonDetailPage";
import FAQ from "./pages/admin/FaqPage";
import ProtectedRoute from "./components/ProtectedRoute";
import FavoritePage from "./pages/client/FavoritePage";
import Settings from "./pages/common/Settings";
import Profile from "./pages/common/Profile"; 
import EditorDashboard from "./pages/editor/EditorDashboard";

// Layouts
import AdminLayout from "./Layouts/admin/AdminLayout";
import EditorLayout from "./Layouts/editor/EditorLayout";
import ClientLayout from "./Layouts/client/ClientLayout";

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

        
        {/* Client */}
        <Route
          path="/client/profil"
          element={
            <ProtectedRoute rolesAllowed={["Client"]}>
              <ClientLayout>
                <Profile />
              </ClientLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/settings"
          element={
            <ProtectedRoute rolesAllowed={["Client"]}>
              <ClientLayout>
                <Settings />
              </ClientLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/toontime"
          element={
            <ProtectedRoute rolesAllowed={["Client"]}>
              <LandingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favoris"
          element={
            <ProtectedRoute rolesAllowed={["Client"]}>
              <FavoritePage />
            </ProtectedRoute>
          }
        />
        <Route path="/cartoon/:id" element={ <ProtectedRoute rolesAllowed={["Client"]}> <CartoonDetailPage />  </ProtectedRoute> } />


        {/* Editor */}
        <Route
          path="/editor/profil"
          element={
            <ProtectedRoute rolesAllowed={["Editor"]}>
              <EditorLayout>
                <Profile />
              </EditorLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor/settings"
          element={
            <ProtectedRoute rolesAllowed={["Editor"]}>
              <EditorLayout>
                <Settings />
              </EditorLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor/dashboard"
          element={
            <ProtectedRoute rolesAllowed={["Editor"]}>
              <EditorDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/editor/faq" element={ <ProtectedRoute rolesAllowed={["Editor"]}> <EditorLayout> <FAQ /> </EditorLayout> </ProtectedRoute> } /> 
        <Route path="/editor/categories" element={ <ProtectedRoute rolesAllowed={["Editor"]}><EditorLayout> <Categories /> </EditorLayout> </ProtectedRoute> } /> 
        <Route path="/editor/category/:id" element={ <ProtectedRoute rolesAllowed={["Editor"]}> <EditorLayout> <CategoryContent /> </EditorLayout>  </ProtectedRoute> } />

        

        {/* Admin */}
        <Route
          path="/admin/profil"
          element={
            <ProtectedRoute rolesAllowed={["Admin"]}>
              <AdminLayout>
                <Profile />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute rolesAllowed={["Admin"]}>
              <AdminLayout>
                <Settings />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute rolesAllowed={["Admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/users" element={ <ProtectedRoute rolesAllowed={["Admin"]}><AdminLayout> <Users /></AdminLayout></ProtectedRoute> } />
        <Route path="/admin/categories" element={ <ProtectedRoute rolesAllowed={["Admin"]}> <AdminLayout> <Categories /> </AdminLayout> </ProtectedRoute> } /> 
        <Route path="/admin/faq" element={ <ProtectedRoute rolesAllowed={["Admin"]}> <AdminLayout> <FAQ /> </AdminLayout> </ProtectedRoute> } /> 
        <Route path="/admin/category/:id" element={ <ProtectedRoute rolesAllowed={["Admin"]}> <AdminLayout> <CategoryContent /> </AdminLayout>  </ProtectedRoute> } />

      </Routes>
    </Router>
  );
}

export default App;
