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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchData.keyword) {
      navigate(`/jobs?keyword=${searchData.keyword}&location=${searchData.location}&field=${searchData.field}`);
    }
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
                  <option value="it">IT / Công nghệ</option>
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

      <div className={styles.jobsPreview}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Việc Làm Nổi Bật</h2>
          <div className={styles.jobsGrid}>
            {[1, 2, 3, 4, 5, 6].map(job => (
              <div key={job} className={styles.jobCard}>
                <div className={styles.jobCompany}>TechCorp</div>
                <h3>React Developer</h3>
                <p className={styles.location}>📍 Hà Nội</p>
                <p className={styles.salary}>💰 15 - 25 triệu</p>
                <p className={styles.description}>
                  Tìm kiếm React Developer có kinh nghiệm 2+ năm...
                </p>
                <button className={styles.btnApply}>Ứng tuyển</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
