import { Routes, Route } from "react-router-dom";
import Header from "./components/layouts/header/Header";

import HomePage from "./pages/home/HomePage";
import Login from "./components/layouts/auth/Login";
import Register from "./components/layouts/auth/Register";
import ForgotPassword from "./components/layouts/auth/ForgotPassword";


import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/users";
import HrDashboard from "./pages/hr/HRDashboard";
import InterviewerDashboard from "./pages/interviewer/InterviewerDashboard";
import CandidateDashboard from "./pages/candidate/CandidateDashboard";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />


        {/* DASHBOARD THEO ROLE */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/hr/dashboard" element={<HrDashboard />} />
        <Route
          path="/interviewer/dashboard"
          element={<InterviewerDashboard />}
        />
        <Route
          path="/candidate/dashboard"
          element={<CandidateDashboard />}
        />
      </Routes>
    </>
  );
}

export default App;
