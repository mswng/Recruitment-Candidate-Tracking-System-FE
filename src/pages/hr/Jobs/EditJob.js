import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './CreateJob.module.scss'; // Dùng lại style của CreateJob

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
        basicSalary: '',
        startDate: '',
        deadline: '',
        quantity: 1
    });

    // Giả lập fetch data từ API
    useEffect(() => {
        // fetch(`/api/jobs/${id}`).then(...)
        // Ở đây mình set timeout giả lập
        setTimeout(() => {
            setFormData({
                title: "Talent Acquisition Supervisor",
                description: "Mô tả cũ...",
                requirements: "Yêu cầu cũ...",
                benefits: "Quyền lợi cũ...",
                status: 'OPEN',
                address: "Toà nhà FPT, Đà Nẵng",
                branchName: "Đà Nẵng",
                basicSalary: 25000000,
                startDate: "2024-01-01",
                deadline: "2024-12-31",
                quantity: 2
            });
            setLoading(false);
        }, 500);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        // TODO: PUT /api/jobs/{id}
        console.log("Updating Job ID:", id, formData);
        alert("Cập nhật thành công!");
        navigate('/hr/jobs');
    };

    if (loading) return <div>Đang tải dữ liệu...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Chỉnh sửa công việc: #{id}</h1>
                <div className={styles.actions}>
                    <button className={styles.cancel} onClick={() => navigate('/hr/jobs')}>Hủy</button>
                    <button className={styles.save} onClick={handleUpdate}>Lưu thay đổi</button>
                </div>
            </div>

            {/* Form giống hệt CreateJob, bạn có thể tách phần form ra thành Component riêng nếu muốn tái sử dụng code tốt hơn */}
            <form className={styles.formGrid}>
                <div className={styles.mainColumn}>
                    <div className={styles.card}>
                        <h3>Nội dung tuyển dụng</h3>
                        <div className={styles.formGroup}>
                            <label>Tiêu đề</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Mô tả</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Yêu cầu</label>
                            <textarea name="requirements" value={formData.requirements} onChange={handleChange} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Quyền lợi</label>
                            <textarea name="benefits" value={formData.benefits} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className={styles.sideColumn}>
                    <div className={styles.card}>
                        <h3>Cấu hình</h3>
                        <div className={styles.formGroup}>
                            <label>Trạng thái</label>
                            <select name="status" value={formData.status} onChange={handleChange}>
                                <option value="OPEN">OPEN</option>
                                <option value="CLOSED">CLOSED</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Lương cơ bản</label>
                            <input type="number" name="basicSalary" value={formData.basicSalary} onChange={handleChange} />
                        </div>
                         <div className={styles.formGroup}>
                            <label>Hạn chót</label>
                            <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} />
                        </div>
                         {/* Các trường còn lại tương tự... */}
                    </div>
                </div>
            </form>
        </div>
    );
}