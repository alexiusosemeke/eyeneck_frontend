import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { fetchCandidates } from "../api/elections-data";

const manifestoTopics = [
  {
    icon: "payments",
    title: "Economic opportunity",
    description:
      "Illustrative priority: support job creation, small businesses, and transparent policies that encourage sustainable growth.",
  },
  {
    icon: "school",
    title: "Education and skills",
    description:
      "Illustrative priority: improve access to quality education and practical skills training for young people and adults.",
  },
  {
    icon: "health_and_safety",
    title: "Health and wellbeing",
    description:
      "Illustrative priority: strengthen access to essential healthcare and improve the quality of community health services.",
  },
  {
    icon: "security",
    title: "Safer communities",
    description:
      "Illustrative priority: invest in prevention, responsive public services, and accountable community safety initiatives.",
  },
  {
    icon: "water_drop",
    title: "Infrastructure and environment",
    description:
      "Illustrative priority: maintain essential infrastructure and plan resilient, sustainable communities.",
  },
  {
    icon: "account_balance",
    title: "Accountable government",
    description:
      "Illustrative priority: publish clear progress measures, use public funds responsibly, and make government services accessible.",
  },
];

const getCandidateName = (candidate) =>
  candidate?.candidate_name ||
  candidate?.user?.full_name ||
  [candidate?.user?.first_name, candidate?.user?.last_name]
    .filter(Boolean)
    .join(" ") ||
  "Candidate";

export default function CandidateProfile() {
  const { id } = useParams();
  const {
    data: candidate,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["candidate-profile", id],
    queryFn: async () => {
      const candidates = await fetchCandidates();
      return candidates.find((item) => String(item.id) === id) ?? null;
    },
  });

  const candidateName = getCandidateName(candidate);
  const party = candidate?.party ?? {};
  const position = candidate?.position ?? {};
  const positionLabel = position.name_display || position.name || "Candidate";
  const initials = candidateName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <Link
            to="/candidates"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <span className="material-symbols-outlined text-lg">
              arrow_back
            </span>
            Back to candidates
          </Link>

          {isLoading ? (
            <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-10 text-center text-sm text-on-surface-variant">
              Loading candidate profile…
            </div>
          ) : isError ? (
            <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-10 text-center">
              <h1 className="text-lg font-bold text-on-surface">
                Profile unavailable
              </h1>
              <p className="mt-2 text-sm text-on-surface-variant">
                We couldn’t load this candidate’s information.
              </p>
              <button
                onClick={() => refetch()}
                className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-on-primary"
              >
                Try again
              </button>
            </div>
          ) : !candidate ? (
            <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-10 text-center">
              <h1 className="text-lg font-bold text-on-surface">
                Candidate not found
              </h1>
              <p className="mt-2 text-sm text-on-surface-variant">
                This profile may have been removed or the link may be incorrect.
              </p>
            </div>
          ) : (
            <>
              <section className="overflow-hidden rounded-3xl border border-outline-variant/60 bg-surface-container-lowest shadow-sm">
                <div className="h-36 bg-linear-to-r from-primary/20 via-primary/5 to-surface-container-high sm:h-48" />
                <div className="px-6 pb-8 sm:px-10">
                  <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex items-end gap-4">
                      {candidate.candidate_image ? (
                        <img
                          src={candidate.candidate_image}
                          alt={candidateName}
                          className="h-28 w-28 rounded-3xl border-4 border-surface-container-lowest object-cover shadow-md sm:h-32 sm:w-32"
                        />
                      ) : (
                        <div className="flex h-28 w-28 items-center justify-center rounded-3xl border-4 border-surface-container-lowest bg-surface-container-high text-3xl font-black text-primary shadow-md sm:h-32 sm:w-32">
                          {initials}
                        </div>
                      )}
                      <div className="pb-1">
                        <span className="inline-flex rounded-lg border border-outline-variant bg-surface-container-low px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-on-surface-variant">
                          {positionLabel}
                        </span>
                      </div>
                    </div>
                    <Link
                      to="/pvc-verification"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-on-primary transition hover:opacity-90"
                    >
                      <span className="material-symbols-outlined text-base">
                        how_to_vote
                      </span>
                      Voter information
                    </Link>
                  </div>

                  <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div>
                      <h1 className="text-3xl font-black tracking-tight text-on-surface sm:text-4xl">
                        {candidateName}
                      </h1>
                      <p className="mt-2 text-base font-semibold text-on-surface-variant">
                        {party.name || "Party information unavailable"}
                        {party.party_initials
                          ? ` (${party.party_initials})`
                          : ""}
                      </p>
                      {party.party_slogan && (
                        <p className="mt-2 text-sm italic text-on-surface-variant">
                          “{party.party_slogan}”
                        </p>
                      )}
                    </div>
                    {party.logo && (
                      <img
                        src={party.logo}
                        alt={`${party.name || "Party"} logo`}
                        className="h-16 max-w-32 object-contain"
                      />
                    )}
                  </div>
                </div>
              </section>

              <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
                <div className="space-y-6">
                  <article className="rounded-3xl border border-outline-variant/60 bg-surface-container-lowest p-6 sm:p-8">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <span className="material-symbols-outlined">
                          description
                        </span>
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold text-on-surface">
                          Manifesto overview
                        </h2>
                        <p className="text-xs text-on-surface-variant">
                          Key policy areas for voters to review
                        </p>
                      </div>
                    </div>
                    <div className="mb-5 rounded-xl border border-amber-300/70 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
                      These are illustrative sample topics, not a verified
                      manifesto submitted by this candidate. Replace them with
                      approved candidate materials when available.
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {manifestoTopics.map((topic) => (
                        <div
                          key={topic.title}
                          className="rounded-2xl border border-outline-variant/50 bg-surface-container-low p-5"
                        >
                          <span className="material-symbols-outlined text-2xl text-primary">
                            {topic.icon}
                          </span>
                          <h3 className="mt-3 font-bold text-on-surface">
                            {topic.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                            {topic.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </article>

                  <article className="rounded-3xl border border-outline-variant/60 bg-surface-container-lowest p-6 sm:p-8">
                    <h2 className="text-xl font-extrabold text-on-surface">
                      About the party
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                      {party.description ||
                        "Party background information has not been added yet."}
                    </p>
                  </article>
                </div>

                <aside className="h-fit rounded-3xl border border-outline-variant/60 bg-surface-container-lowest p-6">
                  <h2 className="text-lg font-extrabold text-on-surface">
                    Candidate details
                  </h2>
                  <dl className="mt-5 divide-y divide-outline-variant/60">
                    <div className="py-4 first:pt-0">
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                        Position
                      </dt>
                      <dd className="mt-1 font-semibold text-on-surface">
                        {positionLabel}
                      </dd>
                    </div>
                    <div className="py-4">
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                        Political party
                      </dt>
                      <dd className="mt-1 font-semibold text-on-surface">
                        {party.name || "Not provided"}
                        {party.party_initials
                          ? ` (${party.party_initials})`
                          : ""}
                      </dd>
                    </div>
                    <div className="py-4 last:pb-0">
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                        Position information
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-on-surface-variant">
                        {position.description ||
                          "No position description available."}
                      </dd>
                    </div>
                  </dl>
                </aside>
              </section>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
