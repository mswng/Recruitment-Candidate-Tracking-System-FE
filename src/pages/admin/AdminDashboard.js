import { useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { getAdminDashboard } from "../../api/services/adminAPI";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getAdminDashboard();
        setDashboard(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p>Đang tải dashboard...</p>;
  if (!dashboard) return null;

  /* ================= PIE CHART ================= */
  const trangThaiTuyenDung = [
    { name: "Đang mở", value: dashboard.recruitmentStatus.open },
    { name: "Đã đóng", value: dashboard.recruitmentStatus.closed },
  ];

  const mauTrangThai = ["#22c55e", "#ef4444"];

  /* ================= BAR CHART ================= */
  const congViecHot = dashboard.topAppliedPositions.map((item) => ({
    title: item.position,
    apply: item.applications,
  }));

  return (
    <div className={styles.adminPage}>
      <div className={styles.dashboardWrapper}>
        {/* ===== HEADER ===== */}
        <div className={styles.statsHeader}>
          <h3>Thống kê năm {dashboard.year}</h3>
        </div>

        {/* ===== MINI STATS ===== */}
        <div className={styles.statsTop}>
          <div className={styles.statMini}>
            <p>Tổng người dùng</p>
            <h3>{dashboard.totalUsers}</h3>
            <span className={styles.statYear}>
              +{dashboard.usersChangePercent}% so với năm trước
            </span>
          </div>

          <div className={styles.statMini}>
            <p>Tổng công việc</p>
            <h3>{dashboard.totalJobs}</h3>
            <span className={styles.statYear}>
              +{dashboard.newJobs} công việc mới
            </span>
          </div>

          <div className={styles.statMini}>
            <p>Hồ sơ ứng tuyển</p>
            <h3>{dashboard.applicationRate}</h3>
            <span className={styles.statYear}>
              +{dashboard.applicationChangePercent}% so với năm trước
            </span>
          </div>

          <div className={styles.statMini}>
            <p>Nhân sự hoạt động</p>
            <h3>{dashboard.activeStaff}</h3>
            <span className={styles.statYear}>
              +{dashboard.newStaff} nhân sự mới
            </span>
          </div>
        </div>

        {/* ===== CHARTS ===== */}
        <div className={styles.chartRow}>
          {/* ===== PIE ===== */}
          <div className={styles.adminCard}>
            <h4>Trạng thái tuyển dụng</h4>
            <div className={styles.chartWrap}>
              <ResponsiveContainer width="100%" height={340}>
                <PieChart>
                  <Legend verticalAlign="bottom" />
                  <Pie
                    data={trangThaiTuyenDung}
                    dataKey="value"
                    outerRadius={120}
                    label
                  >
                    {trangThaiTuyenDung.map((_, i) => (
                      <Cell key={i} fill={mauTrangThai[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ===== BAR ===== */}
          <div className={styles.adminCard}>
            <h4>Công việc được ứng tuyển nhiều</h4>
            <div className={styles.chartWrap}>
              <ResponsiveContainer width="100%" height={340}>
                <BarChart
                  data={congViecHot}
                  barCategoryGap="10%"
                  barGap={12}
                  margin={{ top: 20, right: 40, left: 30, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="title"
                    angle={-8}
                    textAnchor="end"
                    interval={0}
                    top={30}
                    fontSize={10}
                  />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar
                    dataKey="apply"
                    name="Số hồ sơ"
                    barSize={60}
                    radius={[10, 10, 0, 0]}
                    fill="#2563eb"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
