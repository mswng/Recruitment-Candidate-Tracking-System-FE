// src/pages/hr/Candidates/CandidateDetailModal.js
import React, { useState, useEffect } from 'react';
import styles from './CandidateDetailModal.module.scss';
import hrApplicationAPI from '../../../api/services/hrApplicationAPI';
import InterviewScheduleForm from './components/InterviewScheduleForm';
import InterviewHistory from './components/InterviewHistory';
import OfferForm from './components/OfferForm';

const CandidateDetailModal = ({ isOpen, onClose, applicationId, onUpdateStage }) => {
  const [activeTab, setActiveTab] = useState('info'); // 'info' | 'cv' | 'interview'
  const [candidateDetail, setCandidateDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  // State cho việc tạo/sửa lịch phỏng vấn
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);

  // 1. Fetch dữ liệu chi tiết khi mở Modal có applicationId
  useEffect(() => {
    if (isOpen && applicationId) {
      fetchCandidateDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, applicationId]);

  const fetchCandidateDetail = async () => {
    setLoading(true);
    try {
      // Giả sử API get detail là: GET /hr/applications/{id}
      const res = await hrApplicationAPI.getDetail(applicationId);
      console.log("Candidate Detail:", res);
      setCandidateDetail(res.data.result);
    } catch (error) {
      console.error("Failed to fetch candidate detail:", error);
      alert("Không thể tải thông tin chi tiết ứng viên.");
    } finally {
      setLoading(false);
    }
  };

  // Callback khi tạo lịch thành công -> reload lại lịch sử hoặc detail
  const handleInterviewSuccess = async () => {
    setShowScheduleForm(false);
    setSelectedInterview(null);

    // Logic mới: Nếu đang ở SCREENING mà tạo lịch xong -> Tự động chuyển trạng thái sang INTERVIEWING
    if (candidateDetail?.currentStage === 'SCREENING') {
      try {
        // Gọi hàm update stage từ props (hoặc gọi API trực tiếp tại đây)
        await onUpdateStage(applicationId, 'INTERVIEWING');
        // alert("Đã cập nhật trạng thái sang Phỏng vấn.");
      } catch (error) {
        console.error("Lỗi cập nhật trạng thái tự động", error);
      }
    } else {
      alert("Lưu lịch phỏng vấn thành công!");
    }

    // Reload lại dữ liệu mới nhất
    fetchCandidateDetail();
  };

  const [showOfferForm, setShowOfferForm] = useState(false); // State để bật tắt modal Offer

  // Hàm xử lý khi Offer thành công
  const handleOfferSuccess = () => {
    setShowOfferForm(false);
    fetchCandidateDetail(); // Reload lại thông tin ứng viên để cập nhật trạng thái mới
  };

  const handleEditInterview = (interview) => {
    setSelectedInterview(interview);
    setShowScheduleForm(true);
  };

  // Helper: Thay đổi trạng thái ứng viên
  const handleChangeStage = (newStage) => {
    if (window.confirm(`Bạn có chắc chắn muốn chuyển trạng thái sang ${newStage}?`)) {
      onUpdateStage(applicationId, newStage);
      onClose(); // Đóng modal sau khi update (hoặc fetch lại detail nếu muốn giữ modal)
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeBtn}>&times;</button>

        {loading || !candidateDetail ? (
          <div className={styles.loading}>Đang tải thông tin...</div>
        ) : (
          <>
            {/* HEADER */}
            <header className={styles.header}>
              <div className={styles.titleSection}>
                <h2>{candidateDetail.candidateName}</h2>
                <p className={styles.subtitle}>{candidateDetail.jobTitle || 'Ứng viên'}</p>
              </div>
              <div className={styles.statusSection}>
                <span className={`${styles.badge} ${styles[candidateDetail.currentStage]}`}>
                  {candidateDetail.currentStage}
                </span>
              </div>
            </header>

            {/* TABS */}
            <div className={styles.tabs}>
              <button
                className={activeTab === 'info' ? styles.active : ''}
                onClick={() => setActiveTab('info')}
              >
                Thông tin chung
              </button>
              {/* <button
                className={activeTab === 'cv' ? styles.active : ''}
                onClick={() => setActiveTab('cv')}
              >
                Hồ sơ (CV)
              </button> */}

              {/* Chỉ hiện tab Phỏng vấn khi hồ sơ đã qua vòng lọc */}
              {['SCREENING', 'INTERVIEWING', 'OFFERED', 'HIRED', 'REJECTED'].includes(candidateDetail.currentStage) && (
                <button
                  className={activeTab === 'interview' ? styles.active : ''}
                  onClick={() => setActiveTab('interview')}
                >
                  Lịch Phỏng vấn
                </button>
              )}
            </div>

            {/* BODY CONTENT */}
            <div className={styles.body}>
              {/* --- TAB 1: INFO --- */}
              {activeTab === 'info' && (
                <div className={styles.infoTab}>
                  <p><strong>Tên:</strong> {candidateDetail.candidateName}</p>
                  <p><strong>Email:</strong> {candidateDetail.candidateEmail}</p>
                  <p><strong>CV:</strong> <a href={candidateDetail.resumePath} target="_blank" rel="noreferrer">Xem CV</a></p>
                  <p><strong>Trạng thái:</strong> {candidateDetail.currentStage}</p>

                  {/* Action Buttons cho Tab Info */}
                  <div className={styles.actionFooter}>
                    {candidateDetail.currentStage === 'APPLIED' && (
                      <>
                        <button className={styles.btnReject} onClick={() => handleChangeStage('REJECTED')}>Từ chối</button>
                        <button className={styles.btnPrimary} onClick={() => handleChangeStage('SCREENING')}>Duyệt hồ sơ (Screening)</button>
                      </>
                    )}
                    {/* {candidateDetail.currentStage === 'SCREENING' && (
                      <button className={styles.btnPrimary} onClick={() => handleChangeStage('INTERVIEWING')}>Tạo Phỏng vấn</button>
                    )} */}
                    {/* {candidateDetail.currentStage === 'SCREENING' && (
                      <button
                        className={styles.btnPrimary}
                        onClick={() => {
                          setActiveTab('interview');   // 1. Chuyển giao diện sang tab Phỏng vấn
                          setSelectedInterview(null);  // 2. Đảm bảo là chế độ "Tạo mới" (không phải edit)
                          setShowScheduleForm(true);   // 3. Bật biến state để hiển thị Form
                        }}
                      >
                        <i className="fa-solid fa-calendar-plus"></i> Tạo lịch Phỏng vấn
                      </button>
                    )} */}
                  </div>
                </div>
              )}

              {/* --- TAB 2: CV --- */}
              {/* {activeTab === 'cv' && (
                <div className={styles.cvTab}>
                  {candidateDetail.resumePath || candidateDetail.cvUrl ? (
                    <iframe
                      src={candidateDetail.resumePath || candidateDetail.cvUrl}
                      title="CV Viewer"
                      className={styles.pdfViewer}
                    ></iframe>
                  ) : (
                    <p>Ứng viên chưa cập nhật CV.</p>
                  )}
                </div>
              )} */}

              {/* --- TAB 3: INTERVIEW --- */}
              {activeTab === 'interview' && (
                <div className={styles.interviewTab}>
                  {/* Toolbar Actions */}
                  <div className={styles.actionBar}>
                    {(candidateDetail.currentStage === 'SCREENING' || candidateDetail.currentStage === 'INTERVIEWING') && (
                      <button
                        className={styles.btnAdd}
                        onClick={() => { setSelectedInterview(null); setShowScheduleForm(true); }}
                      >
                        <i className="fa-solid fa-calendar-plus"></i> Đặt lịch phỏng vấn
                      </button>
                    )}

                    {/* Nút gửi Offer chỉ hiện khi đang phỏng vấn */}
                    {candidateDetail.currentStage === 'INTERVIEWING' && (
                      <button
                        className={styles.btnOffer}
                        onClick={() => setShowOfferForm(true)} // Mở form offer
                      >
                        <i className="fa-solid fa-paper-plane"></i> Gửi Offer
                      </button>
                    )}
                  </div>

                  {/* Form Tạo/Sửa Lịch (Nhúng vào trong hoặc Popup chồng lên) */}
                  {showScheduleForm && (
                    <div className={styles.subFormWrapper}>
                      <InterviewScheduleForm
                        applicationId={applicationId}
                        existingInterview={selectedInterview}
                        onClose={() => setShowScheduleForm(false)}
                        onSuccess={handleInterviewSuccess}
                      />
                    </div>
                  )}

                  {showOfferForm && (
                    <div className={styles.modalOverlay}>
                      <div className={styles.modalContentSmall}>
                        <OfferForm
                          applicationId={applicationId}
                          onClose={() => setShowOfferForm(false)}
                          onSuccess={handleOfferSuccess}
                        />
                      </div>
                    </div>
                  )}

                  {/* Component Lịch sử phỏng vấn */}
                  <InterviewHistory
                    applicationId={applicationId}
                    onEditInterview={handleEditInterview}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CandidateDetailModal;