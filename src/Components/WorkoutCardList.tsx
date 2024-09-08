import { WorkoutCard } from "./WorkoutCard";

interface WorkoutCardListProps {
  easyRun: object;
  mediumRun: object;
  hardRun: object;
}

export const WorkoutCardList: React.FC<WorkoutCardListProps> = ({ easyRun, mediumRun, hardRun }) => {
  return (
    <>
      <WorkoutCard pace={easyRun.pace} time={easyRun.time} title={easyRun.title} className="bg-yellow-500" />
      <WorkoutCard pace={mediumRun.pace} time={mediumRun.time} title={mediumRun.title} className="bg-green-500" />
      <WorkoutCard pace={hardRun.pace} time={hardRun.time} title={hardRun.title} className="bg-red-500" />
    </>
  );
};
