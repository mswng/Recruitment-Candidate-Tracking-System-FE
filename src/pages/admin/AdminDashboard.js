import React from "react";
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

export default function AdminDashboard() {
  const trangThaiTuyenDung = [
    { name: "Đang mở", value: 12 },
    { name: "Đã đóng", value: 6 },
  ];

  const mauTrangThai = ["#22c55e", "#ef4444"];

  const congViecHot = [
    { title: "Frontend", apply: 82 },
    { title: "Backend", apply: 65 },
    { title: "Nhân sự", apply: 44 },
    { title: "UI/UX", apply: 39 },
  ];

  return (
    <div className={styles.adminPage}>
      <div className={styles.dashboardWrapper}>
        <div className={styles.statsHeader}>
          <h3>Thống kê năm 2026</h3>
        </div>

        <div className={styles.statsTop}>
          <div className={styles.statMini}>
            <p>Tổng người dùng</p>
            <h3>1250</h3>
            <span className={styles.statYear}>+12% so với 2025</span>
          </div>
          <div className={styles.statMini}>
            <p>Tổng công việc</p>
            <h3>21</h3>
            <span className={styles.statYear}>+5 công việc mới</span>
          </div>
          <div className={styles.statMini}>
            <p>Hồ sơ ứng tuyển</p>
            <h3>340</h3>
            <span className={styles.statYear}>+18% so với 2025</span>
          </div>
          <div className={styles.statMini}>
            <p>Nhân sự hoạt động</p>
            <h3>32</h3>
            <span className={styles.statYear}>+3 nhân sự</span>
          </div>
        </div>

        <div className={styles.chartRow}>
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

          <div className={styles.adminCard}>
            <h4>Công việc đang được ứng tuyển nhiều</h4>
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
                    angle={-10}
                    textAnchor="end"
                    height={30}
                    interval={0}
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
