import { Link } from "react-router-dom";

export default function Cta() {
  return (
    <section className="bg-surface py-16 lg:py-24 px-4 sm:px-8 border-b border-outline-variant/60 relative overflow-hidden">
      <div className="max-w-container-max mx-auto relative z-10">
        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto shadow-xs space-y-8">
          
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-surface-container-high border border-outline-variant text-primary text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-base">how_to_vote</span>
            Civic Participation Portal
          </div>

          {/* Headline & Body */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight leading-[1.15]">
              Ready to Make Your Voice Heard?
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Join millions of registered citizens participating in the democratic process with verified security, real-time tracking, and complete transparency.
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-8 py-3.5 rounded-xl font-semibold text-sm transition-colors border border-primary shadow-xs"
            >
              <span className="material-symbols-outlined text-xl">how_to_vote</span>
              Register to Vote
            </Link>

            <Link
              to="/learn-more"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-surface-container-low hover:bg-surface-container-high text-on-surface px-8 py-3.5 rounded-xl font-semibold text-sm transition-colors border border-outline-variant"
            >
              <span className="material-symbols-outlined text-xl">menu_book</span>
              Learn More
            </Link>
          </div>

          {/* Institutional Trust Footnote */}
          <div className="pt-6 border-t border-outline-variant/50 flex flex-wrap items-center justify-center gap-2 text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-primary text-base">verified_user</span>
            <span>Simple Verification • Encrypted Results • Official Electoral Resource</span>
          </div>

        </div>
      </div>
    </section>
  );
}