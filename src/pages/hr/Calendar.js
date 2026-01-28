import React, { useState } from "react";
import styles from "./Calendar.module.scss";

export default function Calendar({ data }) {
  const [month, setMonth] = useState(0);
  const year = 2026;
  const [active, setActive] = useState(null);

  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  const days = [];
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const format = (d) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button onClick={() => setMonth(month - 1)}>&lt;</button>
        <span>Tháng {month + 1} / {year}</span>
        <button onClick={() => setMonth(month + 1)}>&gt;</button>
      </div>

      <div className={styles.week}>
        {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className={styles.grid}>
        {days.map((d, i) => {
          if (!d) return <div key={i}></div>;
          const key = format(d);
          const events = data[key];

          return (
            <div
              key={i}
              className={`${styles.day} ${
                key === todayKey ? styles.today : ""
              }`}
              onClick={() => setActive(active === key ? null : key)}
            >
              {d}
              {events && <span className={styles.dot}></span>}

              {active === key && (
                <div className={styles.tooltip}>
                  {events ? (
                    events.map((e, idx) => (
                      <div key={idx} className={styles.tipItem}>
                        <b>{e.time}</b> – {e.candidate}
                        <p>PV: {e.interviewer}</p>
                      </div>
                    ))
                  ) : (
                    <p className={styles.empty}>Không có lịch</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
