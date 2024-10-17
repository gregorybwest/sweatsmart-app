interface WorkoutCardProps {
  pace: number;
  paceUnit: string;
  time: number;
  className?: string;
  title: string;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ pace, paceUnit, time, className, title }) => {
  return (
    <div className={`card text-primary-content w-96 rounded-lg shadow-lg w-full ${className}`}>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>
          Pace: {pace} {paceUnit}
        </p>
        <p>Average Time: {Math.floor(time / 60)}:00</p>
      </div>
    </div>
  );
};
