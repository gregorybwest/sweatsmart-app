import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Workouts from "./Pages/Workouts";

function App() {
  const refreshToken = localStorage.getItem("refreshToken");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={refreshToken ? <Navigate to="/workouts" /> : <Home />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
