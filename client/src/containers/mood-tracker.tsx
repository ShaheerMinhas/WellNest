import { useState, useEffect } from "react";

interface MoodSelectorProps {
  prevMood?: string; // Optional previous mood prop
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ prevMood }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(prevMood || null);

  useEffect(() => {
    if (prevMood) {
      setSelectedMood(prevMood);
    }
  }, [prevMood]);

  const handleMoodSelection = async (mood: string) => {
    setSelectedMood(mood);

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/assess/setMood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mood }),
      });

      if (!response.ok) {
        throw new Error("Failed to set mood");
      }

      console.log("Mood set successfully");
    } catch (error) {
      console.error("Error setting mood:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex justify-between">
      <h2 className="text-2xl font-semibold mb-2">How's your mood?</h2>
      <div className="flex space-x-4">
        {["😢", "😞", "😐", "🙂", "😄"].map((emoji, index) => (
          <button
            key={index}
            className={`text-3xl transition-all ${
              selectedMood === emoji ? "rounded-lg p-2 bg-gray-200" : "opacity-50"
            }`}
            onClick={() => handleMoodSelection(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
