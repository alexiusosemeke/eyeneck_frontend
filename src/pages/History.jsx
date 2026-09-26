import { useQuery } from "@tanstack/react-query";
import MobileNav from "../components/layouts/MobileNav";
import SideNav from "../components/layouts/SideNav";
import TopNavBar from "../components/layouts/TopNavBar";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../contexts/useAuth";

const History = () => {
  const { user } = useAuth();

  const fetchHistory = async () => {
    const response = await api.get(`/elections/history/`);
    return response.data?.results ?? response.data;
  };

  const {
    data: getElections = [],
    error: getElectionsError,
    isLoading: getElectionsLoading,
  } = useQuery({
    queryKey: ["getElections"],
    queryFn: fetchHistory,
  });

  return (
    <>
      <SideNav />
      <TopNavBar />
      <main className="pt-24 pb-16 md:pl-64 px-margin-mobile md:px-margin-desktop min-h-screen">
        <div className="max-w-container-max mx-auto">
          <div className="mb-8">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Voting History
            </h2>
            <p className="text-body-md text-on-surface-variant mt-1">
              Review your participation in past democratic exercises and check
              upcoming schedules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="col-span-1 md:col-span-2 bg-primary-container text-on-primary-container p-8 rounded-xl relative overflow-hidden custom-shadow">
              <div className="relative z-10">
                <p className="font-label-lg opacity-90 uppercase tracking-widest mb-2">
                  Total Elections Participated
                </p>
                <h3 className="text-6xl font-extrabold mb-4">
                  {getElections.elections_participated}
                </h3>
                <div className="flex items-center gap-2 text-primary-fixed bg-on-primary-fixed-variant/20 w-fit px-3 py-1 rounded-full">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span className="font-label-md">
                    100% Participation Rate Since 2015
                  </span>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
                <span className="material-symbols-outlined text-[240px]">
                  history
                </span>
              </div>
            </div>
            <div className="bg-surface border border-outline-variant p-8 rounded-xl custom-shadow flex flex-col justify-center">
              <p className="font-label-lg text-on-surface-variant uppercase tracking-widest mb-2">
                Current Status
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    how_to_reg
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-md text-primary">
                    {user.voter?.voter_status.toUpperCase()}
                  </h3>
                  {/* <p className="text-label-md text-on-surface-variant">
                    Credentials Verified 2024
                  </p> */}
                </div>
              </div>
              <Link to={"/settings"}>
                <button className="mt-6 w-full py-3 border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors">
                  Update Bio-metrics
                </button>
              </Link>
            </div>
          </div>

          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline-md text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  analytics
                </span>{" "}
                Past Elections
              </h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-surface border border-outline-variant rounded-lg text-label-lg hover:bg-surface-container transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    filter_list
                  </span>{" "}
                  Filter
                </button>
                <button className="px-4 py-2 bg-surface border border-outline-variant rounded-lg text-label-lg hover:bg-surface-container transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    download
                  </span>{" "}
                  Export PDF
                </button>
              </div>
            </div>
            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden custom-shadow">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant">
                      <th className="px-6 py-4 font-label-lg text-on-surface-variant uppercase tracking-wider">
                        Election Type
                      </th>
                      <th className="px-6 py-4 font-label-lg text-on-surface-variant uppercase tracking-wider">
                        Election Name
                      </th>
                      <th className="px-6 py-4 font-label-lg text-on-surface-variant uppercase tracking-wider">
                        Date of Vote
                      </th>
                      <th className="px-6 py-4 font-label-lg text-on-surface-variant uppercase tracking-wider">
                        Polling Unit
                      </th>
                      {/* <th className="px-6 py-4 font-label-lg text-on-surface-variant uppercase tracking-wider text-right">
                        Action
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {getElections.elections?.map((election) => {
                      const vote_date = new Date(election.voted_at);
                      return (
                        <tr
                          key={election.id}
                          className="hover:bg-primary/5 transition-colors group"
                        >
                          <td className="px-6 py-5 text-on-surface-variant font-body-md">
                            {election.election_type.toUpperCase()}
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-surface-container-high rounded flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-sm">
                                  location_city
                                </span>
                              </div>
                              <span className="font-body-md font-bold">
                                {election.title}
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-5 text-on-surface-variant font-body-md">
                            {vote_date.toDateString()}
                          </td>

                          <td className="px-6 py-5 text-on-surface-variant font-body-md">
                            {user?.voter?.polling_unit?.name}
                          </td>
                          {/* <td className="px-6 py-5 text-right">
                            <button className="text-primary hover:underline font-label-lg flex items-center gap-1 justify-end ml-auto">
                              View Receipt{" "}
                              <span className="material-symbols-outlined text-sm">
                                open_in_new
                              </span>
                            </button>
                          </td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
      <MobileNav />
    </>
  );
};

export default History;
