import React from "react";
import { activities } from "../information-text";

const ActivityCard: React.FC = () => {
  return (
    <div className="activity-card">
      <h3>{activities.title}</h3>
      <p>Deadline: {activities.deadline}</p>
      <button onClick={() => console.log("Activity Started!")}>
        {activities.action}
      </button>
    </div>
  );
};

export default ActivityCard;
