import { useEffect, useState } from "react";
import sweatSmartLogo from "/sweatsmart-logo.svg";
import axios from "axios";
import { WorkoutCardList } from "../Components/WorkoutCardList";
import { calculateAveragePace, calculateAverageWorkoutTime } from "../Calculators/Calculators";

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

async function getStravaStats(
  athlete_id: number,
  token: string,
  setAveragePace: (pace: number) => void,
  setAverageTime: (time: number) => void
) {
  const stravaStats = await axios.get(`https://www.strava.com/api/v3/athletes/${athlete_id}/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(stravaStats.data);
  calculateAveragePace(stravaStats.data, setAveragePace);
  calculateAverageWorkoutTime(stravaStats.data, setAverageTime);
}

function Workouts() {
  const params = new URLSearchParams(document.location.search);
  const code = params.get("code");
  const [data, setData] = useState({});
  const [averagePace, setAveragePace] = useState<number>(0);
  const [averageTime, setAverageTime] = useState<number>(0);
  console.log(data);

  useEffect(() => {
    if (code) {
      sendCode(code).then((result) => {
        if (result) {
          setData(result); // Set the data state with the fetched result
          const athlete_id = result["athlete"]["id"];
          const access_token = result["access_token"];
          localStorage.setItem("refresh_token", result["refresh_token"]);
          getStravaStats(athlete_id, access_token, setAveragePace, setAverageTime);
        }
      });
    }
    // getStravaStats(data);
  }, [code]); // Only depend on `code`

  return (
    <>
      <div>
        <WorkoutCardList averagePace={averagePace} averageTime={averageTime} />
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
