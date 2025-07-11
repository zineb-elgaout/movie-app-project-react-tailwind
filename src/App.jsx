// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/public/Home';
import Contact from "./pages/public/Contact";
import Policy from "./pages/public/Policy";
import Dashboard from './pages/admin/Dashboard';
import Categories from './pages/admin/Categories';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </Router>
  );
}

export default App;
