import React, { useState } from 'react';
import Header from '../../components/layouts/header/Header';
import Footer from '../../components/layouts/footer/Footer';
import styles from './HomePage.module.scss';

export default function HomePage() {
  const [searchData, setSearchData] = useState({
    keyword: '',
    location: '',
    field: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search:', searchData);
  };

  return (
    <>
      <Header />
      
      <div className={styles.heroBanner}>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.mainTitle}>
            Có <span className={styles.highlight}>+59,862</span> Việc Làm Đang Tuyển
          </h1>
          <p className={styles.subtitle}>
            Nền tảng tìm việc làm hàng đầu Việt Nam - Kết nối nhân tài với cơ hội việc làm tốt
          </p>

          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.searchContainer}>
              <div className={styles.searchGroup}>
                <span className={styles.icon}>🔍</span>
                <input
                  type="text"
                  placeholder="Tìm kiếm vị trí, công ty..."
                  value={searchData.keyword}
                  onChange={(e) => setSearchData({ ...searchData, keyword: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={styles.searchGroup}>
                <span className={styles.icon}>📍</span>
                <input
                  type="text"
                  placeholder="Tất cả các địa điểm"
                  value={searchData.location}
                  onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={styles.searchGroup}>
                <span className={styles.icon}>💼</span>
                <input
                  type="text"
                  placeholder="Ngành nghề"
                  value={searchData.field}
                  onChange={(e) => setSearchData({ ...searchData, field: e.target.value })}
                  className={styles.input}
                />
              </div>

              <button type="submit" className={styles.btnSearch}>
                TÌM VIỆC
              </button>
            </div>
          </form>

          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🚀</span>
              <p>Cơ hội việc làm mới mỗi ngày</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>💰</span>
              <p>Mức lương cạnh tranh</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>📱</span>
              <p>Ứng tuyển dễ dàng</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.statsSection}>
        <div className={styles.statsContainer}>
          <div className={styles.stat}>
            <h3>59,862+</h3>
            <p>Việc làm đang tuyển</p>
          </div>
          <div className={styles.stat}>
            <h3>45,000+</h3>
            <p>Công ty tuyển dụng</p>
          </div>
          <div className={styles.stat}>
            <h3>1M+</h3>
            <p>Ứng viên đăng ký</p>
          </div>
          <div className={styles.stat}>
            <h3>98%</h3>
            <p>Độ hài lòng</p>
          </div>
        </div>
      </div>

      <div className={styles.jobsPreview}>
        <div className={styles.container}>
          <h2>Việc Làm Nổi Bật</h2>
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
