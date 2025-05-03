import React from "react";
import ReactPlayer from "react-player";

const VideoEmbed: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">🎥 MindBoost: Today's Top Mental Health Pick</h2>
      <div className="flex justify-center">
        <ReactPlayer 
          url="https://youtu.be/rkZl2gsLUp4?si=vtDSEXbdoDLI6yLy" 
          controls 
          width="100%" 
          height="320px"
        />
      </div>
    </div>
  );
};

export default VideoEmbed;
