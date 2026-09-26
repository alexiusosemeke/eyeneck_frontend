import { Link } from "react-router-dom";
import {useState, useEffect} from "react";
import api from "../api/axios";

export default function Hero() {

  const [heroData, setHeroData] = useState({
    voters: 0,
    polling_units: 0,
    wards: 0,
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await api.get('/platform-stats/');
        setHeroData(response?.data);
        return response?.data
      } catch (error) {
        console.error('Failed to fetch platform stats', error);
      }
    }

    fetchHeroData();
  }, []);
  return (
    <section className="bg-surface-container-low border-b border-outline-variant/60">
      <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full">

          {/* Left Column: Narrative & Action */}
          <div className="lg:col-span-7 flex flex-col items-start gap-5 sm:gap-6">

            {/* Institutional Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-primary-container/10 border border-primary/30 text-primary text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              Official National Electoral Portal
            </div>

            {/* Headline */}
            <h1 className="text-[1.75rem] leading-[1.18] sm:text-4xl sm:leading-[1.15] lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-on-surface lg:leading-[1.12]">
              Transparent digital infrastructure for democratic elections.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Access secure voter services, verify permanent voter cards (PVC), find polling units, and track certified election results across all 36 states and the FCT.
            </p>

            {/* Direct Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-1 w-full sm:w-auto">
              <Link
                to="/pvc-verification"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors"
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                Verify PVC Status
              </Link>

              <Link to={'/login'} className="inline-flex items-center justify-center gap-2 bg-surface-container-lowest hover:bg-surface-container-high text-on-surface px-7 py-3.5 rounded-xl font-semibold text-sm tarnsition-colors border border-outline-variant">
              <span className="material-symbols-outlined text-[20px]">login</span>
              My Account
              </Link>

              {/* <Link
                to="/results"
                className="inline-flex items-center justify-center gap-2 bg-surface-container-lowest hover:bg-surface-container-high text-on-surface px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors border border-outline-variant"
              >
                <span className="material-symbols-outlined text-[20px]">equalizer</span>
                View Live Results
              </Link> */}
            </div>

            {/* Institutional Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-8 mt-4 sm:mt-6 pt-5 sm:pt-6 border-t border-outline-variant/60 w-full max-w-xl">
              <div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-on-surface">{heroData.voters.toLocaleString() ?? 0}</div>
                <p className="text-[10px] sm:text-xs text-on-surface-variant font-medium mt-1">Registered Voters</p>
              </div>
              <div className="border-l border-outline-variant/60 pl-3 sm:pl-8">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-primary">{heroData.polling_units.toLocaleString() ?? 0}</div>
                <p className="text-[10px] sm:text-xs text-on-surface-variant font-medium mt-1">Polling Units</p>
              </div>
              <div className="border-l border-outline-variant/60 pl-3 sm:pl-8">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-on-surface">{heroData.wards.toLocaleString() ?? 0}</div>
                <p className="text-[10px] sm:text-xs text-on-surface-variant font-medium mt-1">State Command Centers</p>
              </div>
            </div>

          </div>

          {/* Right Column: Portal Services Dashboard Preview */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 sm:p-6 shadow-xs space-y-5 sm:space-y-6">

              {/* Panel Title */}
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/60">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">account_balance</span>
                  <h3 className="font-bold text-sm text-on-surface">Voter Services Quick Portal</h3>
                </div>
                <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant text-[11px] font-bold">
                  Active System
                </span>
              </div>

              {/* Quick Action Cards */}
              <div className="space-y-3">
                <Link
                  to="/pvc-verification"
                  className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/50 transition-colors group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-primary-container/15 flex items-center justify-center shrink-0 text-primary">
                      <span className="material-symbols-outlined">badge</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                        PVC Status & Collection
                      </h4>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">
                        Check registration details & collection center
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-0.5 transition-transform text-lg">
                    chevron_right
                  </span>
                </Link>

                <Link
                  to="/elections"
                  className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/50 transition-colors group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-primary-container/15 flex items-center justify-center shrink-0 text-primary">
                      <span className="material-symbols-outlined">how_to_vote</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                        Upcoming Elections
                      </h4>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">
                        Timelines, candidates, and electoral guidelines
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-0.5 transition-transform text-lg">
                    chevron_right
                  </span>
                </Link>

                <Link
                  to="/voter-info"
                  className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/50 transition-colors group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-primary-container/15 flex items-center justify-center shrink-0 text-primary">
                      <span className="material-symbols-outlined">location_on</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                        Locate Polling Unit
                      </h4>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">
                        Find your assigned voting location by ward
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-0.5 transition-transform text-lg">
                    chevron_right
                  </span>
                </Link>
              </div>

              {/* Verification Notice Footnote */}
              <div className="pt-3 border-t border-outline-variant/60 flex items-center gap-2 text-[11px] text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-base shrink-0">shield</span>
                <span>Encrypted portal connected directly to official voter databases.</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}