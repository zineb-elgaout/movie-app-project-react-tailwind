import NavBar from './NavBar';

const ClientLayout = ({ children }) => (
  <div className="flex h-screen bg-gray-900 overflow-hidden">
    <NavBar />
    <main className="flex-1 overflow-y-auto px-6 py-6 mt-12">
      {children}
    </main>
  </div>
);

export default ClientLayout;
