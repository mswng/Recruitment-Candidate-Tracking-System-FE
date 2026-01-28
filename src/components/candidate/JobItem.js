import styles from "./MoreJobs.module.scss";

export default function JobItem({ job }) {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <img src={job.logo} alt="logo" className={styles.logo} />
      </div>

      <div className={styles.center}>
        <h3 className={styles.jobTitle}>
          {job.title}
        </h3>

        <div className={styles.company}>{job.company}</div>

        <div className={styles.meta}>
          <span>{job.location}</span>
          <span>{job.deadline}</span>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.salary}>{job.salary}</div>
        <button className={styles.applyBtn}>Ứng tuyển</button>
      </div>
    </div>
  );
}
