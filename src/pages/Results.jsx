import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../api/axios";
import { getElections } from "../api/elections-data";

const normalizeList = (response) => {
  const data = response?.data;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
};

const formatUpdatedAt = (timestamp) => {
  if (!timestamp) return "Not updated yet";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(timestamp);
};

const positionLabel = (position) =>
  String(position || "Other")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const candidateName = (candidate) => {
  const user = candidate?.user;
  return (
    user?.full_name ||
    [user?.first_name, user?.last_name].filter(Boolean).join(" ") ||
    candidate?.candidate_name ||
    "Candidate"
  );
};

const buildPositionGroups = (results = {}, candidates = []) => {
  const groups = new Map();
  const normalizeKey = (value) =>
    String(value || "other")
      .trim()
      .toLowerCase();

  for (const [name, rows] of Object.entries(results)) {
    const key = normalizeKey(name);
    groups.set(key, {
      key,
      name,
      candidates: new Map(),
    });
    for (const row of Array.isArray(rows) ? rows : []) {
      groups.get(key).candidates.set(String(row.candidate_id), {
        id: row.candidate_id,
        name: row.candidate_name || "Candidate",
        votes: Number(row.vote_count) || 0,
        party: "",
        partyInitials: "",
      });
    }
  }

  for (const candidate of candidates) {
    const candidatePosition =
      candidate.position?.name_display || candidate.position?.name;
    const key = normalizeKey(candidatePosition);
    if (!groups.has(key)) {
      groups.set(key, {
        key,
        name: candidatePosition || "Other",
        candidates: new Map(),
      });
    }
    groups.get(key).candidates.set(String(candidate.id), {
      id: candidate.id,
      name: candidateName(candidate),
      votes: groups.get(key).candidates.get(String(candidate.id))?.votes || 0,
      party: candidate.party?.name || "",
      partyInitials: candidate.party?.party_initials || "",
    });
  }

  return [...groups.values()].map((group) => {
    const entries = [...group.candidates.values()].sort(
      (a, b) => b.votes - a.votes,
    );
    return {
      ...group,
      candidates: entries,
      totalVotes: entries.reduce((sum, candidate) => sum + candidate.votes, 0),
    };
  });
};

export default function ResultsPage() {
  const [selectedElectionId, setSelectedElectionId] = useState("");
  const {
    data: elections = [],
    isLoading: electionsLoading,
    isError: electionsError,
    refetch: refetchElections,
  } = useQuery({
    queryKey: ["public-results-elections"],
    queryFn: getElections,
  });

  const electionId = selectedElectionId || elections[0]?.id || "";
  const selectedElection = elections.find(
    (election) => String(election.id) === String(electionId),
  );

  const {
    data: resultsData,
    isLoading: resultsLoading,
    isError: resultsError,
    refetch: refetchResults,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ["public-election-results", electionId],
    queryFn: async () => {
      const [resultsResponse, candidatesResponse] = await Promise.all([
        api.get("/vote/results/", { params: { election: electionId } }),
        api.get("/candidates/", { params: { election: electionId } }),
      ]);
      return {
        ...resultsResponse.data,
        candidates: normalizeList(candidatesResponse),
      };
    },
    enabled: Boolean(electionId),
    refetchInterval: 30_000,
  });

  const positionGroups = useMemo(
    () => buildPositionGroups(resultsData?.results, resultsData?.candidates),
    [resultsData],
  );
  const totalVotes = Number(resultsData?.total_votes) || 0;
  const candidateCount =
    Number(resultsData?.total_candidates) ||
    resultsData?.candidates?.length ||
    0;

  const handleRefresh = async () => {
    if (!electionId) await refetchElections();
    else await refetchResults();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="overflow-hidden rounded-3xl bg-linear-to-br from-emerald-950 via-slate-900 to-slate-950 px-6 py-10 text-white shadow-xl sm:px-10 sm:py-14">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-emerald-200">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Public results dashboard
              </span>
              <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
                Election results
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                Review reported vote totals by position. Results refresh
                automatically while this page is open.
              </p>
              <p className="text-xs text-amber-200/90">
                Tallies shown here are system-reported and should not be treated
                as certified until officially declared.
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-4 rounded-3xl border border-outline-variant/60 bg-surface-container-lowest p-5 shadow-sm sm:flex-row sm:items-end sm:justify-between sm:p-6">
            <div className="min-w-0 flex-1">
              <label
                htmlFor="results-election"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant"
              >
                Election
              </label>
              {electionsLoading ? (
                <p className="py-3 text-sm text-on-surface-variant">
                  Loading elections…
                </p>
              ) : electionsError ? (
                <p className="py-3 text-sm text-red-700">
                  Could not load elections.
                </p>
              ) : elections.length ? (
                <select
                  id="results-election"
                  value={electionId}
                  onChange={(event) =>
                    setSelectedElectionId(event.target.value)
                  }
                  className="w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 text-sm font-semibold text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:max-w-xl"
                >
                  {elections.map((election) => (
                    <option key={election.id} value={election.id}>
                      {election.title} · {election.status}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="py-3 text-sm text-on-surface-variant">
                  No elections are available yet.
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden text-xs text-on-surface-variant sm:block">
                Updated {formatUpdatedAt(dataUpdatedAt)}
              </span>
              <button
                type="button"
                onClick={handleRefresh}
                disabled={electionsLoading || resultsLoading}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-outline-variant px-4 py-3 text-sm font-bold text-on-surface transition hover:bg-surface-container-low disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span
                  className={`material-symbols-outlined text-lg ${resultsLoading ? "animate-spin" : ""}`}
                >
                  refresh
                </span>
                Refresh
              </button>
            </div>
          </section>

          {electionsError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">
              Unable to load election choices. Please refresh or try again
              later.
              <button
                onClick={() => refetchElections()}
                className="ml-2 font-bold underline"
              >
                Retry
              </button>
            </div>
          )}

          {electionId && resultsLoading ? (
            <div className="rounded-3xl border border-outline-variant/60 bg-surface-container-lowest p-12 text-center text-sm text-on-surface-variant">
              Loading results…
            </div>
          ) : resultsError ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
              <h2 className="font-bold text-red-900">
                Results could not be loaded
              </h2>
              <p className="mt-2 text-sm text-red-800">
                Please try again in a moment.
              </p>
              <button
                onClick={() => refetchResults()}
                className="mt-4 rounded-xl bg-red-700 px-4 py-2 text-sm font-bold text-white"
              >
                Retry
              </button>
            </div>
          ) : resultsData ? (
            <>
              <section className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    label: "Total votes recorded",
                    value: totalVotes.toLocaleString(),
                    icon: "how_to_vote",
                    tone: "text-primary bg-primary/10",
                  },
                  {
                    label: "Candidates",
                    value: candidateCount.toLocaleString(),
                    icon: "groups",
                    tone: "text-blue-700 bg-blue-100",
                  },
                  {
                    label: "Election status",
                    value: selectedElection?.status || "Unknown",
                    icon: "event",
                    tone: "text-amber-700 bg-amber-100",
                    capitalize: true,
                  },
                ].map((metric) => (
                  <article
                    key={metric.label}
                    className="flex items-center gap-4 rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-5"
                  >
                    <span
                      className={`material-symbols-outlined flex h-12 w-12 items-center justify-center rounded-xl ${metric.tone}`}
                    >
                      {metric.icon}
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                        {metric.label}
                      </p>
                      <p
                        className={`mt-1 text-2xl font-black text-on-surface ${metric.capitalize ? "capitalize" : ""}`}
                      >
                        {metric.value}
                      </p>
                    </div>
                  </article>
                ))}
              </section>

              {positionGroups.length ? (
                <section className="space-y-6">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h2 className="text-2xl font-black text-on-surface">
                        Vote totals by position
                      </h2>
                      <p className="mt-1 text-sm text-on-surface-variant">
                        {selectedElection?.title}
                      </p>
                    </div>
                    <span className="text-xs text-on-surface-variant">
                      Auto-refreshes every 30 seconds
                    </span>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    {positionGroups.map((group) => (
                      <article
                        key={group.key}
                        className="overflow-hidden rounded-3xl border border-outline-variant/60 bg-surface-container-lowest shadow-sm"
                      >
                        <div className="flex items-center justify-between border-b border-outline-variant/60 bg-surface-container-low px-5 py-4 sm:px-6">
                          <h3 className="text-lg font-extrabold text-on-surface">
                            {positionLabel(group.name)}
                          </h3>
                          <span className="rounded-full bg-surface-container-high px-3 py-1 text-xs font-bold text-on-surface-variant">
                            {group.totalVotes.toLocaleString()} votes
                          </span>
                        </div>
                        <div className="space-y-5 p-5 sm:p-6">
                          {group.candidates.map((candidate, index) => {
                            const share = group.totalVotes
                              ? (candidate.votes / group.totalVotes) * 100
                              : 0;
                            const isLeading =
                              candidate.votes > 0 &&
                              candidate.votes === group.candidates[0]?.votes;
                            return (
                              <div key={candidate.id} className="space-y-2">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex min-w-0 items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-xs font-black text-on-surface-variant">
                                      {index + 1}
                                    </span>
                                    <div className="min-w-0">
                                      <p className="truncate font-bold text-on-surface">
                                        {candidate.name}
                                      </p>
                                      <p className="text-xs text-on-surface-variant">
                                        {candidate.partyInitials ||
                                          candidate.party ||
                                          "Candidate"}
                                        {isLeading && (
                                          <span className="ml-2 rounded-md bg-emerald-100 px-2 py-0.5 font-bold text-emerald-800">
                                            Leading
                                          </span>
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="shrink-0 text-right">
                                    <p className="font-extrabold text-on-surface">
                                      {candidate.votes.toLocaleString()}
                                    </p>
                                    <p className="text-xs font-semibold text-primary">
                                      {share.toFixed(1)}%
                                    </p>
                                  </div>
                                </div>
                                <div className="h-2.5 overflow-hidden rounded-full bg-surface-container-high">
                                  <div
                                    className={`h-full rounded-full transition-all ${isLeading ? "bg-primary" : "bg-outline"}`}
                                    style={{ width: `${share}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ) : (
                <section className="rounded-3xl border border-outline-variant/60 bg-surface-container-lowest p-10 text-center">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant">
                    bar_chart
                  </span>
                  <h2 className="mt-3 text-lg font-bold text-on-surface">
                    No results reported yet
                  </h2>
                  <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-on-surface-variant">
                    {candidateCount
                      ? "Candidates are listed for this election, but no votes have been recorded yet."
                      : "There are no candidate or vote records for this election yet."}
                  </p>
                </section>
              )}

              <p className="text-center text-xs text-on-surface-variant">
                Last refreshed {formatUpdatedAt(dataUpdatedAt)} · Totals reflect
                votes currently recorded in the system.
              </p>
            </>
          ) : null}

          <div className="text-center">
            <Link
              to="/elections"
              className="text-sm font-bold text-primary hover:underline"
            >
              Browse elections
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
