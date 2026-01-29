import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './CreateJob.module.scss';

export default function CreateJob() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Lấy dữ liệu sơ bộ từ Modal (HRJobs.js)
    const initialData = location.state?.initialData || {};

    const [formData, setFormData] = useState({
        title: initialData.title || '',
        branchName: initialData.branchName || '',
        quantity: initialData.quantity || 1,
        deadline: initialData.deadline || '',
        description: '',
        requirements: '',
        benefits: '',
        address: '',
        basicSalary: '',
        startDate: new Date().toISOString().split('T')[0], // Mặc định hôm nay
        status: 'OPEN'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Gọi API POST /api/jobs
        console.log("Submitting Job Data:", formData);
        alert("Tạo công việc thành công!");
        navigate('/hr/jobs'); // Quay về danh sách
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Hoàn thiện tin tuyển dụng</h1>
                <div className={styles.actions}>
                    <button className={styles.cancel} onClick={() => navigate('/hr/jobs')}>Hủy</button>
                    <button className={styles.save} onClick={handleSubmit}>Đăng tuyển</button>
                </div>
            </div>

            <form className={styles.formGrid}>
                {/* Cột chính: Thông tin chi tiết */}
                <div className={styles.mainColumn}>
                    <div className={styles.card}>
                        <h3>Nội dung tuyển dụng</h3>
                        
                        <div className={styles.formGroup}>
                            <label>Tiêu đề công việc</label>
                            <input 
                                type="text" 
                                name="title" 
                                value={formData.title} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Mô tả công việc (Description)</label>
                            <textarea 
                                name="description" 
                                placeholder="Mô tả chi tiết nhiệm vụ..."
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Yêu cầu ứng viên (Requirements)</label>
                            <textarea 
                                name="requirements" 
                                placeholder="Kỹ năng, kinh nghiệm, bằng cấp..."
                                value={formData.requirements}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Quyền lợi (Benefits)</label>
                            <textarea 
                                name="benefits" 
                                placeholder="Bảo hiểm, thưởng, du lịch..."
                                value={formData.benefits}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Cột phụ: Cấu hình & Lương */}
                <div className={styles.sideColumn}>
                    <div className={styles.card}>
                        <h3>Thiết lập chung</h3>
                        
                        <div className={styles.formGroup}>
                            <label>Trạng thái</label>
                            <select name="status" value={formData.status} onChange={handleChange}>
                                <option value="OPEN">Đang tuyển (OPEN)</option>
                                <option value="DRAFT">Nháp (DRAFT)</option>
                                <option value="CLOSED">Đóng (CLOSED)</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Chi nhánh</label>
                            <input type="text" name="branchName" value={formData.branchName} onChange={handleChange} />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Địa điểm làm việc cụ thể</label>
                            <input type="text" name="address" placeholder="Số 123 đường ABC..." value={formData.address} onChange={handleChange} />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Lương cơ bản (VND)</label>
                            <input type="number" name="basicSalary" value={formData.basicSalary} onChange={handleChange} />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Số lượng tuyển</label>
                            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Ngày bắt đầu</label>
                            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Hạn chót (Deadline)</label>
                            <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}