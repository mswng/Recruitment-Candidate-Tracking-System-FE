import styles from "./AppliedJobs.module.scss";

const STATUS_MAP = {
  WAIT_INTERVIEW: "Chờ lịch phỏng vấn",
  WAIT_RESULT: "Chờ kết quả phỏng vấn",
  PASSED: "Chúc mừng bạn đã trúng tuyển",
  FAILED: "Ứng tuyển thất bại",
};

const jobs = [
  {
    id: 1,
    title: "Thực Tập Sinh / Cộng Tác Viên Hành Chính Nhân Sự",
    salary: "6 - 8 triệu",
    location: "Hà Nội & Hồ Chí Minh",
    appliedAt: "23-01-2026 23:36",
    status: "WAIT_INTERVIEW",
  },
  {
    id: 2,
    title: "Frontend Intern (ReactJS)",
    salary: "5 - 7 triệu",
    location: "Hà Nội",
    appliedAt: "20-01-2026 09:10",
    status: "WAIT_RESULT",
  },
  {
    id: 3,
    title: "Nhân Viên Hành Chính",
    salary: "8 - 10 triệu",
    location: "TP. Hồ Chí Minh",
    appliedAt: "18-01-2026 14:22",
    status: "PASSED",
  },
  {
    id: 4,
    title: "Thực Tập Sinh Backend",
    salary: "Không lương",
    location: "Remote",
    appliedAt: "15-01-2026 10:00",
    status: "FAILED",
  },
];

export default function AppliedJobs() {
  return (
    <div className={styles.wrapper}>
      <h2>Việc làm đã ứng tuyển</h2>

      <div className={styles.list}>
        {jobs.map((job) => (
          <div key={job.id} className={styles.card}>
            <div className={styles.header}>
              <div>
                <h3>{job.title}</h3>
              </div>
              <span className={styles.salary}>{job.salary}</span>
            </div>

            <div className={styles.meta}>
              <span>{job.location}</span>
              <span>Đã ứng tuyển: {job.appliedAt}</span>
            </div>

            <div className={`${styles.status} ${styles[job.status]}`}>
              {STATUS_MAP[job.status]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
