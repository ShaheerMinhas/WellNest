import React, { useState, useEffect } from "react";
import AdminHeader from "../../../components/admin-components/header";
import AdminSidebar from "../../../components/admin-components/sidebar";
import axios from "axios";

interface Assessment {
  id: number;
  title: string;
  start_date?: string;
  due_date?: string;
}

const AssessmentCreation: React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newAssessment, setNewAssessment] = useState({
    name: "",
    organization_id: "",
    start_date: "",
    due_date: "",
  });

  const fetchOngoingAssessments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/admin/assess/assessments");
      setAssessments(response.data.data);
    } catch (err) {
      setError("Failed to fetch ongoing assessments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOngoingAssessments();
  }, []);

  const createAssessment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found in localStorage.");
      return;
    }

    if (!newAssessment.name || !newAssessment.organization_id) {
      setError("Name and Organization ID are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/assess/assessments",
        newAssessment,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAssessments((prev) => [...prev, response.data.data]);
      setNewAssessment({ name: "", organization_id: "", start_date: "", due_date: "" });
    } catch (err) {
      setError("Failed to create assessment.");
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar selectedMenu="Assessments" onMenuClick={() => {}} />
      <div className="flex-1 flex flex-col ml-[260px]">
        <AdminHeader />
        <main className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Assessment Management</h2>

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div>
              {/* Create Assessment */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Create New Assessment</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Assessment Name"
                    value={newAssessment.name}
                    onChange={(e) =>
                      setNewAssessment({ ...newAssessment, name: e.target.value })
                    }
                    className="border rounded px-4 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Organization ID"
                    value={newAssessment.organization_id}
                    onChange={(e) =>
                      setNewAssessment({ ...newAssessment, organization_id: e.target.value })
                    }
                    className="border rounded px-4 py-2"
                  />
                  <input
                    type="date"
                    placeholder="Start Date"
                    value={newAssessment.start_date}
                    onChange={(e) =>
                      setNewAssessment({ ...newAssessment, start_date: e.target.value })
                    }
                    className="border rounded px-4 py-2"
                  />
                  <input
                    type="date"
                    placeholder="Due Date"
                    value={newAssessment.due_date}
                    onChange={(e) =>
                      setNewAssessment({ ...newAssessment, due_date: e.target.value })
                    }
                    className="border rounded px-4 py-2"
                  />
                </div>
                <button
                  onClick={createAssessment}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Create Assessment
                </button>
              </div>

              {/* Display Assessments */}
              <div>
                <h3 className="text-xl font-semibold mb-2">Ongoing Assessments</h3>
                <table className="min-w-full table-auto border-collapse border">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">ID</th>
                      <th className="border px-4 py-2">Name</th>
                      <th className="border px-4 py-2">Start Date</th>
                      <th className="border px-4 py-2">Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessments.map((assessment) => (
                      <tr key={assessment.id}>
                        <td className="border px-4 py-2">{assessment.id}</td>
                        <td className="border px-4 py-2">{assessment.title}</td>
                        <td className="border px-4 py-2">{assessment.start_date || "N/A"}</td>
                        <td className="border px-4 py-2">{assessment.due_date || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AssessmentCreation;
