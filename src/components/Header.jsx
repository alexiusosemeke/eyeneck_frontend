import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Elections", href: "/elections" },
  { name: "PVC Verification", href: "/pvc-verification" },
  { name: "Results", href: "/results" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-surface/95 dark:bg-black/95 backdrop-blur-md border-b border-outline-variant/60 transition-colors duration-200">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-4 lg:px-8 max-w-container-max mx-auto"
      >
        {/* Brand Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold shadow-xs group-hover:bg-emerald-800 transition-colors">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                how_to_vote
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-on-surface tracking-tight leading-none">
                Eyeneck
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-emerald-700 dark:text-emerald-400 uppercase mt-0.5">
                Electoral Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-xl p-2.5 text-on-surface hover:bg-surface-container-high transition-colors"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex lg:gap-x-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-surface-container-high text-emerald-700 dark:text-emerald-400"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-3">
          <Link
            to="/pvc-verification"
            className="text-xs font-semibold text-on-surface border border-outline-variant hover:bg-surface-container-high px-4 py-2 rounded-xl transition-all"
          >
            Verify Status
          </Link>

          <Link
            to="/login"
            className="text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
          >
            <span>Sign In</span>
            <span className="material-symbols-outlined text-[16px]">
              arrow_forward
            </span>
          </Link>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs" />

        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-surface dark:bg-surface-container-lowest p-6 sm:max-w-sm border-l border-outline-variant flex flex-col justify-between">
          <div>
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/60">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold">
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    how_to_vote
                  </span>
                </div>
                <span className="font-extrabold text-base text-on-surface">
                  Eyeneck
                </span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-xl p-2.5 text-on-surface-variant hover:bg-surface-container-high transition-colors"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Nav List */}
            <div className="mt-6 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="pt-6 border-t border-outline-variant/60 space-y-3">
            <Link
              to="/pvc-verification"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center text-xs font-semibold text-on-surface border border-outline-variant hover:bg-surface-container-high py-3 rounded-xl transition-all"
            >
              Verify Voter Status
            </Link>

            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-xl transition-all shadow-xs"
            >
              <span>Sign In to Portal</span>
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </Link>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
