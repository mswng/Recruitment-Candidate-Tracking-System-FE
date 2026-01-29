import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./HRJobs.module.scss";
import hrJobAPI from '../../../api/services/hrJobAPI'; // Import API service

export default function HRJobs() {
    const navigate = useNavigate();
    
    // --- State Management ---
    const [jobs, setJobs] = useState([]);
    const [pageNumber, setPageNumber] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Pagination State (Mặc định trang 1, size 5 như yêu cầu)
    const [pagination, setPagination] = useState({
        page: 0,
        size: 5,
        totalItems: 0
    });

    // Modal State (Giữ nguyên logic cũ của bạn)
    const [showModal, setShowModal] = useState(false);
    const [newJobBasic, setNewJobBasic] = useState({
        title: '',
        branchName: '',
        quantity: 1,
        deadline: ''
    });

    // --- Lifecycle: Gọi API khi component mount hoặc page thay đổi ---
    useEffect(() => {
        fetchJobs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination.page]);

    // --- API Calls ---
    const fetchJobs = async () => {
        setLoading(true);
        try {
            // Gọi API: page, size
            const response = await hrJobAPI.getAllJobs(pagination.page, pagination.size);
            if (response && response.data.result) {
                setJobs(response.data.result.items || []);
                setPageNumber(response.data.result.totalPages || 0);
            }
            console.log("Fetched jobs:", pageNumber);
        } catch (error) {
            console.error("Failed to fetch jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    // --- Handlers ---
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleChangeBasic = (e) => {
        const { name, value } = e.target;
        setNewJobBasic(prev => ({ ...prev, [name]: value }));
    };

    const handleCreateInitial = () => {
        if (!newJobBasic.title || !newJobBasic.branchName) {
            alert("Vui lòng nhập tên công việc và chi nhánh!");
            return;
        }
        navigate('/hr/jobs/create', { state: { initialData: newJobBasic } });
    };

    const handleEdit = (id) => {
        navigate(`/hr/jobs/edit/${id}`); // Điều hướng đến trang edit với ID thật
    };

    // Helper: Format tiền tệ VND
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    // Helper: Format ngày tháng (nếu cần)
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        // Convert "2026-02-28" -> "28/02/2026"
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    // Helper: Style màu cho Status
    const getStatusClass = (status) => {
        switch (status) {
            case 'OPEN': return styles.tagOpen;   // Bạn cần thêm class này vào CSS
            case 'CLOSED': return styles.tagClosed;
            case 'PAUSED': return styles.tagPaused;
            default: return styles.tag;
        }
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

            {/* Loading & Empty State */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>Đang tải dữ liệu...</div>
            ) : (
                <div className={styles.list}>
                    {jobs.length > 0 ? (
                        jobs.map((job) => (
                            <div key={job.id} className={styles.card}>
                                <img src="./../assets/imgs/logo.png" alt="logo" className={styles.logo} />
                                <div className={styles.content}>
                                    <div className={styles.titleRow}>
                                        <h3>{job.title}</h3>
                                        <span className={styles.salary}>
                                            {job.basicSalary ? formatCurrency(job.basicSalary) : "Thỏa thuận"}
                                        </span>
                                    </div>
                                    <p className={styles.company}>Chi nhánh: {job.branchName}</p>
                                    <div className={styles.meta}>
                                        <span>Hạn nộp: {formatDate(job.deadline)}</span>
                                        <span>Số lượng: {job.quantity}</span>
                                        <span className={`${styles.tag} ${getStatusClass(job.status)}`}>
                                            {job.status}
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.actions}>
                                    <button className={styles.editBtn} onClick={() => handleEdit(job.id)}>
                                        Chỉnh sửa
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', color: '#666' }}>Không có công việc nào.</div>
                    )}
                </div>
            )}

            {/* Pagination Controls (Đơn giản) */}
            <div className={styles.pagination}>
                <button 
                    disabled={pagination.page <= 1} 
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                >
                    Trước
                </button>
                <span style={{ margin: '0 10px' }}>Trang {pagination.page + 1}/ {pageNumber}</span>
                <button 
                    // Logic disable nút sau cần totalPages từ BE, tạm thời để luôn mở hoặc check jobs.length < size
                    disabled={jobs.length < pagination.size}
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                >
                    Sau
                </button>
            </div>

            {/* MODAL THÊM CƠ BẢN (Giữ nguyên) */}
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