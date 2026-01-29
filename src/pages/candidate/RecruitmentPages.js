import { useEffect, useState } from "react";
import styles from "./RecruitmentPages.module.scss";
import Logo from "../../assets/imgs/logo.png";
import { getCandidateJobs,  } from "../../api/services/jobsAPI";
import Pagination from "../../components/pagination/pagination";
import ApplyJobModal from "../../components/candidate/ApplyJobModal";
import { Link } from "react-router-dom";

export default function RecruitmentPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // BE dùng 0-based
  const [totalPages, setTotalPages] = useState(0);
  const [jobId, setJobId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const pageSize = 10;

  useEffect(() => {
     const fetchJobs = async () => {
      try {
        const data = await getCandidateJobs({
          page,
          size: pageSize,
        });

        setJobs(data.items || []);
        setTotalPages(data.totalPages || 0);
      } catch (err) {
        alert(err.message);
      }
    };

    fetchJobs();
  }, [page]);


  const formatSalary = (salary) => {
    if (!salary) return "Thỏa thuận";

    const million = Math.floor(salary / 1_000_000);
    const remainder = salary % 1_000_000;

    if (remainder === 0) {
      return `${million} triệu`;
    }

    const hundredThousand = Math.floor(remainder / 100_000);
    return `${million}tr${hundredThousand}`;
  };

    const handleApply = (e, jobId) => {
      e.preventDefault();      // chặn Link
      e.stopPropagation();     // chặn bubbling
      setJobId(jobId);
      setShowModal(true);
    };

  return (
    <div className={styles.wrapper}>
      <h2>Việc làm tuyển dụng</h2>

      <div className={styles.search}>
        <input
          type="text"
          placeholder="Tên công việc, vị trí bạn muốn ứng tuyển..."
        />
        <button>Tìm kiếm</button>
      </div>

      <div className={styles.list}>
        {jobs.map((job) => (
          <Link
            key={job.id}
            to={`/jobs/${job.id}`}
            className={styles.card}
          > 
            {/* LOGO */}
            <img
              src={job.company_logo || Logo}
              alt="logo"
              className={styles.logo}
            />

            <div className={styles.content}>
              <div className={styles.titleRow}>
                <h3>{job.title}</h3>
                <span className={styles.salary}>{formatSalary(job.basicSalary)}</span>
              </div>

              <p className={styles.company}>Số lượng: {job.quantity}</p>

              <div className={styles.meta}>
                <span>{job.address}</span>
                {job.experience && <span>{job.experience}</span>}
              </div>

              <div className={styles.tags}>
                {job.tags?.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.actions}>
              <button 
                className={styles.applyBtn}
                onClick={(e) => handleApply(e, job.id)}
              > Ứng tuyển</button>
            </div>
          </Link>
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      {showModal && (
        <ApplyJobModal
          jobId={jobId}
          onClose={() => setShowModal(false)}
        />
      )}

    </div>
    
  );
}
