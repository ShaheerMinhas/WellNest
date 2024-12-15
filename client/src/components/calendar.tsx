const Calendar: React.FC = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Calendar</h2>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 30 }, (_, i) => (
            <button
              key={i}
              className={`py-2 rounded-full ${
                i + 1 === 1 ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 w-full">
          Write Today’s Thoughts
        </button>
      </div>
    );
  };
  
  export default Calendar;
  