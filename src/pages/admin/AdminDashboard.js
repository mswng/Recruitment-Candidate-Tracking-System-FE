import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import styles from "./Dashboard.module.scss";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (localStorage.getItem("role") !== "admin") navigate("/login");
  }, [navigate]);

  /* ===== DATA ===== */

  const stats = [
    { title: "Tổng người dùng", value: "65,841" },
    { title: "Người dùng hôm nay", value: "52,142" },
    { title: "Yêu cầu / phút", value: "2,365" },
    { title: "Tải xuống mới", value: "854" },
  ];

  const donutData = [
    { name: "Candidate", value: 1215 },
    { name: "HR", value: 18 },
    { name: "Interviewer", value: 12 },
    { name: "Admin", value: 5 },
  ];

  const donutColors = ["#2563EB", "#10B981", "#F59E0B", "#6366F1"];

  const growthData = [
    { name: "T1", system: 300, users: 200 },
    { name: "T2", system: 200, users: 120 },
    { name: "T3", system: 150, users: 90 },
    { name: "T4", system: 400, users: 240 },
    { name: "T5", system: 250, users: 130 },
    { name: "T6", system: 260, users: 220 },
  ];

  const roleData = [
    { role: "Admin", users: 5 },
    { role: "HR", users: 18 },
    { role: "Interviewer", users: 12 },
    { role: "Candidate", users: 1215 },
  ];

  const users = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "a@gmail.com",
      role: "Admin",
      joined: "01/01/2025",
      status: "Active",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "b@gmail.com",
      role: "HR",
      joined: "12/01/2025",
      status: "Active",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "c@gmail.com",
      role: "Interviewer",
      joined: "20/01/2025",
      status: "Active",
    },
    {
      id: 4,
      name: "Phạm Minh D",
      email: "d@gmail.com",
      role: "Candidate",
      joined: "05/02/2025",
      status: "Active",
    },
  ];

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.dashboard}>
      {/* ===== TOP BAR ===== */}
      <header className={styles.topbar}>
        <div className={styles.brand}>RecruitHub</div>
        <nav className={styles.menu}>
          <button className={styles.active}>Overview</button>
          <button>Users</button>
          <button>Charts</button>
          <button>Profile</button>
        </nav>
      </header>

      <div className={styles.container}>
        {/* ===== SECTION TABS ===== */}
        <div className={styles.sectionTabs}>
          <button
            className={`${styles.sectionTab} ${
              activeSection === "overview" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveSection("overview")}
          >
            📊 Tổng quan hệ thống
          </button>

          <button
            className={`${styles.sectionTab} ${
              activeSection === "users" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveSection("users")}
          >
            👥 Quản lý người dùng
          </button>
        </div>

        {/* ===== OVERVIEW ===== */}
        {activeSection === "overview" && (
          <>
            <div className={styles.statsGrid}>
              {stats.map((s, i) => (
                <div key={i} className={styles.statCard}>
                  <p>{s.title}</p>
                  <h3>{s.value}</h3>
                  <span>↑ So với kỳ trước</span>
                </div>
              ))}
            </div>

            <div className={styles.chartsGrid}>
              <div className={styles.chartBox}>
                <h4>Phân bố người dùng</h4>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={donutData}
                      innerRadius={80}
                      outerRadius={120}
                      dataKey="value"
                    >
                      {donutData.map((_, i) => (
                        <Cell key={i} fill={donutColors[i]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className={styles.chartBox}>
                <h4>Tăng trưởng hệ thống</h4>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line dataKey="system" stroke="#2563EB" strokeWidth={3} />
                    <Line dataKey="users" stroke="#10B981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className={styles.chartBox}>
                <h4>Người dùng theo vai trò</h4>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={roleData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="role" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#2563EB" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* ===== USER MANAGEMENT ===== */}
        {activeSection === "users" && (
          <div className={styles.userPanel}>
            <h3>👥 Danh sách người dùng</h3>

            <input
              className={styles.searchInput}
              placeholder="🔍 Tìm theo tên hoặc email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className={styles.userHeader}>
              <span>Người dùng</span>
              <span>Email</span>
              <span>Vai trò</span>
              <span>Ngày tham gia</span>
              <span>Trạng thái</span>
            </div>

            <div className={styles.userList}>
              {filteredUsers.map((u) => (
                <div
                  key={u.id}
                  className={`${styles.userRow} ${styles[u.role]}`}
                >
                  <div className={styles.userCol}>
                    <div className={styles.avatar}>
                      {u.name.charAt(0)}
                    </div>
                    <strong>{u.name}</strong>
                  </div>

                  <div className={styles.userCol}>{u.email}</div>

                  <div className={styles.userCol}>
                    <span
                      className={`${styles.roleBadge} ${styles[u.role]}`}
                    >
                      {u.role}
                    </span>
                  </div>

                  <div className={styles.userCol}>{u.joined}</div>

                  <div className={styles.userCol}>
                    <span className={styles.statusActive}>● Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
