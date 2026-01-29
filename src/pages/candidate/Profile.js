import { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import { decodeToken } from "../../utils/decodeToken";
import { getCurrentUser } from "../../utils/getCurrentUser";
import {
  updateProfileInfo,
  changePassword,
} from "../../api/services/profileAPI";

export default function ProfileSettings() {
  const user = getCurrentUser();
  const [activeTab, setActiveTab] = useState("info");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = decodeToken(token);

    // 👇 map đúng field từ BE
    setFullName(decoded?.full_name || "");
    setEmail(decoded?.sub || "");
  }, []);


  const handleSaveInfo = async () => {
    try {
      await updateProfileInfo({ fullName });
      // ✅ LƯU LẠI
      localStorage.setItem("fullName", fullName);

      alert("Cập nhật thông tin thành công");
    } catch (err) {
      alert(err.message);
    }
  };

  // ================= PASSWORD =================
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  const handleChangePassword = async () => {
    if (
      !passwordForm.oldPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmNewPassword
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      alert("Mật khẩu mới không khớp");
      return;
    }

    try {
      await changePassword(passwordForm);
      alert("Đổi mật khẩu thành công");

      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      alert(err.message); // invalid credentials
    }
  };

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

      {/* ================= INFO TAB ================= */}
      {activeTab === "info" && (
        <div className={styles.card}>
          <h3>Cài đặt thông tin cá nhân</h3>
          <p className={styles.note}>
            <span className={styles.noteRequired}></span>Các thông tin bắt buộc
          </p>

          <div className={styles.formGroup}>
            <label className={styles.required}>Họ và tên</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="email" value={email} disabled />
          </div>

          <button className={styles.saveBtn} onClick={handleSaveInfo}>
            Lưu
          </button>
        </div>
      )}

      {/* ================= PASSWORD TAB ================= */}
      {activeTab === "password" && (
        <div className={styles.card}>
          <h3>Thay đổi mật khẩu đăng nhập</h3>

          <div className={styles.formGroupInline}>
            <label>Email đăng nhập</label>
            <input type="email" value={email} disabled />
          </div>

          <div className={styles.formGroupInline}>
            <label className={styles.required}>Mật khẩu hiện tại</label>
            <input
              type="password"
              name="oldPassword"
              value={passwordForm.oldPassword}
              onChange={handlePasswordChange}
            />
          </div>

          <div className={styles.formGroupInline}>
            <label className={styles.required}>Mật khẩu mới</label>
            <input
              type="password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
            />
          </div>

          <div className={styles.formGroupInline}>
            <label className={styles.required}>Nhập lại mật khẩu mới</label>
            <input
              type="password"
              name="confirmNewPassword"
              value={passwordForm.confirmNewPassword}
              onChange={handlePasswordChange}
            />
          </div>

          <button className={styles.saveBtn} onClick={handleChangePassword}>
            Lưu
          </button>
        </div>
      )}
    </div>
  );
}
