import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CandidateDashboard.module.scss";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function CandidateDashboard() {
  const navigate = useNavigate();

  const stats = {
    appliedJobs: 12,
    pendingApplications: 5,
    interviewScheduled: 2,
    offersReceived: 1,
    savedJobs: 8,
    successRate: 67,
  };

  const applicationTrend = [
    { month: "T8", value: 2 },
    { month: "T9", value: 5 },
    { month: "T10", value: 7 },
    { month: "T11", value: 9 },
    { month: "T12", value: 12 },
  ];

  const statusStats = [
    { name: "Pending", value: 5 },
    { name: "Interview", value: 2 },
    { name: "Offer", value: 1 },
    { name: "Rejected", value: 4 },
  ];

  return (
    <div className={styles.dashboardDark}>
      {/* ===== TOP BAR GIỐNG INTERVIEWER ===== */}
      <header className={styles.topbar}>
        <div className={styles.brand}>RecruitHub</div>

        <nav className={styles.menu}>
          <button className={styles.active}>Overview</button>
          <button>Applications</button>
          <button>Interviews</button>
          <button>Jobs</button>
          <button>Profile</button>
        </nav>

        <button
          className={styles.logoutBtn}
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </header>

      <div className={styles.container}>
        {/* ===== HEADER ===== */}
        <div className={styles.dashboardHeader}>
          <div>
            <h1>👋 Xin chào, Nguyễn Văn A!</h1>
            <p>Theo dõi tiến trình ứng tuyển & phân tích hồ sơ của bạn</p>
          </div>
          <Link to="/jobs" className={styles.btnFindJobs}>
            🔍 Tìm Việc Mới
          </Link>
        </div>

        {/* ===== STATS ===== */}
        <div className={styles.statsOverview}>
          {[
            { label: "Đã Ứng Tuyển", value: stats.appliedJobs },
            { label: "Chờ Xử Lý", value: stats.pendingApplications },
            { label: "Phỏng Vấn", value: stats.interviewScheduled },
            { label: "Nhận Offer", value: stats.offersReceived },
            { label: "Công Việc Lưu", value: stats.savedJobs },
            { label: "Tỷ Lệ Thành Công", value: `${stats.successRate}%` },
          ].map((s, i) => (
            <div key={i} className={styles.statCard}>
              <p>{s.label}</p>
              <h3>{s.value}</h3>
            </div>
          ))}
        </div>

        {/* ===== ANALYTICS ===== */}
        <div className={styles.analyticsGrid}>
          <div className={styles.chartCard}>
            <h2>📈 Xu hướng ứng tuyển theo tháng</h2>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={applicationTrend}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#054de8"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.chartCard}>
            <h2>📊 Trạng thái hồ sơ</h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={statusStats}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
