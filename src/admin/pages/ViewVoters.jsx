import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";
import Aside from "../layouts/Aside";
import api from "../../api/axios";
import Swal from "sweetalert2";
import Footer from "../layouts/Footer";


const ViewVoters = () => {
  const fetchVoters = async () => {
    const response = await api.get("/admin/users/voters/");
    return response?.data;
  };

  const {
    data: votersList = [],
    isLoading: votersLoading,
    isFetching: votersFetching,
    error: votersError,
    refetch,
  } = useQuery({
    queryKey: ["votersList"],
    queryFn: fetchVoters,
  });

  const declineVoterMutation = useMutation({
    mutationFn: async (voterId) => {
      const response = await api.patch(`/admin/voters/${voterId}/decline_voter/`);
      return response?.data;
    },

    onSuccess: () => {
      refetch();
      Swal.fire({
        icon: "success",
        title: "Voter Registration Declined",
        text: "The voter registration has been successfully declined.",
        confirmButtonText: "OK",
        timer: 3000,
      })
    }, onError: (e) => {
      const message = e.response?.data?.message || "An error occurred while declining the voter.";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
        confirmButtonText: "OK",
      });
    }
  });

  const approveVoterMutation = useMutation({
    mutationFn: async (voterId) => {
      const response = await api.patch(`/admin/voters/${voterId}/approve_voter/`);
      return response?.data;
    },

    onSuccess: () => {
      refetch();
      Swal.fire({
        icon: "success",
        title: "Voter Approved",
        text: "The voter has been successfully approved.",
        confirmButtonText: "OK",
        timer: 3000,
      })
    },

    onError: (e) => {
      const message = e.response?.data?.message || "An error occurred while approving the voter.";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
        confirmButtonText: "OK",
      });
    }
  });

  return (
    <>
      <Aside />
      <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
        <main className="flex-1 p-6 md:p-margin-desktop space-y-8 bg-surface-container-lowest">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                All Voters
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                List of all registered voters on the platform
              </p>
            </div>

            {/* Refresh Button - Wired to refetch */}
            <button
              onClick={() => refetch()}
              disabled={votersFetching}
              className="px-6 py-2.5 bg-primary text-on-primary rounded-full font-label-lg text-label-lg flex items-center gap-2 hover:bg-primary/90 active:scale-95 transition-all shadow-sm disabled:opacity-50 cursor-pointer"
            >
              <span
                className={`material-symbols-outlined text-[18px] ${votersFetching ? "animate-spin" : ""
                  }`}
              >
                refresh
              </span>
              {votersFetching ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {/* Table Container with Responsive Horizontal Scroll */}
          <div className="bg-surface dark:bg-surface-dim border border-outline-variant rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-160">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant text-on-surface-variant text-xs uppercase tracking-wider font-semibold">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">VIN</th>
                    <th className="px-6 py-4">POLLING UNIT</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-outline-variant/60 text-sm">
                  {/* Loading State */}
                  {votersLoading ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center">
                        <div className="flex justify-center items-center">
                          <Oval
                            height={36}
                            width={36}
                            color="#00639b"
                            secondaryColor="#c2e7ff"
                            strokeWidth={3}
                            strokeWidthSecondary={3}
                          />
                        </div>
                      </td>
                    </tr>
                  ) : votersError ? (
                    /* Error State */
                    <tr>
                      <td
                        colSpan={5}
                        className="py-8 text-center text-error font-medium"
                      >
                        Error loading voter: {votersError.message}
                      </td>
                    </tr>
                  ) : votersList.length === 0 ? (
                    /* Empty State */
                    <tr>
                      <td
                        colSpan={5}
                        className="py-12 text-center text-on-surface-variant"
                      >
                        No registered users found.
                      </td>
                    </tr>
                  ) : (
                    /* Data Rows */
                    votersList.map((voter) => (
                      <tr
                        key={voter.id}
                        className="hover:bg-surface-container-low/50 transition-colors group"
                      >
                        {/* ID Column */}
                        <td className="px-6 py-4 font-mono text-xs text-on-surface-variant">
                          #{voter.id}
                        </td>

                        {/* User Avatar + Name */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <Link to={`/admin/users/${voter.user.id}`} className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container font-bold flex items-center justify-center text-sm uppercase">
                                {voter?.user?.first_name?.charAt(0) || "U"}
                                {voter?.user?.last_name?.charAt(0) || "U"}
                              </div>
                              <div>
                                <p className="font-semibold text-on-surface">
                                  {voter?.user?.first_name} {voter?.user?.last_name}
                                </p>
                                <p className="text-on-surface-variant text-xs">
                                  {voter?.user?.username}
                                </p>
                              </div>
                            </Link>

                          </div>
                        </td>

                        {/* Email Column */}
                        <td className="px-6 py-4 text-on-surface-variant whitespace-nowrap">
                          {voter.vin || "N/A"}
                        </td>

                        {/* Gender Column */}
                        <td className="px-6 py-4 text-on-surface-variant whitespace-nowrap capitalize">
                          {voter?.polling_unit?.name || "N/A"}
                        </td>

                        {/* Role Badge */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${voter.voter_status === "approved"
                              ? "bg-primary-container text-on-secondary "
                              : "bg-tertiary-container text-on-tertiary-container"
                              }`}
                          >
                            {voter.voter_status === 'approved' ? "Approved" : "Pending"}
                          </span>
                        </td>

                        {/* Actions Column */}
                        <td className="px-6 py-4 text-right whitespace-nowrap space-x-1">
                          <button
                            type="button"
                            className="px-1.5 py-1 border bg-surface border-on-primary-fixed-variant text-on-primary-fixed-variant hover:text-inverse-on-surface hover:bg-primary rounded-md transition-colors focus:outline-none uppercase font-bold"
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You are about to approve this voter.",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, approve it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  approveVoterMutation.mutate(voter.id);
                                }
                              }
                              )
                            }}
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            className="px-1.5 py-1 border bg-surface border-on-tertiary-fixed-variant text-on-tertiary-fixed-variant hover:text-inverse-on-surface hover:bg-tertiary rounded-md transition-colors focus:outline-none uppercase font-bold"
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You are about to approve this voter.",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, approve it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  declineVoterMutation.mutate(voter.id);
                                }
                              }
                              )
                            }}
                          >
                            Decline
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>


        </main>
      </div>
      <Footer />
    </>
  );
};

export default ViewVoters;
