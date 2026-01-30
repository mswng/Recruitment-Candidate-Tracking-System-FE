import styles from "./MoreJobs.module.scss";
import JobItem from "./JobItem";

export default function CompanyJobs({ jobs = [] }) {
  if (jobs.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Xem thêm việc làm khác</h2>

      <div className={styles.list}>
        {jobs.map((job) => (
          <JobItem key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}


