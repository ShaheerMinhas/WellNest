import AssessmentsList from "../../containers/assessments-list";


const Events: React.FC = () => {
    return (
      <div className="flex h-screen">
        {/* Left Menu: Navigation (if needed) */}
        <aside className="w-72 bg-white shadow-md">
          <AssessmentsList/>{/* Add event categories or navigation here */}
        </aside>
  
        {/* Right Side: Events List */}
        <main className="flex-1 p-6 bg-gray-100">
          <h1 className="text-2xl font-bold mb-4">Your Events</h1>
          {/* Display a list of events here */}
          <p className="text-gray-600">No events scheduled yet.</p>
        </main>
      </div>
    );
  };
  
  export default Events;
  