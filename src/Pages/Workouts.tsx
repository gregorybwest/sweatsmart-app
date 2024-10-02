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

interface SuggestedRuns {
  message: string;
  easyRun: Run;
  mediumRun: Run;
  hardRun: Run;
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

async function sendRefreshToken(refreshToken: string) {
  try {
    const response = await axios.get(`${backEndURI}/strava_auth?refresh_token=${refreshToken}`);
    return response.data; // Return the data
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Handle error appropriately
  }
}

async function getStravaStats(
  athleteId: number | string | null,
  accessToken: string,
  setEasyRun: (easy: Run) => void,
  setMediumRun: (medium: Run) => void,
  setHardRun: (hard: Run) => void,
  setSuggestedRuns: (suggested: SuggestedRuns) => void
) {
  const stravaStats = await axios.get(`${backEndURI}/strava_stats`, {
    params: {
      athleteId: athleteId,
      accessToken: accessToken,
    },
  });
  console.log("Strava stats", stravaStats);
  setEasyRun(stravaStats.data.suggested_workouts.suggested_runs.easy_run);
  setMediumRun(stravaStats.data.suggested_workouts.suggested_runs.medium_run);
  setHardRun(stravaStats.data.suggested_workouts.suggested_runs.hard_run);
  setSuggestedRuns(stravaStats.data.suggestedWorkouts.suggestedRuns);
}

function Workouts() {
  const params = new URLSearchParams(document.location.search);
  const code = params.get("code");
  const [data, setData] = useState({});
  const [suggestedRuns, setSuggestedRuns] = useState<SuggestedRuns>({
    message: "",
    easyRun: {
      pace: 0,
      time: 0,
      title: "",
      suggested: false,
    },
    mediumRun: {
      pace: 0,
      time: 0,
      title: "",
      suggested: false,
    },
    hardRun: {
      pace: 0,
      time: 0,
      title: "",
      suggested: false,
    },
  });
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
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      sendRefreshToken(refreshToken).then((result) => {
        if (result) {
          setData(result); // Set the data state with the fetched result
          const athleteId = localStorage.getItem("athleteId");
          const accessToken = result["accessToken"];
          getStravaStats(athleteId, accessToken, setEasyRun, setMediumRun, setHardRun, setSuggestedRuns);
        }
      });
    } else if (code) {
      sendCode(code).then((result) => {
        if (result) {
          setData(result); // Set the data state with the fetched result
          const athleteId = result["athlete"]["id"];
          const accessToken = result["accessToken"];
          localStorage.setItem("refreshToken", result["refreshToken"]);
          localStorage.setItem("athleteId", athleteId);
          getStravaStats(athleteId, accessToken, setEasyRun, setMediumRun, setHardRun, setSuggestedRuns);
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
      <WorkoutCardList easyRun={easyRun} mediumRun={mediumRun} hardRun={hardRun} suggestedRuns={suggestedRuns} />
    </>
  );
}

export default Workouts;
