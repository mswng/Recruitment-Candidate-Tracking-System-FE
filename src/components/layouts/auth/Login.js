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

    // DEMO phân quyền bằng email
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

    if (email === "candidate@recruithub.com") {
      localStorage.setItem("role", "candidate");
      navigate("/");
      return;
    }
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

          {/* QUÊN MẬT KHẨU Ở TRÊN */}
          <Link to="/forgot-password" className={styles.forgotTop}>
            Quên mật khẩu?
          </Link>

          <button className={styles.btnSubmit}>Đăng nhập</button>

          {/* ĐĂNG KÝ Ở DƯỚI */}
          <div className={styles.signup}>
            Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
