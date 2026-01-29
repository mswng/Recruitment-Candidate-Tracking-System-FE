import axiosClient from "../client/axios";

const hrJobAPI = {
  // 1. Tạo vị trí công việc mới
  // Endpoint: POST /hr/jobs
  createJob: (jobData) => {
    const url = '/hr/jobs';
    return axiosClient.post(url, jobData);
  },

  // 2. Cập nhật thông tin vị trí công việc
  // Endpoint: PUT /hr/jobs/{id}
  updateJob: (id, jobData) => {
    const url = `/hr/jobs/${id}`;
    return axiosClient.put(url, jobData);
  },

  // 3. Thay đổi trạng thái công việc (OPEN, CLOSED, PAUSED)
  // Endpoint: PUT /hr/jobs/{id}/status/{status}
  // Lưu ý: status truyền vào string (VD: "PAUSED", "OPEN")
  updateJobStatus: (id, status) => {
    const url = `/hr/jobs/${id}/status/${status}`;
    // Dùng PUT vì đây là hành động cập nhật trạng thái
    return axiosClient.put(url); 
  },

  // 4. Xem danh sách tất cả vị trí công việc (có phân trang)
  // Endpoint: GET /hr/jobs?page=1&size=5
  getAllJobs: (page = 0, size = 5) => {
    const url = '/hr/jobs';
    return axiosClient.get(url, {
      params: { 
        page: page, 
        size: size 
      }
    });
  },

  // 5. Xem chi tiết một vị trí công việc
  // Endpoint: GET /hr/jobs/{id}
  getJobDetail: (id) => {
    const url = `/hr/jobs/${id}`;
    return axiosClient.get(url);
  }
};

export default hrJobAPI;