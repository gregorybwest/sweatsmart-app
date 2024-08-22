// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function calculateAveragePace(stravaStats: any, setAveragePace: (pace: number) => void) {
  const averagePace =
    stravaStats["recent_run_totals"]["elapsed_time"] / (stravaStats["recent_run_totals"]["distance"] / 1609.344);
  console.log("average pace:", averagePace);
  setAveragePace(averagePace);
}

export function calculateAverageWorkoutTime(stravaStats: any, setAverageTime: (time: number) => void) {
  const averageTime = stravaStats["recent_run_totals"]["elapsed_time"] / (stravaStats["recent_run_totals"]["count"]);
  console.log("Calulate Average Workout Time", averageTime)
  setAverageTime(averageTime);
}