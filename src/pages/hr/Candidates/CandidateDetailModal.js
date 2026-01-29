import React, { useEffect, useState } from 'react';
import styles from './CandidatesManagement.module.scss';
import { FiDownload, FiMail, FiX } from 'react-icons/fi';

const API_BASE_URL = 'http://localhost:8080/RecruitmentCandidateTracking';

export default function CandidateDetailModal({ applicationId, onClose, onUpdateSuccess }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // 1. Fetch chi tiết khi Modal mở
  useEffect(() => {
    if (!applicationId) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        // Endpoint: Xem chi tiết một đơn ứng tuyển
        const res = await fetch(`${API_BASE_URL}/hr/applications/${applicationId}`);
        if (!res.ok) throw new Error("Fetch detail failed");
        const data = await res.json();
        setDetail(data);
      } catch (err) {
        console.error(err);
        alert("Không tải được chi tiết đơn ứng tuyển");
        onClose();
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [applicationId, onClose]);

  // 2. Hàm thay đổi trạng thái
  const handleStageChange = async (newStage) => {
    if (!window.confirm(`Bạn có chắc chắn muốn đổi sang trạng thái ${newStage}?`)) return;
    
    setUpdating(true);
    try {
      // Endpoint: Thay đổi giai đoạn tuyển dụng
      // Method PUT (hoặc POST tùy backend của bạn), body chứa stage mới
      const res = await fetch(`${API_BASE_URL}/hr/applications/${applicationId}/stage`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer ...' // Nếu có token
        },
        body: JSON.stringify({ stage: newStage }) // Hoặc gửi string trực tiếp tùy Backend nhận gì
      });

      if (!res.ok) throw new Error("Update failed");

      alert("Cập nhật trạng thái thành công!");
      
      // Update local state để UI hiển thị ngay lập tức
      setDetail(prev => ({ ...prev, stage: newStage }));
      
      // Báo cho component cha reload lại list
      onUpdateSuccess();

    } catch (err) {
      console.error(err);
      alert("Lỗi khi cập nhật trạng thái!");
    } finally {
      setUpdating(false);
    }
  };

  if (!applicationId) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2>Chi tiết đơn ứng tuyển #{applicationId}</h2>
          <button onClick={onClose} className={styles.closeBtn}><FiX/></button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          {loading ? <p>Đang tải thông tin...</p> : detail ? (
            <>
              <div className={styles.candidateInfo}>
                {/* Thông tin cơ bản */}
                <InfoRow label="Họ tên" value={detail.candidateName} bold />
                <InfoRow label="Email" value={detail.email} />
                <InfoRow label="Số điện thoại" value={detail.phone} />
                <InfoRow label="Vị trí ứng tuyển" value={detail.jobTitle} />
                <InfoRow label="Ngày nộp" value={detail.appliedDate} />
                
                {/* CV Link */}
                <div className={styles.infoRow}>
                   <label>CV đính kèm:</label>
                   <a href={detail.cvUrl} target="_blank" rel="noreferrer" style={{color: '#007bff'}}>
                     Xem hồ sơ (PDF)
                   </a>
                </div>

                {/* Thay đổi trạng thái */}
                <div className={styles.infoRow} style={{marginTop: 20, borderTop: '1px solid #eee', paddingTop: 15}}>
                  <label style={{alignSelf:'center'}}>Giai đoạn hiện tại:</label>
                  <select
                    value={detail.stage}
                    onChange={(e) => handleStageChange(e.target.value)}
                    className={styles.statusSelect}
                    disabled={updating}
                  >
                    <option value="APPLIED">Mới ứng tuyển</option>
                    <option value="SCREENING">Sàng lọc hồ sơ</option>
                    <option value="INTERVIEW">Phỏng vấn</option>
                    <option value="OFFER">Gửi đề nghị (Offer)</option>
                    <option value="HIRED">Đã tuyển dụng</option>
                    <option value="REJECTED">Từ chối</option>
                  </select>
                  {updating && <span style={{marginLeft: 10, fontSize: 12, color: 'blue'}}>Đang lưu...</span>}
                </div>
              </div>

              {/* Actions Footer */}
              <div className={styles.modalActions}>
                <a href={detail.cvUrl} className={styles.primaryBtn} download>
                  <FiDownload /> Tải CV về máy
                </a>
                <a href={`mailto:${detail.email}`} className={styles.secondaryBtn}>
                  <FiMail /> Gửi Email
                </a>
              </div>
            </>
          ) : (
             <p style={{color:'red'}}>Không tìm thấy dữ liệu</p>
          )}
        </div>
      </div>
    </div>
  );
}

const InfoRow = ({ label, value, bold }) => (
  <div className={styles.infoRow}>
    <label>{label}:</label>
    {bold ? <strong>{value}</strong> : <span>{value}</span>}
  </div>
);