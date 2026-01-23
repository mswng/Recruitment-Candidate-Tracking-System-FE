import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../admin/Dashboard.module.scss";

export default function HrDashboard() {
  const navigate = useNavigate();

  const user = {
    name: "Đoàn Thị Thanh Sương",
    id: "HR001239",
    department: "Human Resources",
    role: "HR Manager",
  };

  const summary = [
    { label: "Job đang mở", value: 48 },
    { label: "CV chờ duyệt", value: 35 },
    { label: "Phỏng vấn hôm nay", value: 12 },
    { label: "Tỷ lệ đồng ý", value: "72%" },
  ];

  const shortcuts = [
    { label: "Tạo Job", path: "/hr/jobs" },
    { label: "Duyệt CV", path: "/hr/resumes" },
    { label: "Lên lịch PV", path: "/hr/interviews" },
    { label: "Phân công PV", path: "/hr/assign" },
    { label: "Quản lý Job", path: "/hr/jobs/manage" },
    { label: "Quản lý PV", path: "/hr/interviews/manage" },
  ];

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.hrGrid}>
        {/* ROW 1 */}
        <div className={`${styles.hrCard} ${styles.hrMini}`}>
          <h4>Thông tin nhân sự</h4>
          <p><b>{user.name}</b></p>
          <p>{user.role}</p>
          <p>{user.department}</p>
        </div>

        <div className={`${styles.hrCard} ${styles.hrMini}`}>
          <h4>Tổng quan</h4>
          {summary.map((s, i) => (
            <p key={i}>
              {s.label}: <b>{s.value}</b>
            </p>
          ))}
        </div>

        <div className={`${styles.hrCard} ${styles.hrMini}`}>
          <h4>Thông báo</h4>
          <p>Chưa có thông báo mới</p>
        </div>

        {/* ROW 2 – 6 ô chức năng */}
        {shortcuts.map((s, i) => (
          <div
            key={i}
            className={styles.hrTile}
            onClick={() => navigate(s.path)}
          >
            {s.label}
          </div>
        ))}

        {/* ROW 3 */}
<div className={`${styles.hrCard} ${styles.hrWide} ${styles.hrTimeline}`}>
  <h4>Lịch hôm nay</h4>
  <p>09:00 – Duyệt CV</p>
  <p>14:00 – Phỏng vấn Backend</p>
  <p>16:00 – Gửi lịch PV</p>
</div>

<div className={`${styles.hrCard}`}>
  <h4>Ghi chú</h4>
  <p>Theo dõi tiến độ phỏng vấn và phản hồi ứng viên.</p>
</div>
      </div>
    </div>
  );
}
  