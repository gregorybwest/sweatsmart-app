interface WorkoutCardProps {
  pace: number;
  time: number;
  className?: string;
  title: string;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ pace, time, className, title }) => {
  return (
    <div className={`card text-primary-content w-96 rounded-lg shadow-lg w-full ${className}`}>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>
          Pace: {Math.floor(pace / 60)}:
          {Math.floor(pace % 60)
            .toString()
            .padStart(2, "0")}
        </p>
        <p>Average Time: {Math.floor(time / 60)}:00</p>
      </div>
    </div>
  );
};
