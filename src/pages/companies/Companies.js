import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layouts/header/Header';
import Footer from '../../components/layouts/footer/Footer';
import styles from './Companies.module.scss';

export default function Companies() {
  const [companies] = useState([
    {
      id: 1,
      name: 'TechCorp',
      logo: '💻',
      industry: 'Công nghệ',
      location: 'Ho Chi Minh City',
      employees: '500-1000',
      rating: 4.5,
      description: 'Công ty công nghệ hàng đầu chuyên phát triển phần mềm',
      openJobs: 12
    },
    {
      id: 2,
      name: 'InnovateLabs',
      logo: '🚀',
      industry: 'Startup',
      location: 'Ha Noi',
      employees: '50-100',
      rating: 4.8,
      description: 'Startup tập trung vào AI và Machine Learning',
      openJobs: 8
    },
    {
      id: 3,
      name: 'DesignStudio',
      logo: '🎨',
      industry: 'Thiết kế',
      location: 'Da Nang',
      employees: '20-50',
      rating: 4.3,
      description: 'Studio thiết kế chuyên về UI/UX và branding',
      openJobs: 5
    },
    {
      id: 4,
      name: 'CloudInc',
      logo: '☁️',
      industry: 'Cloud Services',
      location: 'Ho Chi Minh City',
      employees: '100-500',
      rating: 4.6,
      description: 'Nhà cung cấp dịch vụ cloud và infrastructure',
      openJobs: 15
    },
    {
      id: 5,
      name: 'AI Solutions',
      logo: '🤖',
      industry: 'AI/Data',
      location: 'Ha Noi',
      employees: '100-200',
      rating: 4.7,
      description: 'Chuyên gia trong lĩnh vực AI, Big Data',
      openJobs: 10
    },
    {
      id: 6,
      name: 'StartupXYZ',
      logo: '⚡',
      industry: 'Fintech',
      location: 'Ho Chi Minh City',
      employees: '30-100',
      rating: 4.4,
      description: 'Startup Fintech cung cấp giải pháp tài chính',
      openJobs: 7
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    industry: ''
  });

  const filteredCompanies = companies.filter(company => {
    const matchSearch = company.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchIndustry = !filters.industry || company.industry === filters.industry;
    return matchSearch && matchIndustry;
  });

  const industries = [...new Set(companies.map(c => c.industry))];

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating));
  };

  return (
    <div className={styles.companiesPage}>
      <Header />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Khám phá các công ty</h1>
          <p>Tìm hiểu thêm về các công ty hàng đầu</p>
        </div>

        <div className={styles.filterSection}>
          <input
            type="text"
            placeholder="Tìm kiếm công ty..."
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
            className={styles.searchInput}
          />

          <select
            value={filters.industry}
            onChange={(e) => setFilters({...filters, industry: e.target.value})}
            className={styles.select}
          >
            <option value="">Tất cả ngành</option>
            {industries.map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>

          <button 
            onClick={() => setFilters({search: '', industry: ''})}
            className={styles.btnReset}
          >
            Xóa bộ lọc
          </button>
        </div>

        <div className={styles.companiesGrid}>
          {filteredCompanies.map(company => (
            <div key={company.id} className={styles.companyCard}>
              <div className={styles.cardHeader}>
                <span className={styles.logo}>{company.logo}</span>
                <h3>{company.name}</h3>
              </div>

              <div className={styles.rating}>
                <span>{renderStars(company.rating)}</span>
                <span className={styles.ratingValue}>{company.rating}</span>
              </div>

              <p className={styles.description}>{company.description}</p>

              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <span className={styles.icon}>🏢</span>
                  <span>{company.industry}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.icon}>📍</span>
                  <span>{company.location}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.icon}>👥</span>
                  <span>{company.employees}</span>
                </div>
              </div>

              <div className={styles.jobs}>
                <span className={styles.jobBadge}>
                  💼 {company.openJobs} việc làm đang mở
                </span>
              </div>

              <div className={styles.actions}>
                <button className={styles.btnFollow}>Theo dõi</button>
                <Link to="/jobs" className={styles.btnJobs}>
                  Xem việc làm →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className={styles.empty}>
            <p>Không tìm thấy công ty nào phù hợp</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
