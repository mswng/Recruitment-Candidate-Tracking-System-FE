import React, { useState } from "react";
import Calendar from "../hr/Calendar";
import styles from "./InterviewerDashboard.module.scss";

// Giả lập dữ liệu lịch trình cho ngày đang chọn (để demo giao diện)
const mockSchedule = [
  { id: 1, time: "09:00 - 10:00", candidate: "Trần Thị B", position: "Frontend Dev", status: "Sắp tới" },
  { id: 2, time: "14:30 - 15:30", candidate: "Lê Văn C", position: "Backend Dev", status: "Đang chờ" },
];

export default function InterviewerDashboard() {
  // Giả sử ngày đang chọn
  const [selectedDate, setSelectedDate] = useState("29/01/2026");

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        
        {/* --- CỘT TRÁI: THÔNG TIN & STATS --- */}
        <aside className={styles.sidebar}>
          
          {/* Card 1: User Profile */}
          <div className={styles.profileCard}>
            <div className={styles.avatar}>
              {/* Dùng link ảnh thật hoặc placeholder */}
              <img src="https://ui-avatars.com/api/?name=Nguyen+Van+A&background=0D8ABC&color=fff" alt="Avatar" />
            </div>
            <h3 className={styles.userName}>Nguyễn Văn A</h3>
            <p className={styles.userRole}>Interviewer</p>
            <div className={styles.divider}></div>
            <div className={styles.infoRow}>
              <span>Phòng ban:</span>
              <b>Technical Team</b>
            </div>
          </div>

          {/* Card 2: Overview Stats */}
          <div className={styles.statsCard}>
            <h4 className={styles.cardTitle}>Tổng quan hôm nay</h4>
            <div className={styles.statsGrid}>
              <div className={`${styles.statItem} ${styles.blue}`}>
                <span className={styles.statNumber}>3</span>
                <span className={styles.statLabel}>Lịch PV</span>
              </div>
              <div className={`${styles.statItem} ${styles.orange}`}>
                <span className={styles.statNumber}>2</span>
                <span className={styles.statLabel}>Đang chờ</span>
              </div>
              <div className={`${styles.statItem} ${styles.green}`}>
                <span className={styles.statNumber}>1</span>
                <span className={styles.statLabel}>Hoàn thành</span>
              </div>
            </div>
          </div>
        </aside>

        {/* --- CỘT PHẢI: LỊCH & CHI TIẾT --- */}
        <main className={styles.mainContent}>
          
          {/* Phần Lịch */}
          <div className={styles.calendarSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.pageTitle}>Lịch phỏng vấn</h2>
              {/* Có thể thêm bộ lọc hoặc nút hành động ở đây */}
            </div>
            <div className={styles.calendarWrapper}>
              <Calendar data={{}} />
            </div>
          </div>



        </main>
      </div>
    </div>
  );
}