import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../admin/Dashboard.module.scss';

export default function CandidateDashboard() {
  const [stats] = useState({
    appliedJobs: 12,
    pendingApplications: 5,
    interviewScheduled: 2,
    offersReceived: 1
  });

  const [applications] = useState([
    {
      id: 1,
      company: 'TechCorp',
      position: 'React Developer',
      status: 'pending',
      appliedDate: '2024-01-15'
    },
    {
      id: 2,
      company: 'InnovateLabs',
      position: 'Full Stack Developer',
      status: 'interview',
      appliedDate: '2024-01-10'
    },
    {
      id: 3,
      company: 'StartupXYZ',
      position: 'Backend Developer',
      status: 'offer',
      appliedDate: '2024-01-05'
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#ffc107';
      case 'interview': return '#17a2b8';
      case 'offer': return '#28a745';
      case 'rejected': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      'pending': 'Chờ xử lý',
      'interview': 'Phỏng vấn',
      'offer': 'Nhận Offer',
      'rejected': 'Từ chối'
    };
    return statusMap[status] || status;
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Dashboard Ứng viên</h1>
          <p>Quản lý đơn ứng tuyển của bạn</p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📝</div>
            <div className={styles.statContent}>
              <h3>{stats.appliedJobs}</h3>
              <p>Đã ứng tuyển</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>⏳</div>
            <div className={styles.statContent}>
              <h3>{stats.pendingApplications}</h3>
              <p>Chờ xử lý</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>🎤</div>
            <div className={styles.statContent}>
              <h3>{stats.interviewScheduled}</h3>
              <p>Phỏng vấn</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>⭐</div>
            <div className={styles.statContent}>
              <h3>{stats.offersReceived}</h3>
              <p>Nhận Offer</p>
            </div>
          </div>
        </div>

        <div className={styles.managementSection}>
          <h2>Đơn ứng tuyển gần đây</h2>
          <div className={styles.applicationsList}>
            {applications.map(app => (
              <div key={app.id} className={styles.applicationCard}>
                <div className={styles.appHeader}>
                  <div>
                    <h3>{app.position}</h3>
                    <p className={styles.company}>{app.company}</p>
                  </div>
                  <span 
                    className={styles.statusBadge}
                    style={{ backgroundColor: getStatusColor(app.status) }}
                  >
                    {getStatusText(app.status)}
                  </span>
                </div>
                <div className={styles.appFooter}>
                  <p>Ứng tuyển: {app.appliedDate}</p>
                  <Link to={`/applications/${app.id}`} className={styles.btnView}>
                    Xem chi tiết →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.managementSection}>
          <h2>Quản lý hồ sơ</h2>
          <div className={styles.managementGrid}>
            <Link to="/profile" className={styles.managementCard}>
              <span className={styles.icon}>👤</span>
              <h3>Hồ sơ cá nhân</h3>
              <p>Cập nhật thông tin & CV</p>
              <span className={styles.arrow}>→</span>
            </Link>

            <div className={styles.managementCard}>
              <span className={styles.icon}>💼</span>
              <h3>Các việc làm lưu</h3>
              <p>Quản lý danh sách yêu thích</p>
              <span className={styles.arrow}>→</span>
            </div>

            <div className={styles.managementCard}>
              <span className={styles.icon}>📊</span>
              <h3>Thống kê ứng tuyển</h3>
              <p>Xem lịch sử & báo cáo</p>
              <span className={styles.arrow}>→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
