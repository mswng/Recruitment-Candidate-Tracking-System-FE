import { useEffect, useState } from "react";
import styles from "./AppliedJobs.module.scss";
import {
  getAppliedJobs,
  respondOffer,
} from "../../api/services/jobsAPI";

const STAGE_MAP = {
  APPLIED: "Đã nộp hồ sơ",
  SCREENING: "Bạn đã vượt qua vòng sàng lọc, chờ lịch phỏng vấn. Lich phỏng vấn sẽ được gửi qua email.",
  INTERVIEWING: "Chờ kết quả phỏng vấn",
  OFFERED: "Bạn đã trúng tuyển! Vui lòng phản hồi offer: ",
  HIRED: "Đã trúng tuyển",
  REJECTED: "Hồ sơ bị từ chối",
};

export default function AppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const data = await getAppliedJobs();
      setJobs(Array.isArray(data) ? data : []);
    } catch {
      alert("Không lấy được danh sách ứng tuyển");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleOffer = async (applicationId, accepted) => {
    try {
      await respondOffer({
        applicationId,
        accepted,
      });

      alert("Phản hồi offer thành công");
      fetchJobs(); // ✅ FIX
    } catch (err) {
      const msg = err?.response?.data?.message;

      if (msg === "This offer has already been responded to") {
        alert("Offer này đã được phản hồi trước đó");
      } else if (msg === "application has offer") {
        alert("Chưa có offer để phản hồi");
      } else {
        alert("Có lỗi xảy ra");
      }
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className={styles.wrapper}>
      <h2>Việc làm đã ứng tuyển</h2>

      {jobs.length === 0 && <p>Bạn chưa ứng tuyển công việc nào</p>}

      <div className={styles.list}>
        {jobs.map((job) => (
          <div key={job.applicationId} className={styles.card}>
            {/* HEADER */}
            <div className={styles.header}>
              <h3>{job.jobTitle}</h3>
              <span className={styles.salary}>
                {formatSalary(job.salary)}
              </span>
            </div>

            {/* META */}
            <div className={styles.meta}>
              <span>{job.address}</span>
              <span>
                Đã ứng tuyển: {formatDate(job.appliedDate)}
              </span>
            </div>

            {/* STATUS */}
            <div
              className={`${styles.status} ${
                styles[job.currentStage]
              }`}
            >
              {STAGE_MAP[job.currentStage]}
            </div>

            {/* INTERVIEW INFO */}
            {job.currentStage === "INTERVIEWING" &&
              job.interviewSchedule && (
                <div className={styles.interviewBox}>
                  <p><b>{job.interviewSchedule.roundName}</b></p>
                  <p>
                    ⏰{" "}
                    {formatDate(
                      job.interviewSchedule.scheduledTime
                    )}
                  </p>
                  <p>
                    Hình thức: {job.interviewSchedule.interviewType}
                  </p>
                </div>
              )}

            {/* OFFER ACTION */}
            {job.currentStage === "OFFERED" && (
              <div className={styles.offerActions}>
                <button
                  className={styles.accept}
                  onClick={() =>
                    handleOffer(job.applicationId, true)
                  }
                >
                  Chấp nhận
                </button>
                <button
                  className={styles.reject}
                  onClick={() =>
                    handleOffer(job.applicationId, false)
                  }
                >
                  Từ chối
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== HELPERS ===== */
function formatDate(iso) {
  return new Date(iso).toLocaleString("vi-VN");
}

function formatSalary(salary) {
  if (!salary || salary === "0.00") return "Thỏa thuận";
  return `${Math.floor(Number(salary) / 1_000_000)} triệu`;
}
