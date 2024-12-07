interface AssessmentCardProps {
    title: string;
    action: string;
    description: string;
    isHighlighted?: boolean; // Add this to highlight selected card (e.g., for "Professional Contacted")
  }
  
  const AssessmentCard: React.FC<AssessmentCardProps> = ({
    title,
    action,
    description,
    isHighlighted = false,
  }) => {
    return (
      <div
        className={`${
          isHighlighted ? "border-2 border-green-500" : "bg-gray-100"
        } rounded-lg p-4 w-full sm:w-72 space-y-4 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105`}
      >
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-all duration-200"
          onClick={() => console.log(`${title} clicked`)}
        >
          {action}
        </button>
      </div>
    );
  };
  
  export default AssessmentCard;
  