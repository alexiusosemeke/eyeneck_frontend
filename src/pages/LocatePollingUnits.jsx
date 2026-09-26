import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

export default function LocatePollingUnits() {
  const [selectedState, setSelectedState] = useState("Lagos");
  const [selectedLga, setSelectedLga] = useState("Ikeja");
  const [selectedWard, setSelectedWard] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [accessibilityFilter, setAccessibilityFilter] = useState(false);
  const [selectedPu, setSelectedPu] = useState(null);

  const mockStates = ["Lagos", "Abuja (FCT)", "Kano", "Rivers", "Oyo"];
  const mockLgas = {
    Lagos: ["Ikeja", "Lagos Island", "Surulere", "Eti-Osa", "Alimosho"],
    "Abuja (FCT)": ["AMAC", "Bwari", "Gwagwalada"],
    Kano: ["Kano Municipal", "Dala", "Nasarawa"],
    Rivers: ["Port Harcourt", "Obio-Akpor"],
    Oyo: ["Ibadan North", "Ibadan South-West"],
  };

  const mockWards = [
    { id: "all", name: "All Wards" },
    { id: "ward-01", name: "Ward 01 - Anifowoshe / Ikeja Central" },
    { id: "ward-02", name: "Ward 02 - Alausa / Secretarial" },
    { id: "ward-03", name: "Ward 03 - GRA / Onigbongbo" },
  ];

  const pollingUnits = [
    {
      id: "pu-24-08-01-001",
      code: "24-08-01-001",
      name: "Government College Ikeja (Main Gate Hall)",
      address: "Obafemi Awolowo Way, Opposite Airport Hotel, Ikeja",
      ward: "Ward 01 - Anifowoshe / Ikeja Central",
      lga: "Ikeja",
      state: "Lagos",
      registeredVoters: 742,
      bvasCount: 2,
      accessible: true,
      coveredArea: true,
      landmark: "Opposite Lagos Airport Hotel",
      coordinates: { lat: 6.5965, lng: 3.3421 },
    },
    {
      id: "pu-24-08-01-002",
      code: "24-08-01-002",
      name: "Community Primary School (Open Space A)",
      address: "24 Anifowoshe Street, Off Medical Road, Ikeja",
      ward: "Ward 01 - Anifowoshe / Ikeja Central",
      lga: "Ikeja",
      state: "Lagos",
      registeredVoters: 512,
      bvasCount: 1,
      accessible: true,
      coveredArea: false,
      landmark: "Near Computer Village South Gate",
      coordinates: { lat: 6.5932, lng: 3.3456 },
    },
    {
      id: "pu-24-08-02-005",
      code: "24-08-02-005",
      name: "Lagos State Secretariat Complex Gate 3",
      address: "Governor's Road, Alausa Secretariat, Ikeja",
      ward: "Ward 02 - Alausa / Secretarial",
      lga: "Ikeja",
      state: "Lagos",
      registeredVoters: 890,
      bvasCount: 3,
      accessible: true,
      coveredArea: true,
      landmark: "Adjacent House of Assembly Complex",
      coordinates: { lat: 6.6181, lng: 3.3584 },
    },
    {
      id: "pu-24-08-03-011",
      code: "24-08-03-011",
      name: "GRA Recreation Club Open Canopy",
      address: "Isaac John Street, GRA, Ikeja",
      ward: "Ward 03 - GRA / Onigbongbo",
      lga: "Ikeja",
      state: "Lagos",
      registeredVoters: 380,
      bvasCount: 1,
      accessible: false,
      coveredArea: true,
      landmark: "Beside Police Officers Mess",
      coordinates: { lat: 6.5889, lng: 3.3533 },
    },
  ];

  const filteredPus = useMemo(() => {
    return pollingUnits.filter((pu) => {
      const matchesState = pu.state === selectedState;
      const matchesLga = pu.lga === selectedLga;
      const matchesWard =
        selectedWard === "all" ||
        pu.ward === mockWards.find((w) => w.id === selectedWard)?.name;
      const matchesAccessibility = !accessibilityFilter || pu.accessible;
      const matchesSearch =
        searchQuery.trim() === "" ||
        pu.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pu.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pu.landmark.toLowerCase().includes(searchQuery.toLowerCase());

      return (
        matchesState &&
        matchesLga &&
        matchesWard &&
        matchesAccessibility &&
        matchesSearch
      );
    });
  }, [
    selectedState,
    selectedLga,
    selectedWard,
    accessibilityFilter,
    searchQuery,
  ]);

  return (
    <div className="min-h-screen bg-surface py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Banner Header */}
        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface-container-high border border-outline-variant/60 text-primary text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">
                pin_drop
              </span>
              Electoral Directory
            </div>
            <div className="text-xs font-bold text-on-surface-variant flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              INEC Official PU Registry Sync Active
            </div>
          </div>

          <div className="space-y-2 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
              Locate Your Polling Unit
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Find your assigned voting location by State, LGA, Ward, or your
              9-digit Polling Unit Code. Check voter capacity, wheelchair
              accessibility, and landmark directions before Election Day.
            </p>
          </div>

          {/* Main Search Input */}
          <div className="relative max-w-2xl">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">
              search
            </span>
            <input
              type="text"
              placeholder="Search by PU Code (e.g. 24-08-01-001), Street name, or Landmark..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/60 rounded-2xl pl-12 pr-10 py-3.5 text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 space-y-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-outline-variant/40 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-base">
                tune
              </span>
              Administrative Location Filters
            </span>
            <span className="text-xs text-on-surface-variant">
              Showing <strong>{filteredPus.length}</strong> Polling Units
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* State Select */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                State
              </label>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedLga(mockLgas[e.target.value]?.[0] || "");
                }}
                className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-3 py-2.5 text-xs font-bold text-on-surface focus:outline-none focus:border-primary"
              >
                {mockStates.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* LGA Select */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                LGA
              </label>
              <select
                value={selectedLga}
                onChange={(e) => setSelectedLga(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-3 py-2.5 text-xs font-bold text-on-surface focus:outline-none focus:border-primary"
              >
                {(mockLgas[selectedState] || []).map((lga) => (
                  <option key={lga} value={lga}>
                    {lga}
                  </option>
                ))}
              </select>
            </div>

            {/* Ward Select */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                Electoral Ward
              </label>
              <select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-3 py-2.5 text-xs font-bold text-on-surface focus:outline-none focus:border-primary"
              >
                {mockWards.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Accessibility Toggle Filter */}
            <div className="space-y-1 flex flex-col justify-end">
              <button
                onClick={() => setAccessibilityFilter(!accessibilityFilter)}
                className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
                  accessibilityFilter
                    ? "bg-primary text-on-primary border-primary"
                    : "bg-surface-container-low text-on-surface-variant border-outline-variant/60 hover:bg-surface-container"
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  accessible
                </span>
                {accessibilityFilter
                  ? "Wheelchair Accessible Only"
                  : "Filter Accessible Units"}
              </button>
            </div>
          </div>
        </div>

        {/* Content Layout: PU Grid + Sidebar Map/Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Polling Units List (2 Columns on Large Screens) */}
          <div className="lg:col-span-2 space-y-4">
            {filteredPus.length > 0 ? (
              filteredPus.map((pu) => {
                const isSelected = selectedPu?.id === pu.id;
                return (
                  <div
                    key={pu.id}
                    onClick={() => setSelectedPu(pu)}
                    className={`bg-surface-container-lowest border rounded-3xl p-6 transition-all cursor-pointer space-y-4 shadow-xs hover:border-primary ${
                      isSelected
                        ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                        : "border-outline-variant/60"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-extrabold text-xs px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20">
                            PU Code: {pu.code}
                          </span>
                          {pu.accessible && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                              <span className="material-symbols-outlined text-xs">
                                accessible
                              </span>
                              Accessible
                            </span>
                          )}
                          {pu.coveredArea && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                              <span className="material-symbols-outlined text-xs">
                                roofing
                              </span>
                              Shaded/Indoor
                            </span>
                          )}
                        </div>
                        <h3 className="font-extrabold text-base text-on-surface leading-snug pt-1">
                          {pu.name}
                        </h3>
                      </div>

                      <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline shrink-0">
                        View Details
                        <span className="material-symbols-outlined text-base">
                          chevron_right
                        </span>
                      </button>
                    </div>

                    <p className="text-xs text-on-surface-variant flex items-start gap-1.5">
                      <span className="material-symbols-outlined text-base shrink-0 text-primary mt-0.5">
                        place
                      </span>
                      <span>{pu.address}</span>
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-outline-variant/30 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                          Ward
                        </span>
                        <span className="font-semibold text-on-surface truncate block">
                          {pu.ward}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                          Reg. Voters
                        </span>
                        <span className="font-bold text-on-surface">
                          {pu.registeredVoters} Voters
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                          BVAS Machine Allocation
                        </span>
                        <span className="font-bold text-primary">
                          {pu.bvasCount} BVAS Units
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-12 text-center space-y-3">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant">
                  wrong_location
                </span>
                <h3 className="font-bold text-base text-on-surface">
                  No Polling Units Found
                </h3>
                <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                  No matching polling units exist for your selected location
                  filters or search query. Try clearing filters or checking
                  spelling.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedWard("all");
                    setAccessibilityFilter(false);
                  }}
                  className="text-xs font-bold text-primary hover:underline pt-2 inline-block"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

          {/* Selected PU Map & Direction Preview Panel */}
          <div className="lg:col-span-1 space-y-6 sticky top-6">
            {selectedPu ? (
              <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 space-y-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-base">
                      map
                    </span>
                    Selected Location Overview
                  </span>
                  <button
                    onClick={() => setSelectedPu(null)}
                    className="text-on-surface-variant hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-base">
                      close
                    </span>
                  </button>
                </div>

                {/* Simulated Map Graphic Container */}
                <div className="relative h-48 bg-surface-container border border-outline-variant/60 rounded-2xl overflow-hidden flex items-center justify-center text-center p-4">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]"></div>

                  <div className="relative space-y-2">
                    <div className="w-10 h-10 rounded-full bg-primary text-on-primary mx-auto flex items-center justify-center shadow-md animate-bounce">
                      <span className="material-symbols-outlined text-xl">
                        how_to_vote
                      </span>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-on-surface block bg-surface-container-lowest/80 px-2.5 py-1 rounded-md border border-outline-variant/40 backdrop-blur-xs">
                      Lat: {selectedPu.coordinates.lat}, Lng:{" "}
                      {selectedPu.coordinates.lng}
                    </span>
                  </div>
                </div>

                {/* PU Detailed Metadata */}
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                      Polling Station Name
                    </span>
                    <h4 className="font-extrabold text-sm text-on-surface">
                      {selectedPu.name}
                    </h4>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                      Address & Landmark
                    </span>
                    <p className="text-on-surface-variant mt-0.5 leading-relaxed">
                      {selectedPu.address}
                    </p>
                    <p className="text-[11px] font-bold text-primary mt-1">
                      Key Landmark: {selectedPu.landmark}
                    </p>
                  </div>

                  <div className="p-3 bg-surface-container-low rounded-xl space-y-1.5 border border-outline-variant/40">
                    <span className="font-bold text-on-surface text-[11px] flex items-center gap-1">
                      <span className="material-symbols-outlined text-base text-primary">
                        info
                      </span>
                      Election Day Checklist
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-on-surface-variant text-[11px]">
                      <li>Physical PVC required for BVAS scanning.</li>
                      <li>Voting opens promptly at 8:30 AM.</li>
                      <li>
                        {selectedPu.bvasCount} BVAS machines assigned to reduce
                        wait times.
                      </li>
                    </ul>
                  </div>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${selectedPu.name}, ${selectedPu.address}`,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-primary text-on-primary font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">
                      directions
                    </span>
                    Get Directions on Google Maps
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-8 text-center space-y-3 shadow-xs">
                <span className="material-symbols-outlined text-4xl text-primary">
                  touch_app
                </span>
                <h3 className="font-bold text-sm text-on-surface">
                  Select a Polling Unit
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Click on any polling unit from the list to view its map
                  coordinates, election day capacity, and landmark navigation
                  details.
                </p>
              </div>
            )}

            {/* Quick Helper Card */}
            <div className="bg-surface-container-low border border-outline-variant/60 rounded-3xl p-5 space-y-2 text-xs">
              <span className="font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-base">
                  help
                </span>
                Cannot find your PU Code?
              </span>
              <p className="text-on-surface-variant text-[11px] leading-relaxed">
                Check the top front section of your Permanent Voter Card (PVC)
                for your 9-digit PU code formatted as State-LGA-Ward-PU.
              </p>
              <Link
                to="/help"
                className="text-xs font-bold text-primary hover:underline block pt-1"
              >
                Visit Voter Support Center &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
