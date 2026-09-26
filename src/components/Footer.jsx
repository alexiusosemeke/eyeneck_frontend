import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/60 text-on-surface">
      <div className="max-w-container-max mx-auto px-4 sm:px-8 py-12 lg:py-16">
        {/* Navigation & Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-outline-variant/60">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">
                  how_to_vote
                </span>
              </div>
              <span className="text-xl font-extrabold text-on-surface tracking-tight">
                eyeneck
              </span>
            </div>

            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-sm">
              Official digital electoral portal providing secure voter
              verification, biometric authentication status, and real-time
              certified result tracking across all polling units.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-primary pt-1">
              <span className="material-symbols-outlined text-base">
                verified
              </span>
              <span>INEC Compliant Infrastructure Provider</span>
            </div>
          </div>

          {/* Voter Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface">
              Voter Services
            </h4>
            <ul className="space-y-2 text-xs text-on-surface-variant font-medium">
              <li>
                <Link
                  to="/pvc-verification"
                  className="hover:text-primary transition-colors"
                >
                  PVC Status Verification
                </Link>
              </li>
              <li>
                <Link
                  to="/voter-info"
                  className="hover:text-primary transition-colors"
                >
                  Locate Polling Unit
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-primary transition-colors"
                >
                  Voter Registration Portal
                </Link>
              </li>
              <li>
                <Link
                  to="/results"
                  className="hover:text-primary transition-colors"
                >
                  Live Certified Results
                </Link>
              </li>
            </ul>
          </div>

          {/* Electoral Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface">
              Electoral Info
            </h4>
            <ul className="space-y-2 text-xs text-on-surface-variant font-medium">
              <li>
                <Link
                  to="/elections"
                  className="hover:text-primary transition-colors"
                >
                  Election Schedules
                </Link>
              </li>
              <li>
                <Link
                  to="/candidates"
                  className="hover:text-primary transition-colors"
                >
                  Candidate Directory
                </Link>
              </li>
              <li>
                <Link
                  to="/guidelines"
                  className="hover:text-primary transition-colors"
                >
                  Voting Guidelines
                </Link>
              </li>
              <li>
                <Link
                  to="/observers"
                  className="hover:text-primary transition-colors"
                >
                  Observer Accreditation
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-xs text-on-surface-variant font-medium">
              <li>
                <a
                  href="#security"
                  className="hover:text-primary transition-colors"
                >
                  Security Whitepaper
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <Link
                  to={"/terms"}
                  className="hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to={"/help-center"}
                  className="hover:text-primary transition-colors"
                >
                  Help Center & Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          <p>
            © {new Date().getFullYear()} Eyeneck Electoral Portal. Independent
            National Electoral Commission Resource.
          </p>

          {/* Quick Action Utility Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Share Portal"
              className="w-9 h-9 rounded-lg bg-surface-container-high border border-outline-variant/60 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors"
            >
              <span className="material-symbols-outlined text-lg">share</span>
            </button>
            <button
              type="button"
              aria-label="Portal Language & Regional Settings"
              className="w-9 h-9 rounded-lg bg-surface-container-high border border-outline-variant/60 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors"
            >
              <span className="material-symbols-outlined text-lg">public</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
