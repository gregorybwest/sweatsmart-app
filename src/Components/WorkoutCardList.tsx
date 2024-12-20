import { WorkoutCard } from "./WorkoutCard";
import { Run, Ride, Swim } from "../Pages/Workouts";

interface WorkoutCardListProps {
  workouts: (Run | Ride | Swim)[]; // A generic array of workouts
}

const difficultyColors: { [key: string]: string } = {
  easy: "bg-gradient-to-b from-green-400 to-green-600",
  medium: "bg-gradient-to-b from-yellow-400 to-yellow-600",
  hard: "bg-gradient-to-b from-red-400 to-red-600",
  featured: "bg-gradient-to-b from-purple-400 to-purple-600",
};

export const WorkoutCardList: React.FC<WorkoutCardListProps> = ({ workouts }) => {
  console.log(workouts);
  return (
    <>
      {workouts.length === 0 ? (
        <div>Loading</div>
      ) : typeof workouts[0] === "string" ? (
        <div className="flex text-lg px-4 p-4 justify-center">{workouts[0]}</div>
      ) : (
        <div className="flex flex-col items-center">
          {workouts.map((workout, index) => (
            <WorkoutCard
              key={index}
              workoutPlan={workout.workoutPlan}
              pace={workout.pace}
              paceUnit={workout.paceUnit}
              time={workout.time}
              title={workout.title}
              suggested={workout.suggested}
              className={`${
                workout.suggested ? difficultyColors['featured']: difficultyColors[workout.difficulty]
              } mb-4 mt-4 transition-transform transform hover:z-10 hover:origin-center max-w-screen-lg mx-auto`}
            />
          ))}
        </div>
      )}
    </>
  );
};
