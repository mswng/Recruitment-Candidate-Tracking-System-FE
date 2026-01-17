import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import styles from "./Auth.module.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    /**
     * PHÂN QUYỀN THEO EMAIL (DEMO)
     * Sau này thay bằng API là xong
     */
    if (email === "admin@recruithub.com") {
      localStorage.setItem("role", "admin");
      navigate("/admin/dashboard");
      return;
    }

    if (email === "hr@recruithub.com") {
      localStorage.setItem("role", "hr");
      navigate("/hr/dashboard");
      return;
    }

    if (email === "interviewer@recruithub.com") {
      localStorage.setItem("role", "interviewer");
      navigate("/interviewer/dashboard");
      return;
    }

    // mặc định là candidate
    localStorage.setItem("role", "candidate");
    navigate("/dashboard");
  };

  return (
    <AuthLayout>
      <div className={styles.authBox}>
        <h1>Đăng nhập</h1>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email công ty"
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

        <p className={styles.login}>
          Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
