import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/layouts/header/Header";
import { Navigate } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import Login from "./components/layouts/auth/Login";
import Register from "./components/layouts/auth/Register";
import ForgotPassword from "./components/layouts/auth/ForgotPassword";

import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/users";
import HrDashboard from "./pages/hr/HrDashboard";


import InterviewerDashboard from "./pages/interviewer/InterviewerDashboard";
import InterviewerSchedule from "./pages/interviewer/InterviewerSchedule";
import InterviewerReview from "./pages/interviewer/InterviewerReview";
import InterviewerMyInterviews from "./pages/interviewer/InterviewerMyInterviews";
import InterviewerCV from "./pages/interviewer/InterviewerCV";

import CandidateLayout from "./components/layouts/CandidateLayout";
import CandidateProfile from "./pages/candidate/CandidateProfile";
import MyApplications from "./pages/candidate/MyApplications";

function App() {
  const { pathname } = useLocation();
  const isCandidate = pathname.startsWith("/candidate");

  return (
    <>
      {!isCandidate && <Header />}

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ADMIN */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />

        {/* HR */}
        <Route path="/hr/dashboard" element={<HrDashboard />} />

        {/* INTERVIEWER */}
        <Route path="/interviewer" element={<Navigate to="/interviewer/dashboard" />} />

        <Route path="/interviewer/dashboard" element={<InterviewerDashboard />} />
        <Route path="/interviewer/schedule" element={<InterviewerSchedule />} />
        <Route path="/interviewer/review" element={<InterviewerReview />} />
        <Route path="/interviewer/cv" element={<InterviewerCV />} />
        <Route path="/interviewer/my-interviews" element={<InterviewerMyInterviews />} />

        {/* CANDIDATE */}
        <Route path="/candidate" element={<CandidateLayout />}>
          <Route path="applications" element={<MyApplications />} />
          <Route path="profile" element={<CandidateProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
