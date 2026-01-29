import React, { useState, useEffect } from 'react';
import styles from './InterviewSection.module.scss';
import hrInterviewAPI from '../../../api/services/hrInterviewAPI';

// --- SUB COMPONENT: Form Tạo/Sửa Lịch Phỏng Vấn ---
const InterviewFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        subject: '',
        interviewDate: '', // Format: YYYY-MM-DDTHH:mm
        location: '',
        description: '',
        status: 'SCHEDULED'
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                subject: initialData.subject || '',
                // Convert API date string to input datetime-local format if needed
                interviewDate: initialData.interviewDate || '', 
                location: initialData.location || '',
                description: initialData.description || '',
                status: initialData.status || 'SCHEDULED'
            });
        } else {
            setFormData({ subject: '', interviewDate: '', location: '', description: '', status: 'SCHEDULED' });
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3>{initialData ? 'Điều chỉnh lịch phỏng vấn' : 'Tạo lịch phỏng vấn mới'}</h3>
                <div className={styles.formGroup}>
                    <label>Tiêu đề / Vòng phỏng vấn</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="VD: Phỏng vấn kỹ thuật vòng 1" />
                </div>
                <div className={styles.formGroup}>
                    <label>Thời gian</label>
                    <input type="datetime-local" name="interviewDate" value={formData.interviewDate} onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                    <label>Địa điểm / Link Online</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Phòng họp 1 hoặc Link Google Meet" />
                </div>
                <div className={styles.formGroup}>
                    <label>Ghi chú</label>
                    <textarea name="description" rows="3" value={formData.description} onChange={handleChange} />
                </div>
                <div className={styles.modalActions}>
                    <button className={styles.cancel} onClick={onClose}>Hủy</button>
                    <button className={styles.submit} onClick={() => onSubmit(formData)}>Lưu</button>
                </div>
            </div>
        </div>
    );
};

// --- SUB COMPONENT: Xem Đánh Giá ---
const EvaluationModal = ({ isOpen, onClose, interviewId }) => {
    const [evaluations, setEvaluations] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && interviewId) {
            setLoading(true);
            hrInterviewAPI.getEvaluations(interviewId)
                .then(res => {
                    // Xử lý dữ liệu trả về tùy theo format backend, ở đây giả định res.data hoặc res.result
                    setEvaluations(res.data || res.result || []); 
                })
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [isOpen, interviewId]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3>Kết quả đánh giá</h3>
                {loading ? <p>Đang tải...</p> : (
                    <div className={styles.evalList}>
                        {evaluations.length === 0 ? <p>Chưa có đánh giá nào.</p> : (
                            evaluations.map((ev, index) => (
                                <div key={index} className={styles.evalItem}>
                                    <div className={styles.interviewer}>Người đánh giá: {ev.interviewerName || 'Ẩn danh'}</div>
                                    <div className={styles.score}>Điểm/Kết quả: {ev.score || ev.result}</div>
                                    <div className={styles.comment}>"{ev.comment}"</div>
                                </div>
                            ))
                        )}
                    </div>
                )}
                <div className={styles.modalActions}>
                    <button className={styles.cancel} onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT: Quản lý danh sách phỏng vấn ---
export default function InterviewSection({ applicationId }) {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Modal State
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingInterview, setEditingInterview] = useState(null); // Nếu null => Create, có object => Edit
    
    const [isEvalOpen, setIsEvalOpen] = useState(false);
    const [selectedInterviewId, setSelectedInterviewId] = useState(null);

    // Load danh sách interview
    const fetchInterviews = async () => {
        if (!applicationId) return;
        setLoading(true);
        try {
            const res = await hrInterviewAPI.getInterviewsByApplication(applicationId);
            // Giả sử API trả về mảng trực tiếp hoặc nằm trong res.result
            setInterviews(Array.isArray(res) ? res : (res.result || []));
        } catch (error) {
            console.error("Lỗi tải lịch phỏng vấn:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInterviews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [applicationId]);

    // Xử lý Submit Form (Create hoặc Update)
    const handleFormSubmit = async (data) => {
        try {
            if (editingInterview) {
                // UPDATE: PUT /hr/interviews/{id}
                await hrInterviewAPI.updateInterview(editingInterview.id, data);
                alert("Cập nhật thành công!");
            } else {
                // CREATE: POST /hr/interviews
                // Cần kèm theo applicationId khi tạo mới
                await hrInterviewAPI.createInterview({ ...data, applicationId });
                alert("Đã lên lịch phỏng vấn!");
            }
            setIsFormOpen(false);
            fetchInterviews(); // Refresh list
        } catch (error) {
            console.error("Lỗi lưu thông tin:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại.");
        }
    };

    const handleEditClick = (interview) => {
        setEditingInterview(interview);
        setIsFormOpen(true);
    };

    const handleCreateClick = () => {
        setEditingInterview(null);
        setIsFormOpen(true);
    };

    const handleViewEvaluations = (id) => {
        setSelectedInterviewId(id);
        setIsEvalOpen(true);
    };

    // Format ngày giờ hiển thị đẹp
    const formatDateTime = (dateStr) => {
        if (!dateStr) return "Chưa xếp lịch";
        return new Date(dateStr).toLocaleString('vi-VN', {
            weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>Lịch trình phỏng vấn</h3>
                <button className={styles.btnAdd} onClick={handleCreateClick}>+ Lên lịch phỏng vấn</button>
            </div>

            {loading ? <p>Đang tải dữ liệu...</p> : (
                <div className={styles.timeline}>
                    {interviews.length > 0 ? interviews.map(item => (
                        <div key={item.id} className={styles.timelineItem}>
                            <div className={styles.card}>
                                <div className={styles.row}>
                                    <span className={styles.title}>{item.subject}</span>
                                    {/* Tag trạng thái */}
                                    <span style={{ fontSize: '12px', color: item.status === 'COMPLETED' ? 'green' : 'blue' }}>
                                        {item.status}
                                    </span>
                                </div>
                                <div className={styles.time}>🕒 {formatDateTime(item.interviewDate)}</div>
                                <div className={styles.location}>📍 {item.location}</div>
                                {item.description && <div style={{fontSize:'13px', color:'#666', marginBottom:'10px'}}>📝 {item.description}</div>}
                                
                                <div className={styles.actions}>
                                    <button 
                                        className={styles.btnEdit} 
                                        onClick={() => handleEditClick(item)}
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button 
                                        className={styles.btnEval} 
                                        onClick={() => handleViewEvaluations(item.id)}
                                    >
                                        Xem đánh giá
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p style={{color:'#888', fontStyle:'italic'}}>Chưa có lịch phỏng vấn nào cho ứng viên này.</p>
                    )}
                </div>
            )}

            {/* Modal Form: Create/Edit */}
            <InterviewFormModal 
                isOpen={isFormOpen} 
                onClose={() => setIsFormOpen(false)} 
                onSubmit={handleFormSubmit}
                initialData={editingInterview}
            />

            {/* Modal: View Evaluations */}
            <EvaluationModal 
                isOpen={isEvalOpen} 
                onClose={() => setIsEvalOpen(false)} 
                interviewId={selectedInterviewId}
            />
        </div>
    );
}