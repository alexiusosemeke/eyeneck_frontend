import { useQuery } from "@tanstack/react-query";
import MobileNav from "../components/layouts/MobileNav";
import SideNav from "../components/layouts/SideNav";
import TopNavBar from "../components/layouts/TopNavBar";
import { useAuth } from "../contexts/useAuth";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useState } from "react";
import ElectionCountdownCard from "../components/dashboard/ElectionCountdownCard";
import VoterStatusCard from "../components/dashboard/VoterStatusCard";

const Dashboard = () => {
  const { user } = useAuth();
  console.log(user);

  //   countdown script
  function updateCountdown() {
    const now = new Date();
  }

  const formatStatus = (status) => {
    if (!status) return "Not Applied";
    return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  setInterval(updateCountdown, 1000);

  const voterStatus = user?.voter?.voter_status;

  const statusConfig = {
    not_applied: {
      bg: "bg-gray-500/10",
      text: "text-gray-500",
      dot: "bg-gray-500",
      label: "Not Applied",
    },
    pending: {
      bg: "bg-yellow-500/10",
      text: "text-yellow-500",
      dot: "bg-yellow-500",
      label: "Pending",
    },
    approved: {
      bg: "bg-primary/10",
      text: "text-primary",
      dot: "bg-primary",
      label: "Active",
    },
    rejected: {
      bg: "bg-red-500/10",
      text: "text-red-500",
      dot: "bg-red-500",
      label: "Rejected",
    },
  };

  const currentStatus = statusConfig[voterStatus] || statusConfig.not_applied;

  const fetchElections = async () => {
    const response = await api.get(`/elections/?status=active&limit=1`);
    return response.data?.results;
  };

  const {
    data: getElections = [],
    error: getElectionError,
    isLoading: getElectionLoading,
  } = useQuery({
    queryKey: ["getElections"],
    queryFn: () => fetchElections(),
  });

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (user?.voter?.vin) {
      navigator.clipboard.writeText(user.voter.vin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <>
      <SideNav />
      <TopNavBar />
      <main className="md:ml-64 p-6 md:p-12 max-w-7xl mx-auto min-h-screen">
        <section className="mb-10">
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-2">
            Welcome back, {user?.first_name || "Voter"}!
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Your civic participation is the cornerstone of our democracy. Stay
            updated with your registration status and upcoming electoral events
            in your constituency.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Voter Status Card (Takes 4 of 12 columns on large screens) */}
          <div className="lg:col-span-4 flex">
            <VoterStatusCard user={user} voterStatus={voterStatus} />
          </div>

          {/* Right Column: Election Countdown Card (Takes 8 of 12 columns on large screens) */}
          <div className="lg:col-span-8 flex">
            <ElectionCountdownCard getElections={getElections} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-4">
          <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to={"/vote"}
              className="flex items-center justify-between p-6 bg-primary text-on-primary rounded-xl hover:opacity-95 transition-all shadow-ambient active:scale-95"
            >
              <div className="flex items-center space-x-4">
                <span className="material-symbols-outlined text-3xl">
                  how_to_vote
                </span>
                <div className="text-left">
                  <span className="block font-bold text-label-lg">
                    Cast Your Vote
                  </span>
                  <span className="text-xs opacity-80">
                    Available during election window
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link
              className="flex items-center justify-between p-6 bg-surface-container-lowest border border-primary/20 text-primary rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all shadow-ambient active:scale-95"
              to={"/pvc"}
            >
              <div className="flex items-center space-x-4">
                <span className="material-symbols-outlined text-3xl">
                  id_card
                </span>
                <div className="text-left">
                  <span className="block font-bold text-label-lg">
                    View PVC Details
                  </span>
                  <span className="text-xs text-on-surface-variant">
                    Digital PVC Identity Card
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined">open_in_new</span>
            </Link>
            <Link
              to={"/polls"}
              className="flex items-center justify-between p-6 bg-surface-container-lowest border border-primary/20 text-primary rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all shadow-ambient active:scale-95"
            >
              <div className="flex items-center space-x-4">
                <span className="material-symbols-outlined text-3xl text-primary">
                  how_to_vote
                </span>
                <div className="text-left">
                  <span className="block font-bold text-label-lg">
                    View Polls
                  </span>
                  <span className="text-xs text-on-surface-variant">
                    Check active elections & live results
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined">chevron_right</span>
            </Link>
          </div>

          <div className="md:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-ambient">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Your Polling Unit
              </h3>
              <span className="text-primary font-bold text-label-lg flex items-center cursor-pointer hover:underline">
                Get Directions{" "}
                <span className="material-symbols-outlined ml-1 text-sm">
                  near_me
                </span>
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-label-md text-on-surface-variant uppercase font-bold tracking-wider mb-1">
                    State &amp; LGA
                  </p>
                  <p className="font-body-md text-on-surface font-bold">
                    {user?.voter?.polling_unit?.ward?.lga?.state?.name}
                    {" - "}
                    {user?.voter?.polling_unit?.ward?.lga?.name}
                  </p>
                </div>
                <div>
                  <p className="text-label-md text-on-surface-variant uppercase font-bold tracking-wider mb-1">
                    Registration Area
                  </p>
                  <p className="font-body-md text-on-surface">
                    {user?.voter?.polling_unit?.ward?.name}
                  </p>
                </div>
                <div>
                  <p className="text-label-md text-on-surface-variant uppercase font-bold tracking-wider mb-1">
                    Polling Unit &amp; Code
                  </p>
                  <p className="font-body-md text-on-surface bg-primary-container/10 p-3 rounded border border-primary/20">
                    <strong>{user?.voter?.polling_unit?.name}</strong>
                    <br />
                    <span className="text-sm opacity-80">
                      PU: {user?.voter?.polling_unit?.id}
                    </span>
                  </p>
                </div>
              </div>
              <div className="h-full min-h-62.5 relative">
                <div className="absolute inset-0 bg-surface-container-highest">
                  <img
                    className="w-full h-full object-cover grayscale-[0.5] contrast-[1.1]"
                    data-alt="A clean, minimalist digital map of Ikeja, Lagos, Nigeria, styled with the eyeneck brand colors. The map features subtle green pathways, soft grey buildings, and a prominent Nigerian Green marker indicating a Polling Unit location. The aesthetic is modern and professional, using high-contrast design to ensure clarity and trustworthiness."
                    data-location={
                      user?.voter?.polling_unit?.ward?.lga?.state?.name
                    }
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJeuIiNs53dPM8Mu-RneUhkm0QTLV3BoO8o7DArymDMY2QbLxyTOzNK8I7Ng4FFxQEx0FeofMexPyhdaDwZOgNg44lAGvBYyASAVSibmKZIps9g8xLgSpl4TzmF4lsNgBsQfKIa0IrgV_RxIbzySG_J8iJseqpHY_kZLyQQL9ichZ-WI7kRzlzu5FeGcE6M7muRMN7hMqOwzd6fVAeBXhelQwQNAlLygsK7EVKxAvvfA4DfL_wF97J-tfOSz_sedvv3dFSLFZCXFk"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-ambient">
            <div className="p-6 border-b border-outline-variant bg-surface-container-low">
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Recent Activity
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary ring-4 ring-primary/10 flex-shrink-0"></div>
                <div>
                  <p className="font-label-lg text-label-lg text-on-surface font-bold">
                    Login from new device
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    Today at 10:42 AM • Ikeja, Lagos (Chrome/Windows)
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-outline flex-shrink-0"></div>
                <div>
                  <p className="font-label-lg text-label-lg text-on-surface">
                    PVC Profile Updated
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    Yesterday at 4:15 PM • Biometric verification synced
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-outline flex-shrink-0"></div>
                <div>
                  <p className="font-label-lg text-label-lg text-on-surface">
                    Polling Unit Verified
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    Oct 12, 2024 • Location confirmed via GPS
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-outline flex-shrink-0"></div>
                <div>
                  <p className="font-label-lg text-label-lg text-on-surface">
                    Account Registered
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    Sep 05, 2024 • Initial portal setup complete
                  </p>
                </div>
              </div>
              <button className="w-full py-2 text-primary font-bold text-label-md hover:bg-primary-container/5 rounded transition-colors">
                View All Activity Log
              </button>
            </div>
          </div>
        </div>

        <footer className="mt-16 pt-8 border-t border-outline-variant text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center text-on-surface-variant font-label-md">
            <p>
              © 2024 Independent National Electoral Commission (INEC) / eyeneck
              Voter Portal. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a className="hover:text-primary transition-colors" href="#">
                Privacy Policy
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                Terms of Service
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                Security Information
              </a>
            </div>
          </div>
        </footer>
      </main>
      <MobileNav />
    </>
  );
};

export default Dashboard;
