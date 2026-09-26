import Aside from "../layouts/Aside";
import Footer from "../layouts/Footer";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { SelectField } from "../../components/FormField";
import Swal from "sweetalert2";
import {useState} from "react";



const Polls = () => {

    const electionSchema = yup.object().shape({
        election: yup.string().required(),
    });

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm({
        resolver: yupResolver(electionSchema),
    })

    const onSubmit = async (data) => {
        setSelectedElection(data.election);
    }

    const fetchElections = async () => {
        const res = await api.get('/elections/');
        return res?.data?.results
    }

    const {data:electionsData=[], isLoading:electionsLoading} = useQuery({
        queryKey: ['elections'],
        queryFn: fetchElections,
        staleTime: 5000,
    });

    const electionsOptions = electionsData.map((elections) => ({
        value: elections?.id,
        label:`${elections?.title} (${elections?.election_type})`,
        
    }));

    const [selectedElection, setSelectedElection] = useState(null);

    const {data: getResults = [], isLoading: resultsLoading, error: resultsError} = useQuery({
        queryKey: ['election_results', selectedElection],
        queryFn: () => 
            api.get('/vote/results/', {
                params: {
                    election: selectedElection,
                },
            }).then((res) => res.data),

        enabled: !!selectedElection,
    });


    return (
        <div className="min-h-screen flex flex-col bg-background text-on-surface">
            <Aside />

            <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="max-w-container-max mx-auto space-y-8">
                        
                        {/* Page Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h2 className="font-headline-lg text-headline-lg font-bold text-on-background">
                                    Poll Results & Analytics
                                </h2>
                                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                                    Real-time vote distribution and tally analytics across all contested positions.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => window.print()}
                                className="border border-outline-variant bg-surface text-on-surface font-label-lg text-label-lg px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-surface-container-high transition-colors cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[20px]">print</span>
                                Export Report
                            </button>
                        </div>

                        {/* Election Filter Form */}
                        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row items-end gap-4">
                                <div className="flex-1 w-full">
                                    <label 
                                        htmlFor="electionSelect" 
                                        className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2"
                                    >
                                        Select Election Event
                                    </label>
                                    <div className="relative">
                                        <SelectField
                                            id="electionSelect"
                                            disabled={electionsLoading}
                                            options={electionsOptions}
                                            {...register('election')}
                                            error={errors.election?.message}
                                            name="election"
                                            placeholder="Select election event"
                                            className={`w-full px-4 py-3 rounded-xl border border-outline-variant focus:ring-primary/40 bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 appearance-none pr-10 cursor-pointer font-medium capitalize`}
                                        />
                                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                                            expand_more
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full md:w-auto px-6 py-3 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-[20px]">filter_list</span>
                                    {isSubmitting ? 'Processing...' : 'Fetch Results'}
                                </button>
                            </form>
                        </div>

                        {resultsLoading && (
                            <div className="flex justify-center items-center mt-6">
                                <span className="material-symbols-outlined animate-spin text-on-surface-variant text-[32px]">autorenew</span>
                            </div>
                        )}

                        {resultsError && (
                            // <div className="mt-6 text-center text-error font-medium">
                            //     Failed to load results. Please try again.
                            // </div>
                            <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-12 text-center space-y-3">
                                <span className="material-symbols-outlined text-on-surface-variant text-4xl">
                                    poll
                                </span>
                                <p className="font-headline-sm text-on-surface font-semibold">No Data Available</p>
                                <p className="font-body-md text-on-surface-variant">
                                    Select an active or past election to view its polling metrics.
                                </p>
                            </div>
                            
                        )}

                        {!resultsLoading && !resultsError && getResults && (
                            <div className="space-y-8">
                                
                                {/* Metrics Summary Overview */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-2xl shadow-sm flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-2xl">how_to_vote</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Total Ballots</p>
                                            <h3 className="text-2xl font-bold text-on-surface mt-0.5">
                                                {getResults.total_votes?.toLocaleString()}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-2xl shadow-sm flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-2xl">pie_chart</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Voter Turnout</p>
                                            <h3 className="text-2xl font-bold text-on-surface mt-0.5">
                                                {getResults.total_votes}%
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-2xl shadow-sm flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-2xl">groups</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Candidates</p>
                                            <h3 className="text-2xl font-bold text-on-surface mt-0.5">
                                                {getResults.total_candidates?.toLocaleString()}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-2xl shadow-sm flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-2xl">pulse</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Poll Status</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                                <span className="font-bold text-on-surface">Active</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Loop through position keys (e.g., "president") */}
                                {Object.entries(getResults.results || {}).map(([positionName, candidates]) => {
                                    // Calculate total votes for this specific position
                                    const positionTotalVotes = candidates.reduce((sum, item) => sum + item.vote_count, 0);

                                    // Find highest vote count to highlight the leader
                                    const maxVotes = Math.max(...candidates.map((c) => c.vote_count), 0);

                                    return (
                                        <div
                                            key={positionName}
                                            className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden shadow-sm"
                                        >
                                            {/* Position Header */}
                                            <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant flex items-center justify-between">
                                                <h3 className="text-lg font-bold text-on-surface capitalize">
                                                    {positionName.replace("_", " ")}
                                                </h3>
                                                <span className="px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant text-xs font-semibold text-on-surface-variant">
                                                    {candidates.length} Candidate{candidates.length !== 1 ? "s" : ""}
                                                </span>
                                            </div>

                                            {/* Candidates Tally List */}
                                            <div className="p-6 space-y-6">
                                                {candidates.map((candidate) => {
                                                    // Calculate percentage (handle division by zero)
                                                    const votePercent = positionTotalVotes > 0
                                                        ? ((candidate.vote_count / positionTotalVotes) * 100).toFixed(1)
                                                        : "0.0";

                                                    const isLeading = candidate.vote_count > 0 && candidate.vote_count === maxVotes;

                                                    return (
                                                        <div key={candidate.candidate_id} className="space-y-2">
                                                            <div className="flex items-center justify-between gap-3">
                                                                {/* Candidate Info */}
                                                                <div className="flex items-center gap-2">
                                                                    <h4 className="font-bold text-on-surface text-base capitalize">
                                                                        {candidate.candidate_name}
                                                                    </h4>
                                                                    {isLeading && (
                                                                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                                                                            Leading
                                                                        </span>
                                                                    )}
                                                                </div>

                                                                {/* Tally Numbers */}
                                                                <div className="text-right">
                                                                    <span className="text-lg font-extrabold text-on-surface">
                                                                        {candidate.vote_count.toLocaleString()}{" "}
                                                                        <span className="text-xs font-normal text-on-surface-variant">votes</span>
                                                                    </span>
                                                                    <p className="text-xs font-bold text-primary">
                                                                        {votePercent}%
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            {/* Progress Bar */}
                                                            <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden flex">
                                                                <div
                                                                    className={`h-full transition-all duration-500 rounded-full ${
                                                                        isLeading ? "bg-primary" : "bg-outline"
                                                                    }`}
                                                                    style={{ width: `${votePercent}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        )}

                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Polls;