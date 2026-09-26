import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import Aside from "../layouts/Aside";
import Footer from "../layouts/Footer";

const ElectionsOverview = () => {
    const navigate = useNavigate();

    // Filter, Search & Pagination State
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("All Types");
    const [statusFilter, setStatusFilter] = useState("All Statuses");
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch Elections with Query Params
    const fetchElections = async () => {
        const params = {
            page: currentPage,
            ...(searchTerm && { search: searchTerm }),
            ...(typeFilter !== "All Types" && { election_type: typeFilter.toLowerCase() }),
            ...(statusFilter !== "All Statuses" && { status: statusFilter.toLowerCase() }),
        };
        const response = await api.get("/admin/elections/", { params });
        return response?.data;
    };

    const {
        data: electionsResponse,
        isLoading: electionsLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["elections", searchTerm, typeFilter, statusFilter, currentPage],
        queryFn: fetchElections,
        keepPreviousData: true,
    });

    const elections = electionsResponse?.results || [];
    const totalEntries = electionsResponse?.count || 0;
    const totalPages = Math.ceil(totalEntries / 10) || 1;

    // Derived quick stats (or consume from API summary metadata if available)
    const stats = electionsResponse?.stats || {
        total: totalEntries,
        active: elections.filter((e) => e.status?.toLowerCase() === "active").length,
        upcoming: elections.filter((e) => e.status?.toLowerCase() === "upcoming").length,
        completed: elections.filter((e) => e.status?.toLowerCase() === "completed").length,
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Aside />

            <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="max-w-container-max mx-auto space-y-8">

                        {/* Page Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h2 className="font-headline-lg text-headline-lg font-bold text-on-background">
                                    Elections Overview
                                </h2>
                                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                                    Manage, track, and configure national and regional electoral events.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => navigate("/admin/elections/create")}
                                className="bg-primary text-on-primary font-label-lg text-label-lg px-6 py-3 rounded-full flex items-center gap-2 hover:bg-primary/90 active:scale-95 transition-all shadow-sm cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[20px]">add</span>
                                Add New Election
                            </button>
                        </div>

                        {/* Metrics KPI Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard
                                title="Total Elections"
                                value={stats.total}
                                icon="how_to_vote"
                                color="text-primary bg-primary-container/40"
                            />
                            <StatCard
                                title="Active Events"
                                value={stats.active}
                                icon="pending_actions"
                                color="text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40"
                            />
                            <StatCard
                                title="Upcoming Events"
                                value={stats.upcoming}
                                icon="event"
                                color="text-tertiary bg-tertiary-container/40"
                            />
                            <StatCard
                                title="Completed"
                                value={stats.completed}
                                icon="verified"
                                color="text-on-surface-variant bg-surface-container-high"
                            />
                        </div>

                        {/* Search & Filter Toolbar */}
                        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 shadow-sm">

                            {/* Search Bar */}
                            <div className="relative flex-1">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                                    search
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search elections by title or region..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full pl-10 pr-4 py-2 bg-surface border border-outline-variant rounded-xl focus:outline-none focus:border-primary font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/70"
                                />
                            </div>

                            {/* Dropdown Filters */}
                            <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center">
                                <select
                                    value={typeFilter}
                                    onChange={(e) => {
                                        setTypeFilter(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="border border-outline-variant rounded-xl px-4 py-2 bg-surface focus:outline-none focus:border-primary font-body-md text-body-md text-on-surface cursor-pointer"
                                >
                                    <option>All Types</option>
                                    <option>Presidential</option>
                                    <option>Gubernatorial</option>
                                    <option>Senatorial</option>
                                </select>

                                <select
                                    value={statusFilter}
                                    onChange={(e) => {
                                        setStatusFilter(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="border border-outline-variant rounded-xl px-4 py-2 bg-surface focus:outline-none focus:border-primary font-body-md text-body-md text-on-surface cursor-pointer"
                                >
                                    <option>All Statuses</option>
                                    <option>Active</option>
                                    <option>Upcoming</option>
                                    <option>Completed</option>
                                </select>

                                <button
                                    onClick={() => refetch()}
                                    className="p-2.5 border border-outline-variant rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
                                    title="Refresh Data"
                                >
                                    <span className="material-symbols-outlined text-[20px]">refresh</span>
                                </button>
                            </div>
                        </div>

                        {/* Main Data Table */}
                        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
                            {electionsLoading ? (
                                <div className="flex flex-col items-center justify-center py-16 space-y-3">
                                    <span className="material-symbols-outlined animate-spin text-primary text-[40px]">
                                        autorenew
                                    </span>
                                    <p className="font-body-md text-on-surface-variant">Loading elections data...</p>
                                </div>
                            ) : isError ? (
                                <div className="p-12 text-center space-y-3">
                                    <span className="material-symbols-outlined text-error text-4xl">error</span>
                                    <p className="font-semibold text-error">Failed to load elections: {error?.message}</p>
                                    <button
                                        onClick={() => refetch()}
                                        className="px-4 py-2 bg-primary text-on-primary rounded-full text-xs font-medium cursor-pointer"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            ) : elections.length === 0 ? (
                                <div className="p-12 text-center space-y-3">
                                    <span className="material-symbols-outlined text-on-surface-variant text-4xl">
                                        event_busy
                                    </span>
                                    <p className="font-headline-sm text-on-surface font-semibold">No elections found</p>
                                    <p className="font-body-md text-on-surface-variant">
                                        Try adjusting your search query or filter settings.
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-surface-container-low border-b border-outline-variant">
                                                <th className="py-4 px-6 font-label-lg text-label-lg text-on-surface-variant font-semibold">
                                                    Election Name
                                                </th>
                                                <th className="py-4 px-6 font-label-lg text-label-lg text-on-surface-variant font-semibold">
                                                    Type
                                                </th>
                                                <th className="py-4 px-6 font-label-lg text-label-lg text-on-surface-variant font-semibold">
                                                    Start Date
                                                </th>
                                                <th className="py-4 px-6 font-label-lg text-label-lg text-on-surface-variant font-semibold text-right">
                                                    End Date
                                                </th>
                                                <th className="py-4 px-6 font-label-lg text-label-lg text-on-surface-variant font-semibold text-center">
                                                    Status
                                                </th>
                                                <th className="py-4 px-6 font-label-lg text-label-lg text-on-surface-variant font-semibold text-right">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-outline-variant">
                                            {elections.map((election) => (
                                                <tr
                                                    key={election.id}
                                                    className={`hover:bg-surface-container-low/60 transition-colors group ${election.status?.toLowerCase() === "completed" ? "opacity-75" : ""
                                                        }`}
                                                >
                                                    <td className="py-4 px-6">
                                                        <p className="font-body-md text-body-md font-semibold text-on-background">
                                                            {election.title}
                                                        </p>
                                                        <p className="font-label-md text-label-md text-on-surface-variant mt-0.5">
                                                            {election.election_type || "National"}
                                                        </p>
                                                    </td>
                                                    <td className="py-4 px-6 font-body-md text-body-md text-on-surface capitalize">
                                                        {election.description || "N/A"}
                                                    </td>
                                                    <td className="py-4 px-6 font-body-md text-body-md text-on-surface whitespace-nowrap">
                                                        {new Date(election.start_date).toLocaleDateString("en-US", {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        })}
                                                    </td>
                                                    <td className="py-4 px-6 font-body-md text-body-md text-on-surface whitespace-nowrap">
                                                        {new Date(election.end_date).toLocaleDateString("en-US", {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        })}
                                                    </td>

                                                    <td className="py-4 px-6 text-center">
                                                        <ElectionStatusBadge status={election.status} />
                                                    </td>
                                                    <td className="py-4 px-6 text-right space-x-1 whitespace-nowrap">
                                                        {/* View Action */}
                                                        <button
                                                            disabled={election.status?.toLowerCase() === "completed"}
                                                            onClick={() => navigate(`/admin/elections/${election.id}/`)}
                                                            className="p-2 text-primary hover:bg-primary-container/50 rounded-lg transition-colors disabled:text-outline disabled:hover:bg-transparent disabled:cursor-not-allowed cursor-pointer"
                                                            title={
                                                                election.status?.toLowerCase() === "completed"
                                                                    ? "Edit (Disabled)"
                                                                    : "Edit Election"
                                                            }
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">visibility</span>
                                                        </button>

                                                        {/* Edit Action */}
                                                        <button
                                                            disabled={election.status?.toLowerCase() === "completed"}
                                                            onClick={() => navigate(`/admin/elections/${election.id}/edit`)}
                                                            className="p-2 text-primary hover:bg-primary-container/50 rounded-lg transition-colors disabled:text-outline disabled:hover:bg-transparent disabled:cursor-not-allowed cursor-pointer"
                                                            title={
                                                                election.status?.toLowerCase() === "completed"
                                                                    ? "Edit (Disabled)"
                                                                    : "Edit Election"
                                                            }
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                                        </button>

                                                        {/* Candidates Action */}
                                                        <button
                                                            onClick={() => navigate(`/admin/elections/${election.id}/candidates`)}
                                                            className="p-2 text-secondary hover:bg-surface-container-high rounded-lg transition-colors cursor-pointer"
                                                            title="Manage Candidates"
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">groups</span>
                                                        </button>

                                                        {/* Analytics Action */}
                                                        <button
                                                            disabled={election.status?.toLowerCase() === "upcoming"}
                                                            onClick={() => navigate(`/admin/elections/${election.id}/analytics`)}
                                                            className="p-2 text-tertiary hover:bg-surface-container-high rounded-lg transition-colors disabled:text-outline disabled:hover:bg-transparent disabled:cursor-not-allowed cursor-pointer"
                                                            title={
                                                                election.status?.toLowerCase() === "upcoming"
                                                                    ? "View Analytics (Disabled)"
                                                                    : "View Analytics"
                                                            }
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">bar_chart</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Pagination Controls */}
                            <div className="bg-surface-container-lowest border-t border-outline-variant px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <span className="font-label-md text-label-md text-on-surface-variant">
                                    Showing {elections.length ? (currentPage - 1) * 10 + 1 : 0} to{" "}
                                    {Math.min(currentPage * 10, totalEntries)} of {totalEntries} entries
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage((prev) => prev - 1)}
                                        className="px-3 py-1.5 border border-outline-variant rounded-lg bg-surface text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-colors"
                                    >
                                        Previous
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                                        .slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 1))
                                        .map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`px-3 py-1.5 border rounded-lg font-label-md text-label-md transition-colors cursor-pointer ${currentPage === page
                                                    ? "border-primary bg-primary text-on-primary font-bold shadow-xs"
                                                    : "border-outline-variant bg-surface text-on-surface-variant hover:bg-surface-container-high"
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}

                                    <button
                                        disabled={currentPage >= totalPages}
                                        onClick={() => setCurrentPage((prev) => prev + 1)}
                                        className="px-3 py-1.5 border border-outline-variant rounded-lg bg-surface text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-colors"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 shadow-sm flex items-center justify-between">
        <div className="space-y-1">
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-medium">
                {title}
            </p>
            <h4 className="font-headline-md text-headline-md font-bold text-on-surface">
                {typeof value === "number" ? value.toLocaleString() : value}
            </h4>
        </div>
        <div className={`p-3 rounded-xl ${color} flex items-center justify-center`}>
            <span className="material-symbols-outlined text-[24px]">{icon}</span>
        </div>
    </div>
);

// Status Badge Component
const ElectionStatusBadge = ({ status }) => {
    const normalizedStatus = status?.toLowerCase();

    switch (normalizedStatus) {
        case "active":
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-label-md text-label-md font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                    Active
                </span>
            );
        case "upcoming":
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container font-label-md text-label-md font-bold">
                    <span className="w-2 h-2 rounded-full bg-tertiary mr-2" />
                    Upcoming
                </span>
            );
        case "completed":
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md font-bold border border-outline-variant">
                    <span className="material-symbols-outlined text-[14px] mr-1">check_circle</span>
                    Completed
                </span>
            );
        default:
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md">
                    {status}
                </span>
            );
    }
};

export default ElectionsOverview;