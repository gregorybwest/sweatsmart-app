import { useEffect, useState } from "react";
import axios from "axios";
import { WorkoutCardList } from "../Components/WorkoutCardList";
import { NavBar } from "../Components/NavBar";

interface Run {
  pace: number;
  time: number;
  title: string;
  suggested: boolean;
}

const backEndURI = import.meta.env.VITE_BACKEND_URI;

async function sendCode(code: string) {
  try {
    const response = await axios.get(`${backEndURI}/strava_auth?code=${code}`);
    return response.data; // Return the data
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Handle error appropriately
  }
}

async function sendRefreshToken(refresh_token: string) {
  try {
    const response = await axios.get(`${backEndURI}/strava_auth?refresh_token=${refresh_token}`);
    return response.data; // Return the data
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Handle error appropriately
  }
}

async function getStravaStats(
  athlete_id: number | string | null,
  access_token: string,
  setEasyRun: (easy: Run) => void,
  setMediumRun: (medium: Run) => void,
  setHardRun: (hard: Run) => void
) {
  const stravaStats = await axios.get(`${backEndURI}/strava_stats`, {
    params: {
      athlete_id: athlete_id,
      access_token: access_token,
    },
  });
  console.log(stravaStats);
  setEasyRun(stravaStats.data.suggested_workouts.suggested_runs.easy_run);
  setMediumRun(stravaStats.data.suggested_workouts.suggested_runs.medium_run);
  setHardRun(stravaStats.data.suggested_workouts.suggested_runs.hard_run);
}

function Workouts() {
  const params = new URLSearchParams(document.location.search);
  const code = params.get("code");
  const [data, setData] = useState({});
  const [easyRun, setEasyRun] = useState<Run>({
    pace: 0,
    time: 0,
    title: "",
    suggested: false,
  });
  const [mediumRun, setMediumRun] = useState<Run>({
    pace: 0,
    time: 0,
    title: "",
    suggested: false,
  });
  const [hardRun, setHardRun] = useState<Run>({
    pace: 0,
    time: 0,
    title: "",
    suggested: false,
  });
  console.log(data);

  useEffect(() => {
    const refresh_token = localStorage.getItem("refresh_token");
    if (refresh_token) {
      sendRefreshToken(refresh_token).then((result) => {
        if (result) {
          setData(result); // Set the data state with the fetched result
          const athlete_id = localStorage.getItem("athlete_id");
          const access_token = result["access_token"];
          getStravaStats(athlete_id, access_token, setEasyRun, setMediumRun, setHardRun);
        }
      });
    } else if (code) {
      sendCode(code).then((result) => {
        if (result) {
          setData(result); // Set the data state with the fetched result
          const athlete_id = result["athlete"]["id"];
          const access_token = result["access_token"];
          localStorage.setItem("refresh_token", result["refresh_token"]);
          localStorage.setItem("athlete_id", athlete_id);
          getStravaStats(athlete_id, access_token, setEasyRun, setMediumRun, setHardRun);
        }
      });
    }
    // getStravaStats(data);
  }, [code]); // Only depend on `code`

  return (
    <>
      <NavBar />
      <div className="flex-none">
        <div role="tablist" className="tabs tabs-boxed">
          <a role="tab" className="tab hover:tab-active">
            Run
          </a>
          <a role="tab" className="tab hover:tab-active">
            Bike
          </a>
          <a role="tab" className="tab hover:tab-active">
            Swim
          </a>
        </div>
      </div>
      <WorkoutCardList easyRun={easyRun} mediumRun={mediumRun} hardRun={hardRun} />
    </>
  );
}

export default Workouts;
