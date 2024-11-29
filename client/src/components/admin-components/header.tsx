import React from 'react';
import { Search, Bell, Settings, Moon, Globe } from 'lucide-react';

const AdminHeader: React.FC = () => {
  return (
    <header
      className="flex items-center justify-between px-6 py-4 bg-cover bg-center text-white shadow-md"
      style={{
        backgroundImage: 'url("/headerBG1.jpg")', // Replace with your background image path
      }}
    >
      {/* Search Bar */}
      <div className="flex items-center bg-white text-gray-700 rounded-md px-3 w-1/3">
        <Search className="w-5 h-10 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="ml-3 w-full border-none outline-none focus:ring-0 text-sm"
        />
      </div>

      {/* Icons and Profile */}
      <div className="flex items-center space-x-6">
        {/* Language Selector */}
        <Globe className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        {/* Dark Mode Toggle */}
        <Moon className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        {/* Notification */}
        <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        {/* Settings */}
        <Settings className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        {/* User Avatar */}
        <div className="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-sm font-semibold">John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
