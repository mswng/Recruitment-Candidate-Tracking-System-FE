import React, { useState } from "react";
import Calendar from "./Calendar";
import styles from "./HrDashboard.module.scss";

const interviews = {
  "2026-01-05": [
    { time: "09:00", candidate: "Nguyễn An", interviewer: "Mr. Long" },
  ],
  "2026-01-12": [
    { time: "14:00", candidate: "Trần Bình", interviewer: "Ms. Hoa" },
  ],
};

export default function HrDashboard() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className={styles.wrapper}>
      {/* ROW 1: 3 CARD */}
      <h3 className={styles.sectionTitle}></h3>

      <div className={styles.overviewGrid}>
        <div className={styles.statCard}>
          <p>CV chờ duyệt</p>
          <h2>35</h2>
        </div>
        <div className={styles.statCard}>
          <p>Job đang mở</p>
          <h2>48</h2>
        </div>
        <div className={styles.statCard}>
          <p>Phỏng vấn hôm nay</p>
          <h2>12</h2>
        </div>
      </div>

      {/* ROW 2: CALENDAR */}
      <div className={styles.calendarFull}>
        <Calendar
          data={interviews}
          onSelect={(d) => setSelectedDate(d)}
        />
      </div>
    </div>
  );
}
