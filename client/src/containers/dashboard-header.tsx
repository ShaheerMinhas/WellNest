interface DashboardHeaderProps {
  Name: string; // Name prop for dynamic input
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ Name }) => {
  // Function to generate initials from the name
  const getInitials = (name: string) => {
    const nameParts = name.split(" "); // Split the name by spaces
    return nameParts.map((part) => part.charAt(0).toUpperCase()).join(""); // Get the first character of each part and join
  };

  const initials = getInitials(Name); // Generate initials

  return (
    <div className="relative bg-purple-500 text-white rounded-lg p-6 shadow-md">
      {/* Dynamic initials display */}
      <div className="absolute top-4 left-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-xl font-bold">
        {initials}
      </div>
      {/* Dynamic Name */}
      <h1 className="ml-20 mt-4 text-2xl">{Name}</h1>
    </div>
  );
};

export default DashboardHeader;
