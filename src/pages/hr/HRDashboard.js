import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import styles from "./HrDashboard.module.scss";
import { getHrDashboard } from "../../api/services/hrDashboradAPI";

export default function HrDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getHrDashboard();
        setDashboard(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p>Đang tải dashboard HR...</p>;
  if (!dashboard) return <p>Không có dữ liệu</p>;

  const {
    month,
    pendingCVs,
    openJobs,
    interviewsToday,
    interviewCalendar,
  } = dashboard;

  const formatMonth = (monthStr) => {
    if (!monthStr) return "";

    const [year, month] = monthStr.split("-");
    return `${month}/${year}`;
  };


  return (
    <div className={styles.wrapper}>
      
      {/* ===== ROW 1: OVERVIEW ===== */}
      <h3 className={styles.sectionTitle}>
        Tổng quan tháng {formatMonth(month)}
      </h3>

      <div className={styles.overviewGrid}>
        <div className={`${styles.statCard} ${styles.cardBlue}`}>
          <p>CV chờ duyệt</p>
          <h2>{pendingCVs}</h2>
        </div>

        <div className={`${styles.statCard} ${styles.cardGreen}`}>
          <p>Job đang mở</p>
          <h2>{openJobs}</h2>
        </div>

        <div className={`${styles.statCard} ${styles.cardOrange}`}>
          <p>Phỏng vấn hôm nay</p>
          <h2>{interviewsToday}</h2>
        </div>
      </div>

      {/* ===== ROW 2: CALENDAR ===== */}
      <div className={styles.calendarFull}>
        <Calendar
          data={interviewCalendar?.daysWithInterviews || []}
          onSelect={(d) => setSelectedDate(d)}
        />
      </div>

    </div>
  );
}
