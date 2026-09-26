import Countdown from "react-countdown";
import Swal from "sweetalert2";

export default function ElectionCountdownCard({ getElections }) {
  const handleReminderClick = () => {
    Swal.fire({
      title: "Coming Soon...",
      text: "Reminder feature is currently in development.",
      timer: 5000,
      timerProgressBar: true,
      customClass: {
        popup: "rounded-2xl bg-slate-900 text-white border border-slate-800",
      },
    });
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-8">
      {getElections.map((election) => (
        <div
          key={election.id}
          className="group relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/90 p-6 md:p-8 shadow-2xl backdrop-blur-xl text-white md:col-span-8 transition-all duration-300 hover:border-indigo-500/40"
        >
          {/* Subtle Ambient Glow Effect */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

          {/* Background Watermark Icon */}
          <div className="pointer-events-none absolute -bottom-8 -right-8 opacity-5 transition-opacity duration-300 group-hover:opacity-10">
            <span
              className="material-symbols-outlined text-[240px] text-white"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              how_to_vote
            </span>
          </div>

          <div className="relative z-10">
            {/* Header / Countdown Row */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-8">
              {/* Election Details */}
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-[11px] font-bold tracking-widest text-indigo-400 uppercase ring-1 ring-inset ring-indigo-500/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                    Countdown Active
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-2">
                  {election.title}
                </h3>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                  {election.description}
                </p>
              </div>

              {/* Countdown Timer Block */}
              <Countdown
                date={election.start_date}
                renderer={({ days, hours, minutes, seconds, completed }) => {
                  if (completed) {
                    return (
                      <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-400 backdrop-blur-md">
                        <span className="material-symbols-outlined text-xl">
                          how_to_vote
                        </span>
                        <span className="text-base font-bold tracking-wide">
                          Election is Live Now
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div className="flex items-center gap-2.5 sm:gap-4 self-start lg:self-center">
                      {[
                        { label: "Days", val: days },
                        { label: "Hrs", val: hours },
                        { label: "Mins", val: minutes },
                        { label: "Secs", val: seconds },
                      ].map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-xl border border-white/10 bg-slate-950/70 font-mono text-xl sm:text-2xl font-bold tracking-wider text-white shadow-inner backdrop-blur-md">
                            {String(item.val).padStart(2, "0")}
                          </div>
                          <span className="mt-2 text-[10px] sm:text-xs font-mono font-semibold tracking-widest text-slate-400 uppercase">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                }}
              />
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <button
                type="button"
                onClick={handleReminderClick}
                className="group inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 active:scale-[0.98]"
              >
                <span>Set Reminder</span>
                <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">
                  notifications_active
                </span>
              </button>

              <span className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <span className="material-symbols-outlined text-sm text-slate-500">
                  lock
                </span>
                Encrypted Election Registry
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
