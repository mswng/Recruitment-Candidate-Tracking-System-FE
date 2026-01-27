import { useState } from "react";
import styles from "./Profile.module.scss";

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs}>
        <button
          className={activeTab === "info" ? styles.active : ""}
          onClick={() => setActiveTab("info")}
        >
          Thông tin cá nhân
        </button>
        <button
          className={activeTab === "password" ? styles.active : ""}
          onClick={() => setActiveTab("password")}
        >
          Đổi mật khẩu
        </button>
      </div>

      {activeTab === "info" && (
        <div className={styles.card}>
          <h3>Cài đặt thông tin cá nhân</h3>
          <p className={styles.note}> <span className={styles.noteRequired}></span>Các thông tin bắt buộc</p>

          <div className={styles.formGroup}>
            <label className={styles.required}>Họ và tên </label>
            <input type="text" defaultValue="Đoàn Thị Thanh Sương" />
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="email" value="mariathanhsuong1206@gmail.com" disabled />
          </div>

          <button className={styles.saveBtn}>Lưu</button>
        </div>
      )}

      {activeTab === "password" && (
        <div className={styles.card}>
          <h3>Thay đổi mật khẩu đăng nhập</h3>

          <div className={styles.formGroupInline}>
            <label>Email đăng nhập</label>
            <input type="email" value="mariathanhsuong1206@gmail.com" disabled />
          </div>

          <div className={styles.formGroupInline}>
            <label className={styles.required}>Mật khẩu hiện tại</label>
            <input type="password" />
          </div>

          <div className={styles.formGroupInline}>
            <label className={styles.required}>Mật khẩu mới</label>
            <input type="password" />
          </div>

          <div className={styles.formGroupInline}>
            <label className={styles.required}>Nhập lại mật khẩu mới</label>
            <input type="password" />
          </div>

          <button className={styles.saveBtn}>Lưu</button>
        </div>
      )}
    </div>
  );
}
