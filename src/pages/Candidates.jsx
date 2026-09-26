import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCandidates } from "../api/elections-data";
import Header from "../components/Header";
import Footer from "../components/Footer";

const partyColors = {
  apc: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  pdp: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  lp: "bg-red-500/10 text-red-700 border-red-500/20",
  nnpp: "bg-purple-500/10 text-purple-700 border-purple-500/20",
};

const getOfficeValue = (positionName = "") => {
  const position = positionName.toLowerCase();
  if (position.includes("president") && !position.includes("senate"))
    return "presidential";
  if (position.includes("governor")) return "gubernatorial";
  if (position.includes("senate")) return "senate";
  return position;
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export default function CandidatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("all");
  const [selectedParty, setSelectedParty] = useState("all");
  const [activeCandidateModal, setActiveCandidateModal] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadCandidates = async () => {
      setLoading(true);
      setError("");
      try {
        const results = await fetchCandidates();
        if (isMounted) setCandidates(Array.isArray(results) ? results : []);
      } catch {
        if (isMounted)
          setError("Candidates could not be loaded. Please try again.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadCandidates();
    return () => {
      isMounted = false;
    };
  }, [reloadKey]);

  const candidateProfiles = candidates.map((candidate) => {
    const name =
      candidate.candidate_name ||
      candidate.user?.full_name ||
      [candidate.user?.first_name, candidate.user?.last_name]
        .filter(Boolean)
        .join(" ") ||
      "Candidate";
    const party = candidate.party || {};
    const position = candidate.position || {};
    const partyInitials =
      party.party_initials || party.initials || party.name || "Independent";
    const positionName = position.name_display || position.name || "Candidate";

    return {
      id: candidate.id,
      name,
      office: getOfficeValue(position.name_display || position.name),
      officeLabel: positionName,
      party: partyInitials,
      partyFullName: party.name || partyInitials,
      partyColor:
        partyColors[partyInitials.toLowerCase()] ||
        "bg-slate-500/10 text-slate-700 border-slate-500/20",
      candidateImage: candidate.candidate_image,
      partyLogo: party.logo,
      positionDescription:
        position.description || "No position details have been provided.",
      avatarInitials: getInitials(name),
    };
  });

  const filteredCandidates = candidateProfiles.filter((candidate) => {
    const matchesOffice =
      selectedOffice === "all" || candidate.office === selectedOffice;
    const matchesParty =
      selectedParty === "all" ||
      candidate.party.toLowerCase() === selectedParty.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      candidate.name.toLowerCase().includes(query) ||
      candidate.partyFullName.toLowerCase().includes(query) ||
      candidate.officeLabel.toLowerCase().includes(query);
    return matchesOffice && matchesParty && matchesQuery;
  });

  return (
    <>
      <Header />
      <div className="min-h-screen bg-surface py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Banner Section */}
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 sm:p-10 space-y-4 shadow-xs">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface-container-high border border-outline-variant/60 text-primary text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">
                groups
              </span>
              Official Electoral Candidates Directory
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
              Certified Candidates &amp; Political Parties
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
              Review candidates and political parties, and explore the available
              position details.
            </p>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 space-y-4 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search candidate name, position, party..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
                />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Office:
                  </label>
                  <select
                    value={selectedOffice}
                    onChange={(event) => setSelectedOffice(event.target.value)}
                    className="bg-surface-container-low border border-outline-variant/60 text-on-surface text-xs font-medium rounded-xl px-3 py-2 focus:outline-none focus:border-primary"
                  >
                    <option value="all">All Positions</option>
                    <option value="presidential">Presidential</option>
                    <option value="gubernatorial">Gubernatorial</option>
                    <option value="senate">Senatorial</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Party:
                  </label>
                  <select
                    value={selectedParty}
                    onChange={(event) => setSelectedParty(event.target.value)}
                    className="bg-surface-container-low border border-outline-variant/60 text-on-surface text-xs font-medium rounded-xl px-3 py-2 focus:outline-none focus:border-primary"
                  >
                    <option value="all">All Parties</option>
                    {[
                      ...new Set(
                        candidateProfiles.map((candidate) => candidate.party),
                      ),
                    ].map((party) => (
                      <option key={party} value={party.toLowerCase()}>
                        {party}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/40 overflow-x-auto text-xs">
              <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider shrink-0">
                Filter Party:
              </span>
              {[
                { label: "All", value: "all" },
                ...[
                  ...new Set(
                    candidateProfiles.map((candidate) => candidate.party),
                  ),
                ].map((party) => ({
                  label: party,
                  value: party.toLowerCase(),
                })),
              ].map((party) => (
                <button
                  key={party.value}
                  onClick={() => setSelectedParty(party.value)}
                  className={`px-3 py-1 rounded-lg font-semibold shrink-0 transition-colors ${selectedParty === party.value ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}
                >
                  {party.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center bg-surface-container-lowest border border-outline-variant/60 rounded-3xl text-sm text-on-surface-variant">
              Loading candidates…
            </div>
          ) : error ? (
            <div className="p-12 text-center bg-surface-container-lowest border border-outline-variant/60 rounded-3xl space-y-3">
              <p className="text-sm text-on-surface-variant">{error}</p>
              <button
                onClick={() => setReloadKey((key) => key + 1)}
                className="text-xs font-bold text-primary hover:underline"
              >
                Try again
              </button>
            </div>
          ) : filteredCandidates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-5 hover:border-outline transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {candidate.candidateImage ? (
                          <img
                            src={candidate.candidateImage}
                            alt={candidate.name}
                            className="w-12 h-12 rounded-2xl object-cover border border-outline-variant shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-2xl bg-surface-container-high border border-outline-variant flex items-center justify-center font-extrabold text-primary text-base shrink-0">
                            {candidate.avatarInitials}
                          </div>
                        )}
                        <div className="min-w-0">
                          <h3 className="font-extrabold text-base text-on-surface leading-tight">
                            {candidate.name}
                          </h3>
                          <span className="text-xs font-semibold text-on-surface-variant block mt-0.5">
                            {candidate.officeLabel}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-md border text-[11px] font-extrabold uppercase shrink-0 ${candidate.partyColor}`}
                      >
                        {candidate.party}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-2xl bg-surface-container-low border border-outline-variant/40">
                      <div>
                        <span className="text-on-surface-variant block text-[10px] font-bold uppercase">
                          Political Party
                        </span>
                        <span className="font-semibold text-on-surface truncate block">
                          {candidate.partyFullName}
                        </span>
                      </div>
                      <div>
                        <span className="text-on-surface-variant block text-[10px] font-bold uppercase">
                          Position
                        </span>
                        <span className="font-semibold text-on-surface">
                          {candidate.officeLabel}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block">
                        Position Details
                      </span>
                      <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                        {candidate.positionDescription}
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                      {candidate.partyLogo && (
                        <img
                          src={candidate.partyLogo}
                          alt=""
                          className="w-5 h-5 object-contain"
                        />
                      )}
                      <span>{candidate.partyFullName}</span>
                    </div>
                    <button
                      onClick={() => setActiveCandidateModal(candidate)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                    >
                      View Details{" "}
                      <span className="material-symbols-outlined text-sm">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-surface-container-lowest border border-outline-variant/60 rounded-3xl space-y-3">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant">
                person_off
              </span>
              <h3 className="text-base font-bold text-on-surface">
                No Candidates Found
              </h3>
              <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                No registered candidates match your search filters. Try clearing
                party or position selections.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedOffice("all");
                  setSelectedParty("all");
                }}
                className="text-xs font-bold text-primary hover:underline pt-2 inline-block"
              >
                Reset Filters
              </button>
            </div>
          )}

          {activeCandidateModal && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {activeCandidateModal.candidateImage ? (
                      <img
                        src={activeCandidateModal.candidateImage}
                        alt={activeCandidateModal.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-outline-variant"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-surface-container-high border border-outline-variant flex items-center justify-center font-extrabold text-primary text-xl">
                        {activeCandidateModal.avatarInitials}
                      </div>
                    )}
                    <div>
                      <h2 className="text-xl font-extrabold text-on-surface">
                        {activeCandidateModal.name}
                      </h2>
                      <p className="text-xs text-on-surface-variant font-semibold">
                        {activeCandidateModal.officeLabel} •{" "}
                        {activeCandidateModal.partyFullName} (
                        {activeCandidateModal.party})
                      </p>
                    </div>
                  </div>
                  <button
                    aria-label="Close candidate details"
                    onClick={() => setActiveCandidateModal(null)}
                    className="w-8 h-8 rounded-full bg-surface-container-low text-on-surface-variant hover:text-on-surface flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-lg">
                      close
                    </span>
                  </button>
                </div>
                <div className="space-y-3 text-xs">
                  <h4 className="font-bold uppercase tracking-wider text-on-surface text-xs border-b border-outline-variant/40 pb-1">
                    Position Details
                  </h4>
                  <p className="text-on-surface-variant leading-relaxed">
                    {activeCandidateModal.positionDescription}
                  </p>
                </div>
                <div className="pt-4 border-t border-outline-variant/40 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/pvc-verification"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-on-primary py-3 rounded-xl font-semibold text-xs"
                  >
                    <span className="material-symbols-outlined text-base">
                      verified
                    </span>
                    Verify Your Eligibility to Vote
                  </Link>
                  <button
                    onClick={() => setActiveCandidateModal(null)}
                    className="px-5 py-3 rounded-xl border border-outline-variant text-on-surface font-semibold text-xs hover:bg-surface-container-low"
                  >
                    Close Profile
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
