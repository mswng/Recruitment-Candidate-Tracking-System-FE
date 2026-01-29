export const MENU = {
  guest: [
    { key: "home", label: "Trang chủ", path: "/" },
    { key: "jobs", label: "Tuyển dụng", path: "/jobs" },
  ],

  ADMIN: [
    { key: "dashboard", label: "Trang chủ", path: "/admin/dashboard" },
    { key: "users", label: "Người dùng", path: "/admin/users" },
  ],

  HR: [
    { key: "dashboard", label: "Trang chủ", path: "/hr/dashboard" },
    { key: "jobs", label: "Tuyển dụng", path: "/hr/jobs" },
    { key: "candidates", label: "Ứng viên", path: "/hr/candidates" },
    { key: "interviews", label: "Phỏng vấn", path: "/hr/interviews" }
  ],

  INTERVIEWER: [
    { key: "dashboard", label: "Trang chủ", path: "/interviewer/dashboard" },
    { key: "schedule", label: "Lịch phỏng vấn", path: "/interviewer/schedule" },
    { key: "candidates", label: "Danh sách ứng viên", path: "/interviewer/my-interviews" },
],


  CANDIDATE: [
    { key: "dashboard", label: "Trang chủ", path: "/" },
    { key: "jobs", label: "Tuyển dụng", path: "/jobs" },
    { key: "profile", label: "Hồ sơ", path: "/candidate/profile" },
    { key: "applications", label: "Đơn đã nộp", path: "/candidate/applied-jobs" }
  ]
};
