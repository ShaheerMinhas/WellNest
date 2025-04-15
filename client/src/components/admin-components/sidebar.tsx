import React from 'react';
import {
  Home,
  Users,
  ClipboardList,
  Calendar,
  BarChart2,
  Bell,
  Settings,
  UserPlus,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

interface AdminSidebarProps {
  selectedMenu: string;
  onMenuClick: (menu: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ selectedMenu, onMenuClick }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleMenuClick = (menu: string) => {
    onMenuClick(menu);

    // Navigate to the corresponding page
    if (menu === 'User Management') {
      navigate('/admin/employees'); // Navigate to /admin/employees
    } else if (menu === 'Dashboard') {
      navigate('/admin'); // Navigate to /admin/dashboard
    } else if (menu === 'Assessments') {
      navigate('/admin/assessments'); // Navigate to /admin/assessments
    } else if (menu === 'Activities') {
      navigate('/admin/activities'); // Navigate to /admin/activities
    } else if (menu === 'Feedback') {
      navigate('/admin/feedback'); // Navigate to feedback page
    
    // Navigate to /admin/report
    } else if (menu === 'Notify') {
      navigate('/admin/notify'); // Navigate to /admin/notify
    } else if (menu === 'Contact Professionals') {
      navigate('/admin/contact'); // Navigate to /admin/contact
    } else if (menu === 'Settings') {
      navigate('/admin/settings'); // Navigate to /admin/settings
    }
  };

  return (
    <aside className="pl-8 fixed top-0 left-0 h-full w-72 bg-white shadow-md z-50">
      {/* Logo */}
      <div className="p-6 text-2xl font-bold text-black-500 border-b">WellNest Admin</div>
      {/* Navigation Links */}
      <nav className="flex flex-col p-4 space-y-6">
        <a
          href="#"
          className={`flex items-center space-x-4 text-gray-700 hover:text-green-500 ${
            selectedMenu === 'Dashboard' ? 'text-green-500' : ''
          }`}
          onClick={() => handleMenuClick('Dashboard')}
        >
          <Home className="w-5 h-5" />
          <span className="font-semibold">Dashboard</span>
        </a>
        <a
          href="#"
          className={`flex items-center space-x-4 text-gray-700 hover:text-green-500 ${
            selectedMenu === 'User Management' ? 'text-green-500' : ''
          }`}
          onClick={() => handleMenuClick('User Management')}
        >
          <Users className="w-5 h-5" />
          <span className="font-semibold">User Management</span>
        </a>
        <a
          href="#"
          className={`flex items-center space-x-4 text-gray-700 hover:text-green-500 ${
            selectedMenu === 'Assessments' ? 'text-green-500' : ''
          }`}
          onClick={() => handleMenuClick('Assessments')}
        >
          <ClipboardList className="w-5 h-5" />
          <span className="font-semibold">Assessments</span>
        </a>
        <a
          href="#"
          className={`flex items-center space-x-4 text-gray-700 hover:text-green-500 ${
            selectedMenu === 'Activities' ? 'text-green-500' : ''
          }`}
          onClick={() => handleMenuClick('Activities')}
        >
          <Calendar className="w-5 h-5" />
          <span className="font-semibold">Activities</span>
        </a>
        <a
  href="#"
  className={`flex items-center space-x-4 text-gray-700 hover:text-green-500 ${
    selectedMenu === 'Feedback' ? 'text-green-500' : ''
  }`}
  onClick={() => handleMenuClick('Feedback')}
>
  <BarChart2 className="w-5 h-5" />
  <span className="font-semibold">Feedback</span>
</a>
        <a
          href="#"
          className={`flex items-center space-x-4 text-gray-700 hover:text-green-500 ${
            selectedMenu === 'Notify' ? 'text-green-500' : ''
          }`}
          onClick={() => handleMenuClick('Notify')}
        >
          <Bell className="w-5 h-5" />
          <span className="font-semibold">Notify</span>
        </a>
        <a
          href="#"
          className={`flex items-center space-x-4 text-gray-700 hover:text-green-500 ${
            selectedMenu === 'Contact Professionals' ? 'text-green-500' : ''
          }`}
          onClick={() => handleMenuClick('Contact Professionals')}
        >
          <UserPlus className="w-5 h-5" />
          <span className="font-semibold">Contact Professionals</span>
        </a>
        <a
          href="#"
          className={`flex items-center space-x-4 text-gray-700 hover:text-green-500 ${
            selectedMenu === 'Settings' ? 'text-green-500' : ''
          }`}
          onClick={() => handleMenuClick('Settings')}
        >
          <Settings className="w-5 h-5" />
          <span className="font-semibold">Settings</span>
        </a>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
