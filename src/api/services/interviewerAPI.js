import axiosInstance from "../client/axios";

export const getInterviewerDashboard = async () => {
  const res = await axiosInstance.get(
    "/interviewer/dashboard"
  );

  if (res.data.code !== 200) {
    throw new Error(res.data.message || "Không lấy được dashboard interviewer");
  }

  return res.data.result;
};

export const getInterviewerInterviews = async () => {
  const res = await axiosInstance.get(
    "/interviewer/interviews"
  );
  return res.data.result;
};

export const evaluateInterview = async (interviewId, payload) => {
  const res = await axiosInstance.post(
    `/interviewer/interviews/${interviewId}/evaluate`,
    payload
  );
  return res.data;
};

export const getResumeLink = async (applicationId) => {
  const res = await axiosInstance.get(
    `/resume/${applicationId}/resume-link`
  );
  return res.data.result;
};
