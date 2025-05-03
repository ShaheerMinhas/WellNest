import { Link } from "react-router-dom";
import { User, Key, Image } from "lucide-react"; // Import icons
import AssessmentsList from "../../../containers/assessments-list";

const Settings: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Left Menu: AssessmentsList */}
      <aside className="w-72 bg-white shadow-md">
        <AssessmentsList />
      </aside>
      {/* Right Side: Settings */}
      <div className="w-4/5 bg-gray-50 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Settings</h2>
        <div className="space-y-6">
          {/* Change Username */}
          <div className="flex items-center space-x-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <User className="w-8 h-8 text-blue-500" />
            <Link
              to="/settings/change-username"
              className="text-lg font-semibold text-gray-800 hover:underline"
            >
              Change Username
            </Link>
          </div>

          {/* Change Password */}
          <div className="flex items-center space-x-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Key className="w-8 h-8 text-green-500" />
            <Link
              to="/settings/change-password"
              className="text-lg font-semibold text-gray-800 hover:underline"
            >
              Change Password
            </Link>
          </div>

          {/* Change Picture */}
          <div className="flex items-center space-x-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Image className="w-8 h-8 text-yellow-500" />
            <Link
              to="/settings/change-picture"
              className="text-lg font-semibold text-gray-800 hover:underline"
            >
              Change Picture
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
