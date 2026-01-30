import React, { useEffect, useState } from "react";
import Calendar from "../hr/Calendar";
import styles from "./InterviewerDashboard.module.scss";
import { getInterviewerDashboard } from "../../api/services/interviewerAPI";

export default function InterviewerDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getInterviewerDashboard();
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
  if (!dashboard) return <p>Không có dữ liệu</p>;

  const { interviewerInfo, todayOverview, monthlyCalendar } = dashboard;

  const formatMonth = (monthStr) => {
    if (!monthStr) return "";

    const [year, month] = monthStr.split("-");
    return `${month}/${year}`;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        
        {/* ===== SIDEBAR ===== */}
        <aside className={styles.sidebar}>
          
          {/* PROFILE */}
          <div className={styles.profileCard}>
            <div className={styles.avatar}>
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  interviewerInfo.fullName
                )}&background=0D8ABC&color=fff`}
                alt="Avatar"
              />
            </div>

            <h3 className={styles.userName}>
              {interviewerInfo.fullName}
            </h3>
            <p className={styles.userRole}>
              {interviewerInfo.role}
            </p>

            <div className={styles.divider}></div>

            <div className={styles.infoRow}>
              <span>Tháng:</span>
              <b>{formatMonth(dashboard.month)}</b>
            </div>
          </div>

          {/* TODAY OVERVIEW */}
          <div className={styles.statsCard}>
            <h4 className={styles.cardTitle}>
              Tổng quan hôm nay
            </h4>

            <div className={styles.statsGrid}>
              <div className={`${styles.statItem} ${styles.blue}`}>
                <span className={styles.statNumber}>
                  {todayOverview.totalInterviews}
                </span>
                <span className={styles.statLabel}>
                  Lịch PV
                </span>
              </div>

              <div className={`${styles.statItem} ${styles.orange}`}>
                <span className={styles.statNumber}>
                  {todayOverview.pending}
                </span>
                <span className={styles.statLabel}>
                  Đang chờ
                </span>
              </div>

              <div className={`${styles.statItem} ${styles.green}`}>
                <span className={styles.statNumber}>
                  {todayOverview.completed}
                </span>
                <span className={styles.statLabel}>
                  Hoàn thành
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* ===== MAIN ===== */}
        <main className={styles.mainContent}>
          <div className={styles.calendarSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.pageTitle}>
                Lịch phỏng vấn
              </h2>
            </div>

            <div className={styles.calendarWrapper}>
              <Calendar
                data={monthlyCalendar?.daysWithInterviews || []}
              />
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}
