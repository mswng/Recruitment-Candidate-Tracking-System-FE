import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../admin/Dashboard.module.scss';

export default function HRDashboard() {
  const [stats] = useState({
    activeJobs: 12,
    pendingApplications: 87,
    scheduledInterviews: 25,
    offersOpen: 3
  });

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Dashboard HR</h1>
          <p>Quản lý tuyển dụng</p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>💼</div>
            <div className={styles.statContent}>
              <h3>{stats.activeJobs}</h3>
              <p>Việc làm đang mở</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>📝</div>
            <div className={styles.statContent}>
              <h3>{stats.pendingApplications}</h3>
              <p>Đơn chờ xử lý</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>📅</div>
            <div className={styles.statContent}>
              <h3>{stats.scheduledInterviews}</h3>
              <p>Phỏng vấn lên lịch</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>✨</div>
            <div className={styles.statContent}>
              <h3>{stats.offersOpen}</h3>
              <p>Offer đang mở</p>
            </div>
          </div>
        </div>

        <div className={styles.managementSection}>
          <h2>Quản lý tuyển dụng</h2>
          <div className={styles.managementGrid}>
            <div className={styles.managementCard}>
              <span className={styles.icon}>💼</span>
              <h3>Quản lý Job</h3>
              <p>Tạo, sửa, đóng việc làm</p>
              <span className={styles.arrow}>→</span>
            </div>

            <div className={styles.managementCard}>
              <span className={styles.icon}>👥</span>
              <h3>Quản lý Ứng viên</h3>
              <p>Xem hồ sơ, CV ứng viên</p>
              <span className={styles.arrow}>→</span>
            </div>

            <div className={styles.managementCard}>
              <span className={styles.icon}>🎯</span>
              <h3>Pipeline Ứng tuyển</h3>
              <p>Kéo thả ứng viên qua giai đoạn</p>
              <span className={styles.arrow}>→</span>
            </div>

            <div className={styles.managementCard}>
              <span className={styles.icon}>📅</span>
              <h3>Quản lý Phỏng vấn</h3>
              <p>Tạo lịch, gán interviewer</p>
              <span className={styles.arrow}>→</span>
            </div>

            <div className={styles.managementCard}>
              <span className={styles.icon}>⭐</span>
              <h3>Đánh giá & Offer</h3>
              <p>Xem kết quả, gửi offer</p>
              <span className={styles.arrow}>→</span>
            </div>

            <div className={styles.managementCard}>
              <span className={styles.icon}>📊</span>
              <h3>Báo cáo</h3>
              <p>Thống kê tuyển dụng</p>
              <span className={styles.arrow}>→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
