import { useQuery } from "@tanstack/react-query";
import MobileNav from "../components/layouts/MobileNav";
import SideNav from "../components/layouts/SideNav";
import TopNavBar from "../components/layouts/TopNavBar";
import api from "../api/axios";
import { Oval } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { LabelField, InputField } from "../components/FormField";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";

const STEP_LABELS = ["Select Election", "Select Position", "Cast Vote"];

export default function VotingCenter() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedElection, setSelectedElection] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ballot session countdown -- runs once the user reaches candidate selection
  useEffect(() => {
    let timer;
    if (currentStep === 3 && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentStep, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // ---- Step 1: active elections ----
  const fetchElections = async () => {
    const response = await api.get(`/elections/?status=active&limit=1`);
    return response.data?.results;
  };

  const {
    data: getElections = [],
    error: getElectionError,
    isLoading: getElectionLoading,
  } = useQuery({
    queryKey: ["getElections"],
    queryFn: fetchElections,
  });

  const goToPositionStep = () => {
    if (!selectedElection) return;
    setCurrentStep(2);
  };

  const fetchPositions = async () => {
    const response = await api.get(
      `/elections/${selectedElection?.id}/ballot/`,
    );
    return response.data?.results ?? response.data;
  };

  const {
    data: positions = [],
    error: getPositionsError,
    isLoading: getPositionsLoading,
  } = useQuery({
    queryKey: ["getPositions", selectedElection?.id],
    queryFn: fetchPositions,
    enabled: currentStep === 2 && !!selectedElection?.id,
  });

  const goToCandidateStep = () => {
    if (!selectedPosition) return;
    setCurrentStep(3);
  };

  const goBackToElections = () => {
    setSelectedPosition(null);
    setSelectedCandidate(null);
    setCurrentStep(1);
  };

  const goBackToPositions = () => {
    setSelectedCandidate(null);
    setCurrentStep(2);
  };

  const fetchCandidates = async () => {
    const response = await api.get(
      `/candidates/?election=${selectedElection.id}&position=${selectedPosition?.id}`,
    );
    return response.data?.results ?? response.data;
  };

  const {
    data: candidates = [],
    error: getCandidatesError,
    isLoading: getCandidatesLoading,
  } = useQuery({
    queryKey: ["getCandidates", selectedElection?.id, selectedPosition?.id],
    queryFn: fetchCandidates,
    enabled:
      currentStep === 3 && !!selectedElection?.id && !!selectedPosition?.id,
  });

  const validationSchema = yup.object({
    vin: yup
      .string()
      .required("Your VIN is required")
      .min(8, "Enter your full VIN"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // ---- Cast the vote: election + position + candidate + vin ----
  const onSubmit = async (data) => {
    if (!selectedCandidate) {
      Swal.fire({
        icon: "warning",
        title: "Select a candidate",
        text: "Please choose a candidate before submitting your vote.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // NOTE: adjust endpoint/payload shape to match your actual vote-cast action
      await api.post("/vote/cast/", {
        election: selectedElection.id,
        position: selectedPosition.id,
        candidate: selectedCandidate.id,
        vin: data.vin,
      });

      Swal.fire({
        icon: "success",
        title: "Ballot cast",
        text: `Your vote for ${selectedCandidate?.candidate_name} has been securely recorded.`,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard");
        }
      });
    } catch (error) {
      console.error("An error occurred casting the vote:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text:
          error?.response?.data?.error ||
          "We couldn't submit your vote. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <span className="text-base font-bold tracking-wide">
          Election is Live Now
        </span>
      );
    }
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  };

  return (
    <>
      <SideNav />
      <TopNavBar />
      <main className="md:ml-64 grow flex flex-col min-h-[calc(100vh-73px)]">
        {/* Step Indicators Header -- 3 steps */}
        <div className="w-full bg-surface-container-low py-8 border-b border-outline-variant">
          <div className="max-w-3xl mx-auto px-6 flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-outline-variant -translate-y-1/2 z-0"></div>

            {STEP_LABELS.map((label, i) => {
              const step = i + 1;
              return (
                <div
                  key={step}
                  className={`relative z-10 flex flex-col items-center gap-2 ${currentStep >= step ? "opacity-100" : "opacity-40"}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep >= step ? "bg-primary text-white" : "bg-surface-variant text-on-surface-variant"}`}
                  >
                    {step}
                  </div>
                  <span
                    className={`text-label-md font-label-md ${currentStep >= step ? "text-primary" : ""}`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="max-w-container-max mx-auto px-6 md:px-12 py-10 w-full flex-grow flex flex-col">
          {/* STEP 1: Select Election */}
          {currentStep === 1 && (
            <section className="flex flex-col gap-8 animate-in fade-in duration-500">
              <div className="mb-2">
                <h2 className="text-headline-lg font-headline-lg text-on-surface">
                  Choose Active Election
                </h2>
                <p className="text-body-md font-body-md text-on-surface-variant mt-2 max-w-2xl">
                  Select the electoral exercise you are eligible to participate
                  in. Your identity is cryptographically secured throughout this
                  session.
                </p>
              </div>

              {getElectionLoading ? (
                <div className="flex items-center justify-center mb-4">
                  <Oval
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    secondaryColor="#4fa94d"
                    strokeWidth={3}
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              ) : getElectionError ? (
                <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-sm">
                  <span className="font-semibold text-xl text-red-500 block">
                    Error loading elections. Please try again later.
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {getElections.map((election) => (
                    <div
                      key={election?.id}
                      onClick={() => setSelectedElection(election)}
                      className={`group cursor-pointer bg-surface-container-lowest border p-6 rounded-xl transition-all hover:shadow-ambient flex flex-col gap-4 shadow-sm ${
                        selectedElection?.id === election?.id
                          ? "border-primary shadow-ambient"
                          : "border-outline-variant hover:border-primary"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <span className="material-symbols-outlined text-primary">
                            public
                          </span>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-label-md font-label-md ${election?.typeClasses}`}
                        >
                          {election.election_type?.toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-headline-md font-headline-md text-on-surface">
                          {election.title}
                        </h3>
                        <p className="text-body-md font-body-md text-on-surface-variant mt-2">
                          {election.description}
                        </p>
                      </div>
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-outline-variant">
                        <div className="flex items-center gap-1 text-label-lg font-label-lg text-tertiary">
                          <span className="material-symbols-outlined text-[18px]">
                            schedule
                          </span>
                          <span>
                            <Countdown
                              date={election.start_date}
                              renderer={renderer}
                            />
                          </span>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            selectedElection?.id === election.id
                              ? "bg-primary border-primary"
                              : "border-outline"
                          }`}
                        >
                          {selectedElection?.id === election.id && (
                            <span className="material-symbols-outlined text-white text-[16px]">
                              check
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-10 flex justify-center">
                <button
                  onClick={goToPositionStep}
                  disabled={!selectedElection}
                  className="px-12 py-4 bg-primary text-white rounded-lg font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg hover:opacity-90 active:scale-95"
                >
                  Proceed to Positions
                </button>
              </div>
            </section>
          )}

          {/* STEP 2: Select Position */}
          {currentStep === 2 && (
            <section className="flex flex-col gap-8 animate-in fade-in duration-500">
              <div className="flex justify-between items-end border-b border-outline-variant pb-6">
                <div>
                  <span className="text-label-lg font-label-lg text-primary uppercase tracking-widest">
                    {selectedElection?.title || "Election Name"}
                  </span>
                  <h2 className="text-headline-lg font-headline-lg text-on-surface mt-1">
                    Select a Position to Vote For
                  </h2>
                </div>
                <button
                  onClick={goBackToElections}
                  className="text-label-lg font-label-lg text-on-surface-variant hover:text-primary flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_back
                  </span>
                  Change election
                </button>
              </div>

              {getPositionsLoading ? (
                <div className="flex items-center justify-center mb-4">
                  <Oval
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    secondaryColor="#4fa94d"
                    strokeWidth={3}
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              ) : getPositionsError ? (
                <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-sm">
                  <span className="font-semibold text-xl text-red-500 block">
                    Couldn't load positions for this election. Please try again
                    later.
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {positions.map((position) => (
                    <div
                      key={position.id}
                      onClick={() => setSelectedPosition(position)}
                      className={`cursor-pointer bg-surface-container-lowest border p-6 rounded-xl transition-all hover:shadow-ambient flex flex-col gap-3 shadow-sm ${
                        selectedPosition?.id === position.id
                          ? "border-primary shadow-ambient"
                          : "border-outline-variant hover:border-primary"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <span className="material-symbols-outlined text-primary">
                            how_to_vote
                          </span>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            selectedPosition?.id === position.id
                              ? "bg-primary border-primary"
                              : "border-outline"
                          }`}
                        >
                          {selectedPosition?.id === position.id && (
                            <span className="material-symbols-outlined text-white text-[16px]">
                              check
                            </span>
                          )}
                        </div>
                      </div>
                      <h3 className="text-headline-md font-headline-md text-on-surface">
                        {position.name.toUpperCase()}
                      </h3>
                      {position.description && (
                        <p className="text-body-md font-body-md text-on-surface-variant">
                          {position.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-10 flex justify-center">
                <button
                  onClick={goToCandidateStep}
                  disabled={!selectedPosition}
                  className="px-12 py-4 bg-primary text-white rounded-lg font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg hover:opacity-90 active:scale-95"
                >
                  Proceed to Candidates
                </button>
              </div>
            </section>
          )}

          {/* STEP 3: Select Candidate + VIN + Submit */}
          {currentStep === 3 && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <section className="flex flex-col gap-8 animate-in fade-in duration-500">
                <div className="flex justify-between items-end border-b border-outline-variant pb-6">
                  <div>
                    <span className="text-label-lg font-label-lg text-primary uppercase tracking-widest">
                      {selectedElection?.title} -- {selectedPosition?.title}
                    </span>
                    <h2 className="text-headline-lg font-headline-lg text-on-surface mt-1">
                      Select Your Candidate
                    </h2>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={goBackToPositions}
                      className="text-label-lg font-label-lg text-on-surface-variant hover:text-primary flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        arrow_back
                      </span>
                      Change position
                    </button>
                    <div className="flex items-center gap-2 text-on-surface-variant font-label-lg text-label-lg bg-surface-container px-4 py-2 rounded-full">
                      <span
                        className="material-symbols-outlined text-primary text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        timer
                      </span>
                      <span>{formatTime(timeLeft)}</span>
                    </div>
                  </div>
                </div>

                {getCandidatesLoading ? (
                  <div className="flex items-center justify-center mb-4">
                    <Oval
                      visible={true}
                      height="80"
                      width="80"
                      color="#4fa94d"
                      secondaryColor="#4fa94d"
                      strokeWidth={3}
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                ) : getCandidatesError ? (
                  <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-sm">
                    <span className="font-semibold text-xl text-red-500 block">
                      Couldn't load candidates for this position. Please try
                      again later.
                    </span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {candidates.map((candidate) => (
                      <div
                        key={candidate.id}
                        onClick={() => setSelectedCandidate(candidate)}
                        className={`cursor-pointer bg-white border rounded-xl overflow-hidden hover:shadow-ambient transition-all flex flex-col ${
                          selectedCandidate?.id === candidate.id
                            ? "border-primary shadow-ambient"
                            : "border-outline-variant hover:border-primary"
                        }`}
                      >
                        <div className="h-48 w-full relative bg-surface-container flex items-center justify-center">
                          <img
                            className="w-full h-full object-contain"
                            src={
                              candidate.candidate_image || candidate.party?.logo
                            }
                            alt={candidate?.user?.last_name}
                          />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-label-md font-label-md font-extrabold text-primary border border-primary/20">
                            {candidate.party?.party_initials}
                          </div>
                        </div>
                        <div className="p-6 flex flex-col gap-1">
                          <h3 className="text-headline-md font-headline-md text-on-surface">
                            {candidate?.candidate_name?.toUpperCase()}
                          </h3>
                          <p className="text-body-md font-body-md text-on-surface-variant">
                            {candidate.party?.name} (
                            {candidate.party?.party_initials})
                          </p>
                          <div className="mt-6 flex items-center justify-between">
                            <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center font-black text-on-surface-variant overflow-hidden">
                              {candidate.party?.logo ? (
                                <img
                                  src={candidate.party.logo}
                                  alt={candidate.party?.name}
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                candidate.party?.party_initials
                              )}
                            </div>
                            <div
                              className={`flex items-center gap-2 text-primary font-label-lg text-label-lg transition-opacity ${
                                selectedCandidate?.id === candidate.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            >
                              <span
                                className="material-symbols-outlined"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                              >
                                check_circle
                              </span>
                              Selected
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* VIN confirmation, entered right alongside the candidate choice */}
                <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-sm max-w-xl">
                  <LabelField
                    for="vin"
                    label="Confirm your Voter Identification Number (VIN)"
                    className="block font-label-lg text-label-lg mb-3 text-on-surface"
                  />
                  <div className="relative">
                    <InputField
                      className="w-full h-12 pl-10 pr-4 rounded-lg bg-surface border border-outline focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all uppercase font-mono tracking-widest text-sm"
                      placeholder="Enter your VIN"
                      type="text"
                      name="vin"
                      {...register("vin")}
                    />
                    <span
                      className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                      data-icon="fingerprint"
                    >
                      fingerprint
                    </span>
                  </div>
                  {errors.vin && (
                    <span className="text-sm text-red-500 font-medium mt-1 block">
                      {errors.vin.message}
                    </span>
                  )}
                </div>

                {/* Selection summary + submit -- plain in-flow block, no fixed positioning */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 max-w-xl">
                  <div className="flex flex-col">
                    <span className="text-label-md font-label-md text-on-surface-variant">
                      Selected Choice
                    </span>
                    <span className="text-body-lg font-body-lg font-bold text-primary">
                      {selectedCandidate
                        ? `${selectedCandidate.candidate_name?.toUpperCase()} (${selectedCandidate.party?.party_initials})`
                        : "No candidate selected"}
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={!selectedCandidate || isSubmitting}
                    className="px-12 py-3 bg-primary text-on-primary rounded-lg font-bold disabled:opacity-30 disabled:grayscale transition-all shadow-lg active:scale-95 flex items-center gap-3 justify-center"
                  >
                    <span className="material-symbols-outlined">send</span>
                    {isSubmitting ? "Submitting..." : "Securely Cast Ballot"}
                  </button>
                </div>
              </section>
            </form>
          )}
        </div>

        <footer className="mt-auto border-t border-outline-variant bg-surface-container-lowest">
          <div className="max-w-container-max mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center text-on-surface-variant font-label-md gap-4">
            <p>
              (c) 2024 Independent National Electoral Commission (INEC) /
              eyeneck Voter Portal. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a className="hover:text-primary transition-colors" href="#">
                Privacy Policy
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                Terms of Service
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                Security Information
              </a>
            </div>
          </div>
        </footer>
      </main>
      <MobileNav />
    </>
  );
}
