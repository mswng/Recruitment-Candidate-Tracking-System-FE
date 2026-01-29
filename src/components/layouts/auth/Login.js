import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import styles from "./Auth.module.scss";
import { login } from "../../../api/server/loginAPI";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Khởi tạo đầy đủ -> không uncontrolled warning
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await login({
        email: form.email,
        password: form.password,
      });

      // BE trả về result.token
      if (!result?.token) {
        alert("Sai email hoặc mật khẩu!");
        return;
      }

      // Giải mã JWT
      const decoded = jwtDecode(result.token);

      // Scope nằm trong payload: decoded.scope
      const role = decoded.scope; // ADMIN | TUTOR | LEARNER

      console.log("Decoded token:", decoded);
      console.log("Role:", role);

      // Lưu token và role cho phiên hiện tại
      localStorage.setItem("token", result.token);
      if (role) {
        localStorage.setItem("role", role);
      }

      // Điều hướng theo role
      let redirectPath = "/";
      switch (role) {
        case "ADMIN":
          redirectPath = "/admin/dashboard";
          break;
        case "HR":
          redirectPath = "/hr/dashboard";
          break;
        case "INTERVIEWER":
          redirectPath = "/interviewer/dashboard";
          break;
        default:
          redirectPath = "/";
      }

      // Refresh trang để cập nhật giao diện và trạng thái
      window.location.href = redirectPath;
    } catch (error) {
      console.error("Login error:", error);
      alert("Sai email hoặc mật khẩu!");
    }
  };

  return (
    <AuthLayout>
      <div className={styles.authBox}>
        <h1>Đăng nhập</h1>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formGroup}>
            <label>
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Nhập email"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>
              Mật khẩu <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Mật khẩu"
              required
            />
          </div>

          <Link to="/forgot-password" className={styles.forgotTop}>
            Quên mật khẩu?
          </Link>

          <button type="submit" className={styles.btnSubmit}>
            Đăng nhập
          </button>

          <div className={styles.signup}>
            Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
