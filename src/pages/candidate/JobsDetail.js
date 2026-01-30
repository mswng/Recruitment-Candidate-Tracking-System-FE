import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./JobsDetail.module.scss";
import CompanyJobs from "../../components/candidate/MoreJobs";
import ApplyJobModal from "../../components/candidate/ApplyJobModal";
import {
  getJobDetail,
  getRelatedJobs,
} from "../../api/services/jobsAPI";

export default function JobDetail() {
  const { id } = useParams();
  const [jobId, setJobId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= JOB DETAIL =================
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const data = await getJobDetail(id);
        setJob(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // ================= RELATED JOBS =================
  useEffect(() => {
    if (!id) return;

    const fetchRelatedJobs = async () => {
      try {
        const data = await getRelatedJobs(id);
        setRelatedJobs(Array.isArray(data.items) ? data.items : []);
      } catch (err) {
        console.error("Lỗi lấy job liên quan", err);
        setRelatedJobs([]);
      }
    };

    fetchRelatedJobs();
  }, [id]);

  // ================= HELPERS =================
  const formatSalary = (salary) => {
    if (!salary || salary === 0) return "Thỏa thuận";

    const million = Math.floor(salary / 1_000_000);
    const remainder = salary % 1_000_000;

    if (remainder === 0) return `${million} triệu`;

    const hundredThousand = Math.floor(remainder / 100_000);
    return `${million}tr${hundredThousand}`;
  };

  // ================= UI =================
  if (loading) return <p>Đang tải...</p>;
  if (!job) return <p>Không tìm thấy công việc</p>;

  const handleApply = (e, jobId) => {
    e.preventDefault();
    e.stopPropagation();
    setJobId(jobId);
    setShowModal(true);
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* ===== HEADER ===== */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>{job.title}</h1>

            <div className={styles.company}>
              Người đăng: {job.createdByUsername}
            </div>

            <div className={styles.meta}>
              <div className={styles.metaItem}>
                Thu nhập:{" "}
                <span className={styles.salary}>
                  {formatSalary(job.basicSalary)}
                </span>
              </div>

              <div className={styles.metaItem}>
                Địa điểm: {job.address}
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button 
              className={styles.applyBtn}
              onClick={(e) => handleApply(e, job.id)}
            >
              Ứng tuyển ngay
            </button>
          </div>
        </div>

        {/* ===== DESCRIPTION ===== */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Mô tả công việc</h2>
          <ul className={styles.list}>
            {job.description
              ?.split("\n")
              .map((item, index) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
        </div>

        {/* ===== REQUIREMENTS ===== */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Yêu cầu ứng viên</h2>
          <ul className={styles.list}>
            {job.requirements
              ?.split("\n")
              .map((item, index) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
        </div>

        {/* ===== BENEFITS ===== */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Quyền lợi</h2>
          <ul className={styles.list}>
            {job.benefits
              ?.split("\n")
              .map((item, index) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
        </div>
      </div>

      {/* ===== RELATED JOBS ===== */}
      <CompanyJobs jobs={relatedJobs} />

      {showModal && (
        <ApplyJobModal
          jobId={jobId}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
