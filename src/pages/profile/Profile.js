import React, { useState } from 'react';
import styles from './Profile.module.scss';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('info');
  const [profileData, setProfileData] = useState({
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    address: 'Hà Nội',
    bio: 'Lập trình viên React',
    avatar: 'https://via.placeholder.com/100'
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(profileData);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setProfileData(formData);
    setEditMode(false);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <img src={profileData.avatar} alt="Avatar" className={styles.avatar} />
        <div className={styles.headerInfo}>
          <h1>{profileData.fullName}</h1>
          <p>{profileData.email}</p>
        </div>
      </div>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'info' ? styles.active : ''}`}
          onClick={() => setActiveTab('info')}
        >
          Thông tin cá nhân
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'password' ? styles.active : ''}`}
          onClick={() => setActiveTab('password')}
        >
          Đổi mật khẩu
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'info' && (
          <div className={styles.infoTab}>
            {!editMode ? (
              <>
                <div className={styles.infoItem}>
                  <label>Họ và tên:</label>
                  <p>{profileData.fullName}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>Email:</label>
                  <p>{profileData.email}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>Số điện thoại:</label>
                  <p>{profileData.phone}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>Địa chỉ:</label>
                  <p>{profileData.address}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>Giới thiệu:</label>
                  <p>{profileData.bio}</p>
                </div>
                <button className={styles.btnEdit} onClick={() => setEditMode(true)}>
                  Chỉnh sửa
                </button>
              </>
            ) : (
              <form className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Họ và tên</label>
                  <input 
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Số điện thoại</label>
                  <input 
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Địa chỉ</label>
                  <input 
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Giới thiệu</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="4"
                  />
                </div>
                <div className={styles.actions}>
                  <button type="button" className={styles.btnSave} onClick={handleSave}>
                    Lưu
                  </button>
                  <button type="button" className={styles.btnCancel} onClick={() => setEditMode(false)}>
                    Hủy
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {activeTab === 'password' && (
          <div className={styles.passwordTab}>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label>Mật khẩu hiện tại</label>
                <input type="password" placeholder="Nhập mật khẩu hiện tại" />
              </div>
              <div className={styles.formGroup}>
                <label>Mật khẩu mới</label>
                <input type="password" placeholder="Nhập mật khẩu mới" />
              </div>
              <div className={styles.formGroup}>
                <label>Xác nhận mật khẩu mới</label>
                <input type="password" placeholder="Nhập lại mật khẩu mới" />
              </div>
              <button type="submit" className={styles.btnSave}>
                Đổi mật khẩu
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
