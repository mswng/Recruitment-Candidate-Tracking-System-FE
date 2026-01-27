import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./InterviewerDashboard.module.scss";

export default function InterviewerReview() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const id = new URLSearchParams(search).get("id");

  const [score, setScore] = useState(7);
  const [note, setNote] = useState("");

  const handleSave = () => {
    const data = {
      id,
      score,
      note,
      time: new Date().toLocaleString(),
    };

    const old = JSON.parse(localStorage.getItem("REVIEWS") || "[]");
    localStorage.setItem("REVIEWS", JSON.stringify([...old, data]));

    alert("Đã lưu đánh giá!");
    navigate("/interviewer/my-interviews");
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.card} ${styles.reviewCard}`}>
        <h3>Đánh giá ứng viên</h3>

        <table className={styles.infoTable}>
          <tbody>
            <tr>
              <td>Mã phiên</td>
              <td>#{id}</td>
            </tr>
            <tr>
              <td>Ứng viên</td>
              <td>Thomas Alva</td>
            </tr>
            <tr>
              <td>Vị trí</td>
              <td>Backend Developer</td>
            </tr>
          </tbody>
        </table>

        <div className={styles.scoreBox}>
          <label>Điểm: {score}/10</label>
          <input
            type="range"
            min="1"
            max="10"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
        </div>

        <div className={styles.noteBox}>
          <label>Nhận xét</label>
          <textarea
            placeholder="Nhập nhận xét..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className={styles.actionRow}>
          <button className={styles.primaryBtn} onClick={handleSave}>
            Lưu đánh giá
          </button>
        </div>
      </div>
    </div>
  );
}
