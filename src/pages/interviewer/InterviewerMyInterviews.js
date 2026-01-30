import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./InterviewerMyInterviews.module.scss";
import { getInterviewerInterviews, getResumeLink } from "../../api/services/interviewerAPI";


export default function InterviewerMyInterviews() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===== FETCH INTERVIEWS ===== */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInterviewerInterviews();
        setList(Array.isArray(data) ? data : []);
      } catch (err) {
        alert("Không lấy được danh sách phỏng vấn");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ===== VIEW CV ===== */
  const handleViewCV = async (applicationId) => {
    try {
      const link = await getResumeLink(applicationId);
      window.open(link, "_blank");
    } catch {
      alert("Không lấy được CV");
    }
  };

  if (loading) return <p>Đang tải...</p>;

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.card} ${styles.reviewCard}`}>
        <h3 className={styles.centerTitle}>Danh sách ứng viên</h3>

        {list.length === 0 && <p>Không có lịch phỏng vấn</p>}

        <div className={styles.scheduleTable}>
          {list.map((c) => (
            <div key={c.id} className={styles.scheduleRow}>
              {/* TIME */}
              <div className={`${styles.scheduleCell} ${styles.timeCell}`}>
                {c.time}
              </div>

              {/* INFO */}
              <div className={`${styles.scheduleCell} ${styles.infoCell}`}>
                <h4>{c.candidateName}</h4>
                <p>{c.positionTitle}</p>
              </div>

              {/* ACTION */}
              <div className={`${styles.scheduleCell} ${styles.metaCell}`}>
                <span
                  className={styles.viewCv}
                  onClick={() => handleViewCV(c.applicationId)}
                >
                  Xem CV
                </span>

                <span
                  className={styles.link}
                  onClick={() =>
                    navigate(
                      `/interviewer/review?id=${c.id}&applicationId=${c.applicationId}`
                    )
                  }
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
