// src/pages/hr/Candidates/components/InterviewScheduleForm.js
import React, { useState, useEffect } from 'react';
import hrInterviewAPI from '../../../../api/services/hrInterviewAPI';
import styles from './InterviewScheduleForm.module.scss';

const InterviewScheduleForm = ({ applicationId, existingInterview, onClose, onSuccess }) => {
    // 1. Khởi tạo state
    const [formData, setFormData] = useState({
        roundNumber: 1,
        roundName: 'Technical Interview',
        interviewType: 'ONLINE',
        date: '',
        startTime: '',
        endTime: '',
        interviewerIds: []
    });

    const [interviewerList, setInterviewerList] = useState([]);
    const [loading, setLoading] = useState(false);

    // 2. Fetch danh sách Interviewer từ API Backend
    useEffect(() => {
        const fetchInterviewers = async () => {
            try {
                const res = await hrInterviewAPI.getInterviewers();
                setInterviewerList(res.data.result || []);
            } catch (error) {
                console.error("Failed to load interviewers", error);
                // toast.error("Không thể tải danh sách người phỏng vấn");
            }
        };
        fetchInterviewers();
    }, []);

    // 3. Fill dữ liệu nếu là chế độ Edit
    useEffect(() => {
        if (existingInterview) {
            // Backend trả về ScheduledTime dạng: "2026-02-01T09:00:00"
            const [dateStr, timeStr] = existingInterview.scheduledTime
                ? existingInterview.scheduledTime.split('T')
                : ['', ''];

            const [, endTimeStr] = existingInterview.endTime
                ? existingInterview.endTime.split('T')
                : ['', ''];

            setFormData({
                roundNumber: existingInterview.roundNumber || 1,
                roundName: existingInterview.roundName || '',
                interviewType: existingInterview.interviewType || 'ONLINE',
                date: dateStr,
                startTime: timeStr ? timeStr.slice(0, 5) : '', // Lấy HH:mm
                endTime: endTimeStr ? endTimeStr.slice(0, 5) : '',
                // Map object interviewer -> lấy mảng ID
                interviewerIds: existingInterview.interviewers
                    ? existingInterview.interviewers.map(i => i.id)
                    : []
            });
        }
    }, [existingInterview]);

    // Xử lý input text
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Xử lý Checkbox chọn người phỏng vấn
    const handleInterviewerChange = (id) => {
        setFormData(prev => {
            const currentIds = prev.interviewerIds;
            if (currentIds.includes(id)) {
                return { ...prev, interviewerIds: currentIds.filter(item => item !== id) };
            } else {
                return { ...prev, interviewerIds: [...currentIds, id] };
            }
        });
    };

    // Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate
        if (!formData.date || !formData.startTime || !formData.endTime) {
            alert("Vui lòng chọn ngày và giờ!");
            return;
        }
        if (formData.interviewerIds.length === 0) {
            alert("Vui lòng chọn ít nhất một người phỏng vấn!");
            return;
        }

        setLoading(true);
        try {
            // Chuẩn bị payload khớp với DTO InterviewRequest
            const payload = {
                applicationId: applicationId,
                interviewerIds: formData.interviewerIds, // Set<Long>
                roundNumber: parseInt(formData.roundNumber),
                roundName: formData.roundName,
                interviewType: formData.interviewType,
                // LocalDateTime format: "YYYY-MM-DDTHH:mm:ss"
                scheduledTime: `${formData.date}T${formData.startTime}:00`,
                endTime: `${formData.date}T${formData.endTime}:00`
            };

            if (existingInterview) {
                await hrInterviewAPI.updateInterview(existingInterview.id, payload);
            } else {
                await hrInterviewAPI.createInterview(payload);
            }

            onSuccess(); // Callback reload data
        } catch (error) {
            console.error("Error saving interview:", error);
            const msg = error.response?.data?.message || "Có lỗi xảy ra!";
            alert(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={styles.scheduleForm} onSubmit={handleSubmit}>
            <h3>{existingInterview ? 'Điều chỉnh lịch phỏng vấn' : 'Tạo lịch phỏng vấn mới'}</h3>

            {/* Hàng 1 */}
            <div className={styles.row}>
                <div className={styles.formGroup} style={{ flex: 2 }}>
                    <label>Tên vòng phỏng vấn</label>
                    <input
                        type="text" name="roundName"
                        value={formData.roundName} onChange={handleChange}
                        placeholder="VD: Technical Interview" required
                    />
                </div>
                <div className={styles.formGroup} style={{ flex: 1 }}>
                    <label>Vòng số</label>
                    <input
                        type="number" name="roundNumber"
                        value={formData.roundNumber} onChange={handleChange}
                        min="1" required
                    />
                </div>
            </div>

            {/* Hàng 2 */}
            <div className={styles.row}>
                <div className={styles.formGroup}>
                    <label>Hình thức</label>
                    <select name="interviewType" value={formData.interviewType} onChange={handleChange}>
                        <option value="ONLINE">ONLINE</option>
                        <option value="OFFLINE">OFFLINE</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label>Ngày phỏng vấn</label>
                    <input
                        type="date" name="date"
                        value={formData.date} onChange={handleChange} required
                    />
                </div>
            </div>

            {/* Hàng 3 */}
            <div className={styles.row}>
                <div className={styles.formGroup}>
                    <label>Bắt đầu</label>
                    <input
                        type="time" name="startTime"
                        value={formData.startTime} onChange={handleChange} required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Kết thúc</label>
                    <input
                        type="time" name="endTime"
                        value={formData.endTime} onChange={handleChange} required
                    />
                </div>
            </div>

            {/* Hàng 4: List Interviewer từ API */}
            <div className={styles.formGroup}>
                <label>Người phỏng vấn ({formData.interviewerIds.length} đã chọn)</label>
                <div className={styles.interviewerList}>
                    {interviewerList.length > 0 ? (
                        interviewerList.map(user => (
                            <div key={user.id} className={styles.checkboxItem}>
                                <input
                                    type="checkbox"
                                    id={`int_${user.id}`}
                                    checked={formData.interviewerIds.includes(user.id)}
                                    onChange={() => handleInterviewerChange(user.id)}
                                />
                                <label htmlFor={`int_${user.id}`}>
                                    {/* Backend cần trả về fullName và email */}
                                    {user.fullName || user.username}
                                    {user.email && <span className={styles.email}> ({user.email})</span>}
                                </label>
                            </div>
                        ))
                    ) : (
                        <p className={styles.emptyText}>
                            {loading ? "Đang tải danh sách..." : "Không tìm thấy người phỏng vấn nào."}
                        </p>
                    )}
                </div>
            </div>

            <div className={styles.actions}>
                <button type="button" onClick={onClose} className={styles.btnCancel}>Hủy</button>
                <button type="submit" className={styles.btnPrimary} disabled={loading}>
                    {loading ? 'Đang lưu...' : 'Lưu lịch'}
                </button>
            </div>
        </form>
    );
};

export default InterviewScheduleForm;