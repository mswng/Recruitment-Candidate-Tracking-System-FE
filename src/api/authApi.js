import { publicApi } from "./publicApi";

export const loginApi = (data) => {
  return publicApi.post("/auth/login", data);
};

export const registerApi = (data) => {
  return publicApi.post("/auth/register/candidate", data);
};
