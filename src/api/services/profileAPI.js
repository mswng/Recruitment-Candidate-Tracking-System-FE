import axiosInstance from "../client/axios";

// GET info
export const getProfileInfo = async () => {
  const res = await axiosInstance.get("/user/update/info");

  if (res.data.code !== 200) {
    throw new Error(res.data.message || "Không lấy được thông tin user");
  }

  return res.data.result;
};

// PATCH info
export const updateProfileInfo = async ({ fullName }) => {
  const res = await axiosInstance.patch("/user/update/info", { fullName });

  if (res.data.code !== 200) {
    throw new Error(res.data.message || "Cập nhật thất bại");
  }

  return res.data;
};

// CHANGE PASSWORD
export const changePassword = async (data) => {
  const res = await axiosInstance.patch(
    "/user/update/change-password",
    data
  );

  if (res.data.code !== 200) {
    throw new Error(res.data.message || "Đổi mật khẩu thất bại");
  }

  return res.data;
};
