import React, { useEffect, useState } from "react";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const Activities: React.FC = () => {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [bothCompleted, setBothCompleted] = useState(false);
  const [anxietyScore, setAnxietyScore] = useState<number | null>(null);
  const [depressionScore, setDepressionScore] = useState<number | null>(null);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<number | null>(null);

  const handleStartAssessment = (id: number) => {
    setSelectedAssessmentId(id);
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch("http://localhost:3000/api/assess/activities", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!response.ok) {
            throw new Error(`Error fetching activities: ${response.status} ${response.statusText}`);
          }

          const data = await response.json();
          setAssessments(data.assessments || []);
        } else {
          console.warn("Token not found in localStorage.");
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAssessments();
  }, []);

  useEffect(() => {
    const storedBothCompleted = JSON.parse(localStorage.getItem("bothCompleted") || "false");
    setBothCompleted(storedBothCompleted);
    if (storedBothCompleted) {
      setAnxietyScore(parseInt(localStorage.getItem("at1") || "0", 10));
      setDepressionScore(parseInt(localStorage.getItem("dt1") || "0", 10));
    }
  }, []);

  const handleSubmit = async () => {
    if (!bothCompleted || selectedAssessmentId === null) return;

    const healthMetric = parseInt(localStorage.getItem("healthMetric") || "0", 10);
    const token = localStorage.getItem("token");
    
    try {
      const response = await fetch("http://localhost:3000/api/assess/totalResult", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assessment_id: selectedAssessmentId,
          health_metric: healthMetric,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error submitting result: ${response.status}`);
      }
      console.log("Result submitted successfully");
      setModalOpen(false);
    } catch (error) {
      console.error("Error submitting result:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Activities</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : assessments.length === 0 ? (
        <p className="text-gray-500">No Assigned Activities</p>
      ) : (
        <ul className="space-y-4">
          {assessments.map((assessment) => (
            <li key={assessment.id} className="flex justify-between items-center border-b pb-4">
              <div>
                <p className="font-semibold">{assessment.title}</p>
                <p className="text-sm text-red-500">Due: {formatDate(assessment.due_date)}</p>
              </div>
              <button
                className="ml-4 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                onClick={() => handleStartAssessment(assessment.id)}
              >
                Start Assessment
              </button>
            </li>
          ))}
        </ul>
      )}

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            {bothCompleted ? (
              <>
                <h3 className="text-lg font-semibold mb-2">Test Scores</h3>
                <p className="text-gray-700">Anxiety Test Score: {anxietyScore}</p>
                <p className="text-gray-700">Depression Test Score: {depressionScore}</p>
                <button
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-2">Incomplete Tests</h3>
                <p className="text-gray-700">Please complete both tests before starting the assessment.</p>
                <button
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;
