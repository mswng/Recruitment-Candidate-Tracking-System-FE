import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./InterviewerDashboard.module.scss";

export default function InterviewerCV() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const id = new URLSearchParams(search).get("id") || 1;

  const [numPages, setNumPages] = useState(null);
  const [page, setPage] = useState(1);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card} style={{ maxWidth: 1000, margin: "auto" }}>
        <h3>Hồ sơ ứng viên</h3>
        <p>Phiên: #{id}</p>

        <div className={styles.pdfBox}>
          <Document
            file={`/cvs/${id}.pdf`}
            onLoadSuccess={(pdf) => setNumPages(pdf.numPages)}
            onLoadError={(err) => console.error("PDF error:", err)}
          >
            <Page pageNumber={page} width={800} />
          </Document>
        </div>

        <div className={styles.pdfNav}>
          <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
            ◀ Trang trước
          </button>

          <span>
            Trang {page} / {numPages}
          </span>

          <button
            disabled={page >= numPages}
            onClick={() => setPage(page + 1)}
          >
            Trang sau ▶
          </button>
        </div>

        <button
  className={styles.primaryBtn}
  onClick={() => navigate(`/interviewer/review?id=${id}`)}
>
  ← Quay lại đánh giá
</button>

      </div>
    </div>
  );
}
