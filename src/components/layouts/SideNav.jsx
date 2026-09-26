import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <>
      <aside className="w-64 fixed left-0 top-0 bg-surface-container dark:bg-surface-container-high flex-col h-full p-4 space-y-2 z-50 hidden md:flex">
        <div className="mb-8 px-2">
          <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">
            eyeneck
          </h1>
          <p className="font-label-md text-on-surface-variant">Voter Portal</p>
        </div>
        <nav className="grow space-y-1">
          <Link
            className="bg-primary-container text-on-primary-container font-bold rounded-lg flex items-center px-4 py-3 space-x-3 transition-transform scale-95 active:scale-90"
            to={"/dashboard"}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              dashboard
            </span>
            <span className="font-label-lg text-label-lg">Dashboard</span>
          </Link>

          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-all flex items-center px-4 py-3 space-x-3 rounded-lg"
            to={"/pvc"}
          >
            <span className="material-symbols-outlined">badge</span>
            <span className="font-label-lg text-label-lg">My PVC</span>
          </Link>

          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-all flex items-center px-4 py-3 space-x-3 rounded-lg"
            to={"/history"}
          >
            <span className="material-symbols-outlined">history</span>
            <span className="font-label-lg text-label-lg">Voting History</span>
          </Link>

          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-all flex items-center px-4 py-3 space-x-3 rounded-lg"
            to={"/calendar"}
          >
            <span className="material-symbols-outlined">calendar_today</span>
            <span className="font-label-lg text-label-lg">
              Election Calendar
            </span>
          </Link>

          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-all flex items-center px-4 py-3 space-x-3 rounded-lg"
            to={"/settings"}
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-lg text-label-lg">Settings</span>
          </Link>
        </nav>
        <div className="pt-4 border-t border-outline-variant space-y-1">
          <button className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold mb-4 hover:opacity-90 transition-opacity">
            Verify PVC Status
          </button>

          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-all flex items-center px-4 py-2 space-x-3 rounded-lg"
            to={"/help"}
          >
            <span className="material-symbols-outlined">help_outline</span>
            <span className="font-label-lg text-label-lg">Help Center</span>
          </Link>

          <Link
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-all flex items-center px-4 py-2 space-x-3 rounded-lg"
            to={"/logout"}
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-lg text-label-lg">Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default SideNav;
