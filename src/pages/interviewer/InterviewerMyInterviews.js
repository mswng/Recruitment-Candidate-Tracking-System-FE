import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./InterviewerMyInterviews.module.scss";

const LIST = [
  { id: 1, time: "09:00", name: "Thomas Alva", position: "Backend" },
  { id: 2, time: "14:00", name: "Masum Billah", position: "UI/UX" },
  { id: 3, time: "15:30", name: "Smith Lives", position: "Content" },
];

export default function InterviewerMyInterviews() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.card} ${styles.reviewCard}`}>
        <h3 className={styles.centerTitle}>Danh sách ứng viên</h3>

        <div className={styles.scheduleTable}>
          {LIST.map((c) => (
            <div key={c.id} className={styles.scheduleRow}>
              {/* TIME */}
              <div className={`${styles.scheduleCell} ${styles.timeCell}`}>
                {c.time}
              </div>

              {/* INFO */}
              <div className={`${styles.scheduleCell} ${styles.infoCell}`}>
                <h4>{c.name}</h4>
                <p>{c.position}</p>
              </div>

              {/* ACTION */}
              <div className={`${styles.scheduleCell} ${styles.metaCell}`}>
                <span
                  className={styles.viewCv}
                  onClick={() => navigate(`/interviewer/cv?id=${c.id}`)}
                >
                  Xem CV
                </span>

                <span
                  className={styles.link}
                  onClick={() => navigate(`/interviewer/review?id=${c.id}`)}
                >
                  Đánh giá
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
