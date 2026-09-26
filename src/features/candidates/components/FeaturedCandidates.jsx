import { Candidate } from "./Candidate";

export const FeaturedCandidates = ({
  candidates = [],
  isLoading = false,
  title = "Featured Candidates",
  subtitle = "Prominent contenders leading the upcoming election polls",
  onSelectCandidate,
}) => {
  // Skeleton Loading State
  if (isLoading) {
    return (
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="h-7 w-48 bg-surface-container-high rounded-md animate-pulse" />
          <div className="h-4 w-72 bg-surface-container-high rounded-md animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 space-y-4 animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-surface-container-high shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-5 bg-surface-container-high rounded w-3/4" />
                  <div className="h-4 bg-surface-container-high rounded w-1/2" />
                </div>
              </div>
              <div className="h-12 bg-surface-container-high rounded-xl w-full" />
              <div className="h-10 bg-surface-container-high rounded-xl w-full" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Empty State
  if (!candidates.length) {
    return (
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-10 text-center space-y-3">
        <span className="material-symbols-outlined text-on-surface-variant text-4xl">
          group_off
        </span>
        <h3 className="font-bold text-on-surface text-base">No Candidates Found</h3>
        <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
          No featured candidates are available at this time.
        </p>
      </div>
    );
  }

  // Active Grid
  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-on-background">{title}</h2>
          {subtitle && (
            <p className="text-xs text-on-surface-variant mt-0.5">{subtitle}</p>
          )}
        </div>
        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold self-start sm:self-auto">
          {candidates.length} Contenders
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <Candidate
            key={candidate.id || candidate.candidate_id}
            candidate={candidate}
            onSelect={onSelectCandidate}
          />
        ))}
      </div>
    </section>
  );
};