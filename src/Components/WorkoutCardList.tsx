import { WorkoutCard } from "./WorkoutCard";
import { Run } from "../Pages/Workouts";

interface WorkoutCardListProps {
  runs: Run[];
}

const difficultyColors: { [key: string]: string } = {
  easy: "bg-green-100 border-green-300 text-green-800",
  medium: "bg-yellow-100 border-yellow-300 text-yellow-800",
  hard: "bg-red-100 border-red-300 text-red-800",
  featured: "bg-purple-600 border-purple-800 text-white",
}

export const WorkoutCardList: React.FC<WorkoutCardListProps> = ({ runs }) => {
  console.log("runs", runs);
  return (
    <>
      {!runs ? (
        <div>Loading</div>
      ) : typeof(runs[0]) === 'string' ? (
        <div>{runs[0]}</div>
      ) : (
        <div className="flex flex-col items-center">
          <WorkoutCard
            pace={runs[0]?.pace}
            time={runs[0]?.time}
            title={runs[0]?.title}
            className={`${difficultyColors[runs[0].difficulty]} mb-4 mt-4 transition-transform transform hover:z-10 hover:origin-center max-w-screen-lg mx-auto`}
          />
          <WorkoutCard
            pace={runs[1]?.pace}
            time={runs[1]?.time}
            title={runs[1]?.title}
            className="bg-gradient-to-b from-green-400 to-green-600 mb-4 transition-transform transform hover:z-10 hover:origin-center max-w-screen-lg mx-auto"
          />
          <WorkoutCard
            pace={runs[2]?.pace}
            time={runs[2]?.time}
            title={runs[2]?.title}
            className="bg-gradient-to-b from-red-400 to-red-600 transition-transform transform hover:z-10 hover:origin-center max-w-screen-lg mx-auto"
          />
        </div>
      )}
    </>
  );
};
