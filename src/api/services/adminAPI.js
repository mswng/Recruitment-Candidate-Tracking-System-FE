import axiosInstance from "../client/axios";

export const getAdminDashboard = async () => {
  const res = await axiosInstance.get("/admin/dashboard");

  if (res.data.code !== 200) {
    throw new Error(res.data.message || "Lỗi lấy dashboard admin");
  }

  return res.data.result;
};

// Lấy danh sách users (phân trang)
export const getAdminUsers = async ({ page = 0, size = 10 }) => {
  const res = await axiosInstance.get(
    `/admin/users?page=${page}&size=${size}`
  );

  if (res.data.code !== 200) {
    throw new Error(res.data.message || "Lỗi lấy danh sách người dùng");
  }

  return res.data.result; 
};

// Cập nhật thông tin user
export const updateUserInfo = async (id, data) => {
  const res = await axiosInstance.put(`/admin/users/${id}`, data);

  if (res.data.code !== 200) {
    throw new Error(res.data.message || "Cập nhật user thất bại");
  }

  return res.data;
};

// Cập nhật trạng thái user
export const updateUserStatus = async (id) => {
  const res = await axiosInstance.patch(`/admin/users/${id}/status`);

  if (res.data.code !== 200) {
    throw new Error(res.data.message || "Cập nhật trạng thái thất bại");
  }

  return res.data;
};

// Thêm người dùng mới
export const addAdminUser = async (data) => {
  const res = await axiosInstance.post(
    "/admin/users/add-user",
    data
  );

  if (res.data.code !== 200 && res.data.code !== 201) {
    throw new Error(res.data.message || "Thêm người dùng thất bại");
  }

  return res.data;
};

