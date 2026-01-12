import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layouts/header/Header';
import Footer from '../../components/layouts/footer/Footer';
import styles from './Jobs.module.scss';

export default function Jobs() {
  const [jobs] = useState([
    {
      id: 1,
      title: 'React Developer',
      company: 'TechCorp',
      location: 'Ho Chi Minh',
      salary: '20-30 triệu',
      type: 'Full-time',
      experience: '2-3 năm',
      description: 'Tìm kiếm React Developer có kinh nghiệm trong xây dựng ứng dụng web.',
      logo: '💻'
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'InnovateLabs',
      location: 'Ha Noi',
      salary: '25-35 triệu',
      type: 'Full-time',
      experience: '3-5 năm',
      description: 'Cần Backend Developer có kinh nghiệm với Node.js, Python hoặc Java.',
      logo: '⚙️'
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      company: 'DesignStudio',
      location: 'Da Nang',
      salary: '15-25 triệu',
      type: 'Full-time',
      experience: '1-2 năm',
      description: 'Tìm UI/UX Designer passionate về thiết kế interface.',
      logo: '🎨'
    },
    {
      id: 4,
      title: 'Product Manager',
      company: 'StartupXYZ',
      location: 'Ho Chi Minh',
      salary: '30-40 triệu',
      type: 'Full-time',
      experience: '4-6 năm',
      description: 'Product Manager để dẫn dắt sản phẩm mới phát triển.',
      logo: '📊'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'CloudInc',
      location: 'Ho Chi Minh',
      salary: '28-38 triệu',
      type: 'Full-time',
      experience: '2-4 năm',
      description: 'DevOps Engineer quản lý infrastructure và CI/CD pipeline.',
      logo: '🚀'
    },
    {
      id: 6,
      title: 'Data Scientist',
      company: 'AI Solutions',
      location: 'Ha Noi',
      salary: '25-40 triệu',
      type: 'Full-time',
      experience: '3-5 năm',
      description: 'Data Scientist xây dựng machine learning models.',
      logo: '📈'
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: ''
  });

  const filteredJobs = jobs.filter(job => {
    const matchSearch = job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                       job.company.toLowerCase().includes(filters.search.toLowerCase());
    const matchLocation = !filters.location || job.location === filters.location;
    const matchType = !filters.type || job.type === filters.type;
    return matchSearch && matchLocation && matchType;
  });

  const locations = [...new Set(jobs.map(j => j.location))];
  const types = [...new Set(jobs.map(j => j.type))];

  return (
    <div className={styles.jobsPage}>
      <Header />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Tìm Việc Làm</h1>
          <p>Khám phá hàng ngàn cơ hội việc làm phù hợp với bạn</p>
        </div>

        <div className={styles.filterSection}>
          <input
            type="text"
            placeholder="Tìm kiếm vị trí hoặc công ty..."
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
            className={styles.searchInput}
          />

          <select
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
            className={styles.select}
          >
            <option value="">Tất cả địa điểm</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          <select
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
            className={styles.select}
          >
            <option value="">Tất cả loại hình</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <button 
            onClick={() => setFilters({search: '', location: '', type: ''})}
            className={styles.btnReset}
          >
            Xóa bộ lọc
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.jobsList}>
            <h2>Kết quả tìm kiếm ({filteredJobs.length})</h2>
            <div className={styles.jobs}>
              {filteredJobs.map(job => (
                <div key={job.id} className={styles.jobCard}>
                  <div className={styles.jobHeader}>
                    <span className={styles.logo}>{job.logo}</span>
                    <div>
                      <h3>{job.title}</h3>
                      <p>{job.company}</p>
                    </div>
                  </div>

                  <div className={styles.jobMeta}>
                    <span className={styles.badge}>📍 {job.location}</span>
                    <span className={styles.badge}>💼 {job.type}</span>
                    <span className={styles.badge}>⏱️ {job.experience}</span>
                  </div>

                  <p className={styles.description}>{job.description}</p>

                  <div className={styles.jobFooter}>
                    <span className={styles.salary}>{job.salary}/tháng</span>
                    <Link to={`/jobs/${job.id}`} className={styles.btnView}>
                      Chi tiết →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h3>Gợi ý cho bạn</h3>
              <p>Cập nhật CV của bạn để nhận được gợi ý công việc phù hợp hơn.</p>
              <Link to="/profile" className={styles.btnLink}>
                Cập nhật CV →
              </Link>
            </div>

            <div className={styles.sidebarCard}>
              <h3>Công việc được lưu</h3>
              <p>Bạn chưa lưu công việc nào. Hãy lưu những công việc yêu thích.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
