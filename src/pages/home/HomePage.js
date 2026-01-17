import React from "react";
import Header from "../../components/layouts/header/Header";
import Footer from "../../components/layouts/footer/Footer";
import styles from "./HomePage.module.scss";

export default function HomePage() {
  return (
    <>
      <Header />

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>🚀 CƠ HỘI NGHỀ NGHIỆP</span>
          <h1>
            Gia nhập <span>RecruitHub</span>
          </h1>
          <p>
            Nền tảng kết nối nhân tài công nghệ với các doanh nghiệp hàng đầu
            tại Việt Nam & quốc tế.
          </p>
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

      {/* ABOUT */}
      <section className={styles.about}>
        <div className={styles.aboutCard}>
          <h2>Về RecruitHub</h2>
          <p>
            RecruitHub được thành lập năm 2018 với sứ mệnh kết nối nhân tài công
            nghệ với các doanh nghiệp hàng đầu trong và ngoài nước.
          </p>
          <p>
            Chúng tôi tập trung xây dựng trải nghiệm tuyển dụng minh bạch,
            chuyên nghiệp, giúp ứng viên phát triển sự nghiệp dài hạn và giúp
            doanh nghiệp tiếp cận nguồn nhân lực chất lượng cao.
          </p>
          <p>
            Hiện tại RecruitHub hoạt động tại Việt Nam, Nhật Bản, Singapore và
            Châu Âu, phục vụ hơn 1.000 doanh nghiệp trong lĩnh vực CNTT,
            tài chính, thương mại điện tử và chuyển đổi số.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section className={styles.values}>
        <h2 className={styles.sectionTitle}>Giá trị chúng tôi mang lại</h2>
        <div className={styles.valueGrid}>
          <div className={styles.valueCard}>
            <h3>🎓 Đào tạo & Mentoring</h3>
            <p>Chương trình đào tạo nội bộ, mentoring 1-1 cùng chuyên gia.</p>
          </div>
          <div className={styles.valueCard}>
            <h3>📈 Lộ trình rõ ràng</h3>
            <p>Đánh giá minh bạch, thăng tiến dựa trên năng lực.</p>
          </div>
          <div className={styles.valueCard}>
            <h3>💼 Dự án lớn</h3>
            <p>Tham gia dự án công nghệ quy mô doanh nghiệp.</p>
          </div>
          <div className={styles.valueCard}>
            <h3>🌍 Môi trường quốc tế</h3>
            <p>Hợp tác toàn cầu, văn hóa hiện đại.</p>
          </div>
        </div>
      </section>

      {/* JOBS */}
      <section className={styles.jobs}>
        <h2 className={styles.sectionTitle}>🔥 Vị trí đang tuyển</h2>
        <div className={styles.jobGrid}>
          <div className={styles.jobCard}>
            <span className={styles.hot}>HOT</span>
            <h3>React Developer</h3>
            <p>📍 Hà Nội / Remote • Full-time</p>
            <strong>💰 15 – 25 triệu</strong>
            <button>Ứng tuyển ngay</button>
          </div>

          <div className={styles.jobCard}>
            <span className={styles.hot}>HOT</span>
            <h3>Backend Java</h3>
            <p>📍 TP.HCM • Full-time</p>
            <strong>💰 18 – 30 triệu</strong>
            <button>Ứng tuyển ngay</button>
          </div>

          <div className={styles.jobCard}>
            <h3>UI/UX Designer</h3>
            <p>📍 Hybrid • Part-time</p>
            <strong>💰 12 – 20 triệu</strong>
            <button>Ứng tuyển ngay</button>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className={styles.news}>
        <h2 className={styles.sectionTitle}>📰 Tin tức & Thông báo</h2>
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
            <p>Lộ trình nghề nghiệp & đào tạo bài bản.</p>
            <span>12/01/2026</span>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
