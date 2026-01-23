import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import styles from "./Auth.module.scss";

export default function Register() {
  return (
    <AuthLayout>
      <div className={styles.authBox}>
        <h1>Đăng ký</h1>

        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label>Họ và tên *</label>
            <input required />
          </div>

          <div className={styles.formGroup}>
            <label>Email *</label>
            <input type="email" required />
          </div>

          <div className={styles.formGroup}>
            <label>Mật khẩu *</label>
            <input type="password" required />
          </div>

          <button className={styles.btnSubmit}>Đăng ký</button>
        </form>

        <p className={styles.login}>
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
