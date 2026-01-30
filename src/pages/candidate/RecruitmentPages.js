import { useEffect, useState } from "react";
import styles from "./RecruitmentPages.module.scss";
import Logo from "../../assets/imgs/logo.png";
import {
  getCandidateJobs,
  searchCandidateJobs,
} from "../../api/services/jobsAPI";
import Pagination from "../../components/pagination/pagination";
import ApplyJobModal from "../../components/candidate/ApplyJobModal";
import { Link } from "react-router-dom";

export default function RecruitmentPage() {
  const [jobs, setJobs] = useState([]); // luôn là array
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  const [keyword, setKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [jobId, setJobId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ================= SEARCH =================
  const handleSearch = () => {
    setPage(0);

    if (!keyword.trim()) {
      setIsSearching(false);
    } else {
      setIsSearching(true);
    }
  };

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        let data;
        if (isSearching && keyword.trim()) {
          data = await searchCandidateJobs({
            keyword,
            page,
            size: pageSize,
          });
        } else {
          data = await getCandidateJobs({
            page,
            size: pageSize,
          });
        }

        setJobs(Array.isArray(data?.items) ? data.items : []);
        setTotalPages(data?.totalPages || 0);
      } catch (err) {
        console.error(err);
        setJobs([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, isSearching, keyword]);

  // ================= HELPERS =================
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

  // ================= UI =================
  return (
    <div className={styles.wrapper}>
      <h2>Việc làm tuyển dụng</h2>

      <div className={styles.search}>
        <input
          type="text"
          placeholder="Tên công việc, vị trí bạn muốn ứng tuyển..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
      </div>

      {loading && <p>Đang tải dữ liệu...</p>}

      {!loading && jobs.length === 0 && (
        <p>Không tìm thấy công việc phù hợp</p>
      )}

      {!loading && jobs.length > 0 && (
        <div className={styles.list}>
          {jobs.map((job) => (
            <Link
              key={job.id}
              to={`/jobs/${job.id}`}
              className={styles.card}
            >
              <img
                src={Logo}
                alt="logo"
                className={styles.logo}
              />

              <div className={styles.content}>
                <div className={styles.titleRow}>
                  <h3>{job.title}</h3>
                  <span className={styles.salary}>
                    {formatSalary(job.basicSalary)}
                  </span>
                </div>

                <p className={styles.company}>
                  Số lượng: {job.quantity}
                </p>

                <div className={styles.meta}>
                  <span>{job.address}</span>
                </div>
              </div>

              <div className={styles.actions}>
                <button
                  className={styles.applyBtn}
                  onClick={(e) => handleApply(e, job.id)}
                >
                  Ứng tuyển
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}

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
