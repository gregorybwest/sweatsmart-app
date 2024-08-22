interface WorkoutCardProps {
  averagePace: number;
  averageTime: number;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ averagePace, averageTime }) => {
  return (
    <div className="card bg-primary text-primary-content w-96">
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
