import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./InterviewerSchedule.module.scss";

const ALL_SCHEDULE = [
  { date: "2026-01-12", time: "11:30", name: "Thomas Alva", position: "Backend", room: "201", status: "Đang chờ", id: 1 },
  { date: "2026-01-12", time: "12:00", name: "Masum Billah", position: "UI/UX", room: "105", status: "Hoàn thành", id: 2 },
  { date: "2026-01-12", time: "12:30", name: "Smith Lives", position: "Content", room: "307", status: "Đang chờ", id: 3 },
  { date: "2026-01-05", time: "09:00", name: "Nguyễn An", position: "Tester", room: "101", status: "Đang chờ", id: 4 },
];

export default function InterviewerSchedule() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const date = new URLSearchParams(search).get("date");

  const [filter, setFilter] = useState("ALL");

  let data = date
    ? ALL_SCHEDULE.filter((s) => s.date === date)
    : ALL_SCHEDULE;

  if (filter !== "ALL") {
    data = data.filter((s) => s.status === filter);
  }

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
              onClick={() => navigate(`/interviewer/workspace?id=${s.id}`)}
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
        </div>

      </div>
    </div>
  );
}
