import { useState } from "react";
import { Link } from "react-router-dom";

export default function VoterStatusCard({ voterStatus, user }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (user?.voter?.vin) {
      navigator.clipboard.writeText(user.voter.vin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-md">
      {voterStatus === "approved" ? (
        /* ========================================================= */
        /* STATE 1: APPROVED / VERIFIED DIGITAL VOTER CARD           */
        /* ========================================================= */
        <div className="group relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-xl text-white transition-all duration-300 hover:border-emerald-500/40 hover:shadow-emerald-500/10">
          {/* Subtle Ambient Background Glow */}
          <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-emerald-500/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

          {/* Card Header */}
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                National Voter Registry
              </span>
              <h3 className="text-base font-bold text-white flex items-center gap-1.5 mt-0.5">
                {user?.first_name || "Authenticated Citizen"}
                <span
                  className="material-symbols-outlined text-emerald-400 text-lg"
                  title="Verified Citizen"
                >
                  verified
                </span>
              </h3>
            </div>
            {/* Status Shield Badge */}
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
              <span className="material-symbols-outlined text-xl">badge</span>
            </div>
          </div>

          {/* Core Identification Data Grid */}
          <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-950/70 p-3.5 border border-white/5">
            <div>
              <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                VIN Code
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-sm font-bold tracking-wider text-emerald-400">
                  {user?.voter?.vin || "N/A"}
                </span>
                <button
                  onClick={handleCopy}
                  className="text-slate-400 hover:text-white transition-colors"
                  title="Copy VIN"
                >
                  <span className="material-symbols-outlined text-xs">
                    {copied ? "check" : "content_copy"}
                  </span>
                </button>
              </div>
            </div>
            <div>
              <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Clearance Status
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active & Eligible
              </span>
            </div>
          </div>

          {/* Card Footer Metadata */}
          <div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-slate-500">
                location_on
              </span>
              District:{" "}
              <strong className="text-slate-200 font-medium">
                {user?.voter?.polling_unit?.ward?.name || "01"}
              </strong>
            </span>
            <Link
              to="/voting/pass"
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors flex items-center gap-0.5 text-xs"
            >
              Digital Pass
              <span className="material-symbols-outlined text-sm">
                chevron_right
              </span>
            </Link>
          </div>
        </div>
      ) : voterStatus === "pending" ? (
        /* ========================================================= */
        /* STATE 2: PENDING VERIFICATION CARD                        */
        /* ========================================================= */
        <div className="group relative overflow-hidden rounded-2xl border border-amber-500/30 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-xl text-white">
          {/* Subtle Ambient Background Glow */}
          <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-amber-500/10 blur-3xl" />

          {/* Card Header */}
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">
                Verification in Progress
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                {user?.name || "Citizen Applicant"}
              </h3>
            </div>
            <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <span className="material-symbols-outlined text-xl animate-spin [animation-duration:3s]">
                sync
              </span>
            </div>
          </div>

          {/* Processing Banner */}
          <div className="mt-4 rounded-xl bg-slate-950/70 p-3.5 border border-amber-500/20">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-300 font-medium">
                Electoral Registry Audit
              </span>
              <span className="font-mono text-amber-400 font-bold">
                Step 2 / 3
              </span>
            </div>
            {/* Animated Loading Bar */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-2/3 rounded-full bg-amber-500 animate-pulse" />
            </div>
          </div>

          {/* Card Footer Metadata */}
          <div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-slate-500">
                schedule
              </span>
              Est: 24–48 Hours
            </span>
            <Link
              to="/voting/status"
              className="text-amber-400 hover:text-amber-300 font-medium transition-colors flex items-center gap-0.5"
            >
              Track Application
              <span className="material-symbols-outlined text-sm">
                chevron_right
              </span>
            </Link>
          </div>
        </div>
      ) : (
        /* ========================================================= */
        /* STATE 3: NOT REGISTERED / CTA CARD                        */
        /* ========================================================= */
        <div className="group relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-xl text-white transition-all duration-300 hover:border-indigo-500/60">
          {/* Subtle Ambient Background Glow */}
          <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-indigo-500/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

          {/* Card Header */}
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <span className="material-symbols-outlined text-2xl">
                fingerprint
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">
                Action Required
              </span>
              <h3 className="text-sm font-bold text-white mt-0.5">
                Voter Identification Not Linked
              </h3>
            </div>
          </div>

          {/* Notice Body */}
          <p className="mt-3.5 text-xs text-slate-300 leading-relaxed rounded-xl bg-slate-950/70 p-3 border border-white/5">
            Register your profile to receive your official digital voter key and
            participate in upcoming civic votes.
          </p>

          {/* Direct CTA Button */}
          <Link
            to="/voting/apply"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98]"
          >
            <span>Begin VIN Application</span>
            <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
