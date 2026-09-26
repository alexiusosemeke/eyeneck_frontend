import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useQuery } from "@tanstack/react-query";
import { getElections } from "../api/elections-data";
import { Link } from "react-router-dom";

const formatDate = (value) => {
  if (!value) return "Date not set";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function ElectionsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedElection, setSelectedElection] = useState(null);

  const {
    data: all_elections = [],
    isLoading: activeElectionsLoading,
    error: activeElectionsError,
  } = useQuery({
    queryKey: ["elections"],
    queryFn: getElections,
  });

  if (activeElectionsError) {
    return <div className="text-red-500">Failed to load elections.</div>;
  }

  if (activeElectionsLoading) {
    return <div>Loading elections...</div>;
  }

  const categories = [
    { id: "all", label: "All Elections" },
    { id: "national", label: "National & Federal" },
    { id: "state", label: "State Level" },
    { id: "bye-election", label: "Bye-Elections" },
    { id: "local", label: "Local Govt (LGA)" },
  ];

  const filteredResults = all_elections.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.election_typ === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      <Header />

      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Newsroom/Editorial Style Hero Banner */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-slate-900 to-black text-white rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Official Public Portal
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1]">
              Elections & <span className="text-emerald-400">Voting Hub</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Access verified schedules, track active electoral campaigns, view
              certified candidates, and find your assigned voting center.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#elections-grid"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-lg hover:shadow-emerald-500/20 active:scale-95 inline-flex items-center gap-2"
              >
                Browse Elections
                <span className="material-symbols-outlined text-base">
                  south
                </span>
              </a>
              <a
                href="/pvc-verification"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl text-sm border border-white/20 transition-all backdrop-blur-md inline-flex items-center gap-2"
              >
                Check My PVC Status
                <span className="material-symbols-outlined text-base">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>

          {/* Decorative Background Artwork */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none hidden md:block bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        </section>

        {/* Public Services Bar */}
        <section className="bg-white rounded-2xl border border-neutral-200/80 p-4 sm:p-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-neutral-100">
            {[
              {
                title: "Voter Eligibility",
                desc: "Confirm card status and registration details",
                icon: "verified_user",
                link: "/pvc-verification",
              },
              {
                title: "Polling Center Locator",
                desc: "Find exact coordinates & directions to your PU",
                icon: "map",
                link: "/polling-units",
              },
              {
                title: "Candidates & Parties",
                desc: "Explore verified contestant profiles and manifestos",
                icon: "badge",
                link: "/candidates",
              },
              {
                title: "Official Vote Feeds",
                desc: "Track real-time certified electoral results",
                icon: "query_stats",
                link: "/results",
              },
            ].map((tool, idx) => (
              <a
                key={idx}
                href={tool.link}
                className={`group flex items-start gap-4 ${
                  idx !== 0 ? "sm:pl-6 pt-4 sm:pt-0" : ""
                }`}
              >
                <div className="p-3 rounded-xl bg-neutral-100 text-neutral-800 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                  <span className="material-symbols-outlined text-xl">
                    {tool.icon}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 group-hover:text-emerald-600 transition-colors flex items-center gap-1">
                    {tool.title}
                    <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      arrow_forward
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 leading-snug">
                    {tool.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Elections Content Section */}
        <section id="elections-grid" className="space-y-6">
          {/* Header Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                Official Electoral Directory
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Active, upcoming, and scheduled elections certified under public
                law.
              </p>
            </div>

            {/* Clean Filter Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-lg">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Filter by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 bg-white border border-neutral-300 rounded-xl pl-9 pr-8 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    <span className="material-symbols-outlined text-sm">
                      close
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "bg-neutral-900 text-white shadow-sm"
                    : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards Grid - Media/Editorial Style */}
          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResults.map((election) => (
                <article
                  key={election.id}
                  className="bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-300 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    {/* Badge & Date Header */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${election.status === "active" ? "bg-emerald-100 text-emerald-700 border-emerald-300" : "bg-neutral-100 text-neutral-600 border-neutral-200"}`}
                      >
                        {election.status}
                      </span>
                      <span className="text-xs font-semibold text-neutral-500 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">
                          calendar_today
                        </span>
                        {formatDate(election.start_date)} {" - "}
                        {formatDate(election.end_date)}
                      </span>
                    </div>

                    {/* Headline */}
                    <div>
                      <h3 className="text-xl font-extrabold text-neutral-900 group-hover:text-emerald-700 transition-colors leading-snug">
                        {election.title}
                      </h3>
                      <p className="text-xs text-neutral-600 mt-2.5 leading-relaxed line-clamp-3">
                        {election.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between gap-3 pt-4 border-t border-neutral-100">
                    <Link
                      to={`/login`}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-sm"
                    >
                      <span className="material-symbols-outlined text-sm pr-1">
                        login
                      </span>
                      Login to Vote
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-white border border-neutral-200 rounded-2xl space-y-3">
              <span className="material-symbols-outlined text-4xl text-neutral-300">
                manage_search
              </span>
              <h3 className="text-base font-bold text-neutral-800">
                No elections found
              </h3>
              <p className="text-xs text-neutral-500">
                Try adjusting your search criteria or category filter.
              </p>
            </div>
          )}
        </section>

        {/* Voting Guidelines Section */}
        <section className="bg-neutral-900 text-white rounded-3xl p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400">
                gavel
              </span>
              Official Voter Code of Conduct
            </h2>
            <span className="text-xs text-neutral-400 hidden sm:inline">
              INEC Guidelines & Regulations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="text-sm font-bold text-white">
                PVC Accreditation
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Voters must bring their physical Permanent Voter Card for BVAS
                electronic verification at the polling unit.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="text-sm font-bold text-white">Voting Hours</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Accreditation and voting happen concurrently from 8:30 AM to
                2:30 PM. Anyone in line by 2:30 PM will be allowed to vote.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="text-sm font-bold text-white">Secret Ballot</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Mobile phones, cameras, or recording devices are strictly
                prohibited inside the voting booth to preserve secrecy.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Details Slide-Over / Modal */}
      {selectedElection && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedElection(null)}
              className="absolute top-6 right-6 p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                {selectedElection.title}
              </span>
              <h3 className="text-xl font-extrabold text-neutral-900 leading-snug">
                {selectedElection.title}
              </h3>
            </div>

            <div className="space-y-4 text-xs text-neutral-600">
              <div className="p-4 bg-neutral-50 rounded-xl space-y-2 border border-neutral-100">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Date:</span>
                  <span className="font-bold text-neutral-800">
                    {selectedElection.start_date} {" - "}{" "}
                    {selectedElection.end_date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
