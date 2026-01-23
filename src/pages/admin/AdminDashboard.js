import styles from "./Dashboard.module.scss";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

export default function AdminDashboard() {
  const stats = [
    { title: "Tổng tài khoản", value: "1,250" },
    { title: "Tạo hôm nay", value: "12" },
    { title: "Đang hoạt động", value: "1,180" },
    { title: "Đã vô hiệu hóa", value: "70" },
  ];

  // Chi tiết trạng thái
  const donutData = [
    { name: "Active", value: 1080 },
    { name: "Inactive", value: 70 },
    { name: "Pending", value: 60 },
    { name: "Locked", value: 40 },
  ];

  const donutColors = ["#10B981", "#EF4444", "#F59E0B", "#6366F1"];

  const growthData = [
    { name: "T1", create: 10, delete: 2 },
    { name: "T2", create: 18, delete: 3 },
    { name: "T3", create: 8, delete: 1 },
    { name: "T4", create: 22, delete: 4 },
    { name: "T5", create: 15, delete: 2 },
    { name: "T6", create: 19, delete: 3 },
  ];

  // Mỗi role 1 màu
  const roleData = [
    { role: "Admin", users: 5, color: "#EF4444" },
    { role: "HR", users: 40, color: "#10B981" },
    { role: "Interviewer", users: 55, color: "#F59E0B" },
    { role: "Candidate", users: 1150, color: "#2563EB" },
  ];

  return (
    <div className={styles.adminPage}>
      <div className={styles.dashboardWrapper}>
        {/* STATS */}
        <div className={styles.statsGrid}>
          {stats.map((s, i) => (
            <div key={i} className={styles.statCard}>
              <p>{s.title}</p>
              <h3>{s.value}</h3>
            </div>
          ))}
        </div>

        {/* CHARTS */}
        <div className={styles.chartsGrid}>
          <div className={styles.chartBox}>
            <h4>Trạng thái tài khoản</h4>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={donutData}
                  innerRadius={70}
                  outerRadius={100}
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
            <h4>Hoạt động quản lý người dùng</h4>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line dataKey="create" stroke="#2563EB" strokeWidth={3} />
                <Line dataKey="delete" stroke="#EF4444" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.chartBox}>
            <h4>Người dùng theo vai trò</h4>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={roleData}>
                <XAxis dataKey="role" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users">
                  {roleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
