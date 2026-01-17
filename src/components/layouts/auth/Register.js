import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import styles from "./Auth.module.scss";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <AuthLayout>
      <div className={styles.authBox}>
        <h1>Đăng ký</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Họ và tên *</label>
            <input name="fullName" onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Email *</label>
            <input name="email" type="email" onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Mật khẩu *</label>
            <input name="password" type="password" onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Xác nhận mật khẩu *</label>
            <input name="confirmPassword" type="password" onChange={handleChange} required />
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
