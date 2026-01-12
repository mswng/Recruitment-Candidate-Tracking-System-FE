import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/layouts/header/Header';
import Footer from '../../components/layouts/footer/Footer';
import { loginUser } from '../../utils/auth';
import styles from './Auth.module.scss';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('candidate');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login
    loginUser(selectedRole);
    // Redirect to dashboard
    navigate('/dashboard');
  };

  const handleQuickLogin = (role) => {
    loginUser(role);
    navigate('/dashboard');
  };

  return (
    <div className={styles.authPage}>
      <Header />
      
      <div className={styles.authContainer}>
        <div className={styles.authBox}>
          <h1>Đăng nhập</h1>
          
          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Chọn vai trò *</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className={styles.select}
              >
                <option value="candidate">Ứng viên</option>
                <option value="admin">Admin</option>
                <option value="hr">HR</option>
                <option value="interviewer">Interviewer</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Mật khẩu *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                required
              />
            </div>

            <Link to="/forgot-password" className={styles.forgotPassword}>
              Quên mật khẩu?
            </Link>

            <button type="submit" className={styles.btnSubmit}>
              Đăng nhập
            </button>
          </form>

          <div className={styles.divider}>
            <span>HOẶC ĐĂNG NHẬP NHANH</span>
          </div>

          <div className={styles.quickLoginButtons}>
            <button 
              type="button"
              onClick={() => handleQuickLogin('candidate')}
              className={styles.btnQuickLogin}
            >
              Ứng viên
            </button>
            <button 
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className={styles.btnQuickLogin}
            >
              Admin
            </button>
            <button 
              type="button"
              onClick={() => handleQuickLogin('hr')}
              className={styles.btnQuickLogin}
            >
              HR
            </button>
            <button 
              type="button"
              onClick={() => handleQuickLogin('interviewer')}
              className={styles.btnQuickLogin}
            >
              Interviewer
            </button>
          </div>

          <p className={styles.signup}>
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
