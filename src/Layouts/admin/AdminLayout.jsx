import Sidebar from './Sidebar';
import Topbar from './Topbar';

const AdminLayout = ({ children }) => (
  <div className="flex h-screen bg-gray-900 overflow-hidden">
    <Sidebar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <Topbar />
      <main className="flex-1 overflow-y-auto pxy-6 ">
        {children}
      </main>
    </div>
  </div>
);
export default AdminLayout;