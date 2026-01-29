import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './CreateJob.module.scss'; // Dùng lại style của CreateJob
import hrJobAPI from '../../../api/services/hrJobAPI'; // Import API

export default function EditJob() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        benefits: '',
        status: 'OPEN',
        address: '',
        branchName: '',
        basicSalary: 0,
        startDate: '',
        deadline: '',
        quantity: 1
    });

    // Hàm helper để format ngày từ "2026-02-29T10:00:00" về "2026-02-29" cho input date
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        return dateString.split('T')[0];
    };

    // 1. Fetch data từ API khi vào trang
    useEffect(() => {
        const fetchJobDetail = async () => {
            try {
                const response = await hrJobAPI.getJobDetail(id);
                // Giả sử response trả về cấu trúc: { result: { ...data } } hoặc trực tiếp data
                console.log("Job detail response:", response);
                const data = response.data.result;
                
                setFormData({
                    title: data.title || '',
                    description: data.description || '',
                    requirements: data.requirements || '',
                    benefits: data.benefits || '',
                    status: data.status || 'OPEN',
                    address: data.address || '',
                    branchName: data.branchName || '',
                    basicSalary: data.basicSalary || 0,
                    quantity: data.quantity || 1,
                    startDate: formatDateForInput(data.startDate),
                    deadline: formatDateForInput(data.deadline),
                });
            } catch (error) {
                console.error("Lỗi khi tải thông tin công việc:", error);
                alert("Không thể tải dữ liệu công việc!");
                navigate('/hr/jobs');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchJobDetail();
        }
    }, [id, navigate]);

    // Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 2. Gọi API cập nhật dữ liệu
    const handleUpdate = async (e) => {
        e.preventDefault();
        
        // Validate cơ bản
        if (!formData.title || !formData.branchName) {
            alert("Vui lòng nhập tên công việc và chi nhánh!");
            return;
        }

        try {
            await hrJobAPI.updateJob(id, formData);
            alert("Cập nhật thành công!");
            navigate('/hr/jobs');
        } catch (error) {
            console.error("Update failed:", error);
            alert("Có lỗi xảy ra khi cập nhật!");
        }
    };

    if (loading) return <div className={styles.container}><p>Đang tải dữ liệu...</p></div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Chỉnh sửa công việc: #{id}</h1>
                <div className={styles.actions}>
                    <button className={styles.cancel} onClick={() => navigate('/hr/jobs')}>Hủy</button>
                    <button className={styles.save} onClick={handleUpdate}>Lưu thay đổi</button>
                </div>
            </div>

            <form className={styles.formGrid}>
                {/* Cột chính: Nội dung chi tiết */}
                <div className={styles.mainColumn}>
                    <div className={styles.card}>
                        <h3>Nội dung tuyển dụng</h3>
                        
                        <div className={styles.formGroup}>
                            <label>Tiêu đề <span style={{color:'red'}}>*</span></label>
                            <input 
                                type="text" 
                                name="title" 
                                value={formData.title} 
                                onChange={handleChange} 
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label>Mô tả công việc</label>
                            <textarea 
                                name="description" 
                                rows="5"
                                value={formData.description} 
                                onChange={handleChange} 
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label>Yêu cầu ứng viên</label>
                            <textarea 
                                name="requirements" 
                                rows="5"
                                value={formData.requirements} 
                                onChange={handleChange} 
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label>Quyền lợi</label>
                            <textarea 
                                name="benefits" 
                                rows="5"
                                value={formData.benefits} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                </div>

                {/* Cột phụ: Cấu hình & Thông tin chung */}
                <div className={styles.sideColumn}>
                    <div className={styles.card}>
                        <h3>Cấu hình</h3>
                        
                        <div className={styles.formGroup}>
                            <label>Trạng thái</label>
                            <select name="status" value={formData.status} onChange={handleChange}>
                                <option value="OPEN">Đang tuyển (OPEN)</option>
                                <option value="PAUSED">Tạm dừng (PAUSED)</option>
                                <option value="CLOSED">Đóng (CLOSED)</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Chi nhánh <span style={{color:'red'}}>*</span></label>
                            <input 
                                type="text" 
                                name="branchName" 
                                value={formData.branchName} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Địa điểm làm việc</label>
                            <input 
                                type="text" 
                                name="address" 
                                placeholder="VD: Tòa nhà A, Quận 1..."
                                value={formData.address} 
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
                            <label>Lương cơ bản (VND)</label>
                            <input 
                                type="number" 
                                name="basicSalary" 
                                value={formData.basicSalary} 
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
                            <label>Hạn chót nộp hồ sơ</label>
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