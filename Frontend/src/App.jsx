import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import StatsPage from "./components/StatsPage";
import RoutingFn from "./components/RoutingFn";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/:code" element={<RoutingFn />} />
      </Routes>
    </Router>
  );
}
