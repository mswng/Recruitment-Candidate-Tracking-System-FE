import axiosInstance from "../client/axios";
import { decodeToken } from "./decodeToken";

// Login
export const login = async ({ email, password }) => {
  const response = await axiosInstance.post("/auth/login", { email, password });

  const result = response.data?.result;
  if (!result?.token) throw new Error("Không có token");

  const token = result.token;

  // Lưu token
  localStorage.setItem("token", token);

  // Giải mã token để lấy scope
  const decoded = decodeToken(token);

  if (decoded?.scope) {
    // Chuẩn hóa role: ROLE_ADMIN → ADMIN
    const rawRole = decoded.scope;
    const cleanedRole = rawRole.replace("ROLE_", "").toUpperCase();

    localStorage.setItem("role", cleanedRole);
  }

  return result;
};

