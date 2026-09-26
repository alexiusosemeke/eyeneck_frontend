import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";
import Aside from "../layouts/Aside";
import api from "../../api/axios";
import Swal from "sweetalert2";

const ViewUsers = () => {
  const navigate = useNavigate();
  const fetchUsers = async () => {
    const response = await api.get("/admin/users/get_users/");
    return response?.data;
  };

  const {
    data: usersList = [],
    isLoading: usersLoading,
    isFetching: usersFetching,
    error: usersError,
    refetch,
  } = useQuery({
    queryKey: ["usersList"],
    queryFn: fetchUsers,
  });

  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: async (userId) => {
      await api.delete(`/admin/users/${userId}/deactivate/`);
    },
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ["usersList"] }); // this will refetch the users list after a successful deletion
    },
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
                All Users
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                List of all registered users on the platform
              </p>
            </div>

            {/* Refresh Button - Wired to refetch */}
            <button
              onClick={() => refetch()}
              disabled={usersFetching}
              className="px-6 py-2.5 bg-primary text-on-primary rounded-full font-label-lg text-label-lg flex items-center gap-2 hover:bg-primary/90 active:scale-95 transition-all shadow-sm disabled:opacity-50 cursor-pointer"
            >
              <span
                className={`material-symbols-outlined text-[18px] ${usersFetching ? "animate-spin" : ""
                  }`}
              >
                refresh
              </span>
              {usersFetching ? "Refreshing..." : "Refresh"}
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
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Gender</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-outline-variant/60 text-sm">
                  {/* Loading State */}
                  {usersLoading ? (
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
                  ) : usersError ? (
                    /* Error State */
                    <tr>
                      <td
                        colSpan={5}
                        className="py-8 text-center text-error font-medium"
                      >
                        Error loading users: {usersError.message}
                      </td>
                    </tr>
                  ) : usersList.length === 0 ? (
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
                    usersList.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-surface-container-low/50 transition-colors group"
                      >
                        {/* ID Column */}
                        <td className="px-6 py-4 font-mono text-xs text-on-surface-variant">
                          #{user.id}
                        </td>

                        {/* User Avatar + Name */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container font-bold flex items-center justify-center text-sm uppercase">
                              {user.first_name?.charAt(0) || "U"}
                              {user.last_name?.charAt(0) || "U"}
                            </div>
                            <div>
                              <p className="font-semibold text-on-surface">
                                {user.first_name} {user.last_name}
                              </p>
                              <p className="text-on-surface-variant text-xs">
                                {user.username}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Email Column */}
                        <td className="px-6 py-4 text-on-surface-variant whitespace-nowrap">
                          {user.email || "N/A"}
                        </td>

                        {/* Gender Column */}
                        <td className="px-6 py-4 text-on-surface-variant whitespace-nowrap capitalize">
                          {user?.profile?.gender || "N/A"}
                        </td>

                        {/* Role Badge */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${user.is_active
                              ? "bg-primary-container text-on-secondary "
                              : "bg-tertiary-container text-on-tertiary-container"
                              }`}
                          >
                            {user.is_active ? "Inactive" : "Active"}
                          </span>
                        </td>

                        {/* Actions Column */}
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <input
                            type="hidden"
                            readOnly
                            value={user?.id}
                            name="id"
                          ></input>
                          <button
                            type="button"
                            id="viewUser"
                            className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full transition-colors focus:outline-none"
                            onClick={() => navigate(`/admin/users/${user.id}`)}
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              visibility
                            </span>
                          </button>
                          <button
                            type="button"
                            className="p-2 text-on-error-container hover:text-primary hover:bg-surface-container-high rounded-full transition-colors focus:outline-none"
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "This action cannot be undone.",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonText: "Yes, delete the user!",
                                cancelButtonText: "Cancel",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  deleteUserMutation.mutate(user.id);
                                }
                              });
                            }}
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              delete
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Load More Button */}
          {!usersLoading && !usersError && usersList.length > 0 && (
            <div className="flex justify-center pt-2">
              <button className="px-6 py-2.5 bg-secondary-container text-on-secondary-container rounded-full font-label-lg text-label-lg flex items-center gap-2 hover:bg-secondary-container/80 active:scale-95 transition-all shadow-sm cursor-pointer">
                Load More
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default ViewUsers;
