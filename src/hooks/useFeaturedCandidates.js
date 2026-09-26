import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

const fetchFeaturedCandidates = async () => {
  const res = await api.get("/get-candidates/");
  const candidates = res?.data?.results ?? res?.data ?? [];

  return candidates.map((candidate) => ({
    id: candidate.id,
    name: candidate.candidate_name || "Candidate",
    party: candidate.party?.name || "Independent",
    party_initials: candidate.party?.party_initials || "",
    image: candidate.candidate_image || "",
    description:
      candidate.position?.description ||
      candidate.position?.name_display ||
      candidate.position?.name ||
      "No position details available.",
  }));
};

export const useFeaturedCandidates = () => {
  return useQuery({
    queryKey: ["featuredCandidates"],
    queryFn: fetchFeaturedCandidates,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
