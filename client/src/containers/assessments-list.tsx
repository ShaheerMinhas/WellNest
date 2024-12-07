import { assessmentsData } from "../information-text"; // Import data
import AssessmentCard from "../components/assessments/assessment-card";

const AssessmentsList: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Assessments</h2>
      <div className="flex flex-col space-y-6"> {/* Changed to flex-col for vertical stacking */}
        {assessmentsData.map((assessment, index) => (
          <AssessmentCard
            key={index}
            title={assessment.title}
            action={assessment.action}
            description={assessment.description}
            //isHighlighted={assessment.action === "Start A"} // Example of highlighting
          />
        ))}
      </div>
    </div>
  );
};

export default AssessmentsList;
