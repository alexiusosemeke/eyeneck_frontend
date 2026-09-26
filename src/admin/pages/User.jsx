import { useNavigate, useParams, Link } from "react-router-dom";
import Aside from "../layouts/Aside";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import { Oval } from "react-loader-spinner";

const User = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: userData = [],
    isLoading: userLoading,
    error: userError,
    isFetching: userFetching,
    refetch,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await api.get(`/users/${id}/`);
      return response.data;
    },
  });
  return (
    <>
      <Aside />
      <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
        <main className="flex-1 p-6 md:p-margin-desktop space-y-8 bg-surface-container-lowest">
          {/* Header & Primary Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                  User Details
                </h2>
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-surface-container-high text-on-surface-variant border border-outline-variant">
                  ID: #{id}
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Manage and review full account profile information
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Refresh Button */}
              <button
                onClick={() => refetch()}
                disabled={userFetching}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest rounded-full font-label-lg text-label-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 border border-outline-variant cursor-pointer"
                title="Refresh user data"
              >
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    userFetching ? "animate-spin" : ""
                  }`}
                >
                  refresh
                </span>
                <span className="hidden sm:inline">
                  {userFetching ? "Refreshing..." : "Refresh"}
                </span>
              </button>

              {/* Back to Users Link */}
              <Link
                to="/admin/view-users"
                className="flex-1 sm:flex-initial px-6 py-2.5 bg-primary text-on-primary rounded-full font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-95 transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">
                  arrow_back
                </span>
                Back to Users
              </Link>
            </div>
          </div>

          {/* Loading State */}
          {userLoading ? (
            <div className="flex justify-center items-center py-20 bg-surface dark:bg-surface-dim border border-outline-variant rounded-2xl">
              <Oval
                height={44}
                width={44}
                color="#00639b"
                secondaryColor="#c2e7ff"
                strokeWidth={3}
                strokeWidthSecondary={3}
              />
            </div>
          ) : userError ? (
            /* Error State */
            <div className="p-8 text-center bg-surface dark:bg-surface-dim border border-outline-variant rounded-2xl space-y-3">
              <span className="material-symbols-outlined text-error text-4xl">
                error
              </span>
              <p className="text-error font-semibold">
                Failed to load user details: {userError.message}
              </p>
              <button
                onClick={() => refetch()}
                className="px-4 py-2 bg-primary text-on-primary rounded-full text-xs font-medium"
              >
                Try Again
              </button>
            </div>
          ) : (
            /* Main Content Grid */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: User Summary Card */}
              <div className="lg:col-span-1 bg-surface dark:bg-surface-dim border border-outline-variant rounded-2xl p-6 shadow-sm space-y-6 self-start">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-container bg-surface-container-high flex items-center justify-center text-2xl font-bold text-on-primary-container">
                    {userData?.profile?.profile_image ? (
                      <img
                        src={userData.profile.profile_image}
                        alt={userData?.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      userData?.username?.charAt(0).toUpperCase() || "U"
                    )}
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                      {userData?.first_name && userData?.last_name
                        ? `${userData.first_name} ${userData.last_name}`
                        : userData?.username || "Unnamed User"}
                    </h3>
                    <p className="text-body-md text-on-surface-variant font-mono">
                      @{userData?.username}
                    </p>
                  </div>

                  {/* Status & Role Badges */}
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                        userData?.role?.toLowerCase() === "admin"
                          ? "bg-tertiary-container text-on-tertiary-container"
                          : "bg-secondary-container text-on-secondary-container"
                      }`}
                    >
                      {userData?.role || "User"}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        (userData?.is_active ?? true)
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                          : "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {(userData?.is_active ?? true) ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                <div className="border-t border-outline-variant pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant font-medium">
                      Email:
                    </span>
                    <span className="text-on-surface font-semibold truncate max-w-[180px]">
                      {userData?.email || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant font-medium">
                      User ID:
                    </span>
                    <span className="text-on-surface font-mono">
                      #{userData?.id}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed Tabs/Cards */}
              <div className="lg:col-span-2 space-y-6">
                {/* Card 1: Personal Information */}
                <div className="bg-surface dark:bg-surface-dim border border-outline-variant rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-6 border-b border-outline-variant pb-3">
                    <span className="material-symbols-outlined text-primary">
                      person
                    </span>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      Personal Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <InfoBlock
                      label="First Name"
                      value={userData?.first_name}
                    />
                    <InfoBlock label="Last Name" value={userData?.last_name} />
                    <InfoBlock label="Email Address" value={userData?.email} />
                    <InfoBlock
                      label="Telephone Number"
                      value={userData?.profile?.telephone_number}
                    />
                    <InfoBlock
                      label="Home Address"
                      value={userData?.profile?.address}
                      className="sm:col-span-2"
                    />
                  </div>
                </div>

                {/* Card 2: Account & System Details */}
                <div className="bg-surface dark:bg-surface-dim border border-outline-variant rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-6 border-b border-outline-variant pb-3">
                    <span className="material-symbols-outlined text-primary">
                      manage_accounts
                    </span>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      Account Security & Permissions
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <InfoBlock label="Username" value={userData?.username} />
                    <InfoBlock label="Account Role" value={userData?.role} />
                    <InfoBlock
                      label="Date Joined"
                      value={
                        userData?.date_joined
                          ? new Date(userData.date_joined).toLocaleDateString(
                              "en-US",
                              {
                                dateStyle: "medium",
                              },
                            )
                          : "N/A"
                      }
                    />
                    <InfoBlock
                      label="Last Login"
                      value={
                        userData?.last_login
                          ? new Date(userData.last_login).toLocaleString(
                              "en-US",
                              {
                                dateStyle: "medium",
                                timeStyle: "short",
                              },
                            )
                          : "Never"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

const InfoBlock = ({ label, value, className = "" }) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
      {label}
    </span>
    <p className="font-body-lg text-body-lg text-on-surface font-medium">
      {value || "Not provided"}
    </p>
  </div>
);

export default User;
