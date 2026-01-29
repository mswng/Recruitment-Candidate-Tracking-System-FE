// src/pages/hr/Candidates/components/InterviewHistory.js
import React, { useEffect, useState } from 'react';
import hrInterviewAPI from '../../../../api/services/hrInterviewAPI';
import styles from './InterviewHistory.module.scss';

const InterviewHistory = ({ applicationId, onEditInterview }) => {
    const [interviews, setInterviews] = useState([]);
    // Map: interviewId -> evaluations list
    const [evaluations, setEvaluations] = useState({}); 
    const [loadingEval, setLoadingEval] = useState({}); // Trạng thái loading cho từng nút xem

    // 1. Lấy danh sách lịch phỏng vấn
    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                if (!applicationId) return;
                const res = await hrInterviewAPI.getInterviewsByApplication(applicationId);
                // Giả sử API trả về { result: [...] } hoặc { result: { items: [...] } }
                // Hãy check lại log này để đảm bảo path đúng
                const dataList = Array.isArray(res.data?.result) ? res.data.result : (res.data?.result?.items || []);
                
                const sortedList = dataList.sort((a, b) => 
                    new Date(b.scheduledTime) - new Date(a.scheduledTime)
                );
                setInterviews(sortedList);
            } catch (error) {
                console.error("Failed to load interviews", error);
            }
        };
        fetchInterviews();
    }, [applicationId]);

    // 2. Hàm load đánh giá chi tiết
    const handleViewEvaluations = async (interviewId) => {
        // Nếu đã mở (có dữ liệu) -> Đóng lại (xóa khỏi state)
        if (evaluations[interviewId]) {
            setEvaluations(prev => {
                const newState = { ...prev };
                delete newState[interviewId];
                return newState;
            });
            return;
        }

        setLoadingEval(prev => ({ ...prev, [interviewId]: true }));
        try {
            const res = await hrInterviewAPI.getEvaluations(interviewId);
            
            // QUAN TRỌNG: Cấu trúc JSON trả về là:
            // { result: { evaluations: [...] } }
            // Nên ta cần lấy res.data.result.evaluations
            
            const evalList = res.data?.result?.evaluations || [];
            
            setEvaluations(prev => ({ ...prev, [interviewId]: evalList }));
        } catch (error) {
            console.error("Failed to load evaluations", error);
            alert("Không thể tải đánh giá chi tiết.");
        } finally {
            setLoadingEval(prev => ({ ...prev, [interviewId]: false }));
        }
    };

    // Helper formatting
    const formatDateTime = (isoString) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const formatTime = (isoString) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={styles.historyContainer}>
            <h4>Lịch sử phỏng vấn</h4>
            
            {!interviews || interviews.length === 0 ? (
                <p className={styles.emptyText}>Chưa có lịch phỏng vấn nào.</p>
            ) : (
                <ul className={styles.timeline}>
                    {interviews.map(iv => {
                        // Xử lý danh sách tên interviewer (nếu API list trả về dạng mảng object)
                        const interviewerNames = iv.interviewers 
                            ? iv.interviewers.map(i => i.fullName).join(", ") 
                            : "Chưa cập nhật";

                        // Check xem đang mở đánh giá hay chưa
                        const isExpanded = !!evaluations[iv.id];

                        return (
                            <li key={iv.id} className={styles.interviewItem}>
                                <div className={styles.header}>
                                    <span className={styles.roundTitle}>
                                        Round {iv.roundNumber}: {iv.roundName}
                                    </span>
                                    <span className={styles.date}>
                                        {formatDateTime(iv.scheduledTime)} | {formatTime(iv.scheduledTime)} - {formatTime(iv.endTime)}
                                    </span>
                                </div>

                                <div className={styles.infoGrid}>
                                    <div className={styles.infoRow}>
                                        <strong>Hình thức:</strong> 
                                        <span className={iv.interviewType === 'ONLINE' ? styles.tagOnline : styles.tagOffline}>
                                            {iv.interviewType}
                                        </span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <strong>Người phỏng vấn:</strong> {interviewerNames}
                                    </div>
                                    <div className={styles.infoRow}>
                                        <strong>Trạng thái:</strong> 
                                        <span className={`${styles.status} ${styles[iv.status]}`}>
                                            {iv.status || 'Scheduled'}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className={styles.actions}>
                                    <button className={styles.btnEdit} onClick={() => onEditInterview(iv)}>
                                        <i className="fa-regular fa-pen-to-square"></i> Sửa lịch
                                    </button>
                                    
                                    <button 
                                        className={`${styles.btnViewEval} ${isExpanded ? styles.active : ''}`}
                                        onClick={() => handleViewEvaluations(iv.id)}
                                        disabled={loadingEval[iv.id]}
                                    >
                                        {loadingEval[iv.id] ? (
                                            <i className="fa-solid fa-spinner fa-spin"></i>
                                        ) : (
                                            isExpanded ? 'Ẩn đánh giá' : 'Xem đánh giá'
                                        )}
                                    </button>
                                </div>

                                {/* KHU VỰC HIỂN THỊ CHI TIẾT ĐÁNH GIÁ */}
                                {isExpanded && (
                                    <div className={styles.evaluationsBox}>
                                        <h5>Chi tiết đánh giá ({evaluations[iv.id].length})</h5>
                                        
                                        {evaluations[iv.id].length === 0 ? (
                                            <p className={styles.noEval}>Chưa có nhận xét nào từ người phỏng vấn.</p>
                                        ) : (
                                            evaluations[iv.id].map((ev) => (
                                                <div key={ev.evaluationId} className={styles.evalItem}>
                                                    <div className={styles.evalHeader}>
                                                        <strong>{ev.interviewerName}</strong>
                                                        <div className={styles.evalMeta}>
                                                            {/* Hiển thị điểm số */}
                                                            {ev.score !== null && (
                                                                <span className={styles.scoreBadge}>
                                                                    {ev.score} / 100
                                                                </span>
                                                            )}
                                                            {/* Hiển thị ngày đánh giá */}
                                                            <span className={styles.evalDate}>
                                                                {ev.updatedAt ? new Date(ev.updatedAt).toLocaleDateString('vi-VN') : ''}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Nội dung nhận xét */}
                                                    <div className={styles.commentBox}>
                                                        <i className="fa-solid fa-quote-left"></i>
                                                        <p>{ev.comment || "Không có nhận xét chi tiết."}</p>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default InterviewHistory;