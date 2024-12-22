interface ProgressCircleProps {
    progress: number;
  }
  
  const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;
  
    return (
      <svg className="w-32 h-32" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="5"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#10b981"
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="0.3em"
          className="text-lg font-semibold"
        >
          {progress}%
        </text>
      </svg>
    );
  };
  
  export default ProgressCircle;
  