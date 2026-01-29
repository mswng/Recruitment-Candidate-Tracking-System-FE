import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./HRJobs.module.scss";

// Mock data giả lập từ DB
const initialJobs = [
    {
        id: 1,
        title: "Talent Acquisition Supervisor",
        branchName: "Hồ Chí Minh",
        basicSalary: 25000000,
        deadline: "2024-12-31",
        status: "OPEN",
        quantity: 2,
    },
    // ... thêm các job khác
];

export default function HRJobs() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState(initialJobs);
    
    // State cho Modal
    const [showModal, setShowModal] = useState(false);
    const [newJobBasic, setNewJobBasic] = useState({
        title: '',
        branchName: '',
        quantity: 1,
        deadline: ''
    });

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleChangeBasic = (e) => {
        const { name, value } = e.target;
        setNewJobBasic(prev => ({ ...prev, [name]: value }));
    };

    // Khi nhấn "Tạo" ở Modal -> Chuyển sang trang CreateJob chi tiết
    const handleCreateInitial = () => {
        if (!newJobBasic.title || !newJobBasic.branchName) {
            alert("Vui lòng nhập tên công việc và chi nhánh!");
            return;
        }
        // Truyền state qua location để trang CreateJob nhận dữ liệu này
        navigate('/hr/jobs/create', { state: { initialData: newJobBasic } });
    };

    const handleEdit = (id) => {
        navigate(`/hr/jobs/edit/${id}`);
    };

    return (
        <div className={styles.wrapper}>
            <h2>Quản lý tuyển dụng</h2>

            <div className={styles.header}>
                <p>Danh sách các vị trí đang tuyển dụng</p>
                <button onClick={handleOpenModal} className={styles.btnAdd}>
                    + Thêm công việc
                </button>
            </div>

            <div className={styles.list}>
                {jobs.map((job) => (
                    <div key={job.id} className={styles.card}>
                        <img src="https://via.placeholder.com/64" alt="logo" className={styles.logo} />
                        <div className={styles.content}>
                            <div className={styles.titleRow}>
                                <h3>{job.title}</h3>
                                <span className={styles.salary}>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(job.basicSalary)}
                                </span>
                            </div>
                            <p className={styles.company}>Chi nhánh: {job.branchName}</p>
                            <div className={styles.meta}>
                                <span>Hạn nộp: {job.deadline}</span>
                                <span>Số lượng: {job.quantity}</span>
                                <span className={styles.tag}>{job.status}</span>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <button className={styles.editBtn} onClick={() => handleEdit(job.id)}>Chỉnh sửa</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL THÊM CƠ BẢN */}
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>Thêm mới công việc</h3>
                        
                        <div className={styles.formGroup}>
                            <label>Tên vị trí tuyển dụng <span style={{color:'red'}}>*</span></label>
                            <input 
                                type="text" 
                                name="title" 
                                placeholder="VD: Senior Java Developer"
                                value={newJobBasic.title}
                                onChange={handleChangeBasic}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Tên chi nhánh <span style={{color:'red'}}>*</span></label>
                            <input 
                                type="text" 
                                name="branchName" 
                                placeholder="VD: Trụ sở Hà Nội"
                                value={newJobBasic.branchName}
                                onChange={handleChangeBasic}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Số lượng tuyển</label>
                            <input 
                                type="number" 
                                name="quantity" 
                                min="1"
                                value={newJobBasic.quantity}
                                onChange={handleChangeBasic}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Hạn chót nộp hồ sơ</label>
                            <input 
                                type="date" 
                                name="deadline" 
                                value={newJobBasic.deadline}
                                onChange={handleChangeBasic}
                            />
                        </div>

                        <div className={styles.modalActions}>
                            <button onClick={handleCloseModal} className={styles.cancel}>Hủy bỏ</button>
                            <button onClick={handleCreateInitial} className={styles.submit}>Tiếp tục &rarr;</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}