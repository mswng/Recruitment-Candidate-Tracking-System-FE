import React, { useState } from 'react';
import styles from './MyInterviews.module.scss';

export default function MyInterviews() {
  const [interviews] = useState([
    {
      id: 1,
      candidateName: 'Nguyễn Văn A',
      position: 'React Developer',
      dateTime: '2024-01-20 10:00',
      status: 'upcoming',
      meetingLink: 'https://meet.google.com/abc'
    },
    {
      id: 2,
      candidateName: 'Trần Thị B',
      position: 'Backend Developer',
      dateTime: '2024-01-18 14:00',
      status: 'completed',
      meetingLink: 'https://meet.google.com/def'
    },
    {
      id: 3,
      candidateName: 'Lê Văn C',
      position: 'Full Stack Developer',
      dateTime: '2024-01-22 15:30',
      status: 'upcoming',
      meetingLink: 'https://meet.google.com/ghi'
    }
  ]);

  return (
    <div className={styles.container}>
      <h1>Lịch phỏng vấn của tôi</h1>

      <div className={styles.filterBar}>
        <button className={styles.filterBtn + ' ' + styles.active}>Tất cả</button>
        <button className={styles.filterBtn}>Sắp tới</button>
        <button className={styles.filterBtn}>Đã hoàn thành</button>
      </div>

      <div className={styles.interviewsList}>
        {interviews.map(interview => (
          <div key={interview.id} className={styles.interviewCard}>
            <div className={styles.cardHeader}>
              <h3>{interview.candidateName}</h3>
              <span className={`${styles.badge} ${styles[interview.status]}`}>
                {interview.status === 'upcoming' ? 'Sắp tới' : 'Đã hoàn thành'}
              </span>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.info}>
                <p><strong>Vị trí:</strong> {interview.position}</p>
                <p><strong>Thời gian:</strong> {interview.dateTime}</p>
              </div>

              <div className={styles.actions}>
                <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer" className={styles.btnLink}>
                  Vào phòng họp
                </a>
                <a href={`/interviews/${interview.id}`} className={styles.btnDetail}>
                  Chi tiết
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
