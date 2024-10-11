import { useEffect, useState } from "react";
import axios from "axios";
import { WorkoutCardList } from "../Components/WorkoutCardList";
import { NavBar } from "../Components/NavBar";

export interface Run {
  pace: number;
  time: number;
  title: string;
  suggested: boolean;
  difficulty: string;
}

// interface Runs {
//   message?: string;
//   runs?: Run[];
// }

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
    const response = await axios.get(`${backEndURI}/strava_auth?refreshToken=${refreshToken}`);
    return response.data; // Return the data
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Handle error appropriately
  }
}

async function getStravaStats(athleteId: number | string | null, accessToken: string, setruns: (runs: Run[]) => void) {
  const stravaStats = await axios.get(`${backEndURI}/strava_stats`, {
    params: {
      athleteId: athleteId,
      accessToken: accessToken,
    },
  });
  console.log("Strava stats", stravaStats);
  setruns(stravaStats.data.workouts.runs);
}

function Workouts() {
  const params = new URLSearchParams(document.location.search);
  const code = params.get("code");
  const [data, setData] = useState({});
  const [runs, setruns] = useState<Run[]>([]);
  console.log(data);

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      sendRefreshToken(refreshToken).then((result) => {
        if (result) {
          setData(result); // Set the data state with the fetched result
          const athleteId = localStorage.getItem("athleteId");
          const accessToken = result["accessToken"];
          getStravaStats(athleteId, accessToken, setruns);
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
          getStravaStats(athleteId, accessToken, setruns);
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
      <WorkoutCardList runs={runs} />
    </>
  );
}

export default Workouts;
