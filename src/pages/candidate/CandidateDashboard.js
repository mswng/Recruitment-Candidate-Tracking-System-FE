import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CandidateDashboard.module.scss';
import DefaultLayout from '../../components/layouts/defaultlayout/DefaultLayout';

export default function CandidateDashboard() {
  const [stats] = useState({
    appliedJobs: 12,
    pendingApplications: 5,
    interviewScheduled: 2,
    offersReceived: 1,
    savedJobs: 8,
    successRate: 67
  });

  const [applications] = useState([
    {
      id: 1,
      company: 'TechCorp',
      position: 'React Developer',
      status: 'pending',
      appliedDate: '2024-01-15',
      logo: '💻'
    },
    {
      id: 2,
      company: 'InnovateLabs',
      position: 'Full Stack Developer',
      status: 'interview',
      appliedDate: '2024-01-10',
      logo: '🚀'
    },
    {
      id: 3,
      company: 'StartupXYZ',
      position: 'Backend Developer',
      status: 'offer',
      appliedDate: '2024-01-05',
      logo: '⚡'
    }
  ]);

  const [savedJobs] = useState([
    { id: 1, position: 'Senior React Developer', company: 'Google Vietnam', location: 'TP HCM', salary: '25-35M' },
    { id: 2, position: 'DevOps Engineer', company: 'Microsoft', location: 'Hà Nội', salary: '30-40M' },
    { id: 3, position: 'Data Scientist', company: 'Amazon', location: 'Đà Nẵng', salary: '22-32M' }
  ]);

  const [suggestedJobs] = useState([
    { id: 1, position: 'Mobile Developer', company: 'Apple', match: 92, icon: '📱' },
    { id: 2, position: 'Cloud Architect', company: 'AWS', match: 85, icon: '☁️' },
    { id: 3, position: 'ML Engineer', company: 'Tesla', match: 78, icon: '🤖' }
  ]);

  const getStatusColor = (status) => {
    const colors = {
      'pending': '#ffc107',
      'interview': '#17a2b8',
      'offer': '#28a745',
      'rejected': '#dc3545'
    };
    return colors[status] || '#6c757d';
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
    <DefaultLayout>
      <div className={styles.candidateDashboard}>
        <div className={styles.dashboardHeader}>
          <div className={styles.headerContent}>
            <h1>👋 Xin chào, Nguyễn Văn A!</h1>
            <p>Đây là bảng điều khiển của bạn - Theo dõi tiến trình ứng tuyển và quản lý hồ sơ</p>
          </div>
          <Link to="/jobs" className={styles.btnFindJobs}>
            🔍 Tìm Việc Mới
          </Link>
        </div>

        <div className={styles.container}>
          {/* Thống Kê */}
          <div className={styles.statsOverview}>
            <div className={styles.statItem}>
              <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)' }}>📝</div>
              <div className={styles.statText}>
                <p className={styles.statLabel}>Đã Ứng Tuyển</p>
                <h3>{stats.appliedJobs}</h3>
              </div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #ffc107 0%, #ffb300 100%)' }}>⏳</div>
              <div className={styles.statText}>
                <p className={styles.statLabel}>Chờ Xử Lý</p>
                <h3>{stats.pendingApplications}</h3>
              </div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)' }}>🎤</div>
              <div className={styles.statText}>
                <p className={styles.statLabel}>Phỏng Vấn</p>
                <h3>{stats.interviewScheduled}</h3>
              </div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #28a745 0%, #23873b 100%)' }}>⭐</div>
              <div className={styles.statText}>
                <p className={styles.statLabel}>Nhận Offer</p>
                <h3>{stats.offersReceived}</h3>
              </div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>💾</div>
              <div className={styles.statText}>
                <p className={styles.statLabel}>Công Việc Lưu</p>
                <h3>{stats.savedJobs}</h3>
              </div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #6f42c1 0%, #5a32a3 100%)' }}>📈</div>
              <div className={styles.statText}>
                <p className={styles.statLabel}>Tỷ Lệ Thành Công</p>
                <h3>{stats.successRate}%</h3>
              </div>
            </div>
          </div>

          {/* Đơn Ứng Tuyển Gần Đây */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>📋 Đơn Ứng Tuyển Gần Đây</h2>
              <Link to="/applications" className={styles.btnViewAll}>Xem Tất Cả →</Link>
            </div>
            <div className={styles.applicationsGrid}>
              {applications.map(app => (
                <div key={app.id} className={styles.applicationCard}>
                  <div className={styles.appCardTop}>
                    <div className={styles.companyLogo}>{app.logo}</div>
                    <span 
                      className={styles.statusBadge}
                      style={{ backgroundColor: getStatusColor(app.status) }}
                    >
                      {getStatusText(app.status)}
                    </span>
                  </div>
                  <h3>{app.position}</h3>
                  <p className={styles.company}>{app.company}</p>
                  <p className={styles.appliedDate}>📅 {app.appliedDate}</p>
                  <Link to={`/applications/${app.id}`} className={styles.btnViewDetails}>
                    Xem Chi Tiết →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Công Việc Lưu & Gợi Ý */}
          <div className={styles.twoColumnSection}>
            {/* Công Việc Lưu */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>❤️ Công Việc Lưu</h2>
              </div>
              <div className={styles.jobsList}>
                {savedJobs.map(job => (
                  <div key={job.id} className={styles.jobItem}>
                    <div>
                      <h4>{job.position}</h4>
                      <p className={styles.jobCompany}>{job.company}</p>
                      <p className={styles.jobMeta}>📍 {job.location} • 💰 {job.salary}</p>
                    </div>
                    <Link to={`/jobs/${job.id}`} className={styles.btnApplyNow}>
                      Ứng Tuyển
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Gợi Ý Công Việc */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>⚡ Việc Làm Phù Hợp</h2>
              </div>
              <div className={styles.suggestedJobs}>
                {suggestedJobs.map(job => (
                  <div key={job.id} className={styles.suggestedCard}>
                    <div className={styles.suggestionHeader}>
                      <span className={styles.jobIcon}>{job.icon}</span>
                      <span className={styles.matchBadge}>{job.match}% Match</span>
                    </div>
                    <h4>{job.position}</h4>
                    <p className={styles.suggestionCompany}>{job.company}</p>
                    <div className={styles.matchBar}>
                      <div className={styles.matchProgress} style={{ width: `${job.match}%` }}></div>
                    </div>
                    <button className={styles.btnApply}>Ứng Tuyển Ngay</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quản Lý Hồ Sơ */}
          <div className={styles.section}>
            <h2>🎯 Quản Lý Hồ Sơ & Tài Khoản</h2>
            <div className={styles.managementGrid}>
              <Link to="/profile" className={styles.managementCard}>
                <span className={styles.icon}>👤</span>
                <h3>Hồ Sơ Cá Nhân</h3>
                <p>Cập nhật thông tin & CV</p>
                <span className={styles.arrow}>→</span>
              </Link>

              <Link to="/saved-jobs" className={styles.managementCard}>
                <span className={styles.icon}>💼</span>
                <h3>Công Việc Lưu</h3>
                <p>Quản lý danh sách yêu thích</p>
                <span className={styles.arrow}>→</span>
              </Link>

              <Link to="/analytics" className={styles.managementCard}>
                <span className={styles.icon}>📊</span>
                <h3>Thống Kê Ứng Tuyển</h3>
                <p>Xem lịch sử & báo cáo</p>
                <span className={styles.arrow}>→</span>
              </Link>

              <Link to="/settings" className={styles.managementCard}>
                <span className={styles.icon}>⚙️</span>
                <h3>Cài Đặt Tài Khoản</h3>
                <p>Quản lý bảo mật & thông báo</p>
                <span className={styles.arrow}>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
