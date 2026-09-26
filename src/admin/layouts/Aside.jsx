import { useState } from "react";
import { Link } from "react-router-dom";

const Aside = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu((currentMenu) => (currentMenu === menu ? null : menu));
  };
  return (
    <>
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-on-surface/35 backdrop-blur-[1px] md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <aside
        aria-label="Admin navigation"
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-full flex-col gap-2 overflow-y-auto border-r border-outline-variant bg-surface-container-low px-4 py-5 shadow-ambient transition-transform duration-300 ease-out md:w-72 md:translate-x-0 md:shadow-none ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-outline-variant pb-5 px-2">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
              <span className="material-symbols-outlined">how_to_reg</span>
            </div>
            <div>
              <p className="font-label-md text-label-md uppercase tracking-[0.16em] text-primary">
                EYENECK
              </p>
              <h2 className="font-label-lg text-label-lg text-on-surface">
                Administration
              </h2>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close navigation"
            className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-container-high md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav
          className="flex flex-col gap-2 flex-1 pt-3"
          aria-label="Primary navigation"
        >
          <p className="px-3 pb-1 font-label-md text-label-md uppercase tracking-[0.14em] text-on-surface-variant">
            Workspace
          </p>
          <Link
            className="flex items-center gap-3 px-4 py-3 bg-primary text-on-primary font-bold rounded-xl shadow-sm active:scale-[0.98] transition-transform"
            to={"/admin/dashboard"}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-label-lg text-label-lg flex-1">
              Dashboard
            </span>
          </Link>

          <div className="flex flex-col gap-1">
            <button
              type="button"
              aria-expanded={openMenu === "users"}
              aria-controls="users-menu"
              onClick={() => toggleMenu("users")}
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface rounded-xl transition-all w-full text-left"
            >
              <span className="material-symbols-outlined">manage_accounts</span>
              <span className="font-label-lg text-label-lg flex-1">
                User Management
              </span>
              <span
                className={`material-symbols-outlined text-[18px] transition-transform ${openMenu === "users" ? "rotate-180" : ""}`}
              >
                expand_more
              </span>
            </button>
            {openMenu === "users" && (
              <div
                id="users-menu"
                className="ml-5 pl-5 border-l border-outline-variant flex flex-col gap-1"
              >
                <Link
                  to={"/admin/view-users"}
                  className="rounded-lg px-2 py-2 text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                >
                  View Users
                </Link>
                <Link
                  to={"/admin/view-voters"}
                  className="rounded-lg px-2 py-2 text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                >
                  View Voters
                </Link>
                <a
                  href="#"
                  className="rounded-lg px-2 py-2 text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                >
                  Approve/Reject User
                </a>
                <a
                  href="#"
                  className="rounded-lg px-2 py-2 text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                >
                  Disable Voter
                </a>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <button
              type="button"
              aria-expanded={openMenu === "polls"}
              aria-controls="polls-menu"
              onClick={() => toggleMenu("polls")}
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface rounded-xl transition-all w-full text-left"
            >
              <span className="material-symbols-outlined">poll</span>
              <span className="font-label-lg text-label-lg flex-1">
                Polls
              </span>
              <span
                className={`material-symbols-outlined text-[18px] transition-transform ${openMenu === "polls" ? "rotate-180" : ""}`}
              >
                expand_more
              </span>
            </button>
            {openMenu === "polls" && (
              <div
                id="polls-menu"
                className="ml-5 pl-5 border-l border-outline-variant flex flex-col gap-1"
              >
                <Link
                  to={"/admin/polls/create"}
                  className="rounded-lg px-2 py-2 text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                >
                  Create Poll
                </Link>
                <Link
                  to={"/admin/polls"}
                  className="rounded-lg px-2 py-2 text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                >
                  View Polls
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <button
              type="button"
              aria-expanded={openMenu === "elections"}
              aria-controls="elections-menu"
              onClick={() => toggleMenu("elections")}
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface rounded-xl transition-all w-full text-left"
            >
              <span className="material-symbols-outlined">how_to_vote</span>
              <span className="font-label-lg text-label-lg flex-1">
                Elections
              </span>
              <span
                className={`material-symbols-outlined text-[18px] transition-transform ${openMenu === "elections" ? "rotate-180" : ""}`}
              >
                expand_more
              </span>
            </button>
            {openMenu === "elections" && (
              <div
                id="elections-menu"
                className="ml-5 pl-5 border-l border-outline-variant flex flex-col gap-1"
              >
                <Link
                  to={"/admin/elections/create"}
                  className="rounded-lg px-2 py-2 text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                >
                  Create Election
                </Link>
                <Link
                  to={"/admin/elections/view"}
                  className="rounded-lg px-2 py-2 text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                >
                  View Elections
                </Link>

                <Link
                  to={"/admin/positions"}
                  className="rounded-lg px-2 py-2 text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                >
                  Positions
                </Link>

                <Link
                  to={"/admin/positions/create"}
                  className="rounded-lg px-2 py-2 text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                >
                  Create Positions
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <button
              type="button"
              aria-expanded={openMenu === "parties"}
              aria-controls="parties-menu"
              onClick={() => toggleMenu("parties")}
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface rounded-xl transition-all w-full text-left"
            >
              <span className="material-symbols-outlined">how_to_vote</span>
              <span className="font-label-lg text-label-lg flex-1">
                Parties
              </span>
              <span
                className={`material-symbols-outlined text-[18px] transition-transform ${openMenu === "parties" ? "rotate-180" : ""}`}
              >
                expand_more
              </span>
            </button>
            {openMenu === "parties" && (
              <div
                id="parties-menu"
                className="ml-5 pl-5 border-l border-outline-variant flex flex-col gap-1"
              >
                <Link
                  to={"/admin/parties/create"}
                  className="rounded-lg px-2 py-2 text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                >
                  Create Party
                </Link>
                <Link
                  to={"/admin/parties"}
                  className="rounded-lg px-2 py-2 text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                >
                  View Parties
                </Link>

              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <button
              type="button"
              aria-expanded={openMenu === "candidates"}
              aria-controls="candidates-menu"
              onClick={() => toggleMenu("candidates")}
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface rounded-xl transition-all w-full text-left"
            >
              <span className="material-symbols-outlined">person_search</span>
              <span className="font-label-lg text-label-lg flex-1">
                Candidates
              </span>
              <span
                className={`material-symbols-outlined text-[18px] transition-transform ${openMenu === "candidates" ? "rotate-180" : ""}`}
              >
                expand_more
              </span>
            </button>
            {openMenu === "candidates" && (
              <div
                id="candidates-menu"
                className="ml-5 pl-5 border-l border-outline-variant flex flex-col gap-1"
              >
                <Link
                  to={'/admin/candidates/create'}
                  className="rounded-lg px-2 py-2 text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                >
                  Create Candidate
                </Link>
                <Link
                  to={'/admin/candidates'}
                  className="rounded-lg px-2 py-2 text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                >
                  View Candidates
                </Link>
              </div>
            )}
          </div>

          <a
            className="flex items-center gap-3 px-4 py-3 text-error hover:bg-error-container rounded-xl transition-all mt-4"
            href="#"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-lg text-label-lg">Logout</span>
          </a>
        </nav>
        <div className="mt-auto border-t border-outline-variant pt-4 px-2">
          <div className="flex items-center gap-3 mb-1 rounded-xl bg-surface px-3 py-3">
            <img
              className="w-10 h-10 rounded-full object-cover border border-outline-variant"
              data-alt="A professional headshot of a Nigerian official, well-lit in a modern office environment, signifying administrative authority and trust."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCprAfpP_29HvacgIzCeLEAP7BKpMh57a49-L5Xq1s0pOO3Gttf629PseExRELThzKbMVvNAR5PG04CSkH_-7cuq7qkfFu3MsEUDjob4uLZKB_32Ws46y3yDqvf986ukLS5cpN2eqnBV4ujrCNKABIf94Zm05-hoczms2EWuYBVGsy9LIRIKiT0uzQv6vh6LUKPXMt_WMpaQL7yblE1SKxFCnDRaiAteuR6A7THMmhodIpVHJ9CfKf"
            />
            <div>
              <p className="font-label-lg text-label-lg text-on-surface font-bold">
                Adewale K.
              </p>
              <p className="font-label-md text-label-md text-on-surface-variant">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 md:ml-72 flex flex-col">
        <header className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-16 z-30 bg-surface-container-low border-b border-outline-variant sticky top-0">
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Open navigation"
              aria-expanded={isSidebarOpen}
              className="md:hidden rounded-lg p-2 text-on-surface-variant hover:bg-surface-container-high"
              onClick={() => setIsSidebarOpen(true)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">
              EYENECK
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-on-surface-variant hover:bg-surface-variant transition-colors p-2 rounded-full cursor-pointer active:opacity-80">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <img
              className="w-8 h-8 rounded-full border border-outline-variant object-cover"
              data-alt="A small circular avatar placeholder showing a generic silhouette for the user profile dropdown trigger."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk3tVJ82IloPqUGqITtNiR3wNKDrEbFFnJFAcCbdjoVHyX73lYthdehFPDRLTC53BK3q_IxUOPPi_gvmn3WS-QLsimjc708Tdfh77bzPxtrqkE_Gpx97b1m2VZQhTSjHN1wUw47BJfYgS7x1WpVWO2GhIuzcfgagum_stv0RBYjBBVczxR7HVMiPgcjnV8q318DT-FpDPhL919THDrrvvkNTJU8-YvKt9fk_DIrSmbLvbt5dOMHBI-"
            />
          </div>
        </header>
      </div>
    </>
  );
};

export default Aside;
