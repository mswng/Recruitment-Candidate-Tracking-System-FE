import axiosInstance from "../client/axios";

// ✅ Cập nhật thông tin cá nhân
export const updateProfileInfo = async ({ fullName }) => {
  const res = await axiosInstance.patch("/user/update/info", {
    fullName,
  });

  if (res.data.code !== 200) {
    throw new Error(res.data.message || "Cập nhật thất bại");
  }

  return res.data;
};

// ✅ Đổi mật khẩu
export const changePassword = async ({
  oldPassword,
  newPassword,
  confirmNewPassword,
}) => {
  const res = await axiosInstance.patch("/user/update/change-password", {
    oldPassword,
    newPassword,
    confirmNewPassword,
  });

  if (res.data.code !== 200) {
    throw new Error(res.data.message || "Đổi mật khẩu thất bại");
  }

  return res.data;
};
