import { WorkoutCard } from "./WorkoutCard";
import { Run } from "./WorkoutCard";

interface WorkoutCardListProps {
  easyRun: Run;
  mediumRun: Run;
  hardRun: Run;
}

export const WorkoutCardList: React.FC<WorkoutCardListProps> = ({ easyRun, mediumRun, hardRun }) => {
  return (
    <div className="flex flex-col items-center">
      <WorkoutCard
        pace={easyRun.pace}
        time={easyRun.time}
        title={easyRun.title}
        className="bg-gradient-to-b from-yellow-300 to-yellow-600 mb-4 mt-4 transition-transform transform hover:scale-105 hover:z-10 hover:origin-center max-w-screen-lg mx-auto"
      />
      <WorkoutCard
        pace={mediumRun.pace}
        time={mediumRun.time}
        title={mediumRun.title}
        className="bg-gradient-to-b from-green-400 to-green-600 mb-4 transition-transform transform hover:scale-105 hover:z-10 hover:origin-center max-w-screen-lg mx-auto"
      />
      <WorkoutCard
        pace={hardRun.pace}
        time={hardRun.time}
        title={hardRun.title}
        className="bg-gradient-to-b from-red-400 to-red-600 transition-transform transform hover:scale-105 hover:z-10 hover:origin-center max-w-screen-lg mx-auto"
      />
    </div>
  );
};
