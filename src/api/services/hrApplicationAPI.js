// src/api/services/hrApplicationAPI.js
import axiosClient from "../client/axios";

const hrApplicationAPI = {
  // 1. Lấy toàn bộ danh sách đơn ứng tuyển (có phân trang)
  getAll: (page = 0, size = 5) => {
    const url = '/hr/applications';
    return axiosClient.get(url, {
      params: { page, size }
    });
  },

  // 2. Lấy danh sách theo Vị trí công việc (Job ID)
  getByJobId: (jobId, page = 0, size = 5) => {
    const url = `/hr/applications/job/${jobId}`;
    return axiosClient.get(url, {
      params: { page, size }
    });
  },

  // 3. Lấy danh sách theo Giai đoạn (Stage)
  getByStage: (stage, page = 0, size = 5) => {
    const url = `/hr/applications/stage/${stage}`;
    return axiosClient.get(url, {
      params: { page, size }
    });
  },

  // 4. Xem chi tiết một đơn ứng tuyển
  getDetail: (id) => {
    const url = `/hr/applications/${id}`;
    return axiosClient.get(url);
  },

  // 5. Cập nhật giai đoạn tuyển dụng (Chuyển trạng thái)
  updateStage: (id, newStage) => {
    const url = `/hr/applications/${id}/stage`;
    // Body gửi lên backend: { "stage": "INTERVIEW" }
    return axiosClient.put(url, { stage: newStage });
  }
};

export default hrApplicationAPI;