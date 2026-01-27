export const MENU = {
  guest: [
    { key: "home", label: "Trang chủ", path: "/" },
    { key: "jobs", label: "Tuyển dụng", path: "/jobs" },
  ],

  admin: [
    { key: "dashboard", label: "Trang chủ", path: "/admin/dashboard" },
    { key: "users", label: "Người dùng", path: "/admin/users" },
  ],

  hr: [
    { key: "dashboard", label: "Trang chủ", path: "/hr/dashboard" },
    { key: "jobs", label: "Tuyển dụng", path: "/hr/jobs" },
    { key: "candidates", label: "Ứng viên", path: "/hr/candidates" },
    { key: "interviews", label: "Phỏng vấn", path: "/hr/interviews" }
  ],

  interviewer: [
    { key: "dashboard", label: "Trang chủ", path: "/interviewer/dashboard" },
    { key: "schedule", label: "Lịch phỏng vấn", path: "/interviewer/schedule" },
    { key: "results", label: "Phỏng vấn", path: "/interviewer/results" },
    { key: "evaluation", label: "Đánh giá", path: "/interviewer/evaluation" },
    { key: "candidates", label: "Ứng viên", path: "/hr/candidates" }
  ],

  candidate: [
    { key: "dashboard", label: "Trang chủ", path: "/candidate/dashboard" },
    { key: "jobs", label: "Tuyển dụng", path: "/jobs" },
    { key: "profile", label: "Quản lý hồ sơ", path: "/profile" },
    { key: "applied-jobs", label: "Xem đơn ứng tuyển", path: "/applied-jobs" }
  ]
};
