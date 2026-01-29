import axiosInstance from "../client/axios";

export const getCandidateJobs = async ({ page = 0, size = 10 }) => {
  const res = await axiosInstance.get("/candidate/jobs", {
    params: { page, size },
  });

  if (res.data.code !== 200) {
    throw new Error(res.data.message || "Lỗi lấy danh sách công việc");
  }

  return res.data.result;
};

export const getJobDetail = async (id) => {
  const res = await axiosInstance.get(`/candidate/jobs/${id}`);

  if (res.data.code !== 200) {
    throw new Error(res.data.message || "Không lấy được chi tiết công việc");
  }

  return res.data.result; // job detail
};

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