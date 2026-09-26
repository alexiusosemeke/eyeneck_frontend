import Swal from "sweetalert2"
import Aside from "../layouts/Aside"
import Footer from "../layouts/Footer"
import { useQuery } from "@tanstack/react-query"
import { Link, useNavigate, useParams } from "react-router-dom"
import api from "../../api/axios"

const ElectionParties = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { data: getParty = [], error: partyError
    } = useQuery({
        queryKey: ['getParty', id],
        queryFn: async () => {
            const response = await api.get(`/admin/elections/${id}/party/`);
            return response?.data
        }
    })
    return (
        <>
            <div className="min-h-screen flex flex-col bg-background">
                <Aside />

                <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
                    <main className="grow flex flex-col min-w-0">

                        <div className="p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto w-full grow flex flex-col gap-8">

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h1 className="font-headline-xl text-headline-xl text-on-surface">Registered Political Parties</h1>
                                    <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Manage and view status of all officially recognized parties in Nigeria.</p>
                                </div>
                                <Link to={'/admin/parties/create'} className="bg-primary text-on-primary px-4 py-2 rounded-full flex items-center gap-2 hover:bg-opacity-90 transition-opacity">
                                    <span className="material-symbols-outlined" data-icon="add">add</span>
                                    <span className="font-label-lg text-label-lg">Register New Party</span>
                                </Link>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 bg-surface-container-low p-4 rounded-xl border border-outline-variant">
                                <div className="grow relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" data-icon="search">search</span>
                                    <input className="w-full pl-10 pr-4 py-3 rounded border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant" placeholder="Search by name, acronym, or chairman..." type="text" />
                                </div>
                                <div className="flex gap-4">
                                    <select className="px-4 py-3 rounded border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-md text-body-md text-on-surface">
                                        <option value="all">All Statuses</option>
                                        <option value="registered">Registered</option>
                                        <option value="suspended">Suspended</option>
                                    </select>
                                    <button className="px-4 py-3 rounded border border-outline-variant bg-surface hover:bg-surface-container-high transition-colors flex items-center gap-2 text-on-surface-variant">
                                        <span className="material-symbols-outlined" data-icon="filter_list">filter_list</span>
                                        <span className="font-label-lg text-label-lg">More Filters</span>
                                    </button>
                                </div>
                            </div>

                            <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden shadow-[0_4px_20px_rgba(0,107,63,0.05)]">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-surface-container-low border-b border-outline-variant">
                                            <tr>
                                                <th className="p-4 font-label-lg text-label-lg text-on-surface-variant font-semibold">Logo</th>
                                                <th className="p-4 font-label-lg text-label-lg text-on-surface-variant font-semibold">Party Name</th>
                                                <th className="p-4 font-label-lg text-label-lg text-on-surface-variant font-semibold">Acronym</th>
                                                <th className="p-4 font-label-lg text-label-lg text-on-surface-variant font-semibold">Status</th>
                                                <th className="p-4 font-label-lg text-label-lg text-on-surface-variant font-semibold text-right">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-outline-variant">
                                            {getParty?.data?.map((party) => (

                                                <tr key={party?.user?.id} className="hover:bg-[#f2f8f5] transition-colors group cursor-pointer">
                                                    <td className="p-4">
                                                        <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center overflow-hidden border border-outline-variant">
                                                            <img
                                                                className="w-full h-full object-cover"
                                                                data-alt={party?.party?.name}
                                                                src={party?.party?.logo} />
                                                        </div>
                                                    </td>
                                                    <td className="p-4 font-body-md text-body-md text-on-surface font-medium">{party?.party?.name}</td>
                                                    <td className="p-4 font-label-lg text-label-lg text-on-surface-variant">{party?.party?.party_initials}</td>
                                                    <td className="p-4">
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-[#e6f4ea] text-primary font-label-md text-label-md">
                                                            <span className="w-2 h-2 rounded-full bg-primary mr-1"></span>
                                                            Registered
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        {/* View Action */}
                                                        <button
                                                            disabled={party?.election?.status?.toLowerCase() === "completed"}
                                                            onClick={() => navigate(`/admin/parties/${party?.party?.id}/view`)}
                                                            className="p-2 text-primary hover:bg-primary-container/50 rounded-lg transition-colors disabled:text-outline disabled:hover:bg-transparent disabled:cursor-not-allowed cursor-pointer"
                                                            title={
                                                                party?.election?.status?.toLowerCase() === "completed"
                                                                    ? "Edit (Disabled)"
                                                                    : "Edit Election"
                                                            }
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">visibility</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </main>
                </div >
                <Footer />
            </div >
        </>
    )
}

export default ElectionParties