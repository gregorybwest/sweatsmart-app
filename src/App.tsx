import { useEffect } from "react";
import sweatSmartLogo from "/SweatSmartLogo.png";
import stravaConnectBtn from "/strava_api_logos/btn_strava_connectwith_orange/btn_strava_connectwith_orange.svg";
import axios from "axios";
import "./App.css";

async function sendCode(code: string) {
  const data = await axios.get(
    `https://sweatsmart-be.vercel.app/strava_auth?code=${code}`
  );
  console.log(data);
  console.log(data.data.athlete.id, "fart");
}

function App() {
  const params = new URLSearchParams(document.location.search);
  const code = params.get("code");

  useEffect(() => {
    if (code) {
      sendCode(code);
    }
  }, [code]);

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
      <h1>Welcome to SweatSmart</h1>
      <div className="card">
        <p>Connect to Strava to get started</p>
        <button
          onClick={async () => {
            window.location.href = `https://www.strava.com/oauth/authorize?client_id=120918&redirect_uri=${
              import.meta.env.VITE_REDIRECT_URI
            }&response_type=code&approval_prompt=auto&scope=activity:write,activity:read`;
          }}
        >
          <img src={stravaConnectBtn} alt="Connect with Strava" />
        </button>
      </div>
    </>
  );
}

export default App;
