import SideNav from "../components/layouts/SideNav";
import TopNavBar from "../components/layouts/TopNavBar";
import MobileNav from "../components/layouts/MobileNav";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { useState } from "react";
import { Oval } from "react-loader-spinner";

const Polls = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedElection, setSelectedElection] = useState(null);

  const fetchElections = async () => {
    const response = await api.get(`/elections/?status=active&limit=1`);
    return response.data?.results;
  };

  const {
    data: getElections = [],
    error: getElectionError,
    isLoading: getElectionLoading,
  } = useQuery({
    queryKey: ["getElections"],
    queryFn: fetchElections,
  });

  const goToSummaryStep = () => {
    if (!selectedElection) return;
    setCurrentStep(2);
  };

  const goBackToElections = () => {
    // setSelectedElection(null);
    setCurrentStep(1);
  };

  const fetchSummary = async () => {
    const response = await api.get(
      `/elections/${selectedElection.id}/summary/`,
    );
    return response.data?.results ?? response.data;
  };

  const {
    data: getSummary = [],
    error: getSummaryError,
    isLoading: getSummaryLoading,
  } = useQuery({
    queryKey: ["getSummary", selectedElection?.id],
    queryFn: fetchSummary,
    enabled: currentStep === 2 && !!selectedElection?.id,
  });

  return (
    <>
      <SideNav />
      <TopNavBar />
      {/* ml-0 on mobile, ml-64 on medium screens and up. Added pb-20 on mobile to clear bottom MobileNav */}
      <main className="ml-0 md:ml-64 min-h-screen flex flex-col pb-20 md:pb-0 bg-surface">
        {/* Header */}
        <header className="flex justify-between items-center w-full px-4 sm:px-6 md:px-8 h-16 sticky top-0 bg-surface/95 backdrop-blur-md border-b border-outline-variant z-40">
          <div className="flex items-center gap-2 sm:gap-4">
            <h1 className="font-headline-md text-lg sm:text-headline-md font-bold text-primary truncate">
              Live Polls
            </h1>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-error-container text-on-error-container rounded-full animate-pulse shrink-0">
              <span className="w-2 h-2 bg-error rounded-full"></span>
              <span className="font-label-md text-[11px] sm:text-label-md font-semibold">
                LIVE
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="relative">
              <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:bg-surface-variant p-2 rounded-full transition-colors">
                notifications
              </span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-surface-variant p-1 rounded-full transition-colors">
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="User Avatar"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp8xnV5nl_pUOppEVOD-lUXfFUH1AmcRxTXQy5XZkMS-OqhylOZQ0QraikridIWkneq0x8y1XI868wF1zluffJN2wt5ZtwdpOAhxTwkcaEyL23J9IfewUfNMLXtacVwraabjEdc_BbtMaaLm5_qTOfSB_odrfTn3hsX1ma0zQ797fA6Jv2TkjP109PpLcPu6w4jNmJiea6De9LP3Y97vq3MemZNALEKwrw8dXAzQVXwjdMXjM2-88Q"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="flex-1 p-4 sm:px-6 md:px-8 py-6 space-y-6 max-w-7xl w-full mx-auto">
          {currentStep === 1 && (
            <section className="bg-surface-container-low border border-outline-variant p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col gap-1">
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  Select Election
                </h2>
                <p className="text-label-md text-on-surface-variant">
                  Choose an election to view specific real-time results
                </p>
              </div>
              {getElectionLoading ? (
                <div className="flex items-center justify-center mb-4">
                  <Oval
                    visible={true}
                    height="60"
                    width="60"
                    color="#4fa94d"
                    secondaryColor="#4fa94d"
                    strokeWidth={3}
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapper
                    className=""
                  />
                </div>
              ) : getElectionError ? (
                <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-sm">
                  <span className="font-semibold text-xl text-red-500 block">
                    Error loading elections. Please try again later.
                  </span>
                </div>
              ) : (
                <div className="flex flex-1 max-w-2xl items-center gap-4">
                  <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                      how_to_vote
                    </span>
                    <select
                      onChange={(e) =>
                        setSelectedElection(
                          getElections.find(
                            (el) => el.id === Number(e.target.value),
                          ),
                        )
                      }
                      className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-lg bg-surface-container-lowest text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none appearance-none transition-all"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Choose an election...
                      </option>
                      {getElections.map((election) => (
                        <option key={election.id} value={election.id}>
                          {election.title}
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                      expand_more
                    </span>
                  </div>
                  <button
                    type="submit"
                    onClick={goToSummaryStep}
                    disabled={!selectedElection}
                    className="px-8 py-3 bg-primary text-on-primary font-bold rounded-lg text-label-lg hover:opacity-90 active:scale-95 transition-all"
                  >
                    View Results
                  </button>
                </div>
              )}
            </section>
          )}
          {/* Top Metric Cards */}

          {currentStep === 2 && (
            <>
              {getSummaryLoading ? (
                <div className="flex items-center justify-center mb-4">
                  <Oval
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    secondaryColor="#4fa94d"
                    strokeWidth={3}
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapper
                    className=""
                  />
                </div>
              ) : getSummaryError ? (
                <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-sm">
                  <span className="font-semibold text-xl text-red-500 block">
                    Couldn't Load Polling data for this election. Please try
                    again later...
                  </span>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-end border-b border-outline-variant pb-6">
                    <div>
                      <span className="text-label-lg font-label-lg text-primary uppercase tracking-widest">
                        {selectedElection?.title || "Election Name"}
                      </span>
                    </div>
                    <button
                      onClick={goBackToElections}
                      className="text-label-lg font-label-lg text-on-surface-variant hover:text-primary flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full text-[11px] font-bold"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        arrow_back
                      </span>
                      Change election
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl flex flex-col justify-between">
                      <div>
                        <span className="text-on-surface-variant font-label-md text-xs uppercase tracking-widest mb-1 block">
                          Total Votes Cast
                        </span>
                        <span className="font-headline-lg text-2xl sm:text-headline-lg font-bold text-primary">
                          {getSummary?.total_votes}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-primary text-label-md">
                        <span className="material-symbols-outlined text-[16px]">
                          trending_up
                        </span>
                        <span>{getSummary?.turnout}% Voter Turnout</span>
                      </div>
                    </div>

                    <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl flex flex-col justify-between">
                      <div>
                        <span className="text-on-surface-variant font-label-md text-xs uppercase tracking-widest mb-1 block">
                          States Reported
                        </span>
                        <span className="font-headline-lg text-2xl sm:text-headline-lg font-bold text-on-surface">
                          {getSummary?.states_reported}{" "}
                          <span className="text-on-surface-variant font-body-md text-base">
                            / {getSummary?.total_states}
                          </span>
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-secondary text-label-md">
                        <span className="material-symbols-outlined text-[16px]">
                          schedule
                        </span>
                        <span>Updated recently</span>
                      </div>
                    </div>

                    <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl flex flex-col justify-between">
                      <div>
                        <span className="text-on-surface-variant font-label-md text-xs uppercase tracking-widest mb-1 block">
                          Polling Units Counted
                        </span>
                        <span className="font-headline-lg text-2xl sm:text-headline-lg font-bold text-on-surface">
                          {getSummary?.polling_units}
                        </span>
                      </div>
                      <div className="mt-4 w-full bg-secondary-container h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-primary h-full"
                          style={{ width: "82%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl flex flex-col justify-center">
                      <div className="flex flex-col gap-2">
                        <label className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                          POLLING UNIT SEARCH
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                            search
                          </span>
                          <input
                            className="w-full pl-10 pr-4 py-2 border border-outline-variant rounded-lg bg-surface-container-low text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                            placeholder="Enter PU Code (e.g. 24-01-02)"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Main Grid Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Sidebar / Left Column */}
                    <section className="lg:col-span-4 space-y-6">
                      {/* Major Parties */}
                      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
                        <div className="bg-surface-container-low px-5 py-4 border-b border-outline-variant flex justify-between items-center">
                          <h2 className="font-headline-md text-lg sm:text-headline-md font-bold">
                            Major Parties
                          </h2>
                          <span
                            className="material-symbols-outlined text-primary"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            analytics
                          </span>
                        </div>

                        <div className="p-5 space-y-5">
                          {/* PUP */}
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary-container rounded-lg flex items-center justify-center font-bold text-on-primary-container shrink-0">
                                  PUP
                                </div>
                                <div>
                                  <p className="font-label-lg text-sm sm:text-label-lg font-semibold">
                                    Peoples Unity Party
                                  </p>
                                  <p className="text-xs text-on-surface-variant">
                                    10,241,502 votes
                                  </p>
                                </div>
                              </div>
                              <span className="font-bold text-lg sm:text-headline-md text-primary">
                                41.2%
                              </span>
                            </div>
                            <div className="w-full bg-secondary-container h-2.5 rounded-full overflow-hidden">
                              <div
                                className="bg-primary h-full transition-all duration-1000"
                                style={{ width: "41.2%" }}
                              ></div>
                            </div>
                          </div>

                          {/* DA */}
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-tertiary-container rounded-lg flex items-center justify-center font-bold text-on-tertiary-container shrink-0">
                                  DA
                                </div>
                                <div>
                                  <p className="font-label-lg text-sm sm:text-label-lg font-semibold">
                                    Democratic Alliance
                                  </p>
                                  <p className="text-xs text-on-surface-variant">
                                    9,440,011 votes
                                  </p>
                                </div>
                              </div>
                              <span className="font-bold text-lg sm:text-headline-md text-tertiary">
                                38.0%
                              </span>
                            </div>
                            <div className="w-full bg-secondary-container h-2.5 rounded-full overflow-hidden">
                              <div
                                className="bg-tertiary h-full transition-all duration-1000"
                                style={{ width: "38%" }}
                              ></div>
                            </div>
                          </div>

                          {/* LP */}
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-secondary-container rounded-lg flex items-center justify-center font-bold text-on-secondary-container shrink-0">
                                  LP
                                </div>
                                <div>
                                  <p className="font-label-lg text-sm sm:text-label-lg font-semibold">
                                    Liberty Party
                                  </p>
                                  <p className="text-xs text-on-surface-variant">
                                    4,160,596 votes
                                  </p>
                                </div>
                              </div>
                              <span className="font-bold text-lg sm:text-headline-md text-secondary">
                                16.7%
                              </span>
                            </div>
                            <div className="w-full bg-secondary-container h-2.5 rounded-full overflow-hidden">
                              <div
                                className="bg-secondary h-full transition-all duration-1000"
                                style={{ width: "16.7%" }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-surface-container-low px-5 py-3 border-t border-outline-variant flex justify-center">
                          <button className="text-primary font-bold text-sm hover:underline transition-all">
                            View All 18 Parties
                          </button>
                        </div>
                      </div>

                      {/* Official Update Card */}
                      <div className="bg-primary text-on-primary p-5 sm:p-6 rounded-xl shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-[20px]">
                              verified_user
                            </span>
                            <span className="font-label-lg text-xs tracking-wider uppercase font-bold">
                              Official Update
                            </span>
                          </div>
                          <p className="text-sm sm:text-body-md leading-relaxed opacity-95">
                            Results from Lagos and Kano are currently being
                            verified at the National Collation Center. Expect
                            high volume updates in the next 15 minutes.
                          </p>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
                          <span className="material-symbols-outlined text-[100px] sm:text-[120px]">
                            how_to_vote
                          </span>
                        </div>
                      </div>
                    </section>

                    {/* Map / Main Column */}
                    <section className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col">
                      <div className="bg-surface-container-low px-5 py-4 border-b border-outline-variant flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <h2 className="font-headline-md text-lg sm:text-headline-md font-bold">
                            State-by-State Leadership
                          </h2>
                          <p className="text-xs text-on-surface-variant">
                            Geospatial visualization of leading parties across
                            Nigeria
                          </p>
                        </div>
                        <div className="flex gap-2 self-end sm:self-auto">
                          <button className="px-3 py-1.5 bg-surface border border-outline-variant rounded-lg text-xs font-semibold hover:bg-surface-variant transition-colors">
                            Legend
                          </button>
                          <button className="px-3 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity">
                            Full Map
                          </button>
                        </div>
                      </div>

                      {/* Map Canvas Box */}
                      <div className="flex-1 relative min-h-[300px] sm:min-h-[380px] bg-surface-container-low p-4 sm:p-6 flex items-center justify-center">
                        <div className="w-full h-full min-h-[280px] rounded-xl overflow-hidden relative border border-outline-variant shadow-inner">
                          <div
                            className="w-full h-full bg-cover bg-center min-h-[280px]"
                            style={{
                              backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCp0PtCA2VUZmDpIi8FBQB02eTgJgUXIwtz_PFj6gGNEbQOoTCKRYcs5-IPIxij3d4ZFS6zpBl3XIyH-FF2YGjJVsbMaO4aOzHRsxGx_EjSs1f36GsHCzM4v5h0tVK-_vxxnSHuFRm19m-mqC5osM9Uoxen2VT3p7FSs1WTgpdS-6GqzQBd6CFpJiNLoV0WVTmx-nvcNRRnkVE2x1wIaJbiphCrHeyDnf1yYxQSP6zv4oNBP3kSsZoh')",
                            }}
                          ></div>

                          {/* Responsive Legend Overlay */}
                          <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md p-2.5 sm:p-3 rounded-lg border border-outline-variant shadow-sm space-y-1.5 z-10">
                            <div className="flex items-center gap-2">
                              <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
                              <span className="text-[10px] sm:text-[11px] font-bold">
                                PUP (18 States)
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2.5 h-2.5 bg-tertiary rounded-full"></div>
                              <span className="text-[10px] sm:text-[11px] font-bold">
                                DA (11 States)
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2.5 h-2.5 bg-secondary rounded-full"></div>
                              <span className="text-[10px] sm:text-[11px] font-bold">
                                LP (2 States)
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2.5 h-2.5 bg-surface-variant border border-outline rounded-full"></div>
                              <span className="text-[10px] sm:text-[11px] font-bold text-on-surface-variant">
                                Pending (5)
                              </span>
                            </div>
                          </div>

                          {/* Lagos State Floating Badge */}
                          <div className="absolute bottom-3 right-3 sm:top-1/2 sm:left-1/3 sm:-translate-x-1/2 sm:-translate-y-1/2 bg-surface p-3 rounded-xl shadow-xl border border-primary animate-bounce z-10">
                            <div className="flex items-center justify-between gap-3 mb-1">
                              <span className="font-bold text-xs text-primary">
                                LAGOS STATE
                              </span>
                              <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold">
                                94% Counted
                              </span>
                            </div>
                            <div className="space-y-0.5 text-[11px]">
                              <div className="flex justify-between gap-4">
                                <span className="font-medium text-on-surface-variant">
                                  PUP:
                                </span>
                                <span className="font-bold">1.2M</span>
                              </div>
                              <div className="flex justify-between gap-4">
                                <span className="font-medium text-on-surface-variant">
                                  DA:
                                </span>
                                <span className="font-bold">0.8M</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* State Key Statistics Grid */}
                      <div className="p-4 sm:p-5 bg-surface grid grid-cols-2 md:grid-cols-4 gap-3 border-t border-outline-variant">
                        <div className="p-2.5 bg-surface-container rounded-lg border border-outline-variant">
                          <p className="text-[9px] uppercase font-bold text-on-surface-variant mb-0.5">
                            Highest Turnout
                          </p>
                          <p className="font-semibold text-xs sm:text-sm">
                            Anambra (78%)
                          </p>
                        </div>
                        <div className="p-2.5 bg-surface-container rounded-lg border border-outline-variant">
                          <p className="text-[9px] uppercase font-bold text-on-surface-variant mb-0.5">
                            Most Votes
                          </p>
                          <p className="font-semibold text-xs sm:text-sm">
                            Kano (2.4M)
                          </p>
                        </div>
                        <div className="p-2.5 bg-surface-container rounded-lg border border-outline-variant">
                          <p className="text-[9px] uppercase font-bold text-on-surface-variant mb-0.5">
                            Tightest Race
                          </p>
                          <p className="font-semibold text-xs sm:text-sm">
                            Oyo (&lt;1%)
                          </p>
                        </div>
                        <div className="p-2.5 bg-surface-container rounded-lg border border-outline-variant">
                          <p className="text-[9px] uppercase font-bold text-on-surface-variant mb-0.5">
                            Newly Reported
                          </p>
                          <p className="font-semibold text-xs sm:text-sm">
                            Taraba (6m ago)
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>
                </>
              )}
            </>
          )}

          {/* Table Section with Mobile Touch Scrolling */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden mb-6">
            <div className="bg-surface-container-low px-5 py-4 border-b border-outline-variant flex justify-between items-center">
              <h2 className="font-headline-md text-base sm:text-headline-md font-bold">
                Live Polling Unit Stream
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-on-surface-variant">
                  Auto-refreshing
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              </div>
            </div>

            {/* Scroll Container for Mobile */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant text-xs text-on-surface-variant">
                    <th className="px-5 py-3 font-semibold">Polling Unit</th>
                    <th className="px-5 py-3 font-semibold">LGA / State</th>
                    <th className="px-5 py-3 font-semibold">PUP</th>
                    <th className="px-5 py-3 font-semibold">DA</th>
                    <th className="px-5 py-3 font-semibold">LP</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant text-sm">
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="px-5 py-3.5 font-medium">
                      PU 001 - Central School
                    </td>
                    <td className="px-5 py-3.5 text-on-surface-variant">
                      Awka South, Anambra
                    </td>
                    <td className="px-5 py-3.5 font-semibold">452</td>
                    <td className="px-5 py-3.5 font-semibold">12</td>
                    <td className="px-5 py-3.5 font-semibold">88</td>
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-[11px] font-bold">
                        VERIFIED
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="px-5 py-3.5 font-medium">
                      PU 042 - Market Square
                    </td>
                    <td className="px-5 py-3.5 text-on-surface-variant">
                      Ikeja, Lagos
                    </td>
                    <td className="px-5 py-3.5 font-semibold">210</td>
                    <td className="px-5 py-3.5 font-semibold">340</td>
                    <td className="px-5 py-3.5 font-semibold">145</td>
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-[11px] font-bold">
                        VERIFIED
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="px-5 py-3.5 font-medium">
                      PU 012 - Health Center
                    </td>
                    <td className="px-5 py-3.5 text-on-surface-variant">
                      Nassarawa, Kano
                    </td>
                    <td className="px-5 py-3.5 font-semibold">612</td>
                    <td className="px-5 py-3.5 font-semibold">401</td>
                    <td className="px-5 py-3.5 font-semibold">12</td>
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-0.5 bg-tertiary/10 text-tertiary rounded-full text-[11px] font-bold">
                        COLLATING
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="w-full py-6 px-4 sm:px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-container-highest border-t border-outline-variant mt-auto text-center md:text-left">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-lg text-primary">INEC</span>
            <p className="text-xs text-on-secondary-fixed-variant">
              © 2026 Independent National Electoral Commission (INEC). All
              Rights Reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs text-on-secondary-fixed-variant">
            <a className="hover:text-primary transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Terms of Service
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Legal Notice
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Contact Us
            </a>
          </div>
        </footer>
      </main>

      <MobileNav />
    </>
  );
};

export default Polls;
