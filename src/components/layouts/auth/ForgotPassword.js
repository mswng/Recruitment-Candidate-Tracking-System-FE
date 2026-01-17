import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import styles from "./Auth.module.scss";

export default function ForgotPassword() {
  const [email, setEmail] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail(true);
  };

  return (
    <AuthLayout>
      <div className={styles.authBox}>
        <h1>Quên mật khẩu</h1>

        {!email ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Email *</label>
              <input type="email" required />
            </div>

            <button className={styles.btnSubmit}>Gửi hướng dẫn</button>
          </form>
        ) : (
          <p>Hướng dẫn đã được gửi tới email của bạn</p>
        )}

        <p className={styles.login}>
          <Link to="/login">← Quay lại đăng nhập</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
