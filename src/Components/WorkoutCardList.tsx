import { WorkoutCard } from './WorkoutCard';
import { Run } from './WorkoutCard';

interface WorkoutCardListProps {
    easyRun: Run;
    mediumRun: Run;
    hardRun: Run;
    suggestedRuns: {
        message: string;
        easyRun: Run;
        mediumRun: Run;
        hardRun: Run;
    };
}

export const WorkoutCardList: React.FC<WorkoutCardListProps> = ({
    easyRun,
    mediumRun,
    hardRun,
    suggestedRuns,
}) => {
    return (
        <>
        {suggestedRuns.message ? (
          <div>{suggestedRuns.message}</div>
        ) : (
          <div className='flex flex-col items-center'>
            <WorkoutCard
              pace={suggestedRuns.easyRun?.pace}
              time={suggestedRuns.easyRun?.time}
              title={suggestedRuns.easyRun?.title}
              className='bg-gradient-to-b from-yellow-300 to-yellow-600 mb-4 mt-4 transition-transform transform hover:z-10 hover:origin-center max-w-screen-lg mx-auto'
            />
            <WorkoutCard
              pace={suggestedRuns.mediumRun?.pace}
              time={suggestedRuns.mediumRun?.time}
              title={suggestedRuns.mediumRun?.title}
              className='bg-gradient-to-b from-green-400 to-green-600 mb-4 transition-transform transform hover:z-10 hover:origin-center max-w-screen-lg mx-auto'
            />
            <WorkoutCard
              pace={suggestedRuns.hardRun?.pace}
              time={suggestedRuns.hardRun?.time}
              title={suggestedRuns.hardRun?.title}
              className='bg-gradient-to-b from-red-400 to-red-600 transition-transform transform hover:z-10 hover:origin-center max-w-screen-lg mx-auto'
            />
          </div>
        )}
        </>
    );
};
