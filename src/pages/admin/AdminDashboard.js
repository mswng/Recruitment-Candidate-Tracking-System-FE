import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.scss';

export default function AdminDashboard() {
  // States
  const [activeTab, setActiveTab] = useState('overview');
  const [searchUser, setSearchUser] = useState('');
  const [searchJob, setSearchJob] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingJob, setEditingJob] = useState(null);

  // Form states
  const [userForm, setUserForm] = useState({ name: '', email: '', role: 'candidate' });
  const [jobForm, setJobForm] = useState({ title: '', company: '', location: '', salary: '', type: 'full-time' });

  // Sample Data
  const [stats] = useState({
    totalUsers: 1250,
    totalJobs: 89,
    activeApplications: 543,
    scheduledInterviews: 234,
    completedInterviews: 156,
    offersMade: 45
  });

  const [users, setUsers] = useState([
    { id: 1, name: 'Nguyễn Văn A', email: 'nvana@example.com', role: 'candidate', status: 'active', joined: '2024-01-10' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com', role: 'hr', status: 'active', joined: '2024-01-08' },
    { id: 3, name: 'Lê Văn C', email: 'levanc@example.com', role: 'interviewer', status: 'inactive', joined: '2024-01-05' },
    { id: 4, name: 'Phạm Minh D', email: 'phamminxd@example.com', role: 'candidate', status: 'active', joined: '2024-01-03' },
    { id: 5, name: 'Hoàng Thu E', email: 'hoangthue@example.com', role: 'candidate', status: 'pending', joined: '2024-01-01' },
  ]);

  const [jobs, setJobs] = useState([
    { id: 1, title: 'Senior React Developer', company: 'Tech Corp', location: 'HCM', salary: '25-35M', type: 'full-time', applications: 28, status: 'active' },
    { id: 2, title: 'UI/UX Designer', company: 'Creative Studio', location: 'Hanoi', salary: '18-25M', type: 'full-time', applications: 15, status: 'active' },
    { id: 3, title: 'DevOps Engineer', company: 'Cloud Solutions', location: 'Remote', salary: '30-40M', type: 'contract', applications: 12, status: 'closed' },
    { id: 4, title: 'Product Manager', company: 'Startup Hub', location: 'HCM', salary: '22-30M', type: 'full-time', applications: 35, status: 'active' },
  ]);

  const [interviews, setInterviews] = useState([
    { id: 1, candidate: 'Nguyễn Văn A', position: 'React Developer', date: '2024-01-20', time: '10:00', interviewer: 'Trần Thị B', status: 'scheduled' },
    { id: 2, candidate: 'Phạm Minh D', position: 'UI Designer', date: '2024-01-21', time: '14:00', interviewer: 'Lê Văn C', status: 'scheduled' },
    { id: 3, candidate: 'Hoàng Thu E', position: 'Product Manager', date: '2024-01-19', time: '11:00', interviewer: 'Trần Thị B', status: 'completed', result: 'passed' },
  ]);

  const [applications, setApplications] = useState([
    { id: 1, candidate: 'Nguyễn Văn A', position: 'Senior React Developer', company: 'Tech Corp', appliedDate: '2024-01-10', status: 'interview_scheduled', rating: 4.5 },
    { id: 2, candidate: 'Trần Văn B', position: 'UI/UX Designer', company: 'Creative Studio', appliedDate: '2024-01-12', status: 'screening', rating: 3.8 },
    { id: 3, candidate: 'Lê Thị C', position: 'Product Manager', company: 'Startup Hub', appliedDate: '2024-01-11', status: 'rejected', rating: 2.5 },
  ]);

  // User Management Functions
  const handleAddUser = () => {
    setEditingUser(null);
    setUserForm({ name: '', email: '', role: 'candidate' });
    setShowUserModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user.id);
    setUserForm(user);
    setShowUserModal(true);
  };

  const handleSaveUser = () => {
    if (userForm.name && userForm.email) {
      if (editingUser) {
        setUsers(users.map(u => u.id === editingUser ? { ...userForm, id: editingUser } : u));
      } else {
        setUsers([...users, { ...userForm, id: Date.now(), status: 'active', joined: new Date().toISOString().split('T')[0] }]);
      }
      setShowUserModal(false);
    }
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa người dùng này?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  // Job Management Functions
  const handleAddJob = () => {
    setEditingJob(null);
    setJobForm({ title: '', company: '', location: '', salary: '', type: 'full-time' });
    setShowJobModal(true);
  };

  const handleEditJob = (job) => {
    setEditingJob(job.id);
    setJobForm(job);
    setShowJobModal(true);
  };

  const handleSaveJob = () => {
    if (jobForm.title && jobForm.company) {
      if (editingJob) {
        setJobs(jobs.map(j => j.id === editingJob ? { ...jobForm, id: editingJob } : j));
      } else {
        setJobs([...jobs, { ...jobForm, id: Date.now(), applications: 0, status: 'active' }]);
      }
      setShowJobModal(false);
    }
  };

  const handleDeleteJob = (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa công việc này?')) {
      setJobs(jobs.filter(j => j.id !== id));
    }
  };

  // Filter functions
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchUser.toLowerCase()) || 
    u.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(searchJob.toLowerCase()) ||
    j.company.toLowerCase().includes(searchJob.toLowerCase())
  );

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>⚙️ Quản Lý Admin</h1>
          <p>Quản lý toàn bộ hệ thống tuyển dụng</p>
        </div>
      </div>

      <div className={styles.container}>
        {/* Overview Stats */}
        {activeTab === 'overview' && (
          <>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>👥</div>
                <div className={styles.statContent}>
                  <h3>{stats.totalUsers}</h3>
                  <p>Tổng người dùng</p>
                  <small>↑ 12% từ tuần trước</small>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>💼</div>
                <div className={styles.statContent}>
                  <h3>{stats.totalJobs}</h3>
                  <p>Tổng công việc</p>
                  <small>↑ 5% từ tháng trước</small>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>📝</div>
                <div className={styles.statContent}>
                  <h3>{stats.activeApplications}</h3>
                  <p>Đơn ứng tuyển</p>
                  <small>↑ 23% từ tuần trước</small>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>📅</div>
                <div className={styles.statContent}>
                  <h3>{stats.scheduledInterviews}</h3>
                  <p>Phỏng vấn sắp tới</p>
                  <small>↓ 8% từ tuần trước</small>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>✅</div>
                <div className={styles.statContent}>
                  <h3>{stats.completedInterviews}</h3>
                  <p>Phỏng vấn hoàn tất</p>
                  <small>↑ 15% từ tuần trước</small>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>🎉</div>
                <div className={styles.statContent}>
                  <h3>{stats.offersMade}</h3>
                  <p>Offers được gửi</p>
                  <small>↑ 30% từ tháng trước</small>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={styles.managementSection}>
              <h2>Hành động nhanh</h2>
              <div className={styles.quickActions}>
                <button className={styles.actionBtn} onClick={handleAddUser}>
                  ➕ Thêm người dùng
                </button>
                <button className={styles.actionBtn} onClick={handleAddJob}>
                  ➕ Tạo công việc
                </button>
                <button className={styles.actionBtn}>
                  📊 Xuất báo cáo
                </button>
                <button className={styles.actionBtn}>
                  ⚙️ Cài đặt hệ thống
                </button>
              </div>
            </div>
          </>
        )}

        {/* Tabs Navigation */}
        <div className={styles.tabsNav}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.active : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Tổng quan
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'users' ? styles.active : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Quản lý Users ({users.length})
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'jobs' ? styles.active : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            💼 Quản lý Jobs ({jobs.length})
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'applications' ? styles.active : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            📋 Đơn ứng tuyển ({applications.length})
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'interviews' ? styles.active : ''}`}
            onClick={() => setActiveTab('interviews')}
          >
            📅 Phỏng vấn ({interviews.length})
          </button>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className={styles.managementSection}>
            <div className={styles.sectionHeader}>
              <h2>Quản lý Người dùng</h2>
              <button className={styles.addBtn} onClick={handleAddUser}>
                ➕ Thêm mới
              </button>
            </div>

            <div className={styles.searchFilter}>
              <input 
                type="text" 
                placeholder="🔍 Tìm kiếm theo tên hoặc email..." 
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Vai trò</th>
                    <th>Trạng thái</th>
                    <th>Ngày tham gia</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>#{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`${styles.roleBadge} ${styles[user.role]}`}>
                          {user.role === 'candidate' && '👤 Ứng viên'}
                          {user.role === 'hr' && '👔 HR'}
                          {user.role === 'interviewer' && '🎤 Interviewer'}
                          {user.role === 'admin' && '⚙️ Admin'}
                        </span>
                      </td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles[user.status]}`}>
                          {user.status === 'active' && '✅ Hoạt động'}
                          {user.status === 'inactive' && '⏸️ Vô hiệu'}
                          {user.status === 'pending' && '⏳ Chờ xác nhận'}
                        </span>
                      </td>
                      <td>{user.joined}</td>
                      <td>
                        <div className={styles.actions}>
                          <button className={styles.editBtn} onClick={() => handleEditUser(user)}>
                            ✏️ Sửa
                          </button>
                          <button className={styles.deleteBtn} onClick={() => handleDeleteUser(user.id)}>
                            🗑️ Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className={styles.managementSection}>
            <div className={styles.sectionHeader}>
              <h2>Quản lý Công việc</h2>
              <button className={styles.addBtn} onClick={handleAddJob}>
                ➕ Thêm mới
              </button>
            </div>

            <div className={styles.searchFilter}>
              <input 
                type="text" 
                placeholder="🔍 Tìm kiếm theo tên hoặc công ty..." 
                value={searchJob}
                onChange={(e) => setSearchJob(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Vị trí</th>
                    <th>Công ty</th>
                    <th>Địa điểm</th>
                    <th>Mức lương</th>
                    <th>Loại</th>
                    <th>Đơn ứng tuyển</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map(job => (
                    <tr key={job.id}>
                      <td><strong>{job.title}</strong></td>
                      <td>{job.company}</td>
                      <td>📍 {job.location}</td>
                      <td>{job.salary}</td>
                      <td>
                        <span className={`${styles.typeBadge} ${styles[job.type]}`}>
                          {job.type === 'full-time' && '💼 Toàn thời gian'}
                          {job.type === 'part-time' && '⏰ Bán thời gian'}
                          {job.type === 'contract' && '📋 Hợp đồng'}
                          {job.type === 'freelance' && '🆓 Freelance'}
                        </span>
                      </td>
                      <td>
                        <span className={styles.appCount}>{job.applications}</span>
                      </td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles[job.status]}`}>
                          {job.status === 'active' && '✅ Đang tuyển'}
                          {job.status === 'closed' && '❌ Đã đóng'}
                        </span>
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <button className={styles.editBtn} onClick={() => handleEditJob(job)}>
                            ✏️ Sửa
                          </button>
                          <button className={styles.deleteBtn} onClick={() => handleDeleteJob(job.id)}>
                            🗑️ Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className={styles.managementSection}>
            <h2>📋 Tất cả đơn ứng tuyển</h2>
            <div className={styles.cardsGrid}>
              {applications.map(app => (
                <div key={app.id} className={styles.applicationCard}>
                  <div className={styles.cardHeader}>
                    <h3>{app.candidate}</h3>
                    <span className={`${styles.statusBadge} ${styles[app.status]}`}>
                      {app.status === 'interview_scheduled' && '📅 Lên lịch phỏng vấn'}
                      {app.status === 'screening' && '🔍 Đang xét tuyển'}
                      {app.status === 'rejected' && '❌ Từ chối'}
                      {app.status === 'accepted' && '✅ Chấp nhận'}
                    </span>
                  </div>
                  <p className={styles.position}>{app.position}</p>
                  <p className={styles.company}>{app.company}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.date}>📅 {app.appliedDate}</span>
                    <span className={styles.rating}>⭐ {app.rating}/5</span>
                  </div>
                  <button className={styles.viewBtn}>Xem chi tiết →</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interviews Tab */}
        {activeTab === 'interviews' && (
          <div className={styles.managementSection}>
            <h2>📅 Lịch Phỏng vấn</h2>
            <div className={styles.interviewsList}>
              {interviews.map(interview => (
                <div key={interview.id} className={styles.interviewCard}>
                  <div className={styles.interviewCardContent}>
                    <div className={styles.interviewInfo}>
                      <h3>{interview.candidate}</h3>
                      <p className={styles.position}>{interview.position}</p>
                      <div className={styles.details}>
                        <span>📅 {interview.date} lúc {interview.time}</span>
                        <span>🎤 Phỏng vấn viên: {interview.interviewer}</span>
                      </div>
                    </div>
                    <div className={styles.interviewStatus}>
                      <span className={`${styles.statusBadge} ${styles[interview.status]}`}>
                        {interview.status === 'scheduled' && '📅 Đã lên lịch'}
                        {interview.status === 'completed' && '✅ Hoàn tất'}
                      </span>
                      {interview.result && <span className={styles.result}>Kết quả: {interview.result}</span>}
                    </div>
                  </div>
                  <div className={styles.interviewActions}>
                    <button className={styles.actionBtn}>📞 Gọi lại</button>
                    <button className={styles.actionBtn}>📧 Gửi email</button>
                    <button className={styles.actionBtn}>✏️ Sửa</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User Modal */}
      {showUserModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>{editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}</h2>
              <button className={styles.closeBtn} onClick={() => setShowUserModal(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <input 
                type="text" 
                placeholder="Tên" 
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                className={styles.input}
              />
              <input 
                type="email" 
                placeholder="Email" 
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                className={styles.input}
              />
              <select 
                value={userForm.role}
                onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                className={styles.input}
              >
                <option value="candidate">👤 Ứng viên</option>
                <option value="hr">👔 HR</option>
                <option value="interviewer">🎤 Interviewer</option>
                <option value="admin">⚙️ Admin</option>
              </select>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setShowUserModal(false)}>Hủy</button>
              <button className={styles.saveBtn} onClick={handleSaveUser}>Lưu</button>
            </div>
          </div>
        </div>
      )}

      {/* Job Modal */}
      {showJobModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>{editingJob ? 'Chỉnh sửa công việc' : 'Tạo công việc mới'}</h2>
              <button className={styles.closeBtn} onClick={() => setShowJobModal(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <input 
                type="text" 
                placeholder="Tên vị trí" 
                value={jobForm.title}
                onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                className={styles.input}
              />
              <input 
                type="text" 
                placeholder="Công ty" 
                value={jobForm.company}
                onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
                className={styles.input}
              />
              <input 
                type="text" 
                placeholder="Địa điểm" 
                value={jobForm.location}
                onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                className={styles.input}
              />
              <input 
                type="text" 
                placeholder="Mức lương" 
                value={jobForm.salary}
                onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                className={styles.input}
              />
              <select 
                value={jobForm.type}
                onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                className={styles.input}
              >
                <option value="full-time">💼 Toàn thời gian</option>
                <option value="part-time">⏰ Bán thời gian</option>
                <option value="contract">📋 Hợp đồng</option>
                <option value="freelance">🆓 Freelance</option>
              </select>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setShowJobModal(false)}>Hủy</button>
              <button className={styles.saveBtn} onClick={handleSaveJob}>Lưu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
