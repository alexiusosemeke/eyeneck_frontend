import { Link } from "react-router-dom";

const MobileNav = () => {
  return (
    <div>
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-outline-variant flex md:hidden justify-around items-center z-50">
        <Link
          to={"/dashboard"}
          className="flex flex-col items-center text-primary font-bold"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            dashboard
          </span>
          <span className="text-[10px] mt-1">Dashboard</span>
        </Link>

        <Link
          className="flex flex-col items-center text-on-surface-variant"
          to={"/pvc"}
        >
          <span className="material-symbols-outlined">badge</span>
          <span className="text-[10px] mt-1">My PVC</span>
        </Link>

        <Link
          to={"/vote"}
          className="flex flex-col items-center text-on-surface-variant"
        >
          {" "}
          <span className="material-symbols-outlined">how_to_vote</span>
          <span className="text-[10px] mt-1">Vote</span>
        </Link>
        <Link
          to={"/settings"}
          className="flex flex-col items-center text-on-surface-variant"
        >
          {" "}
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] mt-1">Settings</span>
        </Link>
      </nav>
    </div>
  );
};

export default MobileNav;
