import React, { useState } from 'react';
import AdminHeader from "../../../components/admin-components/header";
import AdminSidebar from "../../../components/admin-components/sidebar";
import DashboardCards from "../../../components/admin-cards";
import MoodAnalysis from '../../../components/admin-components/mood-analysis';

const AdminDashboard: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('Dashboard'); // Track selected menu

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar selectedMenu={selectedMenu} onMenuClick={handleMenuClick} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-[260px]">
        <AdminHeader />
        <main className="p-4">
          <DashboardCards />

        </main>
        <MoodAnalysis />
      </div>
    </div>
  );
};

export default AdminDashboard;
