import React from "react";
import styles from "./HomePage.module.scss";
import heroImage from "../../assets/imgs/hero-interview.jpg";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          {/* LEFT */}
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>CƠ HỘI NGHỀ NGHIỆP</span>

            <h1>
              Gia nhập <span>RecruitHub</span>
            </h1>

            <p>
              Nền tảng kết nối nhân tài công nghệ với các doanh nghiệp hàng đầu
              tại Việt Nam và quốc tế.
            </p>

            <div className={styles.heroActions}>
              <button className={styles.primaryBtn}>Ứng tuyển ngay</button>
              <button className={styles.secondaryBtn}>Khám phá thêm</button>
            </div>
          </div>

          {/* RIGHT */}
          <div className={styles.heroImageWrap}>
            <img src={heroImage} alt="RecruitHub Interview" />

          
              
          
            
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className={styles.stats}>
        <div className={styles.statsGrid}>
          <div>
            <h3>6+</h3>
            <span>Vị trí đang tuyển</span>
          </div>
          <div>
            <h3>2018</h3>
            <span>Năm thành lập</span>
          </div>
          <div>
            <h3>300+</h3>
            <span>Nhân sự</span>
          </div>
          <div>
            <h3>98%</h3>
            <span>Nhân viên hài lòng</span>
          </div>
        </div>
      </section>


      {/* VALUES */}
      <section className={styles.values}>
        <h2 className={styles.sectionTitle}>Giá trị chúng tôi mang lại</h2>
        <div className={styles.valueGrid}>
          <div className={styles.valueCard}>
            <h3>Đào tạo và Mentoring</h3>
            <p>Chương trình đào tạo nội bộ, mentoring một kèm một cùng chuyên gia.</p>
          </div>
          <div className={styles.valueCard}>
            <h3>Lộ trình rõ ràng</h3>
            <p>Đánh giá minh bạch, thăng tiến dựa trên năng lực.</p>
          </div>
          <div className={styles.valueCard}>
            <h3>Dự án lớn</h3>
            <p>Tham gia các dự án công nghệ quy mô doanh nghiệp.</p>
          </div>
          <div className={styles.valueCard}>
            <h3>Môi trường quốc tế</h3>
            <p>Hợp tác toàn cầu, văn hóa làm việc hiện đại.</p>
          </div>
        </div>
      </section>

      {/* JOBS */}
      <section className={styles.jobs}>
        <h2 className={styles.sectionTitle}>Vị trí đang tuyển</h2>
        <div className={styles.jobGrid}>
          <div className={styles.jobCard}>
            <span className={styles.hot}>HOT</span>
            <h3>React Developer</h3>
            <p>Hà Nội / Remote • Full-time</p>
            <strong>15 – 25 triệu</strong>
            <button>Ứng tuyển ngay</button>
          </div>

          <div className={styles.jobCard}>
            <span className={styles.hot}>HOT</span>
            <h3>Backend Java</h3>
            <p>TP.HCM • Full-time</p>
            <strong>18 – 30 triệu</strong>
            <button>Ứng tuyển ngay</button>
          </div>

          <div className={styles.jobCard}>
            <h3>UI/UX Designer</h3>
            <p>Hybrid • Part-time</p>
            <strong>12 – 20 triệu</strong>
            <button>Ứng tuyển ngay</button>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className={styles.news}>
        <h2 className={styles.sectionTitle}>Tin tức và Thông báo</h2>
        <div className={styles.newsGrid}>
          <div className={styles.newsCard}>
            <h3>Văn hóa làm việc tại RecruitHub</h3>
            <p>Môi trường trẻ trung, sáng tạo, minh bạch.</p>
            <span>14/01/2026</span>
          </div>

          <div className={styles.newsCard}>
            <h3>Quy trình tuyển dụng minh bạch</h3>
            <p>Mọi bước rõ ràng từ CV đến offer.</p>
            <span>13/01/2026</span>
          </div>

          <div className={styles.newsCard}>
            <h3>Cơ hội phát triển dài hạn</h3>
            <p>Lộ trình nghề nghiệp và đào tạo bài bản.</p>
            <span>12/01/2026</span>
          </div>
        </div>
      </section>
    </>
  );
}
