import { WorkoutCard } from "./WorkoutCard";
import { Run } from "../Pages/Workouts";

interface WorkoutCardListProps {
  runs: Run[];
}

const difficultyColors: { [key: string]: string } = {
  easy: "bg-gradient-to-b from-green-400 to-green-600",
  medium: "bg-gradient-to-b from-yellow-400 to-yellow-600",
  hard: "bg-gradient-to-b from-red-400 to-red-600",
  featured: "bg-gradient-to-b from-purple-400 to-purple-600",
};

export const WorkoutCardList: React.FC<WorkoutCardListProps> = ({ runs }) => {
  console.log("runs", runs);
  return (
    <>
      {runs.length === 0 ? (
        <div>Loading</div>
      ) : typeof runs[0] === "string" ? (
        <div>{runs[0]}</div>
      ) : (
        <div className="flex flex-col items-center">
          {runs.map((run, index) => (
            <WorkoutCard
              key={index}
              pace={run.pace}
              time={run.time}
              title={run.title}
              className={`${
                difficultyColors[run.difficulty]
              } mb-4 mt-4 transition-transform transform hover:z-10 hover:origin-center max-w-screen-lg mx-auto`}
            />
          ))}
        </div>
      )}
    </>
  );
};
