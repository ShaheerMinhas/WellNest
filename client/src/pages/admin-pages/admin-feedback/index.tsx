import React, { useState, useEffect } from "react";
import AdminHeader from "../../../components/admin-components/header";
import AdminSidebar from "../../../components/admin-components/sidebar";
import axios from "axios";

interface Feedback {
  id: number;
  feedback: string;
  rating: number;
}

const FeedbackView: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedbacks = async () => {
    const token = localStorage.getItem("token");
    const companyId = localStorage.getItem("companyId");

    if (!token || !companyId) {
      setError("Missing token or company ID.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/assess/feedback-view",
        { companyId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
        console.log(response)
      setFeedbacks(response.data.feedbacks);
    } catch (err) {
      setError("Failed to fetch feedback.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="flex h-screen">
      <AdminSidebar selectedMenu="Feedback" onMenuClick={() => {}} />
      <div className="flex-1 flex flex-col ml-[260px]">
        <AdminHeader />
        <main className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Employee Feedback</h2>

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div>
              <table className="min-w-full table-auto border-collapse border">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">#</th>
                    <th className="border px-4 py-2">Rating</th>
                    <th className="border px-4 py-2">Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((feedback) => (
                    <tr key={feedback.id}>
                      <td className="border px-4 py-2">{feedback.id}</td>
                      <td className="border px-4 py-2">{feedback.rating} ⭐</td>
                      <td className="border px-4 py-2">{feedback.feedback}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FeedbackView;
