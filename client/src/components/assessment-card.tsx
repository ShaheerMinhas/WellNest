import { Link, useLocation } from 'react-router-dom';

interface AssessmentCardProps {
  title: string;
  description: string;
  rt: string; // Route for the assessment
  isCompleted: boolean; // New prop to check if the assessment is completed
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({
  title,
  description,
  rt,
  isCompleted, // Use the isCompleted prop to determine if the assessment is done
}) => {
  const location = useLocation();
  const isActive = location.pathname === rt; // Check if current route matches the card's route

  return (
    <div className="overflow-hidden rounded-lg border hover:border-gray-400">
      <h3 className="m-2 text-base font-semibold mb-2">{title}</h3>
      <p className="m-2 text-sm text-gray-500 mb-4">{description}</p>
      
      {/* Show In Progress or Completed button based on the status */}
      {isCompleted ? (
        <button
          disabled
          className="px-4 py-2 text-base rounded-md ml-2 mb-4 bg-green-100 text-green-500 border border-green-500 cursor-not-allowed italic"
        >
          Completed
        </button>
      ) : isActive ? (
        <button
          disabled
          className="px-4 py-2 text-base rounded-md ml-2 mb-4 bg-yellow-100 text-yellow-500 border border-yellow-500 cursor-not-allowed italic"
        >
          In Progress
        </button>
      ) : (
        <Link to={rt}>
          <button
            className="px-4 py-2 text-base rounded-md transition-all duration-200 ml-2 mb-4 bg-yellow-500 text-white hover:bg-yellow-600"
          >
            Start Assessment
          </button>
        </Link>
      )}
    </div>
  );
};

export default AssessmentCard;
