export const MENU = {
  guest: [
    { key: "home", label: "Home", path: "/" },
    { key: "jobs", label: "Jobs", path: "/jobs" },
  ],

  admin: [
    { key: "dashboard", label: "Dashboard", path: "/admin/dashboard" },
    { key: "users", label: "User Management", path: "/admin/users" },
  ],

  hr: [
    { key: "dashboard", label: "Dashboard", path: "/hr/dashboard" },
    { key: "jobs", label: "Manager Job Positions", path: "/hr/jobs" },
    { key: "candidates", label: "View Candidate Resumes", path: "/hr/candidates" },
    { key: "interviews", label: "Manager Interviews", path: "/hr/interviews" }
  ],

  interviewer: [
    { key: "dashboard", label: "Dashboard", path: "/interviewer/dashboard" },
    { key: "schedule", label: "View Interview Schedule", path: "/interviewer/schedule" },
    { key: "results", label: "Conduct Interview", path: "/interviewer/results" },
    { key: "evaluation", label: "Manage Evaluation", path: "/interviewer/evaluation" },
    { key: "candidates", label: "View Candidate Resumes", path: "/hr/candidates" }
  ],

  candidate: [
    { key: "dashboard", label: "Dashboard", path: "/candidate/dashboard" },
    { key: "jobs", label: "Job Positions", path: "/hr/jobs" },
    { key: "profile", label: "Manage Profile", path: "/profile" },
    { key: "applications", label: "View Applications", path: "/applications" }
  ]
};
