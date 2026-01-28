import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/layouts/header/Header";

// Public pages
import HomePage from "./pages/home/HomePage";
import Login from "./components/layouts/auth/Login";
import Register from "./components/layouts/auth/Register";
import ForgotPassword from "./components/layouts/auth/ForgotPassword";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/users";

// HR pages
import HrDashboard from "./pages/hr/HRDashboard";

// Interviewer pages
import InterviewerDashboard from "./pages/interviewer/InterviewerDashboard";
import InterviewerSchedule from "./pages/interviewer/InterviewerSchedule";
import InterviewerReview from "./pages/interviewer/InterviewerReview";
import InterviewerMyInterviews from "./pages/interviewer/InterviewerMyInterviews";
import InterviewerCV from "./pages/interviewer/InterviewerCV";

// Candidate pages
import RecruitmentPages from "./pages/candidate/RecruitmentPages";
import Profile from "./pages/candidate/Profile";
import AppliedJobs from "./pages/candidate/appliedJobs";
import JobsDetail from "./pages/candidate/JobsDetail";

function App() {
  return (
    <>
      {/* Header hiển thị cho tất cả các trang */}
      <Header />

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
        <Route
          path="/interviewer"
          element={<Navigate to="/interviewer/dashboard" replace />}
        />
        <Route path="/interviewer/dashboard" element={<InterviewerDashboard />} />
        <Route path="/interviewer/schedule" element={<InterviewerSchedule />} />
        <Route path="/interviewer/review" element={<InterviewerReview />} />
        <Route path="/interviewer/cv" element={<InterviewerCV />} />
        <Route
          path="/interviewer/my-interviews"
          element={<InterviewerMyInterviews />}
        />

        {/* CANDIDATE */}
        <Route path="/candidate/profile" element={<Profile />} />
        <Route path="/candidate/applied-jobs" element={<AppliedJobs />} />
        <Route path="/jobs" element={<RecruitmentPages />} />
        <Route path="/jobs/:id" element={<JobsDetail />} />
      </Routes>
    </>
  );
}

export default App;
