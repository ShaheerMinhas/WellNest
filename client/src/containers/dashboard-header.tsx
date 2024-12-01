const DashboardHeader: React.FC = () => {
  return (
    <div className="relative bg-purple-500 text-white rounded-lg p-6 shadow-md">
      <div className="absolute top-4 left-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-xl font-bold">
        JD
      </div>
      <h1 className="ml-20 mt-4 text-2xl">John Doe</h1>
    </div>
  );
};

export default DashboardHeader;
