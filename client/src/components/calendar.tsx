import React, { useState } from "react";

const Calendar: React.FC = () => {
  const [notes, setNotes] = useState<{ [key: number]: string }>({});
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [noteInput, setNoteInput] = useState("");
  const today = new Date().getDate(); // Get current day

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    setNoteInput(notes[day] || ""); // Load existing note or empty string
  };

  const saveNote = () => {
    if (selectedDay !== null) {
      setNotes((prevNotes) => ({
        ...prevNotes,
        [selectedDay]: noteInput,
      }));
      setSelectedDay(null); // Close modal
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Calendar</h2>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 30 }, (_, i) => {
          const day = i + 1;
          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              className={`py-2 rounded-full ${
                day === today
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
      <button className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 w-full">
        Write Today’s Thoughts
      </button>

      {/* Modal */}
      {selectedDay !== null && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">
              Notes for Day {selectedDay}
            </h3>
            <textarea
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              className="w-full h-24 p-2 border rounded-md"
              placeholder="Write your notes here..."
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setSelectedDay(null)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={saveNote}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
