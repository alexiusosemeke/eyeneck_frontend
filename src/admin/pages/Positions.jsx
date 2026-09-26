import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import api from "../../api/axios";
import Aside from "../layouts/Aside";
import Footer from "../layouts/Footer";
import Swal from "sweetalert2";

const Positions = () => {
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const [currentPage, setCurrentPage] = useState(1);

    // Fetch Positions with Query Params
    const fetchPositions = async () => {
        const response = await api.get("/positions/");
        return response?.data;
    };



    const {
        data: positionsResponse = {},
        isLoading: positionsLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["positions", currentPage],
        queryFn: fetchPositions,
        keepPreviousData: true,
    });

    const positions = positionsResponse?.results || [];
    const totalEntries = positionsResponse?.count || 0;
    const totalPages = Math.ceil(totalEntries / 10) || 1;

    const deletePositionMutation = useMutation({
        mutationFn: async (positionId) => {
            const response = await api.delete(`/positions/${positionId}/`)
        },
        onSuccess: () => {
            refetch();
            queryClient.invalidateQueries({ queryKey: ["positionsResponse"] }); // this will refetch the positions list after a successful deletion
        },
    })

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
                                    positions Overview
                                </h2>
                                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                                    Manage, track, and configure positions
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => navigate("/admin/positions/create")}
                                className="bg-primary text-on-primary font-label-lg text-label-lg px-6 py-3 rounded-full flex items-center gap-2 hover:bg-primary/90 active:scale-95 transition-all shadow-sm cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[20px]">add</span>
                                Add New Position
                            </button>
                        </div>

                        {/* Main Data Table */}
                        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
                            {positionsLoading ? (
                                <div className="flex flex-col items-center justify-center py-16 space-y-3">
                                    <span className="material-symbols-outlined animate-spin text-primary text-[40px]">
                                        autorenew
                                    </span>
                                    <p className="font-body-md text-on-surface-variant">Loading positions data...</p>
                                </div>
                            ) : isError ? (
                                <div className="p-12 text-center space-y-3">
                                    <span className="material-symbols-outlined text-error text-4xl">error</span>
                                    <p className="font-semibold text-error">Failed to load positions: {error?.message}</p>
                                    <button
                                        onClick={() => refetch()}
                                        className="px-4 py-2 bg-primary text-on-primary rounded-full text-xs font-medium cursor-pointer"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            ) : positions.length === 0 ? (
                                <div className="p-12 text-center space-y-3">
                                    <span className="material-symbols-outlined text-on-surface-variant text-4xl">
                                        event_busy
                                    </span>
                                    <p className="font-headline-sm text-on-surface font-semibold">No positions found</p>
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
                                                    Name
                                                </th>
                                                <th className="py-4 px-6 font-label-lg text-label-lg text-on-surface-variant font-semibold">
                                                    Description
                                                </th>
                                                <th className="py-4 px-6 font-label-lg text-label-lg text-on-surface-variant font-semibold text-right">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-outline-variant">
                                            {positions.map((position) => (
                                                <tr
                                                    key={position.id}
                                                    className={`hover:bg-surface-container-low/60 transition-colors group`}
                                                >
                                                    <td className="py-4 px-6">
                                                        <p className="font-body-md text-body-md font-semibold text-on-background capitalize">
                                                            {position.name}
                                                        </p>
                                                    </td>
                                                    <td className="py-4 px-6 font-body-md text-body-md text-on-surface capitalize">
                                                        {position.description || "N/A"}
                                                    </td>

                                                    <td className="py-4 px-6 text-right space-x-1 whitespace-nowrap">

                                                        {/* Analytics Action */}
                                                        <button
                                                            className="p-2 text-tertiary hover:bg-on-error-container hover:text-white rounded-lg transition-colors disabled:text-outline disabled:hover:bg-transparent disabled:cursor-not-allowed cursor-pointer"
                                                            title={'Delete Position'}
                                                            onClick={() => {
                                                                Swal.fire({
                                                                    title: "Are you sure?",
                                                                    text: "This action cannot be undone.",
                                                                    icon: "warning",
                                                                    showCancelButton: true,
                                                                    confirmButtonText: "Yes, delete the position!",
                                                                    cancelButtonText: "Cancel",
                                                                }).then((result) => {
                                                                    if (result.isConfirmed) {
                                                                        deletePositionMutation.mutate(position.id);
                                                                    }
                                                                });
                                                            }}
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">delete</span>
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
                                    Showing {positions.length ? (currentPage - 1) * 10 + 1 : 0} to{" "}
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

export default Positions;