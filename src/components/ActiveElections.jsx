import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getElections } from "../api/elections-data";

export default function ActiveElections() {
  const {
    data: all_elections = [],
    isLoading: activeElectionsLoading,
    error: activeElectionsError,
  } = useQuery({
    queryKey: ["elections"],
    queryFn: getElections,
  });

  if (activeElectionsError) {
    return <div className="text-red-500">Failed to load elections.</div>;
  }

  if (activeElectionsLoading) {
    return <div>Loading elections...</div>;
  }

  return (
    <>
      <section className="py-24 bg-background">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Elections
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Browse currently open ballots across the Federation.
              </p>
            </div>
            <Link
              to="/elections"
              className="text-primary font-label-lg text-label-lg flex items-center gap-1 hover:underline"
            >
              View All Elections
              <span className="material-symbols-outlined text-sm">
                open_in_new
              </span>
            </Link>
          </div>
          {all_elections?.results?.length === 0 ? (
            <p className="text-center text-on-surface-variant col-span-full">
              No active elections at the moment. Please check back later.
            </p>
          ) : (
            <div className="grid lg:grid-cols-2 gap-gutter">
              {all_elections.map((election) => (
                <div
                  key={election.id}
                  className="flex flex-col md:flex-row bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden hover:shadow-lg transition-all group"
                >
                  <div
                    className="w-full md:w-48 h-48 md:h-auto bg-cover bg-center"
                    style={{
                      backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfrOU-5U42YcWyIMlKOWEeO8jZw1xGOzFxMpP-7q5VU0YrJFUXP4Vh2vAv30BWBcrkwPAgnBPMlKTx7a9Df4GUWfTpFmI207mbKKCD1u96FJZqxjWrbaqxMrw1rFlGVFGw8LErPInKBgoBNFo0yiqGlZ2HMEVJWuAybUjm9oX6nPCSRtjRPeyLFoFPgYWVdmXqItrzBBP6ZZGhJc6LcEAEnIR-SPOxR1OF_GwSllzyinXV53GuO99f0amIufqlZXgBfSKM0cGRPK0')`,
                    }}
                  ></div>
                  <div className="flex-1 p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className={`border ${election.status === "active" ? "bg-primary/10 text-primary border-primary-container" : "bg-secondary-fixed text-secondary border-secondary-container"}  px-2.5 py-0.5  rounded text-label-md font-label-md uppercase`}
                      >
                        {election.status === "active"
                          ? "ELECTION ACTIVE"
                          : `election ${election.status}`}
                      </span>
                      <span className="text-label-md text-on-surface-variant uppercase font-label-md">
                        {election.election_type}
                      </span>
                    </div>
                    <h3 className="font-headline-md text-headline-md mb-2 group-hover:text-primary transition-colors">
                      {election.name}
                    </h3>
                    <p className="text-on-surface-variant text-sm mb-6">
                      {election.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-lg">
                          event
                        </span>
                        <span className="text-label-md font-label-md">
                          Scheduled:{" "}
                          {new Date(election.start_date).toLocaleDateString()}
                        </span>
                      </div>
                      {election.status === "active" ? (
                        <button
                          type="button"
                          disabled
                          className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-lg font-label-lg text-label-lg cursor-not-allowed"
                        >
                          Registration Closed
                        </button>
                      ) : (
                        <Link to={`/login`}>
                          <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-lg text-label-lg hover:bg-primary-container transition-colors">
                            Register to vote
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
