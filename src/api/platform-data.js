import api from "./axios";

export const fetchPlatformData = async () => {
  const response = await api.get("/");
  return response?.data;
};
