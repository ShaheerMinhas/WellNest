import { useState } from "react";
import ProgressCircle from "../components/progress-circle";
import { tracker } from "../demo-data";

const MentalWellnessTracker: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Normalize function
  function normalize(value: number): number {
    return (value - 0) / (63 - 0); // Normalize between 0 and 63
  }

  // Averaging function for two values
  function average(value1: number, value2: number): number {
    return ((value1 + value2) / 2) * 100; // Averaging and scaling to 0-100
  }

  // Normalize depression and anxiety scores
  const normalized_depression = normalize(tracker.depression);
  const normalized_anxiety = normalize(tracker.anxiety);

  // Calculate the average of normalized depression and anxiety and round to 0 decimal points
  const avgScore = Math.round(average(normalized_depression, normalized_anxiety));

  // Function to open modal
  const openModal = () => setIsModalOpen(true);

  // Function to close modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex justify-between">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Mental Wellness Tracker</h2>
        <p className="my-2 text-sm text-gray-500">WellNest's Cumulative Distress Score (CDS)</p>
        <button
          className="px-4 py-2 my-2 text-base rounded-md transition-all duration-200 bg-yellow-500 text-white hover:bg-yellow-600"
          onClick={openModal} // Open modal on click
        >
          See History
        </button>
      </div>
      <div className="mr-10">
        <ProgressCircle progress={avgScore} /> {/* Pass the averaged score to ProgressCircle */}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Score History</h3>
            <p className="mb-2"><strong>Original Depression Score:</strong> {tracker.depression}</p>
            <p className="mb-2"><strong>Original Anxiety Score:</strong> {tracker.anxiety}</p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={closeModal} // Close modal
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentalWellnessTracker;
