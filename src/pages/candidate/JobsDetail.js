import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./JobsDetail.module.scss";
import MoreJobs from "../../components/candidate/MoreJobs";
import { getJobDetail } from "../../api/services/jobsAPI";

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
      const sameMoreJobs = [
        {
        id: 1,
        title: "DotNET Developer",
        company: "CÔNG TY CỔ PHẦN EDUVATOR",
        location: "Hồ Chí Minh (mới)",
        deadline: "Còn 16 ngày để ứng tuyển",
        updated: "Cập nhật 14 phút trước",
        salary: "Thỏa thuận",
        logo: "/logo.png",
        },
        {
        id: 2,
        title: "Educational Consultant",
        company: "CÔNG TY CỔ PHẦN EDUVATOR",
        location: "Hà Nội & Hồ Chí Minh",
        deadline: "Còn 7 ngày để ứng tuyển",
        updated: "Cập nhật 1 giờ trước",
        salary: "15 - 25 triệu",
        logo: "/logo.png",
        },
    ];

  useEffect(() => {
    const fetchJob = async () => {
      try {
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
  

  if (loading) return <p>Đang tải...</p>;
  if (!job) return <p>Không tìm thấy công việc</p>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* ===== HEADER ===== */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>{job.title}</h1>

            <div className={styles.company}>
              {job.companyName}
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
            <button className={styles.applyBtn}>
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

      {/* JOB LIÊN QUAN – TẠM GIỮ */}
       <MoreJobs jobs={sameMoreJobs}/>
    </div>
  );
}
