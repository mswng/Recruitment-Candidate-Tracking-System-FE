import React, { useState } from 'react';
import hrOfferAPI from '../../../../api/services/hrOfferAPI';
import styles from './OfferForm.module.scss'; // Tạo file css tương ứng

const OfferForm = ({ applicationId, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        basicSalary: '',
        startWorkDate: '',
        contractType: 'FULL_TIME'
    });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true);

        // Convert basicSalary sang number
        const payload = {
            applicationId: applicationId,
            basicSalary: Number(formData.basicSalary),
            startWorkDate: formData.startWorkDate,
            contractType: formData.contractType
        };

        try {
            const res = await hrOfferAPI.createOffer(payload);
            
            // Nếu thành công (code 201)
            onSuccess(); // Callback để reload lại trạng thái ứng viên bên ngoài
        } catch (error) {
            console.error("Lỗi gửi offer:", error);
            
            // Xử lý lỗi từ Backend trả về
            const responseData = error.response?.data;
            if (responseData?.code === 5506) {
                setErrorMsg("Lỗi: Trạng thái ứng viên không hợp lệ để gửi Offer (Phải là INTERVIEWING).");
            } else {
                setErrorMsg(responseData?.message || "Có lỗi xảy ra khi gửi Offer.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.offerFormContainer}>
            <h3>Soạn Thư Mời Làm Việc (Offer)</h3>
            
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Mức lương cơ bản (VND)</label>
                    <input 
                        type="number" 
                        name="basicSalary" 
                        value={formData.basicSalary}
                        onChange={handleChange}
                        placeholder="VD: 20000000"
                        required
                        min="0"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Ngày bắt đầu làm việc</label>
                    <input 
                        type="date" 
                        name="startWorkDate" 
                        value={formData.startWorkDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Loại hợp đồng</label>
                    <select name="contractType" value={formData.contractType} onChange={handleChange}>
                        <option value="FULL_TIME">Toàn thời gian (Full-time)</option>
                        <option value="PART_TIME">Bán thời gian (Part-time)</option>
                        {/* <option value="FREELANCE">Freelance</option> */}
                        <option value="INTERNSHIP">Thực tập sinh (Internship)</option>
                    </select>
                </div>

                <div className={styles.actions}>
                    <button type="button" onClick={onClose} className={styles.btnCancel}>Hủy</button>
                    <button type="submit" className={styles.btnSubmit} disabled={loading}>
                        {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Gửi Offer'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OfferForm;