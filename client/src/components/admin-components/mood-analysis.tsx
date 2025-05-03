import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const MoodAnalysis: React.FC = () => {
  const [moodData, setMoodData] = useState<{ mood: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/assess/moods");

        if (!response.ok) {
          throw new Error(`Failed to fetch moods: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched mood data:", data);

        // Process data to count occurrences of each mood
        const moodCounts: Record<string, number> = {
          "😢": 0,
          "😞": 0,
          "😐": 0,
          "🙂": 0,
          "😄": 0,
        };

        data.moods.forEach((entry: { mood: string }) => {
          if (moodCounts.hasOwnProperty(entry.mood)) {
            moodCounts[entry.mood] += 1;
          }
        });

        const formattedData = Object.keys(moodCounts).map((mood) => ({
          mood,
          count: moodCounts[mood],
        }));

        setMoodData(formattedData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMoods();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Mood Analysis</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={moodData}>
            <XAxis dataKey="mood" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default MoodAnalysis;
