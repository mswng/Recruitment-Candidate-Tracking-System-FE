import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import styles from "../admin/Dashboard.module.scss";

export default function HrDashboard() {
  const navigate = useNavigate();

  // Số liệu theo Use Case
  const jobData = [
    { month: "T1", created: 8, closed: 2 },
    { month: "T2", created: 12, closed: 5 },
    { month: "T3", created: 10, closed: 4 },
  ];

  const resumeDecisionData = [
    { month: "T1", agree: 18, disagree: 6 },
    { month: "T2", agree: 22, disagree: 9 },
    { month: "T3", agree: 26, disagree: 8 },
  ];

  const interviewData = [
    { month: "T1", scheduled: 14, canceled: 3 },
    { month: "T2", scheduled: 19, canceled: 4 },
    { month: "T3", scheduled: 23, canceled: 2 },
  ];

  const roleRadar = [
    { subject: "Tạo job", value: 4 },
    { subject: "Duyệt CV", value: 4.5 },
    { subject: "Lên lịch", value: 4 },
    { subject: "Phân công", value: 3.8 },
    { subject: "Quản lý", value: 4.2 },
  ];

  const summary = [
    { label: "Job đang mở", value: 48 },
    { label: "CV chờ duyệt", value: 35 },
    { label: "Phỏng vấn hôm nay", value: 12 },
    { label: "Tỷ lệ đồng ý", value: "72%" },
  ];

  return (
    <div className={styles.dashboardWrapper}>
      {/* STATS */}
      <div className={styles.statsGrid}>
        {summary.map((s, i) => (
          <div key={i} className={styles.statCard}>
            <p>{s.label}</p>
            <h3>{s.value}</h3>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className={styles.chartsGrid}>
        {/* Manage Job Position */}
        <div className={styles.chartBox}>
          <h4>Quản lý vị trí tuyển dụng</h4>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={jobData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line dataKey="created" stroke="#2563eb" strokeWidth={3} name="Tạo mới" />
              <Line dataKey="closed" stroke="#ef4444" strokeWidth={3} name="Đóng" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* View Resume -> Agree / Disagree */}
        <div className={styles.chartBox}>
          <h4>Quyết định hồ sơ</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={resumeDecisionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="agree" fill="#22c55e" name="Đồng ý" />
              <Bar dataKey="disagree" fill="#f97316" name="Từ chối" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Schedule / Cancel Interview */}
        <div className={styles.chartBox}>
          <h4>Phỏng vấn</h4>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={interviewData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line dataKey="scheduled" stroke="#10b981" strokeWidth={3} name="Đã lên lịch" />
              <Line dataKey="canceled" stroke="#ef4444" strokeWidth={3} name="Hủy" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Radar – mức độ sử dụng chức năng */}
        <div className={styles.chartBox}>
          <h4>Mức độ sử dụng chức năng</h4>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={roleRadar}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <Radar
                dataKey="value"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Text summary */}
        <div className={styles.chartBox}>
          <h4>Hoạt động hôm nay</h4>
          <p>• 12 phỏng vấn được lên lịch</p>
          <p>• 5 job mới được tạo</p>
          <p>• 3 job đã đóng</p>
          <p>• 18 CV được duyệt</p>
        </div>
      </div>
    </div>
  );
}
