import axiosInstance from "../client/axios";

// Register candidate
export const registerCandidate = async ({
  fullName,
  email,
  password,
  confirmPassword,
}) => {
  try {
    const response = await axiosInstance.post(
      "/auth/register/candidate",
      {
        fullName,
        email,
        password,
        confirmPassword,
      }
    );

    return response.data; // { code, message, result }
  } catch (error) {
    const data = error.response?.data;
    throw new Error(data?.message || "Đăng ký thất bại");
  }
};
