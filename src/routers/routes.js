import React from "react";

// PUBLIC
import HomePage from "../pages/home/HomePage";
import Jobs from "../pages/jobs/Jobs";
import Companies from "../pages/companies/Companies";

// ADMIN
import Home from "../pages/admin/home";
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

// AUTH (PUBLIC)
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Register from "../pages/auth/Register";
import Profile from "../pages/profile/Profile";

const publicRouter = [
  { path: "/", element: <HomePage /> },             // Trang chủ
  { path: "/jobs", element: <Jobs /> },             // Tìm việc
  { path: "/companies", element: <Companies /> },   // Công ty
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
];

const adminRouter = [
  { path: "/dashboard", element: <AdminDashboard /> },        // Dashboard Admin
  { path: "/users", element: <UserManagement /> },  // Quản lý user
  { path: "/pipeline", element: <PipelineConfig /> }, // Pipeline
  { path: "/interviews", element: <MyInterviews /> }, // Lịch PV
  { path: "/interviews/:id", element: <InterviewDetail /> }, // Chi tiết PV
  { path: "/profile", element: <Profile /> }, // Hồ sơ cá nhân
];

const hrRouter = [
  { path: "/dashboard", element: <HRDashboard /> },
  { path: "/interviews", element: <MyInterviews /> },
  { path: "/interviews/:id", element: <InterviewDetail /> },
  { path: "/profile", element: <Profile /> },
];

const interviewerRouter = [
  { path: "/dashboard", element: <InterviewerDashboard /> },
  { path: "/interviews", element: <MyInterviews /> },
  { path: "/interviews/:id", element: <InterviewDetail /> },
  { path: "/profile", element: <Profile /> },
];

const candidateRouter = [
  { path: "/dashboard", element: <CandidateDashboard /> },
  { path: "/profile", element: <Profile /> },
];

export { adminRouter, publicRouter, hrRouter, interviewerRouter, candidateRouter };
