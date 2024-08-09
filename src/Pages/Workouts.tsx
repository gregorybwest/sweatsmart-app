import { useEffect, useState } from "react";
import sweatSmartLogo from "/sweatsmart-logo.svg";
import axios from "axios";
import { WorkoutCard } from "../Components/WorkoutCard";

async function sendCode(code: string) {
  try {
    const response = await axios.get(`https://sweatsmart-be.vercel.app/strava_auth?code=${code}`);
    console.log(response.data);
    return response.data; // Return the data
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Handle error appropriately
  }
}

async function getStravaStats(athlete_id: number, token: string, setAveragePace: (pace: number) => void) {
  const stravaStats = await axios.get(`https://www.strava.com/api/v3/athletes/${athlete_id}/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(stravaStats.data);
  workoutCalculations(stravaStats.data, setAveragePace);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function workoutCalculations(stravaStats: any, setAveragePace: (pace: number) => void) {
  const averagePace =
    stravaStats["recent_run_totals"]["elapsed_time"] / (stravaStats["recent_run_totals"]["distance"] / 1609.344);
  console.log(stravaStats["recent_run_totals"]);
  console.log("average pace:", averagePace);
  setAveragePace(averagePace);
}

function Workouts() {
  const params = new URLSearchParams(document.location.search);
  const code = params.get("code");
  const [data, setData] = useState({});
  const [averagePace, setAveragePace] = useState<number>(0);
  console.log(data);

  useEffect(() => {
    if (code) {
      sendCode(code).then((result) => {
        if (result) {
          setData(result); // Set the data state with the fetched result
          const athlete_id = result["athlete"]["id"];
          const access_token = result["access_token"];
          localStorage.setItem("refresh_token", result["refresh_token"]);
          getStravaStats(athlete_id, access_token, setAveragePace);
        }
      });
    }
    // getStravaStats(data);
  }, [code]); // Only depend on `code`

  return (
    <>
      <div>
        <WorkoutCard averagePace={averagePace} />
        <a href="#" target="_blank">
          <img src={sweatSmartLogo} className="logo react" alt="SweatSmartlogo" />
        </a>
      </div>
      <h1>Welcome to Workouts Recommender!</h1>
      <div className="card">
        <p>Sup</p>
        <button
          id="strava-connect-btn"
          onClick={async () => {
            window.location.href = `https://www.strava.com/oauth/authorize?client_id=120918&redirect_uri=${
              import.meta.env.VITE_REDIRECT_URI
            }&response_type=code&approval_prompt=auto&scope=activity:write,activity:read`;
          }}
        ></button>
      </div>
    </>
  );
}

export default Workouts;
