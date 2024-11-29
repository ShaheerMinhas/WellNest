import { useState } from "react";
import { RefreshCw } from "lucide-react"; // Import reload icon

interface DashboardHeaderProps {
  Name: string; // Name prop for dynamic input
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ Name }) => {
  // State to track the current background index
  const [backgroundIndex, setBackgroundIndex] = useState(1);

  // Function to generate initials from the name
  const getInitials = (name: string) => {
    const nameParts = name.split(" "); // Split the name by spaces
    return nameParts.map((part) => part.charAt(0).toUpperCase()).join(""); // Get the first character of each part and join
  };

  const initials = getInitials(Name); // Generate initials

  // Function to handle background cycling
  const cycleBackground = () => {
    setBackgroundIndex((prevIndex) => (prevIndex % 5) + 1); // Cycle through 1 to 5
  };

  return (
    <div
      className="relative bg-purple-500 text-white rounded-lg p-6 shadow-md h-64"
      style={{
        backgroundImage: `url('/headerBG${backgroundIndex}.jpg')`, // Dynamically set the background image
        backgroundSize: "cover", // Cover the entire div
        backgroundPosition: "center", // Center the image
      }}
    >
      {/* Dynamic initials display */}
      <div className="absolute top-4 left-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-xl font-bold">
        {initials}
      </div>

      {/* Dynamic Name */}
      <h1 className="ml-20 mt-4 text-2xl text-bold">{Name}</h1>

      {/* Reload Icon */}
      <button
        onClick={cycleBackground}
        className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        title="Reload Background"
      >
        <RefreshCw className="w-6 h-6 text-gray-800" />
      </button>
    </div>
  );
};

export default DashboardHeader;
