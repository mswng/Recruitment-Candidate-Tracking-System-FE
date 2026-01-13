import React, { useState } from 'react';
import styles from './Profile.module.scss';

export default function Profile() {
  const [profileData, setProfileData] = useState({
    fullName: 'Thanh Truc Vo',
    email: 'vothanhtruc2401@gmail.com',
    phone: '0123456789',
    avatar: 'https://via.placeholder.com/150'
  });

  const [activeTab, setActiveTab] = useState('desires');
  const [toggles, setToggles] = useState({
    jobAlert: true,
    jobSearch: true,
    vipJob: false
  });

  const stats = [
    { label: 'CV đã tạo', value: 0, icon: '📄', subtext: 'CV chưa duyệt' },
    { label: 'Hộ sơ đã ứng tuyển', value: 0, icon: '👥', subtext: 'Hộ sơ NTD đã xem' },
    { label: 'NTD đã xem hộ sơ', value: 0, icon: '🏢', subtext: 'NTD đã lưu hộ sơ' },
    { label: 'Việc làm đã xem', value: 0, icon: '💼', subtext: 'Việc làm đã lưu' }
  ];

  return (
    <div className={styles.profileContainer}>
      {/* Profile Header */}
      <div className={styles.profileHeader}>
        <div className={styles.headerContent}>
          <img src={profileData.avatar} alt="Avatar" className={styles.avatar} />
          <div className={styles.userInfo}>
            <h1>{profileData.fullName}</h1>
            <p>{profileData.email}</p>
          </div>
          <button className={styles.editBtn}>✏️ Sửa</button>
        </div>
      </div>

      {/* Toggle Switches */}
      <div className={styles.toggleSection}>
        <div className={styles.toggleItem}>
          <label>Việc tức thị</label>
          <input 
            type="checkbox" 
            checked={toggles.jobAlert}
            onChange={(e) => setToggles({...toggles, jobAlert: e.target.checked})}
            className={styles.toggle}
          />
        </div>
        <div className={styles.toggleItem}>
          <label>Tìm việc</label>
          <input 
            type="checkbox" 
            checked={toggles.jobSearch}
            onChange={(e) => setToggles({...toggles, jobSearch: e.target.checked})}
            className={styles.toggle}
          />
        </div>
        <div className={styles.toggleItem}>
          <label>Sản job VIP</label>
          <input 
            type="checkbox" 
            checked={toggles.vipJob}
            onChange={(e) => setToggles({...toggles, vipJob: e.target.checked})}
            className={styles.toggle}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsSection}>
        {stats.map((stat, idx) => (
          <div key={idx} className={styles.statCard}>
            <div className={styles.statNumber}>{stat.value}</div>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statLabel}>{stat.label}</div>
            <div className={styles.statSubtext}>{stat.subtext}</div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className={styles.contentWrapper}>
        <div className={styles.mainContent}>
          {/* Tabs */}
          <div className={styles.tabsSection}>
            <div className={styles.tabs}>
              <button 
                className={`${styles.tab} ${activeTab === 'desires' ? styles.active : ''}`}
                onClick={() => setActiveTab('desires')}
              >
                ★ Mong muốn của bạn
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'info' ? styles.active : ''}`}
                onClick={() => setActiveTab('info')}
              >
                ✏️ Cập nhật thông tin cá nhân
              </button>
            </div>

            {/* Tab Content */}
            <div className={styles.tabContent}>
              {activeTab === 'desires' && (
                <div className={styles.desireForm}>
                  <div className={styles.formGroup}>
                    <label>Ngành nghề</label>
                    <input type="text" placeholder="Chọn ngành nghề" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Chức danh</label>
                    <input type="text" placeholder="Chọn chức danh/từ khóa quan tâm" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Địa điểm làm việc</label>
                    <input type="text" placeholder="Chọn nơi làm việc mong muốn" />
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Mức lương (VNĐ)</label>
                      <input type="number" placeholder="0" />
                    </div>
                    <span className={styles.toText}>Đến</span>
                    <div className={styles.formGroup}>
                      <label>&nbsp;</label>
                      <input type="number" placeholder="0" />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Mong muốn của bạn</label>
                    <textarea placeholder="Thông tin thêm về công việc bạn mong muốn tìm và ứng tuyển. Vì dụ: tính vực mong muốn làm việc hoặc lợi ích mong muốn..."></textarea>
                  </div>
                  <button className={styles.btnSave}>Lưu</button>
                </div>
              )}

              {activeTab === 'info' && (
                <div className={styles.infoForm}>
                  <div className={styles.formGroup}>
                    <label>Họ tên</label>
                    <input type="text" value={profileData.fullName} disabled />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email</label>
                    <input type="email" value={profileData.email} disabled />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Số điện thoại</label>
                    <input type="text" value={profileData.phone} />
                  </div>
                  <button className={styles.btnSave}>Lưu</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - CV/Cover Letter */}
        <aside className={styles.sidebar}>
          <h3>CV/Cover letter</h3>
          <div className={styles.cvSection}>
            <div className={styles.cvCard}>
              <div className={styles.cvIcon}>📝</div>
              <p>Tạo CV</p>
            </div>
            <div className={styles.cvCard}>
              <div className={styles.cvIcon}>✉️</div>
              <p>Tạo Cover letter</p>
            </div>
            <div className={styles.cvCard}>
              <div className={styles.cvIcon}>📄</div>
              <p>Quản lý CV</p>
            </div>
            <div className={styles.cvCard}>
              <div className={styles.cvIcon}>💼</div>
              <p>Quản lý Cover letter</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
