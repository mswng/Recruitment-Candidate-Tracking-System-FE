import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './CreateJob.module.scss';
import hrJobAPI from '../../../api/services/hrJobAPI'; // Import API service

export default function CreateJob() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Lấy dữ liệu sơ bộ từ Modal (HRJobs.js)
    const initialData = location.state?.initialData || {};
    console.log("Initial data for new job:", initialData);

    const [loading, setLoading] = useState(false); // State để quản lý trạng thái loading

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
        status: 'OPEN' // Mặc định là OPEN
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Validate dữ liệu cơ bản
        if (!formData.title.trim() || !formData.branchName.trim()) {
            alert("Vui lòng nhập tiêu đề công việc và chi nhánh!");
            return;
        }

        // 2. Gọi API
        setLoading(true);
        try {
            await hrJobAPI.createJob(formData);
            
            alert("Tạo công việc thành công!");
            navigate('/hr/jobs'); // Quay về danh sách sau khi tạo xong
        } catch (error) {
            console.error("Lỗi khi tạo công việc:", error);
            // Bạn có thể hiển thị thông báo lỗi chi tiết hơn nếu backend trả về message
            alert("Đã xảy ra lỗi khi tạo công việc. Vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Hoàn thiện tin tuyển dụng</h1>
                <div className={styles.actions}>
                    <button 
                        className={styles.cancel} 
                        onClick={() => navigate('/hr/jobs')}
                        disabled={loading} // Disable khi đang loading
                    >
                        Hủy
                    </button>
                    <button 
                        className={styles.save} 
                        onClick={handleSubmit}
                        disabled={loading} // Disable khi đang loading
                    >
                        {loading ? "Đang xử lý..." : "Đăng tuyển"}
                    </button>
                </div>
            </div>

            <form className={styles.formGrid}>
                {/* Cột chính: Thông tin chi tiết */}
                <div className={styles.mainColumn}>
                    <div className={styles.card}>
                        <h3>Nội dung tuyển dụng</h3>
                        
                        <div className={styles.formGroup}>
                            <label>Tiêu đề công việc <span style={{color:'red'}}>*</span></label>
                            <input 
                                type="text" 
                                name="title" 
                                placeholder="VD: Senior Java Developer"
                                value={formData.title} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Mô tả công việc (Description)</label>
                            <textarea 
                                name="description" 
                                rows="5"
                                placeholder="- Phân tích yêu cầu và xây dựng kế hoạch..."
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Yêu cầu ứng viên (Requirements)</label>
                            <textarea 
                                name="requirements" 
                                rows="5"
                                placeholder="- Tốt nghiệp chuyên ngành CNTT..."
                                value={formData.requirements}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Quyền lợi (Benefits)</label>
                            <textarea 
                                name="benefits" 
                                rows="5"
                                placeholder="- Đóng BHXH đầy đủ, thưởng tháng 13..."
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
                            {/* Khi tạo mới thường mặc định là OPEN, có thể disable hoặc cho chọn */}
                            <select name="status" value={formData.status} onChange={handleChange}>
                                <option value="OPEN">Đang tuyển (OPEN)</option>
                                <option value="PAUSED">Tạm dừng (PAUSED)</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Chi nhánh <span style={{color:'red'}}>*</span></label>
                            <input 
                                type="text" 
                                name="branchName" 
                                placeholder="VD: Hà Nội"
                                value={formData.branchName} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Địa điểm làm việc cụ thể</label>
                            <input 
                                type="text" 
                                name="address" 
                                placeholder="VD: Tầng 5, Tòa nhà ABC..." 
                                value={formData.address} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Lương cơ bản (VND)</label>
                            <input 
                                type="number" 
                                name="basicSalary" 
                                placeholder="VD: 25000000"
                                value={formData.basicSalary} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Số lượng tuyển</label>
                            <input 
                                type="number" 
                                name="quantity" 
                                min="1"
                                value={formData.quantity} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Ngày bắt đầu</label>
                            <input 
                                type="date" 
                                name="startDate" 
                                value={formData.startDate} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Hạn chót (Deadline)</label>
                            <input 
                                type="date" 
                                name="deadline" 
                                value={formData.deadline} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}