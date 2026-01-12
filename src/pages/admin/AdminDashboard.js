import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.scss';

export default function AdminDashboard() {
  const [stats] = useState({
    totalUsers: 1250,
    totalJobs: 89,
    activeApplications: 543,
    interviews: 234
  });

  const [recentUsers] = useState([
    { id: 1, name: 'Nguyễn Văn A', email: 'nvana@example.com', role: 'candidate', joined: '2024-01-10' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com', role: 'hr', joined: '2024-01-08' },
    { id: 3, name: 'Lê Văn C', email: 'levanc@example.com', role: 'interviewer', joined: '2024-01-05' },
  ]);

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Dashboard Admin</h1>
          <p>Quản lý hệ thống tuyển dụng</p>
        </div>
      </div>

      <div className={styles.container}>
        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>👥</div>
            <div className={styles.statContent}>
              <h3>{stats.totalUsers}</h3>
              <p>Tổng người dùng</p>
            </div>
            <Link to="/users" className={styles.statLink}>→</Link>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>💼</div>
            <div className={styles.statContent}>
              <h3>{stats.totalJobs}</h3>
              <p>Tổng việc làm</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>📝</div>
            <div className={styles.statContent}>
              <h3>{stats.activeApplications}</h3>
              <p>Đơn ứng tuyển</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>📅</div>
            <div className={styles.statContent}>
              <h3>{stats.interviews}</h3>
              <p>Lịch phỏng vấn</p>
            </div>
          </div>
        </div>

        {/* Management Section */}
        <div className={styles.managementSection}>
          <h2>Quản lý hệ thống</h2>
          <div className={styles.managementGrid}>
            <Link to="/users" className={styles.managementCard}>
              <span className={styles.icon}>👥</span>
              <h3>Quản lý người dùng</h3>
              <p>Tạo, sửa, xóa người dùng</p>
              <span className={styles.arrow}>→</span>
            </Link>

            <Link to="/pipeline" className={styles.managementCard}>
              <span className={styles.icon}>⚙️</span>
              <h3>Cấu hình Pipeline</h3>
              <p>Quản lý giai đoạn tuyển dụng</p>
              <span className={styles.arrow}>→</span>
            </Link>

            <div className={styles.managementCard}>
              <span className={styles.icon}>📊</span>
              <h3>Báo cáo & Thống kê</h3>
              <p>Xem chi tiết báo cáo</p>
              <span className={styles.arrow}>→</span>
            </div>

            <div className={styles.managementCard}>
              <span className={styles.icon}>⚡</span>
              <h3>Cấu hình hệ thống</h3>
              <p>Thiết lập các tham số hệ thống</p>
              <span className={styles.arrow}>→</span>
            </div>
          </div>
        </div>

        {/* Recent Users */}
        <div className={styles.recentSection}>
          <h2>Người dùng mới gần đây</h2>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Vai trò</th>
                  <th>Ngày tham gia</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={styles.badge}>
                        {user.role === 'candidate' ? 'Ứng viên' : user.role === 'hr' ? 'HR' : 'Interviewer'}
                      </span>
                    </td>
                    <td>{user.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
