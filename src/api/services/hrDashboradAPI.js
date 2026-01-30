import axiosInstance from "../client/axios"; // axios đã gắn interceptor token

export const getHrDashboard = async () => {
  const res = await axiosInstance.get(
    "/hr/dashboard"
  );

  if (res.data.code !== 200) {
    throw new Error(res.data.message || "Không lấy được dashboard HR");
  }

  return res.data.result;
};
