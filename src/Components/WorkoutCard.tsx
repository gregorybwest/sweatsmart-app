interface WorkoutCardProps {
  averagePace: number;
  averageTime: number;
  className?: string;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ averagePace, averageTime, className }) => {
  return (
    <div className={`card text-primary-content w-96 rounded-lg shadow-lg ${className}`}>
      <div className="card-body">
        <h2 className="card-title">Suggested Workout</h2>
        <p>
          Pace: {Math.floor(averagePace / 60)}:{Math.floor(averagePace % 60)}
        </p>
        <p>Average Time: {Math.floor(averageTime / 60)}:00</p>
      </div>
    </div>
  );
};
