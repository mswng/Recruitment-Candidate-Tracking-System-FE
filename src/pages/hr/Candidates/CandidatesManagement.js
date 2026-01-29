import React, { useEffect, useState } from 'react';
import styles from './CandidatesManagement.module.scss';
import hrApplicationAPI from '../../../api/services/hrApplicationAPI';
import CandidateDetailModal from './CandidateDetailModal'; // Giả sử bạn đã tạo file này cùng thư mục
// import { toast } from 'react-toastify'; // Nếu project có dùng thư viện toast, hoặc dùng alert thay thế

// Các trạng thái tuyển dụng (Mapping theo Backend enum nếu có)
const STAGES = [
  { value: 'ALL', label: 'Tất cả' },
  { value: 'APPLIED', label: 'Đơn ứng tuyển mới' },
  { value: 'SCREENING', label: 'Sàng lọc' },
  { value: 'INTERVIEWING', label: 'Phỏng vấn' },
  { value: 'OFFERED', label: 'Đề nghị' },
  { value: 'HIRED', label: 'Đã tuyển' },
  { value: 'REJECTED', label: 'Từ chối' },
];

const CandidatesManagement = () => {
  // --- State Management ---
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStage, setSelectedStage] = useState('ALL');

  // Pagination State
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10 ;

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);

  // --- Effects ---
  useEffect(() => {
    fetchCandidates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedStage]);

  // --- API Calls ---
  const fetchCandidates = async () => {
    setLoading(true);
    try {
      let response;

      // Gọi API dựa trên filter
      if (selectedStage === 'ALL') {
        response = await hrApplicationAPI.getAll(page, pageSize);
        // console.log("Response by stage:", response.data.result.items);

      } else {
        response = await hrApplicationAPI.getByStage(selectedStage, page, pageSize);
      }

      // Giả sử response trả về cấu trúc phân trang chuẩn (Spring Boot style: content, totalPages)
      // Bạn cần điều chỉnh dòng này tùy theo actual response của BE trả về
      const data = response.data || response;

      setCandidates(data.result.items || []);
      setTotalPages(data.result.totalPages || 0);

    } catch (error) {
      console.error("Failed to fetch candidates:", error);
      // alert("Không thể tải danh sách ứng viên");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStage = async (id, newStage) => {
    try {
      await hrApplicationAPI.updateStage(id, newStage);
      // alert("Cập nhật trạng thái thành công!");
      fetchCandidates(); // Reload data
      setShowModal(false); // Đóng modal nếu đang mở
    } catch (error) {
      console.error("Failed to update stage:", error);
      // alert("Cập nhật thất bại");
    }
  };

  // --- Event Handlers ---
  const handleStageFilterChange = (e) => {
    setSelectedStage(e.target.value);
    setPage(0); // Reset về trang đầu khi filter
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const openDetailModal = (id) => {
    console.log("Opening modal for candidate ID:", id);
    setSelectedCandidateId(id);
    setShowModal(true);
  };

  const closeDetailModal = () => {
    setShowModal(false);
    setSelectedCandidateId(null);
  };

  // --- Helper Render ---
  const renderStatusBadge = (stage) => {
    let className = styles.badge;
    switch (stage) {
      case 'APPLIED': className += ` ${styles.badgeNew}`; break;
      case 'INTERVIEWING': className += ` ${styles.badgeInfo}`; break;
      case 'HIRED': className += ` ${styles.badgeSuccess}`; break;
      case 'REJECTED': className += ` ${styles.badgeDanger}`; break;
      default: className += ` ${styles.badgeDefault}`;
    }
    // hiển thị tiếng Việt cho từng stage 
    switch (stage) {
      case 'APPLIED': stage = 'Đơn ứng tuyển mới'; break;
      case 'SCREENING': stage = 'Sàng lọc'; break;
      case 'INTERVIEWING': stage = 'Phỏng vấn'; break;
      case 'OFFERED': stage = 'Đề nghị'; break;
      case 'HIRED': stage = 'Đã tuyển'; break;
      case 'REJECTED': stage = 'Từ chối'; break;
      default: stage = 'N/A';
    }
    return <span className={className}>{stage}</span>;
  };

  return (
    <div className={styles.wrapper}>
      {/* Header Section */}
      <div className={styles.header}>
        <h2 className={styles.title}>Quản lý Ứng Viên</h2>
        <div className={styles.actions}>
          <select
            className={styles.selectFilter}
            value={selectedStage}
            onChange={handleStageFilterChange}
          >
            {STAGES.map(stage => (
              <option key={stage.value} value={stage.value}>
                {stage.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className={styles.tableWrapper}>
        {loading ? (
          <div className={styles.loading}>Đang tải dữ liệu...</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Họ và tên</th>
                {/* <th>Email</th> */}
                <th>Vị trí ứng tuyển</th>
                <th>Ngày nộp</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {candidates.length > 0 ? (
                candidates.map((candidate) => (
                  <tr key={candidate.id}>
                    <td>{candidate.candidateName || "N/A"}</td>
                    {/* <td>{candidate.candidateEmail}</td> */}
                    <td>{candidate.jobTitle || "N/A"}</td>
                    <td>{candidate.appliedDate ? new Date(candidate.appliedDate).toLocaleDateString('vi-VN') : '-'}</td>
                    <td>{renderStatusBadge(candidate.currentStage)}</td>
                    <td>
                      <button
                        className={styles.btnView}
                        onClick={() => openDetailModal(candidate.id)}
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={styles.empty}>Không có dữ liệu ứng viên</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Section */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            disabled={page === 0}
            onClick={() => handlePageChange(page - 1)}
          >
            Trước
          </button>
          <span>Trang {page + 1} / {totalPages}</span>
          <button
            disabled={page === totalPages - 1}
            onClick={() => handlePageChange(page + 1)}
          >
            Sau
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {showModal && (
        <CandidateDetailModal
          isOpen={showModal}
          onClose={closeDetailModal}
          applicationId={selectedCandidateId}
          onUpdateStage={handleUpdateStage} // Truyền hàm update xuống modal
        />
      )}
    </div>
  );
};

export default CandidatesManagement;