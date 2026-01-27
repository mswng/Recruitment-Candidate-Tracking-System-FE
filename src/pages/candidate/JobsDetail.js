import styles from "./JobsDetail.module.scss";
import MoreJobs from "../../components/candidate/MoreJobs";

export default function JobDetail() {
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
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>
              Tư Vấn Khóa Học & Chăm Sóc Học Viên (Educational Consultant)
            </h1>
            <div className={styles.company}>
              Công ty TNHH Giáo Dục ABC
            </div>

            <div className={styles.meta}>
              <div className={styles.metaItem}>
                Thu nhập: <span className={styles.salary}>15 – 20 triệu</span>
              </div>
              <div className={styles.metaItem}>
                Địa điểm: Hồ Chí Minh, Hà Nội
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.applyBtn}>Ứng tuyển ngay</button>
          </div>
        </div>

        {/* Sections */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Mô tả công việc</h2>
          <ul className={styles.list}>
            <li>Tư vấn trực tiếp / gián tiếp các khóa học phù hợp</li>
            <li>Chăm sóc học viên trong suốt quá trình học</li>
            <li>Hoàn thành KPI được giao</li>
            <li>Tham gia sản xuất nội dung truyền thông</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Yêu cầu ứng viên</h2>
          <ul className={styles.list}>
            <li>Tốt nghiệp Cao đẳng trở lên</li>
            <li>Không yêu cầu kinh nghiệm</li>
            <li>Kỹ năng giao tiếp tốt</li>
            <li>Độ tuổi 20 – 32</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Quyền lợi</h2>
          <ul className={styles.list}>
            <li>Lương + thưởng hiệu quả</li>
            <li>Đào tạo bài bản</li>
            <li>Đóng BHXH, BHYT</li>
            <li>Môi trường trẻ trung</li>
          </ul>
        </div>
      </div>
      <MoreJobs jobs={sameMoreJobs} />
    </div>

    
  );
}
