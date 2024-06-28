import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'

async function sendCode(code: string) {
  const data = await axios.get(`https://sweatsmart-be.vercel.app/strava_auth?code=${code}`);
  console.log(data);
  console.log(data.data.athlete.id, "fart");
}

function App() {
  const [count, setCount] = useState(0)
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
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={async () => {
        window.location.href = `https://www.strava.com/oauth/authorize?client_id=120918&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=code&approval_prompt=auto&scope=activity:write,activity:read`;}}>CLICK ME</button>
      <p>{code}</p>
    </>
  )
}

export default App