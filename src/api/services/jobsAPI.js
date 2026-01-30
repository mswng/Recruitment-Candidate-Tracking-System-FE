import axiosInstance from "../client/axios";

// ================= GET LIST =================
export const getCandidateJobs = async ({ page, size }) => {
  const res = await axiosInstance.get("/candidate/jobs", {
    params: { page, size },
  });

  if (res.data.code !== 200) {
    throw new Error(res.data.message || "Lỗi lấy danh sách công việc");
  }

  return res.data.result; // 👈 CHỈ TRẢ result
};

// ================= SEARCH =================
export const searchCandidateJobs = async ({ keyword, page, size }) => {
  const res = await axiosInstance.get("/candidate/jobs/search", {
    params: { keyword, page, size },
  });

  if (res.data.code !== 200) {
    throw new Error(res.data.message || "Lỗi tìm kiếm công việc");
  }

  return res.data.result; // 👈 Y HỆT FORMAT
};

// Lấy chi tiết công việc cho candidate
export const getJobDetail = async (id) => {
  const res = await axiosInstance.get(`/candidate/jobs/${id}`);

  if (res.data.code !== 200) {
    throw new Error(res.data.message || "Không lấy được chi tiết công việc");
  }

  return res.data.result; // job detail
};

// Nộp đơn ứng tuyển công việc
export const applyJob = async ({ jobId, resume }) => {
  const formData = new FormData();
  formData.append("jobId", jobId);
  formData.append("resume", resume);

  const res = await axiosInstance.post(
    "/candidate/applications",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (res.data.code !== 200) {
    throw new Error(res.data.message || "Nộp đơn thất bại");
  }

  return res.data;
};

// Lấy các công việc liên quan
export const getRelatedJobs = async (jobId) => {
  const res = await axiosInstance.get(
    `/candidate/jobs/${jobId}/related`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return res.data.result; // { items, page, totalPages }
};
