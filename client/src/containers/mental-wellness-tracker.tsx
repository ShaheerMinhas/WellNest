import ProgressCircle from "../components/shared/progress-circle";

const MentalWellnessTracker: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Mental Wellness Tracker</h2>
      <ProgressCircle progress={78} />
      <p className="mt-2 text-sm text-gray-500">See results and history</p>
    </div>
  );
};

export default MentalWellnessTracker;
