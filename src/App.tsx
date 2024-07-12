import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Workouts from "./Pages/Workouts";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/workouts" element={<Workouts/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
