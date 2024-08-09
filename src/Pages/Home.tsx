import sweatSmartLogo from "/sweatsmart-logo.svg";

function Home() {
  return (
    <>
      <div>
        <a href="#" target="_blank">
          <img src={sweatSmartLogo} className="logo react" alt="SweatSmartlogo" />
        </a>
      </div>
      <h1>Welcome to SweatSmart</h1>
      <div className="card">
        <p>Connect to Strava to get started</p>
        <button
          id="strava-connect-btn"
          onClick={async () => {
            window.location.href = `https://www.strava.com/oauth/authorize?client_id=120918&redirect_uri=${
              import.meta.env.VITE_REDIRECT_URI
            }/workouts&response_type=code&approval_prompt=auto&scope=activity:write,activity:read`;
          }}
        ></button>
      </div>
    </>
  );
}

export default Home;
