import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./InterviewerReview.module.scss";
import { evaluateInterview, getResumeLink } from "../../api/services/interviewerAPI";

export default function InterviewerReview() {
  const { search } = useLocation();
  const navigate = useNavigate();

  const interviewId = new URLSearchParams(search).get("id");
  const applicationId = new URLSearchParams(search).get("applicationId");

  const [score, setScore] = useState(80);
  const [comment, setComment] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [loading, setLoading] = useState(false);

  /* ===== GET RESUME LINK ===== */
  useEffect(() => {
    if (!applicationId) return;

    const fetchResume = async () => {
      try {
        const link = await getResumeLink(applicationId);
        setResumeLink(link);
      } catch {
        alert("Không lấy được CV ứng viên");
      }
    };

    fetchResume();
  }, [applicationId]);

  /* ===== SUBMIT EVALUATION ===== */
  const handleSave = async () => {
    if (!comment.trim()) {
      alert("Vui lòng nhập nhận xét");
      return;
    }

    setLoading(true);
    try {
      await evaluateInterview(interviewId, {
        score: Number(score),
        comment,
      });

      alert(
        score >= 80
          ? "Đánh giá xong – Ứng viên được OFFER 🎉"
          : "Đánh giá xong – Ứng viên bị REJECTED"
      );

      navigate("/interviewer/my-interviews");
    } catch {
      alert("Lưu đánh giá thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.card} ${styles.reviewCard}`}>
        <h3>Đánh giá ứng viên</h3>

        <table className={styles.infoTable}>
          <tbody>
            <tr>
              <td>Mã phiên</td>
              <td>#{interviewId}</td>
            </tr>
            <tr>
              <td>CV</td>
              <td>
                {resumeLink ? (
                  <a
                    href={resumeLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Xem CV
                  </a>
                ) : (
                  "Không có"
                )}
              </td>
            </tr>
          </tbody>
        </table>

        {/* SCORE */}
        <div className={styles.scoreBox}>
          <label>Điểm: {score}/100</label>
          <input
            type="range"
            min="0"
            max="100"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
          <p>
            Kết quả:{" "}
            <b style={{ color: score >= 80 ? "green" : "red" }}>
              {score >= 80 ? "OFFERED" : "REJECTED"}
            </b>
          </p>
        </div>

        {/* COMMENT */}
        <div className={styles.noteBox}>
          <label>Nhận xét</label>
          <textarea
            placeholder="Nhập nhận xét..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className={styles.actionRow}>
          <button
            className={styles.primaryBtn}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Đang lưu..." : "Lưu đánh giá"}
          </button>
        </div>
      </div>
    </div>
  );
}
