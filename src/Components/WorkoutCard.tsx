interface WorkoutCardProps {
  averagePace: number;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ averagePace }) => {
    return (
        <div className="card bg-primary text-primary-content w-96">
          <div className="card-body">
            <h2 className="card-title">Suggested Workout</h2>
            <p>
              Pace: {Math.round(averagePace / 60)}:{Math.floor(averagePace % 60)}
            </p>
          </div>
        </div>
    )
}