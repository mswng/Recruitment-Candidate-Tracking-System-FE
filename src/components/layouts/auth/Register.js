import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import styles from "./Auth.module.scss";
import { registerApi } from "../../../api/authApi";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp");
      return;
    }

    try {
      await registerApi({
        fullName,
        email,
        password,
        confirmPassword,
      });

      alert("Đăng ký thành công! Vui lòng kiểm tra email để xác thực.");
      navigate("/login");

    } catch (err) {
      console.log(err?.response?.data);
      alert(err?.response?.data?.message || "Lỗi hệ thống");
    }
  };

  return (
    <AuthLayout>
      <div className={styles.authBox}>
        <h1>Đăng ký</h1>

        <form onSubmit={handleRegister} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Họ và tên *</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Mật khẩu *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Nhập lại mật khẩu *</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
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
