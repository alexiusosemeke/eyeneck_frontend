export default function Features() {
  return (
    <>
      {/* Platform Security & Integrity Features */}
      <section className="bg-surface py-16 lg:py-24 px-4 sm:px-8 border-b border-outline-variant/60">
        <div className="max-w-container-max mx-auto space-y-12">
          
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-md bg-surface-container-high border border-outline-variant/60 text-primary text-[11px] font-bold uppercase tracking-wider">
              System Security & Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              Uncompromising Electoral Integrity
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Engineered specifically for the Nigerian context, ensuring every voter is authenticated and every ballot is immutably recorded.
            </p>
          </div>

          {/* 3-Column Integrity Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Card 1: Encryption */}
            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 lg:p-8 hover:border-outline transition-colors flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-2xl">shield_lock</span>
                </div>
                <h3 className="text-lg font-bold text-on-surface">Secure Encryption</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Elliptic Curve Cryptography ensures your ballot remains confidential from the moment it is cast through final tally aggregation.
                </p>
              </div>
              <div className="pt-4 border-t border-outline-variant/40 text-[11px] font-semibold text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span>AES-256 Ledger Protection</span>
              </div>
            </div>

            {/* Card 2: Biometrics */}
            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 lg:p-8 hover:border-outline transition-colors flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-2xl">fingerprint</span>
                </div>
                <h3 className="text-lg font-bold text-on-surface">Verified Identity</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Biometric multi-factor authentication prevents voter duplication through direct BVAS and NIN voter registry integration.
                </p>
              </div>
              <div className="pt-4 border-t border-outline-variant/40 text-[11px] font-semibold text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span>Live NIN Biometric Match</span>
              </div>
            </div>

            {/* Card 3: Transparency */}
            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 lg:p-8 hover:border-outline transition-colors flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-2xl">poll</span>
                </div>
                <h3 className="text-lg font-bold text-on-surface">Transparent Results</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Public audit logs and polling unit tally sheets enable civil observers and citizens to audit results independently.
                </p>
              </div>
              <div className="pt-4 border-t border-outline-variant/40 text-[11px] font-semibold text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span>Real-time Polling Tally</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3-Step Voting Process Banner */}
      <section className="py-16 lg:py-20 px-4 sm:px-8 bg-surface-container-low border-b border-outline-variant/60">
        <div className="max-w-container-max mx-auto">
          <div className="bg-primary text-on-primary rounded-3xl p-8 sm:p-12 lg:p-16 border border-primary-container relative">
            
            {/* Header */}
            <div className="text-center max-w-xl mx-auto mb-12 lg:mb-16 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-on-primary/80">
                Step-by-Step Workflow
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Cast Your Vote in 3 Simple Steps
              </h2>
            </div>

            {/* Step Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
              
              {/* Horizontal Connecting Line (Desktop Only) */}
              <div className="hidden md:block absolute top-10 left-[18%] right-[18%] h-0.5 bg-on-primary/20 z-0" />

              {/* Step 1 */}
              <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-on-primary text-primary font-extrabold text-xl flex items-center justify-center border-4 border-primary shadow-xs">
                  01
                </div>
                <h3 className="font-bold text-base text-on-primary">
                  PVC Verification
                </h3>
                <p className="text-xs text-on-primary/85 leading-relaxed max-w-xs">
                  Validate your Permanent Voter Card details against the official electoral voter registry.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-on-primary text-primary font-extrabold text-xl flex items-center justify-center border-4 border-primary shadow-xs">
                  02
                </div>
                <h3 className="font-bold text-base text-on-primary">
                  Biometric Authentication
                </h3>
                <p className="text-xs text-on-primary/85 leading-relaxed max-w-xs">
                  Confirm your identity securely via facial or fingerprint verification at your designated center.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-on-primary text-primary font-extrabold text-xl flex items-center justify-center border-4 border-primary shadow-xs">
                  03
                </div>
                <h3 className="font-bold text-base text-on-primary">
                  Cast Encrypted Ballot
                </h3>
                <p className="text-xs text-on-primary/85 leading-relaxed max-w-xs">
                  Select your preferred candidates and submit your digitally signed, anonymous vote.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}