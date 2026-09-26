import {FeaturedCandidates} from "../features/candidates/components/FeaturedCandidates";
import {useFeaturedCandidates} from "../hooks/useFeaturedCandidates";

const Candidates = () => {
    const { data: candidates = [], isLoading, isError, error } = useFeaturedCandidates();

    if (isError) {
    return (
      <div className="p-4 rounded-xl bg-error/10 border border-error/20 text-xs text-error">
        Failed to load candidates: {error?.message || "Server Error"}
      </div>
    );
  }
  
  return (
    <section className="py-24 bg-surface-container-low border-y border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-desktop">
            <FeaturedCandidates
        candidates={candidates}
        isLoading={isLoading}
        onSelectCandidate={(candidate) => {
          console.log("Selected candidate profile:", candidate);
        }}
      />
        </div>
      </section>
  )
}

export default Candidates