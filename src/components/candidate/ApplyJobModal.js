import { useState } from "react";
import styles from "./ApplyJobModal.module.scss";
import { applyJob } from "../../api/services/jobsAPI";

export default function ApplyJobModal({ jobId, onClose }) {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!resume) {
      alert("Vui lòng chọn CV (PDF)");
      return;
    }

    try {
      setLoading(true);
      await applyJob({ jobId, resume });
      alert("Nộp đơn thành công!");
      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Nộp đơn ứng tuyển</h3>

        <div className={styles.formGroup}>
          <label>CV của bạn (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
          />
        </div>

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>
            Hủy
          </button>
          <button
            className={styles.submit}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Đang gửi..." : "Nộp đơn"}
          </button>
        </div>
      </div>
    </div>
  );
}
