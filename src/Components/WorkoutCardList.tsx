import { WorkoutCard } from "./WorkoutCard";
import { Run } from "./WorkoutCard";

interface WorkoutCardListProps {
  runs: Run[];
}

export const WorkoutCardList: React.FC<WorkoutCardListProps> = ({ runs }) => {
  console.log("runs", runs);
  return (
    <>
      {!runs ? (
        <div>Loading</div>
      ) : typeof runs === "string" ? (
        <div>{runs}</div>
      ) : (
        <div className="flex flex-col items-center">
          <WorkoutCard
            pace={runs[0]?.pace}
            time={runs[0]?.time}
            title={runs[0]?.title}
            className="bg-gradient-to-b from-yellow-300 to-yellow-600 mb-4 mt-4 transition-transform transform hover:z-10 hover:origin-center max-w-screen-lg mx-auto"
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
