import { useEffect, useState } from "react";
import sweatSmartLogo from "/sweatsmart-logo.svg";
import axios from "axios";


async function sendCode(code: string) {
  const data = await axios.get(
    `https://sweatsmart-be.vercel.app/strava_auth?code=${code}`
  );
  console.log(data["data"]);
}

// async function getStravaStats(data){
//   const response = await axios.get(`https://www.strava.com/api/v3/athletes/${id}/stats`, {
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   });
//   console.log(response.data);
// }

function Workouts() {
  const params = new URLSearchParams(document.location.search);
  const code = params.get("code");
  const [data, setData] = useState({});


  useEffect(() => {
    if (code) {
      setData(sendCode(code));
    }
    // getStravaStats(data);
  }, [code, data]);

  return (
    <>
      <div>
        <a href="#" target="_blank">
          <img
            src={sweatSmartLogo}
            className="logo react"
            alt="SweatSmartlogo"
          />
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
