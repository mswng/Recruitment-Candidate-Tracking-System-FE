import axiosClient from "../client/axios";

const hrInterviewAPI = {
  // 1. Tạo lịch phỏng vấn
  // POST /hr/interviews
  createInterview: (data) => {
    const url = '/hr/interviews';
    return axiosClient.post(url, data);
  },

  // 2. Điều chỉnh lịch phỏng vấn
  // PUT /hr/interviews/{id}
  updateInterview: (id, data) => {
    const url = `/hr/interviews/${id}`;
    return axiosClient.put(url, data);
  },

  // 3. Lấy danh sách lịch phỏng vấn cho một đơn ứng tuyển
  // GET /hr/interviews/application/{applicationId}
  getInterviewsByApplication: (applicationId) => {
    const url = `/hr/interviews/application/${applicationId}`;
    return axiosClient.get(url);
  },

  // 4. Lấy tất cả đánh giá cho một cuộc phỏng vấn
  // GET /hr/interviews/{id}/evaluations
  getEvaluations: (interviewId) => {
    const url = `/hr/interviews/${interviewId}/evaluations`;
    return axiosClient.get(url);
  }
};

export default hrInterviewAPI;