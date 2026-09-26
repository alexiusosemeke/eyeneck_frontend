import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import Aside from "../layouts/Aside";
import Footer from "../layouts/Footer";

const Election = () => {

    const { id } = useParams();

    // we'll fetch the Election

    const fetchElection = async () => {
        const response = await api.get(`/admin/elections/${id}/`);
        console.log(response?.data);
        return response?.data;
    }

    const { data: election = {}, isLoading: electionLoading, error: electionError } = useQuery({
        queryKey: ['election', id],
        queryFn: fetchElection
    });

    const fetchStats = async () => {
        const response = await api.get("/admin/users/stats/");
        return response?.data;
    };

    const {
        data: totalStats,
        isLoading: statsLoading,
        error: statsError,
    } = useQuery({
        queryKey: ["totalStats"],
        queryFn: fetchStats,
    });

    // fetch parties
    const { data: fetchParties = [], isLoading: partiesLoading, error: partiesError } = useQuery({
        queryKey: ['fetchParties', id],
        queryFn: async () => {
            const response = await api.get(`/admin/elections/${id}/party/`);
            return response?.data
        }
    });
    return (
        <>
            <div className="min-h-screen flex flex-col bg-background">
                <Aside />

                <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
                    <main className="min-h-screen bg-slate-50/50 p-4 sm:p-6 md:p-8">
                        <div className="max-w-7xl mx-auto space-y-8">


                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
                                <div className="space-y-2">

                                    <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                                        <a href="#" className="hover:text-slate-800 transition-colors">Elections</a>
                                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">{election?.election_type?.toUpperCase()}</span>
                                    </nav>


                                    <div className="flex flex-wrap items-center gap-3">
                                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                            {election?.title?.toUpperCase()}
                                        </h1>
                                        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#006847] border border-emerald-200/60 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                            <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></span>
                                            {election?.status?.toUpperCase()}
                                        </div>
                                    </div>

                                    <p className="text-sm text-slate-500 max-w-3xl">
                                        {election?.description}
                                    </p>
                                </div>


                                <div className="flex items-center gap-3 shrink-0">
                                    <button type="button" className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-sm font-bold transition-all shadow-sm">
                                        <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                        Edit Details
                                    </button>
                                    <button type="button" className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#006847] text-white hover:bg-[#005238] rounded-xl text-sm font-bold transition-all shadow-sm">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Export Data
                                    </button>
                                </div>
                            </div>


                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">

                                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-emerald-50 text-[#006847] rounded-xl">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7 7 7" />
                                            </svg>
                                            2.4% vs 2023
                                        </span>
                                    </div>
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Registered Voters</h3>
                                    <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{totalStats?.registered_voters}</p>
                                </div>


                                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                                            Finalized
                                        </span>
                                    </div>
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Polling Units</h3>
                                    <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{totalStats?.total_polling_units.toLocaleString()}</p>
                                </div>

                            </div>


                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


                                <div className="lg:col-span-2 space-y-8">


                                    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
                                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-[#006847]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <h2 className="text-base font-bold text-slate-900">Key Timelines & Governance</h2>
                                            </div>
                                            <button type="button" className="text-xs font-bold text-[#006847] hover:underline">Edit Timelines</button>
                                        </div>

                                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Election Day</span>
                                                <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-[#006847]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {election?.start_date
                                                        ? new Date(election.start_date).toLocaleString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        })
                                                        : ''}
                                                </div>
                                            </div>

                                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Election Start</span>
                                                <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {election?.start_date
                                                        ? new Date(election.start_date).toLocaleString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: 'numeric',
                                                            minute: '2-digit',
                                                            second: '2-digit'
                                                        })
                                                        : ''}
                                                </div>
                                            </div>

                                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Election Stop</span>
                                                <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-4 0h4" />
                                                    </svg>
                                                    {election?.end_date
                                                        ? new Date(election.end_date).toLocaleString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: 'numeric',
                                                            minute: '2-digit',
                                                            second: '2-digit'
                                                        })
                                                        : ''}
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>


                                <div className="space-y-8">


                                    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
                                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-[#006847]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2" />
                                                </svg>
                                                <h2 className="text-base font-bold text-slate-900">Participating Political Parties</h2>
                                            </div>
                                            <span className="px-2.5 py-0.5 text-xs font-bold bg-slate-100 text-slate-700 rounded-md">{fetchParties?.parties} Approved</span>
                                        </div>

                                        <div className="divide-y divide-slate-100">

                                            {fetchParties?.data?.map((parties) => (

                                                <div key={parties.id} className="p-5 flex items-center justify-between hover:bg-slate-50/80 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-11 h-11 rounded-xl border border-slate-200 bg-emerald-50 text-[#006847] flex items-center justify-center font-black text-sm">
                                                            {parties.party?.party_initials}
                                                        </div>
                                                        <div>
                                                            <h3 className="text-sm font-bold text-slate-900">{parties.party?.name}</h3>
                                                            <p className="text-xs text-slate-500 mt-0.5">Candidate: <span className="font-semibold text-slate-700">{parties.user?.first_name} {parties.user?.last_name}</span></p>
                                                        </div>
                                                    </div>
                                                    <button type="button" className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}

                                        </div>

                                        <div className="p-4 border-t border-slate-100 text-center bg-slate-50/50">
                                            <Link to={`/admin/elections/${id}/parties`} className="text-xs font-bold text-[#006847] hover:underline">View All {fetchParties?.candidates} Candidates & Parties</Link>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </main>
                </div>
                <Footer />
            </div >
        </>
    )
}

export default Election