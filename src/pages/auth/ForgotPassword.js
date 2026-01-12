import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layouts/header/Header';
import Footer from '../../components/layouts/footer/Footer';
import styles from './Auth.module.scss';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Forgot password:', { email });
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <div className={styles.authContainer}>
        <div className={styles.authBox}>
        <h1>Quên mật khẩu?</h1>
        
        {!submitted ? (
          <>
            <p>Nhập email của bạn để lấy lại mật khẩu</p>
            <form onSubmit={handleSubmit} className={styles.form}>
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

              <button type="submit" className={styles.btnSubmit}>
                Gửi hướng dẫn
              </button>
            </form>
          </>
        ) : (
          <div className={styles.success}>
            <p>✓ Chúng tôi đã gửi hướng dẫn lấy lại mật khẩu đến email của bạn</p>
            <p>Vui lòng kiểm tra inbox hoặc spam folder</p>
          </div>
        )}

        <Link to="/login" className={styles.backLogin}>
          ← Quay lại đăng nhập
        </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
