import { useState } from "react";
import Footer from "../layouts/Footer.jsx";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios.js";
import { useAuth } from "../../contexts/useAuth.js";
import Aside from "../layouts/Aside.jsx";
import { Oval } from "react-loader-spinner";
import { ShieldCheck, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const fetchStats = async () => {
    const response = await api.get("/admin/users/stats/");
    return response?.data;
  };

  const {
    data: dashboardStats,
    isLoading: statsLoading,
    error: statsError,
  } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: fetchStats,
  });

  const fetchActivity = async () => {
    const response = await api.get("/admin/users/recent_activity/");
    return response?.data?.recent_activities;
  };

  const {
    data: recentActivity = [],
    isLoading: recentActivityLoading,
    error: recentActivityError,
  } = useQuery({
    queryKey: ["recentActivity"],
    queryFn: fetchActivity,
  });

  return (
    <>
      <Aside />

      <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
        <main className="flex-1 p-gutter md:p-margin-desktop space-y-8 bg-surface-container-lowest">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                System Overview
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Real-time administrative metrics and monitoring.
              </p>
            </div>
            <button className="px-6 py-2 bg-primary text-on-primary rounded-full font-label-lg text-label-lg flex items-center gap-2 hover:bg-on-primary-fixed-variant transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[18px]">
                download
              </span>
              Export Report
            </button>
          </div>

          {/* Top Banner / Hero Metric */}
          <div className="bg-linear-to-r from-[#004d34] to-[#006847] text-white rounded-2xl p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5" /> INEC Command & Collation Center
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Electoral Operations & BVAS Network
              </h2>
              <p className="text-emerald-100/90 text-sm mt-1 max-w-2xl">
                Real-time biometric voter accreditation system (BVAS) monitoring, election scheduling,
                and tamper-evident result collation across all 36 States and the Federal Capital Territory.
              </p>
            </div>

            <Link
              to={"/admin/create-election"}
              className="bg-white text-[#006847] hover:bg-emerald-50 px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-md transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Election</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-surface border border-outline-variant rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-surface-container-high rounded-lg text-primary">
                  <span className="material-symbols-outlined">groups</span>
                </div>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">
                  Total Platform Users
                </p>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  {dashboardStats?.total_users ?? "N/A"}
                </h3>
              </div>
            </div>

            <div className="bg-surface border border-outline-variant rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-surface-container-high rounded-lg text-primary">
                  <span className="material-symbols-outlined">groups</span>
                </div>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">
                  Active Users
                </p>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  {dashboardStats?.active_users ?? "N/A"}
                </h3>
              </div>
            </div>

            <div className="bg-surface border border-outline-variant rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-surface-container-high rounded-lg text-tertiary">
                  <span className="material-symbols-outlined">how_to_reg</span>
                </div>
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Finalized
                </span>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">
                  Registered Voters
                </p>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  {dashboardStats?.registered_voters ?? "N/A"}
                </h3>
              </div>
            </div>

            <div className="bg-surface border border-outline-variant rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-surface-container-high rounded-lg text-primary">
                  <span className="material-symbols-outlined">how_to_reg</span>
                </div>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">
                  Eligible Voters
                </p>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  {dashboardStats?.eligible ?? "N/A"}
                </h3>
              </div>
            </div>

            <div className="bg-surface border border-outline-variant rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-surface-container-high rounded-lg text-primary">
                  <span className="material-symbols-outlined">how_to_vote</span>
                </div>
                <span className="font-label-md text-label-md text-surface bg-primary-container px-2 py-1 rounded-full flex items-center gap-1">
                  <div className="w-2 h-2 bg-surface rounded-full animate-pulse"></div>{" "}
                  Stable
                </span>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">
                  Live Elections
                </p>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  {dashboardStats?.live_elections ?? "N/A"}
                </h3>
              </div>
            </div>

            <div className="bg-surface border border-outline-variant rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-surface-container-high rounded-lg text-primary">
                  <span className="material-symbols-outlined">security</span>
                </div>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">
                  Total Elections
                </p>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  {dashboardStats?.total_elections ?? "N/A"}
                </h3>
              </div>
            </div>

            <div className="bg-surface border border-outline-variant rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-surface-container-high rounded-lg text-primary">
                  <span className="material-symbols-outlined">groups</span>
                </div>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">
                  Total Candidates
                </p>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  {dashboardStats?.total_elections ?? "N/A"}
                </h3>
              </div>
            </div>

            <div className="bg-surface border border-outline-variant rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-surface-container-high rounded-lg text-primary">
                  <span className="material-symbols-outlined">ballot</span>
                </div>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">
                  Total Positions
                </p>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  {dashboardStats?.total_elections ?? "N/A"}
                </h3>
              </div>
            </div>

            <div className="bg-surface border border-outline-variant rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-surface-container-high rounded-lg text-primary">
                  <span className="material-symbols-outlined">ballot</span>
                </div>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">
                  Total States
                </p>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  {dashboardStats?.total_states.toLocaleString() ?? "N/A"}
                </h3>
              </div>
            </div>

            <div className="bg-surface border border-outline-variant rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-surface-container-high rounded-lg text-primary">
                  <span className="material-symbols-outlined">ballot</span>
                </div>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">
                  Total LGA(s)
                </p>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  {dashboardStats?.total_lgas.toLocaleString() ?? "N/A"}
                </h3>
              </div>
            </div>

            <div className="bg-surface border border-outline-variant rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-surface-container-high rounded-lg text-primary">
                  <span className="material-symbols-outlined">ballot</span>
                </div>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">
                  Total Ward(s)
                </p>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  {dashboardStats?.total_wards.toLocaleString() ?? "N/A"}
                </h3>
              </div>
            </div>

            <div className="bg-surface border border-outline-variant rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-surface-container-high rounded-lg text-primary">
                  <span className="material-symbols-outlined">ballot</span>
                </div>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">
                  Total Polling Units
                </p>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  {dashboardStats?.total_polling_units.toLocaleString() ??
                    "N/A"}
                </h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-surface border border-outline-variant rounded-xl overflow-hidden flex flex-col">
              <div className="p-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Nationwide Activity
                </h3>
                <div className="flex gap-2">
                  <button className="p-1 border border-outline-variant rounded hover:bg-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">
                      zoom_in
                    </span>
                  </button>
                  <button className="p-1 border border-outline-variant rounded hover:bg-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">
                      zoom_out
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-surface-container relative min-h-[400px]">
                <img
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                  data-alt="A stylized, modern topographic map of Nigeria, using minimalist lines and low-contrast green hues against a light background, dotted with subtle glowing points indicating active polling centers."
                  data-location="Nigeria"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-32vIPQalDb1Pw4ZATdVmjKaSYuj_sMhpOKT4O6kW1yvpHnVoPhPnMfi0XlznRPYbDm_ZL8L6gZpLDV93uTOvLkKvW1M8cpwXQTRiwFE-hr_TrHiiFtr1wrDTccx_Vj0VEey6qw5v2oG6dksrEEpu0wcdmNg83pNP3Nu9FpqvsUezE2FHdBzEJa7yuTKtEWinWIMSEedS7dU6DGCHOZG4-K1TQ9xAmGjfiafLNC8tVUu5cHf-mly8"
                />
              </div>
            </div>

            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden flex flex-col">
              <div className="p-4 border-b border-outline-variant bg-surface-container-low">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Recent Actions
                </h3>
              </div>
              <div className="flex-1 p-0 overflow-y-auto max-h-[400px]">
                {recentActivityLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <Oval
                      visible={true}
                      height="80"
                      width="80"
                      color="#4fa94d"
                      secondaryColor="#4fa94d"
                      strokeWidth={3}
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                ) : recentActivityError ? (
                  <div className="flex justify-center items-center h-full">
                    <p className="font-headline-md text-headline-md text-on-surface-variant">
                      Error loading recent activity.
                    </p>
                  </div>
                ) : recentActivity?.length === 0 ? (
                  <div className="flex justify-center items-center h-full">
                    <p className="font-label-md text-label-md text-on-surface-variant">
                      No recent activity found.
                    </p>
                  </div>
                ) : (
                  <ul className="divide-y divide-outline-variant">
                    {recentActivity.map((activity) => {
                      return (
                        <li
                          key={activity.id}
                          className="p-4 hover:bg-surface-variant transition-colors flex gap-3 items-start"
                        >
                          <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 mt-1">
                            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                              gavel
                            </span>
                          </div>
                          <div>
                            <p className="font-label-lg text-label-lg text-on-surface">
                              {activity.action.toUpperCase()}
                            </p>
                            <p className="font-label-md text-label-md text-on-surface-variant mt-1">
                              {activity.description}
                            </p>
                            <p className="font-label-md text-label-md text-outline mt-2">
                              {activity.created_at}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
