import {user} from "../demo-data"

const DashboardHeader: React.FC = () => {
  return (
    <div
      className="relative bg-purple-500 text-white rounded-lg shadow-md h-72 flex items-end p-4"
      style={{
        backgroundImage: `url(${user.cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center">
        {/* Profile Picture */}
        <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-gray-300">
        <img
            src={user.avatar}
            alt={`${user.name}'s Profile`}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Name */}
        <h1 className="ml-4 text-2xl font-bold">{user.name}</h1>
      </div>
    </div>
  );
};

export default DashboardHeader;
