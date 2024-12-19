interface WorkoutCardProps {
  workoutPlan: string;
  pace: number;
  paceUnit: string;
  time: number;
  className?: string;
  title: string;
  suggested: boolean;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workoutPlan, pace, paceUnit, time, className, title, suggested }) => {
  return (
    <div className={`card text-primary-content w-96 rounded-lg shadow-lg w-full ${className}`}>
      <div className="card-body">
        {suggested ? <h1 className='card-title text-yellow-200'>SUGGESTED</h1> : null}
        <h2 className="card-title">{title}</h2>
        <p>
          Pace: {pace} {paceUnit}
        </p>
        <p>Average Time: {Math.floor(time / 60)}:00</p>
        <p>{workoutPlan}</p>
      </div>
    </div>
  );
};
