import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AuthLayout from "./AuthLayout";
import styles from "./Auth.module.scss";
import { loginApi } from "../../../api/authApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginApi({ email, password });

      console.log("LOGIN RESPONSE:", res.data);

      // Backend chỉ trả token
      const { token } = res.data.result;

      // Lưu token
      localStorage.setItem("token", token);

      // Decode token lấy role
      const decoded = jwtDecode(token);
      const role = decoded.scope;   // <-- role nằm trong claim "scope"

      localStorage.setItem("role", role);

      // Điều hướng theo role
      if (role === "ADMIN") navigate("/admin/dashboard");
      else if (role === "HR") navigate("/hr/dashboard");
      else if (role === "INTERVIEWER") navigate("/interviewer/dashboard");
      else navigate("/"); // CANDIDATE hoặc mặc định

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);
      alert("Sai email hoặc mật khẩu hoặc chưa xác thực email");
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

          <button className={styles.btnSubmit}>Đăng nhập</button>

          <div className={styles.signup}>
            Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
