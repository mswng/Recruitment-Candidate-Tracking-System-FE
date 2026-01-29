import React from "react";

// PUBLIC
import HomePage from "../pages/home/HomePage";
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
import Profile from "../pages/candidate/Profile";
import AppliedJobs from "../pages/candidate/appliedJobs";
import Jobs from "../pages/candidate/RecruitmentPages";
import JobsDetail from "../pages/candidate/JobsDetail"; 

// ================= PUBLIC ROUTES =================
const publicRouter = [
  { path: "/", element: <HomePage /> },
  { path: "/jobs", element: <Jobs /> },

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
];

// ================= HR ROUTES =================
const hrRouter = [
  { path: "/dashboard", element: <HRDashboard /> },
  { path: "/interviews", element: <MyInterviews /> },
  { path: "/interviews/:id", element: <InterviewDetail /> },
];

// ================= INTERVIEWER ROUTES =================
const interviewerRouter = [
  { path: "/dashboard", element: <InterviewerDashboard /> },
  { path: "/interviews", element: <MyInterviews /> },
  { path: "/interviews/:id", element: <InterviewDetail /> },
];

// ================= CANDIDATE ROUTES =================
const candidateRouter = [
  { path: "/profile", element: <Profile /> },
  { path: "/applied-jobs", element: <AppliedJobs /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/jobs/:id", element: <JobsDetail /> },
];

export {
  publicRouter,
  adminRouter,
  hrRouter,
  interviewerRouter,
  candidateRouter,
};
