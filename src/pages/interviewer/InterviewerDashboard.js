import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../admin/Dashboard.module.scss";

export default function InterviewerDashboard() {
  const navigate = useNavigate();

  const interviews = [
    {
      id: 1,
      name: "Thomas Alva",
      position: "Backend Developer",
      time: "11:30 AM",
      status: "Pending",
    },
    {
      id: 2,
      name: "Masum Billah",
      position: "UI/UX Designer",
      time: "12:00 PM",
      status: "Completed",
    },
    {
      id: 3,
      name: "Smith Lives",
      position: "Content Writer",
      time: "12:30 PM",
      status: "Pending",
    },
  ];

  return (
    <div className={styles.dashboard}>
      {/* ===== TOP BAR ===== */}
      <header className={styles.topbar}>
        <div className={styles.brand}>Interviewer Dashboard</div>

        <nav className={styles.menu}>
          <button className={styles.active}>Dashboard</button>
          <button>Interview Schedule</button>
          <button>Candidate Resume</button>
          <button>Evaluation</button>
        </nav>

        <button
          className={styles.logoutBtn}
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </header>

      <div className={styles.container}>
        {/* ===== INTERVIEW LIST ===== */}
        <div className={styles.chartBox}>
          <h4>Interview Schedule</h4>

          <div className={styles.interviewHeader}>
            <span>Candidate</span>
            <span>Position</span>
            <span>Time</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {interviews.map((i) => (
            <div key={i.id} className={styles.interviewRow}>
              <span>{i.name}</span>
              <span>{i.position}</span>
              <span>{i.time}</span>
              <span>{i.status}</span>

              <div className={styles.actionBtns}>
                <button className={styles.blueBtn}>View Resume</button>
                <button className={styles.greenBtn}>Conduct</button>
                <button className={styles.yellowBtn}>Evaluate</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
