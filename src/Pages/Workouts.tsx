import { useEffect, useState } from "react";
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

async function sendRefreshToken(refresh_token: string) {
  try {
    const response = await axios.get(`https://sweatsmart-be.vercel.app/strava_auth?refresh_token=${refresh_token}`);
    console.log(response.data);
    return response.data; // Return the data
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Handle error appropriately
  }
}

async function getStravaStats(
  athlete_id: number | string | null,
  access_token: string,
  setAveragePace: (pace: number) => void,
  setAverageTime: (time: number) => void
) {
  const stravaStats = await axios.get(`https://sweatsmart-be.vercel.app/strava_stats`, {
    params: {
      athlete_id: athlete_id,
      access_token: access_token,
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
    const refresh_token = localStorage.getItem("refresh_token");
    if (refresh_token) {
      sendRefreshToken(refresh_token).then((result) => {
        if (result) {
          setData(result); // Set the data state with the fetched result
          const athlete_id = localStorage.getItem("athlete_id");
          const access_token = result["access_token"];
          getStravaStats(athlete_id, access_token, setAveragePace, setAverageTime);
        }
        console.log("result from refresh token", result);
      });
    } else if (code) {
      sendCode(code).then((result) => {
        if (result) {
          setData(result); // Set the data state with the fetched result
          const athlete_id = result["athlete"]["id"];
          const access_token = result["access_token"];
          localStorage.setItem("refresh_token", result["refresh_token"]);
          localStorage.setItem("athlete_id", athlete_id);
          getStravaStats(athlete_id, access_token, setAveragePace, setAverageTime);
        }
      });
    }
    // getStravaStats(data);
  }, [code]); // Only depend on `code`

  return (
    <>
      <WorkoutCardList averagePace={averagePace} averageTime={averageTime} />
      <button
        className="btn btn-secondary"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </>
  );
}

export default Workouts;
