import { WorkoutCard } from "./WorkoutCard";

interface WorkoutCardListProps {
  averagePace: number;
  averageTime: number;
}

export const WorkoutCardList: React.FC<WorkoutCardListProps> = ({ averagePace, averageTime }) => {
  return (
    <>
      <WorkoutCard averagePace={averagePace * 1.05} averageTime={averageTime * 0.8} className="bg-yellow-500" />
      <WorkoutCard averagePace={averagePace * 0.95} averageTime={averageTime * 0.92} className="bg-green-500" />
      <WorkoutCard averagePace={averagePace * 0.9} averageTime={averageTime * 1.05} className="bg-red-500" />
    </>
  );
};
