// Dashboard.js
import { useState } from 'react';
import Sidebar from "../../Layouts/admin/Sidebar";
import Topbar from "../../Layouts/admin/Topbar";
import DashboardContent from "./DashboardContent";
import AdminLayout from '../../Layouts/admin/AdminLayout';

function Dashboard() {
  

  return (
    <AdminLayout>
        <DashboardContent />
    </AdminLayout>
  );
}

export default Dashboard;