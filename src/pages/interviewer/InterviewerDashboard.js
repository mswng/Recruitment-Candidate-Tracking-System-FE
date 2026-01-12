import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../admin/Dashboard.module.scss';

export default function InterviewerDashboard() {
  const [stats] = useState({
    totalInterviews: 15,
    upcomingInterviews: 5,
    completedInterviews: 9,
    pendingEvaluations: 2
  });

  const [upcomingInterviews] = useState([
    {
      id: 1,
      candidate: 'Nguyễn Văn A',
      position: 'React Developer',
      time: '2024-01-20 10:00',
      meetingLink: 'https://meet.google.com/abc'
    },
    {
      id: 2,
      candidate: 'Trần Thị B',
      position: 'Backend Developer',
      time: '2024-01-22 14:00',
      meetingLink: 'https://meet.google.com/def'
    }
  ]);

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Dashboard Interviewer</h1>
          <p>Quản lý lịch phỏng vấn</p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📅</div>
            <div className={styles.statContent}>
              <h3>{stats.totalInterviews}</h3>
              <p>Tổng phỏng vấn</p>
            </div>
            <Link to="/interviews" className={styles.statLink}>→</Link>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>⏰</div>
            <div className={styles.statContent}>
              <h3>{stats.upcomingInterviews}</h3>
              <p>Sắp phỏng vấn</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>✅</div>
            <div className={styles.statContent}>
              <h3>{stats.completedInterviews}</h3>
              <p>Đã hoàn thành</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>📝</div>
            <div className={styles.statContent}>
              <h3>{stats.pendingEvaluations}</h3>
              <p>Chưa đánh giá</p>
            </div>
          </div>
        </div>

        <div className={styles.managementSection}>
          <h2>Lịch phỏng vấn sắp tới</h2>
          <div className={styles.interviewsList}>
            {upcomingInterviews.map(interview => (
              <div key={interview.id} className={styles.interviewCard}>
                <div className={styles.interviewInfo}>
                  <h3>{interview.candidate}</h3>
                  <p>{interview.position}</p>
                  <p className={styles.time}>🕐 {interview.time}</p>
                </div>
                <div className={styles.interviewActions}>
                  <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer" className={styles.btnJoin}>
                    Vào phòng họp
                  </a>
                  <Link to={`/interviews/${interview.id}`} className={styles.btnDetail}>
                    Chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.managementSection}>
          <h2>Quản lý</h2>
          <div className={styles.managementGrid}>
            <Link to="/interviews" className={styles.managementCard}>
              <span className={styles.icon}>📅</span>
              <h3>Lịch phỏng vấn của tôi</h3>
              <p>Xem tất cả lịch được phân công</p>
              <span className={styles.arrow}>→</span>
            </Link>

            <div className={styles.managementCard}>
              <span className={styles.icon}>📊</span>
              <h3>Lịch sử đánh giá</h3>
              <p>Xem các đánh giá đã gửi</p>
              <span className={styles.arrow}>→</span>
            </div>

            <div className={styles.managementCard}>
              <span className={styles.icon}>📈</span>
              <h3>Thống kê</h3>
              <p>Báo cáo phỏng vấn</p>
              <span className={styles.arrow}>→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
