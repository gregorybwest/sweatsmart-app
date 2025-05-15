import { useEffect, useState } from "react";
import axios from "axios";
import { WorkoutCardList } from "../Components/WorkoutCardList";
import { NavBar } from "../Components/NavBar";

export interface Run {
  workoutPlan: string;
  pace: number;
  paceUnit: string;
  time: number;
  title: string;
  suggested: boolean;
  difficulty: string;
}

export interface Ride {
  workoutPlan: string;
  pace: number;
  paceUnit: string;
  time: number;
  title: string;
  suggested: boolean;
  difficulty: string;
}

export interface Swim {
  workoutPlan: string;
  pace: number;
  paceUnit: string;
  time: number;
  title: string;
  suggested: boolean;
  difficulty: string;
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
    const response = await axios.get(`${backEndURI}/strava_auth?refreshToken=${refreshToken}`);
    return response.data; // Return the data
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Handle error appropriately
  }
}

async function getStravaStats(
  athleteId: number | string | null,
  accessToken: string,
  setRuns: (runs: Run[]) => void,
  setRides: (rides: Ride[]) => void,
  setSwims: (swims: Swim[]) => void,
  setActiveTab: (activeTab: string) => void
) {
  const stravaStats = await axios.get(`${backEndURI}/strava_stats`, {
    params: {
      athleteId: athleteId,
      accessToken: accessToken,
    },
  });
  console.log(stravaStats.data.recentWorkoutType);
  setActiveTab(stravaStats.data.recentWorkoutType);
  setRuns(stravaStats.data.workouts.runs);
  setRides(stravaStats.data.workouts.rides);
  setSwims(stravaStats.data.workouts.swims);
}

function Workouts() {
  const params = new URLSearchParams(document.location.search);
  const code = params.get("code");
  const [runs, setRuns] = useState<Run[]>([]);
  const [rides, setRides] = useState<Ride[]>([]);
  const [swims, setSwims] = useState<Swim[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      sendRefreshToken(refreshToken).then((result) => {
        if (result) {
          const athleteId = localStorage.getItem("athleteId");
          const accessToken = result["accessToken"];
          getStravaStats(athleteId, accessToken, setRuns, setRides, setSwims, setActiveTab);
        }
      });
    } else if (code) {
      sendCode(code).then((result) => {
        if (result) {
          const athleteId = result["athlete"]["id"];
          const accessToken = result["accessToken"];
          localStorage.setItem("refreshToken", result["refreshToken"]);
          localStorage.setItem("athleteId", athleteId);
          getStravaStats(athleteId, accessToken, setRuns, setRides, setSwims, setActiveTab);
        }
      });
    }
    // getStravaStats(data);
  }, [code]); // Only depend on `code`

  return (
    <>
      <NavBar />
      <div className="flex justify-center">
        <div role="tablist" className="tabs tabs-boxed inline-flex">
          <a
            role="tab"
            className={`tab text-lg px-8 ${activeTab === "Run" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("Run")}
          >
            Run
          </a>
          <a
            role="tab"
            className={`tab text-lg px-8 ${activeTab === "Ride" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("Ride")}
          >
            Ride
          </a>
          <a
            role="tab"
            className={`tab text-lg px-8 ${activeTab === "Swim" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("Swim")}
          >
            Swim
          </a>
        </div>
      </div>

      {/* Conditionally pass workouts based on activeTab */}
      {activeTab === "Run" && <WorkoutCardList workouts={runs} />}
      {activeTab === "Ride" && <WorkoutCardList workouts={rides} />}
      {activeTab === "Swim" && <WorkoutCardList workouts={swims} />}
    </>
  );
}

export default Workouts;
