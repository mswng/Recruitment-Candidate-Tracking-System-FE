import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './InterviewDetail.module.scss';

export default function InterviewDetail() {
  const { id } = useParams();
  const [evaluation, setEvaluation] = useState({
    technicalSkill: 0,
    communication: 0,
    cultureFit: 0,
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (field, value) => {
    setEvaluation({
      ...evaluation,
      [field]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted evaluation:', evaluation);
    setSubmitted(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Chi tiết phỏng vấn</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.candidateInfo}>
          <h2>Thông tin ứng viên</h2>
          <div className={styles.infoBlock}>
            <p><strong>Tên:</strong> Nguyễn Văn A</p>
            <p><strong>Email:</strong> nguyenvana@example.com</p>
            <p><strong>Vị trí:</strong> React Developer</p>
            <p><strong>Số điện thoại:</strong> 0123456789</p>
            <p><strong>CV:</strong> <a href="/">Download CV</a></p>
          </div>
        </div>

        <div className={styles.evaluationForm}>
          <h2>Đánh giá phỏng vấn</h2>
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Kỹ năng kỹ thuật</label>
                <div className={styles.rating}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className={`${styles.star} ${evaluation.technicalSkill >= star ? styles.active : ''}`}
                      onClick={() => handleRatingChange('technicalSkill', star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Kỹ năng giao tiếp</label>
                <div className={styles.rating}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className={`${styles.star} ${evaluation.communication >= star ? styles.active : ''}`}
                      onClick={() => handleRatingChange('communication', star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Phù hợp văn hóa công ty</label>
                <div className={styles.rating}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className={`${styles.star} ${evaluation.cultureFit >= star ? styles.active : ''}`}
                      onClick={() => handleRatingChange('cultureFit', star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Ghi chú</label>
                <textarea
                  value={evaluation.notes}
                  onChange={(e) => setEvaluation({ ...evaluation, notes: e.target.value })}
                  placeholder="Nhập ghi chú về ứng viên..."
                  rows="5"
                />
              </div>

              <button type="submit" className={styles.btnSubmit}>
                Gửi đánh giá
              </button>
            </form>
          ) : (
            <div className={styles.success}>
              <p>✓ Đánh giá phỏng vấn đã được gửi thành công!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
