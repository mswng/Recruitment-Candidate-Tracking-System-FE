import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layouts/header/Header';
import Footer from '../../components/layouts/footer/Footer';
import styles from './HomePage.module.scss';

export default function HomePage() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    keyword: '',
    location: '',
    field: ''
  });

  const [companySlide, setCompanySlide] = useState(0);
  const [newsSlide, setNewsSlide] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchData.keyword) {
      navigate(`/jobs?keyword=${searchData.keyword}&location=${searchData.location}&field=${searchData.field}`);
    }
  };

  const companies = [
    { id: 1, name: 'Google', jobs: 245, logo: '🔍' },
    { id: 2, name: 'Apple', jobs: 189, logo: '🍎' },
    { id: 3, name: 'Microsoft', jobs: 312, logo: '🪟' },
    { id: 4, name: 'Samsung', jobs: 267, logo: '📱' },
    { id: 5, name: 'FPT Software', jobs: 198, logo: '💻' },
    { id: 6, name: 'Viettel Digital', jobs: 156, logo: '🌐' },
    { id: 7, name: 'Tiki', jobs: 134, logo: '🛒' },
    { id: 8, name: 'Grab Vietnam', jobs: 187, logo: '🚗' }
  ];

  const newsList = [
    {
      id: 1,
      title: 'Top 5 Kỹ Năng Quan Trọng Cho Lập Trình Viên Năm 2026',
      excerpt: 'Khám phá những kỹ năng thiết yếu mà mọi lập trình viên cần nắm vững để thành công trong sự nghiệp...',
      date: '14/01/2026',
      category: 'Career Tips',
      image: '📚'
    },
    {
      id: 2,
      title: 'Hướng Dẫn Chuẩn Bị Cho Cuộc Phỏng Vấn IT',
      excerpt: 'Những tips hữu ích để bạn tự tin và thành công trong buổi phỏng vấn công việc IT...',
      date: '13/01/2026',
      category: 'Interview',
      image: '🎯'
    },
    {
      id: 3,
      title: 'Xu Hướng Công Nghệ HR trong Năm 2026',
      excerpt: 'Tìm hiểu về các công nghệ mới đang thay đổi ngành tuyển dụng và quản lý nhân sự...',
      date: '12/01/2026',
      category: 'Technology',
      image: '🚀'
    },
    {
      id: 4,
      title: 'Cách Viết CV Ấn Tượng Để Thu Hút Nhà Tuyển Dụng',
      excerpt: 'Những lỗi thường gặp khi viết CV và cách khắc phục chúng để tăng cơ hội được nhận việc...',
      date: '11/01/2026',
      category: 'CV Tips',
      image: '📝'
    }
  ];

  const handleCompanyPrev = () => {
    setCompanySlide(prev => prev === 0 ? companies.length - 3 : prev - 1);
  };

  const handleCompanyNext = () => {
    setCompanySlide(prev => prev === companies.length - 3 ? 0 : prev + 1);
  };

  const handleNewsPrev = () => {
    setNewsSlide(prev => prev === 0 ? newsList.length - 2 : prev - 1);
  };

  const handleNewsNext = () => {
    setNewsSlide(prev => prev === newsList.length - 2 ? 0 : prev + 1);
  };

  return (
    <>
      <Header />
      
      <div className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <div className={styles.statsHighlight}>
            <span className={styles.newJobs}>CÓ <strong>+12,790</strong></span>
            <h1 className={styles.mainTitle}>VIỆC LÀM MỚI HÔM NAY</h1>
          </div>
          
          <p className={styles.subtitle}>
            Nền tảng tìm việc làm hàng đầu Việt Nam - Kết nối nhân tài với cơ hội tốt
          </p>

          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.searchContainer}>
              <div className={styles.searchGroup}>
                <span className={styles.icon}>🔍</span>
                <input
                  type="text"
                  placeholder="Từ khóa, chức danh hoặc công ty"
                  value={searchData.keyword}
                  onChange={(e) => setSearchData({ ...searchData, keyword: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={styles.searchGroup}>
                <span className={styles.icon}>📍</span>
                <select
                  value={searchData.location}
                  onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                  className={styles.input}
                >
                  <option value="">Tất cả địa điểm</option>
                  <option value="hanoi">Hà Nội</option>
                  <option value="hcm">TP Hồ Chí Minh</option>
                  <option value="danang">Đà Nẵng</option>
                  <option value="remote">Remote</option>
                </select>
              </div>

              <div className={styles.searchGroup}>
                <span className={styles.icon}>💼</span>
                <select
                  value={searchData.field}
                  onChange={(e) => setSearchData({ ...searchData, field: e.target.value })}
                  className={styles.input}
                >
                  <option value="">Ngành nghề</option>
                  <option value="it">IT / Công nghệ thông tin</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Kinh doanh / Bán hàng</option>
                </select>
              </div>

              <button type="submit" className={styles.btnSearch}>
                TÌM VIỆC
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>59,862+</div>
            <div className={styles.statLabel}>Việc làm đang tuyển</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>12,500+</div>
            <div className={styles.statLabel}>Công ty tuyển dụng</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>1M+</div>
            <div className={styles.statLabel}>Ứng viên đăng ký</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>98%</div>
            <div className={styles.statLabel}>Độ hài lòng</div>
          </div>
        </div>
      </div>

      {/* Quảng cáo Banner */}
      <div className={styles.advertisementBanner}>
        <div className={styles.container}>
          <div className={styles.adContent}>
            <h3>💼 Tìm công việc ngay hôm nay!</h3>
            <p>Hơn 50,000+ công việc đang chờ bạn. Nâng cấp kỹ năng, phát triển sự nghiệp cùng chúng tôi</p>
            <button className={styles.btnAdvert}>Khám Phá Ngay</button>
          </div>
        </div>
      </div>

      {/* Việc Làm Nổi Bật */}
      <div className={styles.jobsPreview}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Việc Làm Nổi Bật Hôm Nay</h2>
          <div className={styles.jobsGrid}>
            {[
              { id: 1, company: 'TechCorp', title: 'React Developer', location: 'Hà Nội', salary: '15 - 25 triệu', hot: true },
              { id: 2, company: 'Google Vietnam', title: 'UI/UX Designer', location: 'TP Hồ Chí Minh', salary: '20 - 30 triệu', hot: true },
              { id: 3, company: 'FPT Software', title: 'Node.js Developer', location: 'Hà Nội', salary: '18 - 28 triệu', hot: false },
              { id: 4, company: 'Tiki', title: 'Data Analyst', location: 'TP Hồ Chí Minh', salary: '16 - 26 triệu', hot: true },
              { id: 5, company: 'Viettel Digital', title: 'Full Stack Developer', location: 'Đà Nẵng', salary: '20 - 32 triệu', hot: false },
              { id: 6, company: 'Samsung Vietnam', title: 'Mobile Developer', location: 'Hà Nội', salary: '22 - 35 triệu', hot: true }
            ].map(job => (
              <div key={job.id} className={styles.jobCard}>
                {job.hot && <span className={styles.hotBadge}>🔥 Hot</span>}
                <div className={styles.jobCompany}>{job.company}</div>
                <h3>{job.title}</h3>
                <p className={styles.location}>📍 {job.location}</p>
                <p className={styles.salary}>💰 {job.salary}</p>
                <p className={styles.description}>
                  Tìm kiếm {job.title} có kinh nghiệm 2+ năm. Đại diện tập đoàn hàng đầu Việt Nam.
                </p>
                <button className={styles.btnApply}>Ứng tuyển</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Công Ty Hàng Đầu */}
      <div className={styles.topCompanies}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Công Ty Hàng Đầu Đang Tuyển Dụng</h2>
          <div className={styles.carouselWrapper}>
            <button className={styles.carouselPrev} onClick={handleCompanyPrev}>❮</button>
            <div className={styles.companiesCarousel}>
              <div className={styles.carouselTrack} style={{ transform: `translateX(-${companySlide * (100 / 3)}%)` }}>
                {companies.map(company => (
                  <div key={company.id} className={styles.companyCard}>
                    <div className={styles.companyLogo}>{company.logo}</div>
                    <h3>{company.name}</h3>
                    <p className={styles.jobCount}>{company.jobs} việc làm đang mở</p>
                    <button className={styles.btnViewCompany}>Xem Chi Tiết</button>
                  </div>
                ))}
              </div>
            </div>
            <button className={styles.carouselNext} onClick={handleCompanyNext}>❯</button>
          </div>
        </div>
      </div>

      {/* Tin Tức & Blog */}
      <div className={styles.newsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Tin Tức & Bài Viết Hữu Ích</h2>
          <div className={styles.carouselWrapper}>
            <button className={styles.carouselPrev} onClick={handleNewsPrev}>❮</button>
            <div className={styles.newsCarousel}>
              <div className={styles.carouselTrack} style={{ transform: `translateX(-${newsSlide * (100 / 2)}%)` }}>
                {newsList.map(news => (
                  <div key={news.id} className={styles.newsCard}>
                    <div className={styles.newsImage}>{news.image}</div>
                    <div className={styles.newsCategory}>{news.category}</div>
                    <h3>{news.title}</h3>
                    <p className={styles.newsExcerpt}>{news.excerpt}</p>
                    <div className={styles.newsFooter}>
                      <span className={styles.newsDate}>📅 {news.date}</span>
                      <button className={styles.btnReadMore}>Đọc Thêm →</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className={styles.carouselNext} onClick={handleNewsNext}>❯</button>
          </div>
        </div>
      </div>

      {/* Thống Kê Hữu Ích */}
      <div className={styles.insightsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Thống Kê & Thông Tin Hữu Ích</h2>
          <div className={styles.insightsGrid}>
            <div className={styles.insightCard}>
              <div className={styles.insightIcon}>💡</div>
              <h3>Lương Trung Bình</h3>
              <p className={styles.insightValue}>22 Triệu/Tháng</p>
              <p className={styles.insightDesc}>Mức lương trung bình cho vị trí IT tại Hà Nội</p>
            </div>
            <div className={styles.insightCard}>
              <div className={styles.insightIcon}>⏱️</div>
              <h3>Thời Gian Tìm Việc</h3>
              <p className={styles.insightValue}>15 Ngày</p>
              <p className={styles.insightDesc}>Trung bình thời gian từ ứng tuyển đến nhận việc</p>
            </div>
            <div className={styles.insightCard}>
              <div className={styles.insightIcon}>📈</div>
              <h3>Tỷ Lệ Thành Công</h3>
              <p className={styles.insightValue}>87%</p>
              <p className={styles.insightDesc}>Tỷ lệ ứng viên thành công trong 6 tháng</p>
            </div>
            <div className={styles.insightCard}>
              <div className={styles.insightIcon}>🎓</div>
              <h3>Chương Trình Đào Tạo</h3>
              <p className={styles.insightValue}>250+</p>
              <p className={styles.insightDesc}>Khóa học nâng cao kỹ năng chuyên môn</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Sẵn Sàng Bắt Đầu Sự Nghiệp Của Bạn?</h2>
            <p>Tham gia cộng đồng hơn 1 triệu ứng viên trên RecruitHub</p>
            <div className={styles.ctaButtons}>
              <button className={styles.btnCtaPrimary}>Đăng Ký Ngay</button>
              <button className={styles.btnCtaSecondary}>Tìm Hiểu Thêm</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
