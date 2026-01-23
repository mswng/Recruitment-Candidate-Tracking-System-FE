import React from "react";

// PUBLIC
import HomePage from "../pages/home/HomePage";
import Jobs from "../pages/jobs/Jobs";
import Companies from "../pages/companies/Companies";

// AUTH (đã chuyển sang components/layouts/auth)
import Login from "../components/layouts/auth/Login";
import Register from "../components/layouts/auth/Register";
import ForgotPassword from "../components/layouts/auth/ForgotPassword";

// ADMIN
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserManagement from "../pages/admin/users";
import PipelineConfig from "../pages/admin/pipeline";

// HR
import HRDashboard from "../pages/hr/HRDashboard";

// INTERVIEWER
import InterviewerDashboard from "../pages/interviewer/InterviewerDashboard";
import MyInterviews from "../pages/interviewer/MyInterviews";
import InterviewDetail from "../pages/interviewer/InterviewDetail";

// CANDIDATE
import CandidateDashboard from "../pages/candidate/CandidateDashboard";

// PROFILE
import Profile from "../pages/profile/Profile";

// ================= PUBLIC ROUTES =================
const publicRouter = [
  { path: "/", element: <HomePage /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/companies", element: <Companies /> },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
];

// ================= ADMIN ROUTES =================
const adminRouter = [
  { path: "/dashboard", element: <AdminDashboard /> },
  { path: "/users", element: <UserManagement /> },
  { path: "/pipeline", element: <PipelineConfig /> },
  { path: "/interviews", element: <MyInterviews /> },
  { path: "/interviews/:id", element: <InterviewDetail /> },
  { path: "/profile", element: <Profile /> },
];

// ================= HR ROUTES =================
const hrRouter = [
  { path: "/dashboard", element: <HRDashboard /> },
  { path: "/interviews", element: <MyInterviews /> },
  { path: "/interviews/:id", element: <InterviewDetail /> },
  { path: "/profile", element: <Profile /> },
];

// ================= INTERVIEWER ROUTES =================
const interviewerRouter = [
  { path: "/dashboard", element: <InterviewerDashboard /> },
  { path: "/interviews", element: <MyInterviews /> },
  { path: "/interviews/:id", element: <InterviewDetail /> },
  { path: "/profile", element: <Profile /> },
];

// ================= CANDIDATE ROUTES =================
const candidateRouter = [
  { path: "/dashboard", element: <CandidateDashboard /> },
  { path: "/profile", element: <Profile /> },
];

export {
  publicRouter,
  adminRouter,
  hrRouter,
  interviewerRouter,
  candidateRouter,
};
