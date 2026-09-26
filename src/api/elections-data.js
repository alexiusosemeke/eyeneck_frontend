import api from "./axios";

export const getActiveElections = async () => {
  const response = await api.get("/elections/?status=active");
  return response.data.results;
};

export const getElections = async () => {
  const res = await api.get("/elections/");
  return res?.data?.results;
};

export const fetchCandidates = async () => {
  const res = await api.get("/get-candidates/");
  return res?.data?.results ?? res?.data ?? [];
};
