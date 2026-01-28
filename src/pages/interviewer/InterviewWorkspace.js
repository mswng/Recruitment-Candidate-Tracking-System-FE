import React, { useState } from "react";
import styles from "../admin/Dashboard.module.scss";

export default function InterviewWorkspace() {
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState("");
  const [tech, setTech] = useState(3);
  const [comm, setComm] = useState(3);
  const [att, setAtt] = useState(3);
  const [result, setResult] = useState("Consider");

  const interviews = [
    { id: 1, name: "Thomas Alva", position: "Backend Developer", time: "11:30", status: "Pending" },
    { id: 2, name: "Masum Billah", position: "UI/UX Designer", time: "12:00", status: "Completed" },
    { id: 3, name: "Smith Lives", position: "Content Writer", time: "12:30", status: "Pending" },
  ];

  const handleSave = () => {
    alert("Đã lưu đánh giá!");
    setSelected(null);
    setNote("");
    setTech(3);
    setComm(3);
    setAtt(3);
    setResult("Consider");
  };

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.hrGrid}>

        {/* DANH SÁCH PHỎNG VẤN */}
        {interviews.map((i) => (
          <div
            key={i.id}
            className={styles.hrCard}
            onClick={() => setSelected(i)}
            style={{ cursor: "pointer" }}
          >
            <h4>{i.name}</h4>
            <p>{i.position}</p>
            <p>{i.time}</p>
            <p>
              Trạng thái:{" "}
              <b style={{ color: i.status === "Completed" ? "#22c55e" : "#f59e0b" }}>
                {i.status}
              </b>
            </p>
          </div>
        ))}

        {/* FORM PHỎNG VẤN & ĐÁNH GIÁ */}
        {selected && (
          <div className={`${styles.hrCard} ${styles.hrFull}`}>
            <h4>Phỏng vấn & Đánh giá: {selected.name}</h4>
            <p><b>Vị trí:</b> {selected.position}</p>
            <p><b>Thời gian:</b> {selected.time}</p>

            <div className={styles.evalForm}>

              {/* HÀNG 1: 3 THANH ĐIỂM */}
              <div className={styles.evalScores}>
                <div>
                  <label>Chuyên môn: {tech}</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={tech}
                    onChange={(e) => setTech(e.target.value)}
                  />
                </div>

                <div>
                  <label>Giao tiếp: {comm}</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={comm}
                    onChange={(e) => setComm(e.target.value)}
                  />
                </div>

                <div>
                  <label>Thái độ: {att}</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={att}
                    onChange={(e) => setAtt(e.target.value)}
                  />
                </div>
              </div>

              {/* HÀNG 2: KẾT QUẢ + GHI CHÚ */}
              <div className={styles.evalTop}>
                <div className={styles.evalResultBox}>
                  <label>Kết quả</label>
                  <select
                    value={result}
                    onChange={(e) => setResult(e.target.value)}
                  >
                    <option value="Đạt">Pass</option>
                    <option value="Không đạt">Fail</option>
                    <option value="Xem xét">Consider</option>
                  </select>
                </div>

                <div className={styles.evalNoteBox}>
                  <label>Ghi chú phỏng vấn</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              {/* HÀNG 3: NÚT */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={handleSave} className={styles.saveBtn}>
                  Lưu đánh giá
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
