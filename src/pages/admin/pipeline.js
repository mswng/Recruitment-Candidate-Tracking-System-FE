import React, { useState } from 'react';
import styles from './pipeline.module.scss';

export default function PipelineConfig() {
  const [stages, setStages] = useState([
    { id: 1, name: 'Ứng tuyển', order: 1 },
    { id: 2, name: 'Phỏng vấn', order: 2 },
    { id: 3, name: 'Đánh giá', order: 3 },
    { id: 4, name: 'Offer', order: 4 },
  ]);

  const [newStage, setNewStage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddStage = () => {
    if (newStage.trim()) {
      setStages([
        ...stages,
        { id: stages.length + 1, name: newStage, order: stages.length + 1 }
      ]);
      setNewStage('');
      setShowAddForm(false);
    }
  };

  const moveStage = (id, direction) => {
    const index = stages.findIndex(s => s.id === id);
    if ((direction === 'up' && index > 0) || (direction === 'down' && index < stages.length - 1)) {
      const newStages = [...stages];
      const nextIndex = direction === 'up' ? index - 1 : index + 1;
      
      // Swap
      [newStages[index], newStages[nextIndex]] = [newStages[nextIndex], newStages[index]];
      
      // Update order
      newStages.forEach((s, i) => s.order = i + 1);
      setStages(newStages);
    }
  };

  const deleteStage = (id) => {
    const newStages = stages.filter(s => s.id !== id);
    newStages.forEach((s, i) => s.order = i + 1);
    setStages(newStages);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Cấu hình Pipeline</h1>
        <button className={styles.btnAdd} onClick={() => setShowAddForm(true)}>
          + Thêm giai đoạn
        </button>
      </div>

      <div className={styles.stagesContainer}>
        {stages.map((stage) => (
          <div key={stage.id} className={styles.stageCard}>
            <div className={styles.stageHeader}>
              <h3>{stage.order}. {stage.name}</h3>
            </div>
            <div className={styles.stageActions}>
              <button 
                className={styles.btnMove}
                onClick={() => moveStage(stage.id, 'up')}
                disabled={stage.order === 1}
              >
                ↑
              </button>
              <button 
                className={styles.btnMove}
                onClick={() => moveStage(stage.id, 'down')}
                disabled={stage.order === stages.length}
              >
                ↓
              </button>
              <button 
                className={`${styles.btnDelete}`}
                onClick={() => deleteStage(stage.id)}
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className={styles.addForm}>
          <div className={styles.formBox}>
            <h3>Thêm giai đoạn mới</h3>
            <input
              type="text"
              value={newStage}
              onChange={(e) => setNewStage(e.target.value)}
              placeholder="Nhập tên giai đoạn"
              onKeyPress={(e) => e.key === 'Enter' && handleAddStage()}
            />
            <div className={styles.actions}>
              <button className={styles.btnSave} onClick={handleAddStage}>
                Thêm
              </button>
              <button className={styles.btnCancel} onClick={() => setShowAddForm(false)}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
