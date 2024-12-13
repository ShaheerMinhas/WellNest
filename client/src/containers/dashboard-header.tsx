import React from 'react';

interface DashboardHeaderProps {
  Name: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ Name }) => {
  // Extract the initials from the Name prop
  const getInitials = (name: string) => {
    const nameParts = name.split(' ');
    const initials = nameParts.map((part) => part.charAt(0).toUpperCase()).join('');
    return initials;
  };

  const initials = getInitials(Name);

  return (
    <div className="relative bg-purple-500 text-white rounded-lg p-6 shadow-md">
      {/* Display dynamic initials */}
      <div className="absolute top-4 left-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-xl font-bold">
        {initials}
      </div>
      {/* Dynamic Name */}
      <h1 className="ml-20 mt-4 text-2xl">{Name}</h1>
    </div>
  );
};

export default DashboardHeader;
