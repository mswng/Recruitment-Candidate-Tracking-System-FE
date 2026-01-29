import styles from "./RecruitmentPages.module.scss";

const jobs = [
  {
    id: 1,
    companyLogo: "../../assets/imgs/logo.png",
    title: "Talent Acquisition Supervisor (Mass Recruit For Store)",
    company: "CÔNG TY TNHH JOLLIBEE VIỆT NAM",
    location: "Đà Nẵng",
    salary: "20 - 30 triệu",
    tags: ["Nổi bật", "Hybrid"],
  },
  {
    id: 2,
    companyLogo: "../../assets/imgs/logo.png",
    title: "Chuyên Viên Tuyển Dụng Thu Nhập Lên Đến 20 Triệu",
    company: "CÔNG TY TNHH HALOVN",
    location: "Hà Nội",
    salary: "14 - 20 triệu",
    tags: [],
  },
  {
    id: 3,
    companyLogo: "../../assets/imgs/logo.png",
    title: "Thực Tập Sinh / Cộng Tác Viên Hành Chính Nhân Sự",
    company: "CÔNG TY CỔ PHẦN PHÁT TRIỂN TRẠM SẠC TOÀN CẦU V-GREEN",
    location: "Hà Nội & Hồ Chí Minh",
    salary: "6 - 8 triệu",
    tags: ["Nổi bật"],
  },
];

export default function RecruitmentPage() {
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
          <div key={job.id} className={styles.card}>
            <img src={job.companyLogo} alt="logo" className={styles.logo} />

            <div className={styles.content}>
              <div className={styles.titleRow}>
                <h3>{job.title}</h3>
                <span className={styles.salary}>{job.salary}</span>
              </div>

              <p className={styles.company}>{job.company}</p>

              <div className={styles.meta}>
                <span>{job.location}</span>
                <span>{job.experience}</span>
              </div>

              <div className={styles.tags}>
                {job.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>

            <div className={styles.actions}>
              <button className={styles.applyBtn}>Ứng tuyển</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
