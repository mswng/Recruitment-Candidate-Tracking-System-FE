// src/pages/hr/Candidates/CandidateDetailModal.js
import React, { useEffect, useState } from 'react';
import styles from './CandidateDetailModal.module.scss'; // Dùng chung style hoặc tạo file mới
import hrApplicationAPI from '../../../api/services/hrApplicationAPI';

const CandidateDetailModal = ({ isOpen, onClose, applicationId, onUpdateStage }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && applicationId) {
      const fetchDetail = async () => {
        try {
          const res = await hrApplicationAPI.getDetail(applicationId);
          setDetails(res.data.result || res);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchDetail();
    }
  }, [isOpen, applicationId]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Chi tiết ứng viên</h3>
          <button onClick={onClose} className={styles.btnClose}>&times;</button>
        </div>

        <div className={styles.modalBody}>
          {loading ? (
            <p>Đang tải...</p>
          ) : details ? (
            <>
              <div className={styles.infoGroup}>
                <p><strong>Tên:</strong> {details.candidateName}</p>
                <p><strong>Email:</strong> {details.candidateEmail}</p>
                <p><strong>CV:</strong> <a href={details.resumePath} target="_blank" rel="noreferrer">Xem CV</a></p>
                <p><strong>Trạng thái:</strong> {details.currentStage}</p>
              </div>

              <div className={styles.actionGroup}>
                <h4>Chuyển trạng thái:</h4>
                {/* Ví dụ nút chuyển trạng thái nhanh */}
                <button onClick={() => onUpdateStage(applicationId, 'INTERVIEW')}>Mời phỏng vấn</button>
                <button onClick={() => onUpdateStage(applicationId, 'REJECTED')} className={styles.btnReject}>Từ chối</button>
              </div>
            </>
          ) : (
            <p>Không tìm thấy thông tin.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailModal;