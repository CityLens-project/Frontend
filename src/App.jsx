
import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Overview from "./Pages/Dashboard/Overview";
import Complaints from "./Pages/Dashboard/Complaints";
import RoadCondition from "./Pages/Dashboard/RoadConditions";
import AiPredictions from "./Pages/Dashboard/AIPredictions";
import DashboardLayout from "./Components/Layout/DashboardLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<Overview />} />
        <Route path="traffic-analytics" element={<div>Traffic analytics</div>} />
        <Route path="road-conditions" element={<RoadCondition />} />
        <Route path="ai-predictions" element={<AiPredictions />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="smart-map" element={<div>Smart map</div>} />
      </Route>
    </Routes>
  );
}
