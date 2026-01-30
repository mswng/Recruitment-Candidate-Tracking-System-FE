import {useState } from "react";
import styles from "./MoreJobs.module.scss";
import Logo from "../../assets/imgs/logo.png";
import { Link } from "react-router-dom";
import ApplyJobModal from "../../components/candidate/ApplyJobModal";

export default function JobItem({ job }) {
  const [jobId, setJobId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  if (!job) return null;

  const formatSalary = (salary) => {
    if (!salary || salary === 0) return "Thỏa thuận";

    const million = Math.floor(salary / 1_000_000);
    const remainder = salary % 1_000_000;

    if (remainder === 0) return `${million} triệu`;

    const hundredThousand = Math.floor(remainder / 100_000);
    return `${million}tr${hundredThousand}`;
  };

  const handleApply = (e, jobId) => {
    e.preventDefault();
    e.stopPropagation();
    setJobId(jobId);
    setShowModal(true);
  };
  return (
    <Link
      to={`/jobs/${job.id}`}
      className={styles.card}
    >
      {/* LEFT */}
      <div className={styles.left}>
        <img
          src={Logo}
          alt="logo"
          className={styles.logo}
        />
      </div>

      {/* CENTER */}
      <div className={styles.center}>
        <h3 className={styles.jobTitle}>
          {job.title}
        </h3>

        <div className={styles.company}>
          Người đăng: {job.createdByUsername}
        </div>

        <div className={styles.meta}>
          <span>{job.address}</span>
          <span>Hạn: {job.deadline}</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className={styles.right}>
        <div className={styles.salary}>
          {formatSalary(job.basicSalary)}
        </div>

        <button
          className={styles.applyBtn}
          onClick={(e) => handleApply(e, job.id)}
        >
          Ứng tuyển
        </button>
      </div>
    {showModal && (
      <ApplyJobModal
        jobId={jobId}
        onClose={() => setShowModal(false)}
      />
    )}
    </Link>


  );
}
