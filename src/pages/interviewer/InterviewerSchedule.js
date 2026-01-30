import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./InterviewerSchedule.module.scss";
import { getInterviewerInterviews } from "../../api/services/interviewerAPI";

export default function InterviewerSchedule() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const date = new URLSearchParams(search).get("date");

  const [filter, setFilter] = useState("ALL");
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInterviewerInterviews();

        const mapped = data.map((i) => ({
          id: i.id,
          date: i.interviewDate,
          time: i.interviewTime,
          name: i.candidateName,
          position: i.position,
          room: i.room,
          status: mapStatus(i.status),
        }));

        setSchedules(mapped);
      } catch (e) {
        alert("Không lấy được lịch phỏng vấn");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  let data = date
    ? schedules.filter((s) => s.date === date)
    : schedules;

  if (filter !== "ALL") {
    data = data.filter((s) => s.status === filter);
  }

  if (loading) return <p>Đang tải...</p>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h3>
          {date
            ? `Lịch phỏng vấn ngày ${date.split("-").reverse().join("/")}`
            : "Tất cả lịch phỏng vấn"}
        </h3>

        {/* FILTER */}
        <div className={styles.filterRow}>
          <button
            className={filter === "ALL" ? styles.activeFilter : ""}
            onClick={() => setFilter("ALL")}
          >
            Tất cả
          </button>
          <button
            className={filter === "Đang chờ" ? styles.activeFilter : ""}
            onClick={() => setFilter("Đang chờ")}
          >
            Đang chờ
          </button>
          <button
            className={filter === "Hoàn thành" ? styles.activeFilter : ""}
            onClick={() => setFilter("Hoàn thành")}
          >
            Hoàn thành
          </button>
        </div>

        {/* LIST */}
        <div className={styles.scheduleTable}>
          {data.map((s) => (
            <div
              key={s.id}
              className={styles.scheduleRow}
              onClick={() =>
                navigate(`/interviewer/workspace?id=${s.id}`)
              }
            >
              <div className={`${styles.scheduleCell} ${styles.timeCell}`}>
                {s.time}
              </div>

              <div className={`${styles.scheduleCell} ${styles.infoCell}`}>
                <h4>{s.name}</h4>
                <p>{s.position}</p>
              </div>

              <div className={`${styles.scheduleCell} ${styles.metaCell}`}>
                <span>Phòng {s.room}</span>
                <span
                  className={
                    s.status === "Đang chờ"
                      ? styles.badgePending
                      : styles.badgeDone
                  }
                >
                  {s.status}
                </span>
              </div>
            </div>
          ))}

          {data.length === 0 && (
            <p style={{ textAlign: "center" }}>
              Không có lịch phỏng vấn
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* helper */
const mapStatus = (status) => {
  if (status === "PENDING") return "Đang chờ";
  if (status === "COMPLETED") return "Hoàn thành";
  return status;
};
