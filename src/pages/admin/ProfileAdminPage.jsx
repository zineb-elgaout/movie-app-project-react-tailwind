import { useState } from 'react';
import AdminLayout from '../../Layouts/admin/AdminLayout';
import Profile from '../../components/public/Profile';

const ProfileAdminPage = () => {
  return (
    <AdminLayout>
      <Profile />
    </AdminLayout>  
  );
};

export default ProfileAdminPage;