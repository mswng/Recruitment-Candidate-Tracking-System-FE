import { jwtDecode } from "jwt-decode";

export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return {
      email: decoded.sub,
      fullName: decoded.fullName,
      role: decoded.scope,
    };
  } catch {
    return null;
  }
};
