import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import styles from "./Auth.module.scss";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Vui lòng nhập email");
      return;
    }

    setLoading(true);

    // Giả lập gửi email
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <AuthLayout>
      <div className={styles.authBox}>
        <h1>Quên mật khẩu</h1>
        <p className={styles.subText}>
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Email *</label>
              <input
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button className={styles.btnSubmit} disabled={loading}>
              {loading ? "Đang gửi..." : "Gửi hướng dẫn"}
            </button>
          </form>
        ) : (
          <div className={styles.successBox}>
            <p>Hướng dẫn đã được gửi tới:</p>
            <strong>{email}</strong>
          </div>
        )}

        <p className={styles.login}>
          <Link to="/login">← Quay lại đăng nhập</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
