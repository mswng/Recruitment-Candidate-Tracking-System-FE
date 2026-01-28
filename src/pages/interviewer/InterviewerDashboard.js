import React from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../hr/Calendar";
import styles from "./InterviewerDashboard.module.scss";

export default function InterviewerDashboard() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.layout}>
        {/* LEFT */}
        <div className={styles.leftCol}>
          {/* THÔNG TIN */}
          <div className={styles.card}>
            <h4 className={styles.title}>Thông tin</h4>
            <div className={styles.table}>
              <span>Họ tên:</span><b>Nguyễn Văn A</b>
              <span>Vai trò:</span><b>Interviewer</b>
              <span>Phòng ban:</span><b>Technical Team</b>
            </div>
          </div>

          {/* TỔNG QUAN */}
          <div className={styles.card}>
            <h4 className={styles.title}>Tổng quan hôm nay</h4>
            <div className={styles.table}>
              <span>Lịch phỏng vấn:</span><b>3</b>
              <span>Đang chờ:</span><b>2</b>
              <span>Đã hoàn thành:</span><b>1</b>
            </div>
          </div>

          {/* 2 CARD */}
          <div className={styles.smallGrid}>
            <div
              className={styles.smallCard}
              onClick={() => navigate("/interviewer/schedule")}
            >
              Xem lịch phỏng vấn
            </div>
            <div
              className={styles.smallCard}
              onClick={() => navigate("/interviewer/my-interviews")}
            >
              Danh sách ứng viên
            </div>
          </div>
        </div>

        {/* RIGHT - CALENDAR */}
        <div className={styles.calendarBox}>
          <Calendar data={{}} />
        </div>
      </div>
    </div>
  );
}
