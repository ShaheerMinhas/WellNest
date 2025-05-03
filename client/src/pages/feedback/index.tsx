import AssessmentsList from "../../containers/assessments-list";
import { useState } from "react";

const Feedback: React.FC = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    const organization_id = localStorage.getItem("companyId");
  
    if (!token || !organization_id) {
      alert("User not authenticated or missing organization ID.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/api/assess/send-feedback", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organization_id,
          feedback,
          rating,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Feedback submitted successfully!");
        setFeedback(""); // Reset feedback field
        setRating(5); // Reset rating
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Side: Navigation */}
      <aside className="w-72 bg-white shadow-md p-4 border-r">
        <AssessmentsList />
      </aside>

      {/* Right Side: Feedback Form */}
      <main className="flex-1 flex justify-center items-center p-8">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">We Value Your Feedback!</h2>
          <p className="text-gray-600 mb-4">Let us know your thoughts about mental well being of workplace</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Rating */}
            <div>
              <label className="block text-gray-700 font-medium">Rate Us</label>
              <select
                className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                {[5, 4, 3, 2, 1].map((num) => (
                  <option key={num} value={num}>
                    {num} ⭐
                  </option>
                ))}
              </select>
            </div>

            {/* Feedback Input */}
            <div>
              <label className="block text-gray-700 font-medium">Your Feedback</label>
              <textarea
                className="mt-1 w-full p-3 border rounded-lg resize-none h-28 focus:ring focus:ring-blue-300"
                placeholder="Write your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Feedback;
