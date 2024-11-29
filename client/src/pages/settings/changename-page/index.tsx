import React, { useState } from "react";

const ChangeUsername: React.FC = () => {
  const [newUsername, setNewUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChangeUsername = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("User is not authenticated.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/settings/change-username", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: newUsername }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update username: ${response.status}`);
      }

      const data = await response.json();
      setMessage(data.message || "Username updated successfully.");
    } catch (error: any) {
      console.error("Error updating username:", error);
      setMessage(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-80 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Username</h2>
      <form onSubmit={handleChangeUsername} className="space-y-4">
        <div>
          <label htmlFor="newUsername" className="block text-sm font-medium text-gray-700">
            New Username
          </label>
          <input
            id="newUsername"
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full px-4 py-2 text-white font-semibold rounded-md ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Change Username"}
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-center text-gray-600">{message}</p>}
    </div>
  );
};

export default ChangeUsername;
