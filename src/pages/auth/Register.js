import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/layouts/header/Header';
import Footer from '../../components/layouts/footer/Footer';
import styles from './Auth.module.scss';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'candidate'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register:', formData);
    // Redirect to login page after successful registration
    navigate('/login');
  };

  return (
    <div className={styles.authPage}>
      <Header />
      
      <div className={styles.authContainer}>
        <div className={styles.authBox}>
        <h1>Đăng ký</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Chọn vai trò *</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="candidate">Ứng viên</option>
              <option value="admin">Admin</option>
              <option value="hr">HR</option>
              <option value="interviewer">Interviewer</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Họ và tên *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Mật khẩu *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Xác nhận mật khẩu *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu"
              required
            />
          </div>

          <button type="submit" className={styles.btnSubmit}>
            Đăng ký
          </button>
        </form>

        <p className={styles.login}>
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
      </div>

      <Footer />
    </div>
  );
}
