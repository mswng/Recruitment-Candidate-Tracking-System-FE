import React, { useState, useEffect, useCallback } from 'react';
import styles from './CandidatesManagement.module.scss';
import { FiSearch, FiFilter, FiDownload, FiEye, FiMail, FiPhone, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import CandidateDetailModal from './CandidateDetailModal';

// Cấu hình URL cơ bản
const API_BASE_URL = 'http://localhost:8080/RecruitmentCandidateTracking';

export default function CandidatesManagement() {
  // --- STATE QUẢN LÝ DỮ LIỆU ---
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // --- STATE BỘ LỌC ---
  const [filters, setFilters] = useState({
    jobId: '',    // Nếu có giá trị sẽ ưu tiên gọi API theo Job
    stage: '',    // Nếu jobId rỗng mà stage có, sẽ gọi API theo Stage
    search: ''    // Search client-side hoặc API nếu backend hỗ trợ (ở đây tạm search client)
  });

  // --- STATE PHÂN TRANG ---
  const [pagination, setPagination] = useState({
    page: 0,      // Backend thường bắt đầu từ 0
    size: 5,      // Size mặc định là 5 (hoặc 2 như ví dụ của bạn)
    totalPages: 0,
    totalElements: 0
  });

  const [selectedAppId, setSelectedAppId] = useState(null); // ID đơn ứng tuyển đang xem chi tiết

  // --- HÀM GỌI API (FETCH DATA) ---
  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${API_BASE_URL}/hr/applications`;
      
      // LOGIC CHỌN ENDPOINT DỰA TRÊN FILTER
      if (filters.jobId && filters.jobId !== 'all') {
        // Endpoint: Xem danh sách theo Job
        url = `${API_BASE_URL}/hr/applications/job/${filters.jobId}`;
      } else if (filters.stage && filters.stage !== 'all') {
        // Endpoint: Lọc theo Stage
        url = `${API_BASE_URL}/hr/applications/stage/${filters.stage}`;
      }

      // Thêm Query Param cho phân trang (size & page)
      // Lưu ý: URLSearchParams giúp nối chuỗi an toàn
      const params = new URLSearchParams({
        page: pagination.page,
        size: pagination.size
      });

      const response = await fetch(`${url}?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch data');

      const data = await response.json();

      // Giả sử Backend trả về Page object chuẩn của Spring Boot
      // { content: [...], totalPages: 10, totalElements: 100, number: 0 }
      setApplications(data.content || []); 
      setPagination(prev => ({
        ...prev,
        totalPages: data.totalPages,
        totalElements: data.totalElements
      }));

    } catch (error) {
      console.error("Error loading applications:", error);
      alert("Không thể tải danh sách đơn ứng tuyển!");
    } finally {
      setLoading(false);
    }
  }, [filters.jobId, filters.stage, pagination.page, pagination.size]);

  // Gọi API mỗi khi filter hoặc page thay đổi
  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // --- XỬ LÝ SỰ KIỆN ---
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 0 })); // Reset về trang đầu khi filter
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  const handleRefresh = () => {
    fetchApplications(); // Reload lại list sau khi update trong modal
  };

  // Helper hiển thị trạng thái màu sắc
  const getStatusInfo = (stage) => {
    const map = {
      APPLIED: { text: 'Mới ứng tuyển', color: '#FFA500', bg: '#fff7e6' },
      SCREENING: { text: 'Sàng lọc', color: '#2196F3', bg: '#e3f2fd' },
      INTERVIEW: { text: 'Phỏng vấn', color: '#9C27B0', bg: '#f3e5f5' },
      OFFER: { text: 'Đề nghị (Offer)', color: '#00BCD4', bg: '#e0f7fa' },
      HIRED: { text: 'Đã tuyển', color: '#4CAF50', bg: '#e8f5e9' },
      REJECTED: { text: 'Từ chối', color: '#F44336', bg: '#ffebee' }
    };
    return map[stage] || { text: stage, color: '#666', bg: '#eee' };
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
           <h1>Quản lý Đơn ứng tuyển</h1>
           <p>Tổng số hồ sơ: {pagination.totalElements}</p>
        </div>
        <button className={styles.exportBtn}><FiDownload /> Xuất Excel</button>
      </div>

      {/* --- THANH CÔNG CỤ & BỘ LỌC --- */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <FiSearch />
          <input 
            placeholder="Tìm nhanh (Client side)..." 
            value={filters.search}
            onChange={e => handleFilterChange('search', e.target.value)}
          />
        </div>
        
        <div className={styles.filters}>
            {/* Lọc theo Job (Giả lập list job ID, thực tế bạn nên fetch list job để render option) */}
            <select onChange={e => handleFilterChange('jobId', e.target.value)}>
                <option value="all">Tất cả công việc</option>
                <option value="1">Job ID: 1 (Java Dev)</option>
                <option value="2">Job ID: 2 (Tester)</option>
            </select>

            {/* Lọc theo Stage */}
            <select onChange={e => handleFilterChange('stage', e.target.value)}>
                <option value="all">Tất cả giai đoạn</option>
                <option value="APPLIED">Mới ứng tuyển</option>
                <option value="SCREENING">Sàng lọc</option>
                <option value="INTERVIEW">Phỏng vấn</option>
                <option value="HIRED">Đã tuyển</option>
                <option value="REJECTED">Từ chối</option>
            </select>
        </div>
      </div>

      {/* --- BẢNG DỮ LIỆU --- */}
      <div className={styles.tableContainer}>
        {loading ? <div style={{padding: 20, textAlign: 'center'}}>Đang tải dữ liệu...</div> : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Ứng viên</th>
                <th>Liên hệ</th>
                <th>Vị trí (Job ID)</th>
                <th>Ngày nộp</th>
                <th>Giai đoạn</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 && <tr><td colSpan="6" style={{textAlign:'center'}}>Không tìm thấy dữ liệu</td></tr>}
              {applications.map(app => {
                const statusInfo = getStatusInfo(app.stage); // Giả sử field trả về là 'stage'
                // Mapping dữ liệu từ Backend entity sang UI
                return (
                    <tr key={app.id}>
                        <td>
                            <div className={styles.name}>{app.candidateName || 'N/A'}</div>
                            <small>App ID: #{app.id}</small>
                        </td>
                        <td>
                            <div className={styles.contact}>
                                <span><FiMail/> {app.email}</span>
                                <span><FiPhone/> {app.phone}</span>
                            </div>
                        </td>
                        <td>{app.jobTitle || `Job #${app.jobId}`}</td>
                        <td>{app.appliedDate}</td>
                        <td>
                            <span 
                                className={styles.statusBadge}
                                style={{ color: statusInfo.color, backgroundColor: statusInfo.bg }}
                            >
                                {statusInfo.text}
                            </span>
                        </td>
                        <td>
                            <button className={styles.iconBtn} onClick={() => setSelectedAppId(app.id)}>
                                <FiEye />
                            </button>
                        </td>
                    </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* --- PHÂN TRANG --- */}
      <div className={styles.pagination}>
        <button 
          disabled={pagination.page === 0} 
          onClick={() => handlePageChange(pagination.page - 1)}
        >
          <FiChevronLeft /> Trước
        </button>
        <span>Trang {pagination.page + 1} / {pagination.totalPages}</span>
        <button 
          disabled={pagination.page >= pagination.totalPages - 1} 
          onClick={() => handlePageChange(pagination.page + 1)}
        >
          Sau <FiChevronRight />
        </button>
      </div>

      {/* --- MODAL CHI TIẾT --- */}
      {selectedAppId && (
        <CandidateDetailModal 
            applicationId={selectedAppId} 
            onClose={() => setSelectedAppId(null)}
            onUpdateSuccess={handleRefresh}
        />
      )}
    </div>
  );
}