import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getStates, getLgas } from "../api/voting-data";
import { InputField, SelectField } from "../components/FormField";
import api from "../api/axios";
import { toast } from "sonner";

export default function PVCVerification() {
  const vinSchema = yup.object().shape({
    vin: yup.string().required("This field is required"),
    method: yup.string().required(),
  });

  const detailsSchema = yup.object().shape({
    state: yup.string().required("This field is required"),
    lga: yup.string().required("This field is required"),
    first_name: yup.string().required("This field is required"),
    last_name: yup.string().required("This field is required"),
    method: yup.string().required(),
  });

  const [searchMode, setSearchMode] = useState("vin"); // 'vin' | 'details'
  const [verificationResult, setVerificationResult] = useState(null);

  const schema = searchMode === "vin" ? vinSchema : detailsSchema;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleModeChange = (mode) => {
    setSearchMode(mode);
    reset();
  };

  const selectedState = watch("state");

  //fetch states and lga data
  const { data: statesData = [], isLoading: statesLoading } = useQuery({
    queryKey: ["states"],
    queryFn: getStates,
    enabled: searchMode !== "vin",
  });

  const { data: lgasData = [], isLoading: lgasLoading } = useQuery({
    queryKey: ["lgas", selectedState],
    queryFn: () => getLgas(selectedState),
    enabled: searchMode !== "vin" && !!selectedState,
  });

  const stateOptions = statesData.map((state) => ({
    value: state.id,
    label: state.name,
  }));

  const lgaOptions = lgasData.map((lga) => ({
    value: lga.id,
    label: lga.name,
  }));

  useEffect(() => {
    resetField("lga");
  }, [selectedState, resetField]);

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/pvc-verification/", data);
      setVerificationResult(res?.data);
    } catch (e) {
      const error = e.response?.data;

      if (error) {
        if (error.detail || error.non_field_errors) {
          toast.error("", {
            duration: 5000,
            description: error.detail || error.non_field_errors,
            richColors: true,
            closeButton: true,
            position: "top-center",
            dismissible: true,
          });
        } else {
          Object.keys(error).forEach((field) => {
            toast.error("", {
              duration: 5000,
              description: error[field][0],
              richColors: true,
              closeButton: true,
            });
          });
        }
      }
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="min-h-screen bg-surface py-10 px-4 sm:px-8">
          <div className="max-w-full mx-auto space-y-8">
            {/* Header Banner */}
            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface-container-high border border-outline-variant/60 text-primary text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-base">
                  verified
                </span>
                Official Electoral Registry Search
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                Permanent Voter Card (PVC) Verification
              </h1>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
                Verify your registration status, check your assigned Polling
                Unit, and confirm card collection status directly from the
                certified voter database.
              </p>
            </div>

            {/* Verification Form Card */}
            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              {/* Search Mode Tab Switcher */}
              <div className="flex border-b border-outline-variant/60">
                <button
                  type="button"
                  onClick={() => handleModeChange("vin")}
                  className={`pb-3 px-4 font-bold text-xs sm:text-sm transition-colors border-b-2 -mb-px flex items-center gap-2 ${
                    searchMode === "vin"
                      ? "border-primary text-primary"
                      : "border-transparent text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">pin</span>
                  Search by VIN (19-Digits)
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange("details")}
                  className={`pb-3 px-4 font-bold text-xs sm:text-sm transition-colors border-b-2 -mb-px flex items-center gap-2 ${
                    searchMode === "details"
                      ? "border-primary text-primary"
                      : "border-transparent text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">
                    person_search
                  </span>
                  Search by Personal Details
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {searchMode === "vin" ? (
                  /* VIN Input Mode */
                  <div className="space-y-2">
                    <input
                      type="hidden"
                      value={"vin"}
                      name="method"
                      {...register("method")}
                    />
                    <label
                      htmlFor="vin-input"
                      className="block text-xs font-bold uppercase tracking-wider text-on-surface"
                    >
                      Voter Identification Number (VIN)
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">
                        badge
                      </span>
                      <InputField
                        {...register("vin")}
                        id="vin"
                        type="text"
                        name="vin"
                        placeholder="e.g. 90F5B12345678901234"
                        className={`w-full bg-surface-container-low border  rounded-xl pl-11 pr-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none  font-mono ${errors.vin ? "border-red-500 focus:border-error/40" : "border-outline-variant/60 focus:border-primary"}`}
                      />
                    </div>
                    {errors.vin && (
                      <div className="text-red-500/80 text-sm font-semibold font-hanken px-0.5 rounded">
                        {errors?.vin?.message}
                      </div>
                    )}
                    <p className="text-[11px] text-on-surface-variant">
                      Your 19-digit VIN is located at the top front of your
                      Permanent Voter Card.
                    </p>
                  </div>
                ) : (
                  /* Personal Details Input Mode */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <input
                        type="hidden"
                        value={"details"}
                        name="method"
                        {...register("method")}
                      />
                      <label
                        htmlFor="first_name"
                        className="block text-xs font-bold text-on-surface uppercase tracking-wider"
                      >
                        First Name
                      </label>
                      <InputField
                        {...register("first_name")}
                        error={errors?.first_name?.message}
                        id="first_name"
                        type="text"
                        name="first_name"
                        placeholder="e.g. Olawale"
                        className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="last_name"
                        className="block text-xs font-bold text-on-surface uppercase tracking-wider"
                      >
                        Last Name / Surname
                      </label>
                      <InputField
                        {...register("last_name")}
                        error={errors?.last_name?.message}
                        id="last_name"
                        type="text"
                        name="last_name"
                        placeholder="e.g. Adebayo"
                        className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="state-select"
                        className="block text-xs font-bold text-on-surface uppercase tracking-wider"
                      >
                        State of Registration
                      </label>
                      <SelectField
                        {...register("state")}
                        error={errors?.state?.message}
                        options={stateOptions}
                        disabled={statesLoading}
                        name={"state"}
                        placeholder={
                          statesLoading ? "Loading..." : "Select state"
                        }
                        id="state-select"
                        className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="lga-select"
                        className="block text-xs font-bold text-on-surface uppercase tracking-wider"
                      >
                        Local Government
                      </label>
                      <SelectField
                        {...register("lga")}
                        disabled={!selectedState || lgasLoading}
                        error={errors?.lga?.message}
                        options={lgaOptions}
                        name="lga"
                        placeholder={lgasLoading ? "Loading..." : "Select LGA"}
                        id="lga-select"
                        className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-8 py-3.5 rounded-xl font-semibold text-sm transition-colors border border-primary"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-lg">
                        progress_activity
                      </span>
                      <span>Querying Voter Registry...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-lg">
                        search
                      </span>
                      <span>Verify Registration Status</span>
                    </>
                  )}
                </button>
              </form>

              {/* Result Display Card */}
              {verificationResult && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Status Header Badge */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/60">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-2xl">
                          verified_user
                        </span>
                      </div>
                      <div>
                        <h3 className="text-sm font-extrabold text-on-surface">
                          Voter Record Found & Certified
                        </h3>
                        <p className="text-xs text-on-surface-variant">
                          INEC Voter Registry • Status:{" "}
                          {verificationResult?.voter?.voter_status.toUpperCase() ||
                            "Unknown"}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-base">
                        restart_alt
                      </span>
                      New Search
                    </button>
                  </div>

                  {/* Verified Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Personal Information */}
                    <div className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/50 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface border-b border-outline-variant/40 pb-2">
                        Voter Profile
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div>
                          <span>
                            <img
                              src={
                                verificationResult?.voter?.passport ||
                                "/default-avatar.png"
                              }
                              alt="Profile"
                              className="w-12 h-12 rounded-full object-cover border border-outline-variant/60"
                            />
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <div>
                            <span className="text-on-surface-variant block">
                              VIN Number
                            </span>
                            <span className="font-mono font-semibold text-on-surface">
                              {verificationResult?.voter?.vin || "N/A"}
                            </span>
                          </div>
                          <div>
                            <span className="text-on-surface-variant block">
                              Registration Date
                            </span>
                            <span className="font-semibold text-on-surface">
                              {verificationResult?.voter?.registration_date ||
                                "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Polling Unit Information */}
                    <div className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/50 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface border-b border-outline-variant/40 pb-2">
                        Assigned Voting Location
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="text-on-surface-variant block">
                            Polling Unit (PU)
                          </span>
                          <span className="font-bold text-on-surface text-sm">
                            {verificationResult?.voter?.polling_unit?.name}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <div>
                            <span className="text-on-surface-variant block">
                              Ward / Registration Area
                            </span>
                            <span className="font-semibold text-on-surface">
                              {
                                verificationResult?.voter?.polling_unit?.ward
                                  ?.name
                              }
                            </span>
                          </div>
                          <div>
                            <span className="text-on-surface-variant block">
                              LGA & State
                            </span>
                            <span className="font-semibold text-on-surface">
                              {
                                verificationResult?.voter?.polling_unit?.ward
                                  ?.lga?.name
                              }{" "}
                              ,{" "}
                              {
                                verificationResult?.voter?.polling_unit?.ward
                                  ?.lga?.state?.name
                              }{" "}
                              State
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PVC Card Collection & Status Alert */}
                  <div className="p-4 bg-surface-container-high border border-outline-variant rounded-2xl flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">
                      badge
                    </span>
                    <div className="space-y-1 text-xs">
                      <p className="font-bold text-on-surface">
                        PVC Status: Issued & Collected
                      </p>
                      <p className="text-on-surface-variant leading-relaxed">
                        Your Permanent Voter Card is verified for the upcoming
                        general and state elections. Remember to bring your
                        physical card to your polling unit on election day.
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Link
                      to="/voter-info"
                      className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl font-semibold text-xs"
                    >
                      <span className="material-symbols-outlined text-base">
                        location_on
                      </span>
                      Get Directions to Polling Unit
                    </Link>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center justify-center gap-2 bg-surface-container-high text-on-surface border border-outline-variant/60 px-6 py-3 rounded-xl font-semibold text-xs hover:bg-surface-container"
                    >
                      <span className="material-symbols-outlined text-base">
                        print
                      </span>
                      Print Voter Slip
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Informational Help Box */}
            <div className="p-6 bg-surface-container-low border border-outline-variant/60 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-on-surface">
                <span className="material-symbols-outlined text-primary text-lg">
                  info
                </span>
                PVC Verification Help & Guidelines
              </div>
              <ul className="space-y-2 text-xs text-on-surface-variant leading-relaxed list-disc list-inside">
                <li>
                  If your PVC status shows "Uncollected", visit your LGA INEC
                  headquarters with your temporary voter slip.
                </li>
                <li>
                  Polling unit transfers must be completed at least 90 days
                  before an official election.
                </li>
                <li>
                  For voter profile corrections or disputes, contact your local
                  INEC ward office.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
