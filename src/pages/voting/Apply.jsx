// Lucide react icons
import { Camera, UploadCloud, X } from "lucide-react";

// API util
import api from "../../api/axios";

// Component Import
import {
  LabelField,
  InputField,
  SelectField,
  TextAreaField,
} from "../../components/FormField";
import TopNavBar from "../../components/layouts/TopNavBar";
import SideNav from "../../components/layouts/SideNav";
import MobileNav from "../../components/layouts/MobileNav";

// Sweetalert2 import
import Swal from "sweetalert2";

// React Hook Form imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Other Hooks

import { useAuth } from "../../contexts/useAuth";

import { useQuery } from "@tanstack/react-query";

import { useEffect, useState, useRef } from "react";

import {
  getStates,
  getLgas,
  getWards,
  getPollingUnits,
  getStateDetail,
} from "../../api/voting-data";

const Apply = () => {
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const FILE_SIZE_LIMIT = 2 * 1024 * 1024;
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

  const validationSchema = yup.object().shape({
    first_name: yup.string().required("First Name is required!."),
    last_name: yup.string().required("Last Name is required!."),
    gender: yup.string().required("Select your gender!"),
    date_of_birth: yup
      .string()
      .required("Required")
      .nullable()
      .transform((curr, orig) => (orig === "" ? null : curr))
      .test("is-18", "You must be at least 18 years old to apply", (value) => {
        if (!value) return false;
        const birthDate = new Date(value);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }

        return age >= 18;
      }),
    telephone_number: yup
      .string()
      .required("Enter your telephone number")
      .matches(/^(0\d{10}|\+?234\d{10})$/, "Phone number must be 11 digits"),
    state: yup.string().required("Please select a state of origin"),
    lga: yup.string().required("Select a Local Government Area"),
    ward: yup.string().required("Select a ward"),
    polling_unit: yup.string().required("Choose a Polling Unit"),
    address: yup.string().required("Required"),
    passport: yup
      .mixed()
      .required("A passport photograph is required")
      .test("fileSize", "File too Large. Maximum size is 2MB", (value) => {
        if (!value || value.length === 0) return true;
        return value[0].size <= FILE_SIZE_LIMIT;
      })
      .test(
        "fileFormat",
        "Unsupported Format. Use JPG, JPEG, or PNG",
        (value) => {
          if (!value || value.length === 0) return true;
          return SUPPORTED_FORMATS.includes(value[0].type);
        },
      ),
    nin: yup
      .string()
      .required("Enter your 11-digit NIN")
      .matches(/^\d{11}$/, "NIN must contain exactly 11 digits"),
    consent: yup.boolean().oneOf([true], "You must give your consent"),
  });

  let userStateInstance = user?.profile?.state_of_origin;
  console.log(userStateInstance);

  const {
    data: user_state_of_origin = [],
    error: userStateError,
    isLoading: userStateLoading,
  } = useQuery({
    queryKey: ["user_state_of_origin", userStateInstance],
    queryFn: () => getStateDetail(userStateInstance),
  });

  if (userStateError) {
    return (
      <>
        <span className="font-semibold text-sm text-red-500 block">
          An error occurred
        </span>
      </>
    );
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      first_name: user?.first_name?.trim(),
      middle_name: user?.middle_name?.trim(),
      last_name: user?.last_name?.trim(),
      telephone_number: user?.profile.telephone_number?.trim(),
      state: user_state_of_origin?.name?.trim(),
    },
  });

  const [preview, setPreview] = useState(null);

  const fileList = watch("passport");

  useEffect(() => {
    if (!fileList || fileList.length === 0) {
      setPreview(null);
      return;
    }

    const file = fileList[0];
    const url = URL.createObjectURL(file);

    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [fileList]);

  const handleRemove = () => {
    setPreview(null);
    setValue("passport", null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // We won't be needing this anymore since we will be using tanstack

  const selectedState = watch("state");
  const selectedLga = watch("lga");
  const selectedWard = watch("ward");

  const {
    data: states = [],
    isLoading: isStatesLoading,
    error: statesError,
  } = useQuery({
    queryKey: ["states"],
    queryFn: getStates,
    staleTime: 10000, // 10 seconds
  });

  const {
    data: lgas = [],
    isLoading: isLgasLoading,
    error: lgasError,
  } = useQuery({
    queryKey: ["lgas", selectedState],
    queryFn: () => getLgas(selectedState),
    staleTime: 10000,
    enabled: !!selectedState,
  });

  const {
    data: wards = [],
    isLoading: isWardsLoading,
    error: wardsError,
  } = useQuery({
    queryKey: ["wards", selectedLga],
    queryFn: () => getWards(selectedLga),
    staleTime: 10000,
    enabled: !!selectedLga,
  });

  const {
    data: pollingUnits = [],
    isLoading: isPollingUnitsLoading,
    error: pollingUnitsError,
  } = useQuery({
    queryKey: ["polling-units", selectedWard],
    queryFn: () => getPollingUnits(selectedWard),
    staleTime: 10000,
    enabled: !!selectedWard,
  });

  const statesOptions = states.map((state) => ({
    value: state.id,
    label: state.name,
  }));

  const lgasOptions = lgas.map((lga) => ({
    value: lga.id,
    label: lga.name,
  }));

  const wardsOptions = wards.map((ward) => ({
    value: ward.id,
    label: ward.name,
  }));

  const pollingUnitsOptions = pollingUnits.map((pollingUnit) => ({
    value: pollingUnit.id,
    label: pollingUnit.name,
  }));

  const genderOptions = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },

    {
      value: "other",
      label: "Other",
    },
  ];

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "passport") {
          formData.append(key, value[0]);
        } else {
          formData.append(key, value);
        }
      });

      const response = await api.post("/users/register_voter/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        title: "Success!",
        text: "Application Successful",
        icon: "success",
      });
    } catch (error) {
      console.error("An error occurred: ", error);
      const data = error.response?.data;

      Swal.fire({
        icon: "error",
        title: "Application Failed",
        text: data?.non_field_errors?.[0] || "An error occurred.",
      });
    }
  };

  return (
    <>
      <SideNav />
      <TopNavBar />
      <main className="flex-1 md:ml-64 bg-surface px-margin-mobile md:px-margin-desktop py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">
                Voter Identification Application
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Complete your registration to receive your digital and physical
                VIN.
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary-container/50 border border-outline-variant rounded-lg">
              <span
                className="material-symbols-outlined text-primary text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                encrypted
              </span>
              <span className="font-label-md text-label-md text-on-surface">
                AES-256 Encrypted Session
              </span>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex justify-between mb-3 px-1">
              <span className="font-label-md text-label-md text-primary font-bold">
                Step 2: Personal Details
              </span>
              <span className="font-label-md text-label-md text-on-surface-variant">
                60% Completed
              </span>
            </div>
            <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-primary w-3/5 transition-all duration-700 ease-out"></div>
            </div>
            <div className="flex justify-between mt-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center mb-1">
                  <span className="material-symbols-outlined text-[16px]">
                    check
                  </span>
                </div>
                <span className="text-[10px] font-bold text-primary">
                  Identity
                </span>
              </div>
              <div className="flex-1 border-t-2 border-primary mt-4 mx-2"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center mb-1 border-2 border-primary">
                  <span className="text-xs font-bold">2</span>
                </div>
                <span className="text-[10px] font-bold text-primary">
                  Details
                </span>
              </div>
              <div className="flex-1 border-t-2 border-outline-variant mt-4 mx-2"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center mb-1">
                  <span className="text-xs font-bold">3</span>
                </div>
                <span className="text-[10px] text-on-surface-variant">
                  Documents
                </span>
              </div>
              <div className="flex-1 border-t-2 border-outline-variant mt-4 mx-2"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center mb-1">
                  <span className="text-xs font-bold">4</span>
                </div>
                <span className="text-[10px] text-on-surface-variant">
                  Review
                </span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant voter-card p-6 md:p-10 rounded-xl">
            <div className="flex items-center gap-4 p-4 mb-8 bg-surface-container-low border-l-4 border-primary rounded-r-lg">
              <span className="material-symbols-outlined text-primary">
                info
              </span>
              <p className="font-body-md text-body-md text-on-surface-variant leading-tight">
                Please ensure all information matches your National Identity
                Database records. Information will be cross-referenced with
                NIMC.
              </p>
            </div>
            <form
              className="space-y-6"
              onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
              encType="multipart/form-data"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <LabelField
                    label="First Name"
                    id={"first_name"}
                    className={
                      "font-label-lg text-label-lg text-on-surface-variant"
                    }
                  />
                  <InputField
                    className={`w-full h-12 px-4 rounded-lg border border-outline-variant focus:border-2 focus:border-primary focus:ring-0 font-body-md text-body-md bg-white transition-all`}
                    type="text"
                    id="first_name"
                    placeholder="Full Legal First Name"
                    {...register("first_name")}
                    error={errors.first_name?.message}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <LabelField
                    label="Middle Name"
                    id={"middle_name"}
                    className={
                      "font-label-lg text-label-lg text-on-surface-variant"
                    }
                  />
                  <InputField
                    className={`w-full h-12 px-4 rounded-lg border border-outline-variant focus:border-2 focus:border-primary focus:ring-0 font-body-md text-body-md bg-white transition-all`}
                    type="text"
                    id="middle_name"
                    placeholder="Full Legal Middle Name"
                    {...register("middle_name")}
                    error={errors.middle_name?.message}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <LabelField
                    label="Last Name"
                    id={"last_name"}
                    className={
                      "font-label-lg text-label-lg text-on-surface-variant"
                    }
                  />
                  <InputField
                    className={`w-full h-12 px-4 rounded-lg border border-outline-variant focus:border-2 focus:border-primary focus:ring-0 font-body-md text-body-md bg-white transition-all`}
                    type="text"
                    id="last_name"
                    placeholder="Full Legal Last Name"
                    {...register("last_name")}
                    error={errors.last_name?.message}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <LabelField
                    id={"gender"}
                    label={"Gender"}
                    className={
                      "font-label-lg text-label-lg text-on-surface-variant"
                    }
                  />

                  <SelectField
                    options={genderOptions}
                    name="gender"
                    id="gender"
                    placeholder={"Select your gender"}
                    className="w-full h-12 px-4 pr-12 rounded-lg border border-outline-variant focus:border-2 focus:border-primary focus:ring-0 font-body-md text-body-md bg-white transition-all"
                    {...register("gender")}
                    error={errors.gender?.message}
                  ></SelectField>
                </div>

                <div className="flex flex-col gap-2">
                  <LabelField
                    id={"telephone_number"}
                    label={"Telephone Number"}
                    className={
                      "font-label-lg text-label-lg text-on-surface-variant"
                    }
                  />

                  <InputField
                    placeholder={"Enter your 11-digit number"}
                    type="text"
                    name="telephone_number"
                    id="telephone_number"
                    className="w-full h-12 px-4 pr-12 rounded-lg border border-outline-variant focus:border-2 focus:border-primary focus:ring-0 font-body-md text-body-md bg-white transition-all"
                    {...register("telephone_number")}
                    error={errors.telephone_number?.message}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <LabelField
                    id={"date_of_birth"}
                    className={
                      "font-label-lg text-label-lg text-on-surface-variant"
                    }
                    label={"Date of Birth"}
                  />
                  <InputField
                    name="date_of_birth"
                    id="date_of_birth"
                    className={
                      "w-full h-12 px-4 rounded-lg border border-outline-variant focus:border-2 focus:border-primary focus:ring-0 font-body-md text-body-md bg-white transition-all"
                    }
                    placeholder="Date of Birth"
                    type={"date"}
                    {...register("date_of_birth")}
                    error={errors.date_of_birth?.message}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <LabelField
                    id={"state"}
                    label={"State"}
                    className={
                      "font-label-lg text-label-lg text-on-surface-variant"
                    }
                  />

                  <SelectField
                    disabled={isStatesLoading}
                    options={statesOptions}
                    name="state"
                    id="state"
                    placeholder={"Please select an option"}
                    className="w-full h-12 px-4 pr-12 rounded-lg border border-outline-variant focus:border-2 focus:border-primary focus:ring-0 font-body-md text-body-md bg-white transition-all"
                    {...register("state", {
                      required: "This field is required!",
                    })}
                    error={errors.state?.message}
                  ></SelectField>
                </div>

                <div className="flex flex-col gap-2">
                  <LabelField
                    id={"lga"}
                    label={"Local Government Area"}
                    className={
                      "font-label-lg text-label-lg text-on-surface-variant"
                    }
                  />

                  <SelectField
                    disabled={isLgasLoading}
                    options={lgasOptions}
                    name="lga"
                    id="lga"
                    placeholder={"Please select a state first"}
                    className="w-full h-12 px-4 pr-12 rounded-lg border border-outline-variant focus:border-2 focus:border-primary focus:ring-0 font-body-md text-body-md bg-white transition-all"
                    {...register("lga")}
                    error={errors.lga?.message}
                  ></SelectField>
                </div>
              </div>

              {/* Wards and Polling Units */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <LabelField
                    id={"ward"}
                    label={"Select your Ward"}
                    className={
                      "font-label-lg text-label-lg text-on-surface-variant"
                    }
                  />

                  <SelectField
                    disabled={isWardsLoading}
                    options={wardsOptions}
                    name="ward"
                    id="ward"
                    placeholder={"Please select an LGA"}
                    className="w-full h-12 px-4 pr-12 rounded-lg border border-outline-variant focus:border-2 focus:border-primary focus:ring-0 font-body-md text-body-md bg-white transition-all"
                    {...register("ward")}
                    error={errors.ward?.message}
                  ></SelectField>
                </div>

                <div className="flex flex-col gap-2">
                  <LabelField
                    id={"polling_unit"}
                    label={"Polling Unit"}
                    className={
                      "font-label-lg text-label-lg text-on-surface-variant"
                    }
                  />

                  <SelectField
                    disabled={isPollingUnitsLoading}
                    options={pollingUnitsOptions}
                    name="polling_unit"
                    id="polling_unit"
                    placeholder={"Please select a ward"}
                    className="w-full h-12 px-4 pr-12 rounded-lg border border-outline-variant focus:border-2 focus:border-primary focus:ring-0 font-body-md text-body-md bg-white transition-all"
                    {...register("polling_unit")}
                    error={errors.polling_unit?.message}
                  ></SelectField>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <LabelField
                  label={"National Identity Number (NIN)"}
                  id={"nin"}
                  className={
                    "font-label-lg text-label-lg text-on-surface-variant"
                  }
                />
                <div className="relative">
                  <InputField
                    className="w-full h-12 px-4 pr-12 rounded-lg border border-outline-variant focus:border-2 focus:border-primary focus:ring-0 font-body-md text-body-md bg-white transition-all"
                    id="nin"
                    name="nin"
                    placeholder="Enter 11-digit NIN"
                    type="text"
                    {...register("nin")}
                    error={errors.nin?.message}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant opacity-40">
                    fingerprint
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <LabelField
                  label={"Residential Address"}
                  id={"address"}
                  className={
                    "font-label-lg text-label-lg text-on-surface-variant"
                  }
                />
                <TextAreaField
                  id={"address"}
                  name={"address"}
                  className={
                    "w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-2 focus:border-primary focus:ring-0 font-body-md text-body-md bg-white transition-all"
                  }
                  placeholder={"Enter your home address"}
                  {...register("address")}
                  error={errors.address?.message}
                  rows={3}
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <LabelField
                  id="passport"
                  label="Passport Photograph"
                  className="font-label-lg text-label-lg text-on-surface-variant"
                />

                {/* Hidden File Input */}
                <input
                  id="passport"
                  type="file"
                  ref={fileInputRef}
                  capture="user"
                  accept="image/*"
                  className="hidden" // Hides the ugly native input element
                  {...register("passport")}
                />

                {/* Styled Interactive Frame */}
                {!preview ? (
                  <label
                    htmlFor="passport"
                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl h-44 cursor-pointer transition-all gap-2 bg-surface-variant/10
                      ${
                        errors.passport
                          ? "border-red-500 bg-red-50/20 hover:bg-red-50/40"
                          : "border-outline-variant hover:border-primary hover:bg-surface-variant/20"
                      }`}
                  >
                    <div className="p-3 bg-white shadow-sm rounded-full border border-outline-variant/50 text-on-surface-variant">
                      {/* Swaps icon on mobile vs desktop for camera hint */}
                      <Camera className="w-6 h-6 sm:hidden" />
                      <UploadCloud className="w-6 h-6 hidden sm:block" />
                    </div>

                    <div className="text-center px-4">
                      <p className="font-body-md text-sm font-semibold text-primary sm:block hidden">
                        Click to upload or drag and drop
                      </p>
                      <p className="font-body-md text-sm font-semibold text-primary sm:hidden block">
                        Tap to snap or upload passport
                      </p>
                      <p className="text-xs text-on-surface-variant mt-1">
                        SVG, PNG, JPG or GIF (max. 2MB)
                      </p>
                    </div>
                  </label>
                ) : (
                  /* Image Preview State */
                  <div className="relative border border-outline-variant rounded-xl overflow-hidden h-44 w-full bg-black/5 flex items-center justify-center">
                    <img
                      src={preview}
                      alt="Passport Preview"
                      className="h-full w-auto object-contain max-w-full"
                    />
                    <button
                      onClick={handleRemove}
                      type="button"
                      className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-all shadow-md"
                      aria-label="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Standard Error Messaging */}
                {errors.passport?.message && (
                  <span className="text-sm text-red-500 font-medium mt-0.5 block">
                    {errors.passport.message}
                  </span>
                )}
              </div>

              <div className="bg-surface-container p-5 rounded-lg border border-outline-variant">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <input
                      className="w-5 h-5 text-primary border-outline rounded focus:ring-primary"
                      id="consent"
                      type="checkbox"
                      name="consent"
                      {...register("consent")}
                    />

                    {errors.consent && (
                      <span className="text-red-500 font-semibold text-sm block">
                        {errors.consent?.message}
                      </span>
                    )}
                  </div>
                  <label
                    className="font-body-md text-body-md text-on-surface-variant select-none cursor-pointer"
                    htmlFor="consent"
                  >
                    <span className="font-bold text-on-surface">
                      Biometric Consent &amp; Data Privacy
                    </span>
                    <br />I hereby authorize eyeneck to access my biometric data
                    stored with the NIMC for the purposes of voter registration.
                    I understand this data is handled according to Nigerian Data
                    Protection Regulations (NDPR).
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 py-4 border-t border-outline-variant mt-8">
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                  verified_user
                </span>
                <p className="font-label-md text-label-md text-on-surface-variant">
                  Your data is secured by the Federal Republic of Nigeria's
                  digital infrastructure.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 pt-4">
                <button
                  className={`${isSubmitting ? "bg-primary cursor-not-allowed" : "bg-primary hover:bg-primary-fixed-variant transition-all hover:shadow-lg active:scale-95"} text-on-primary px-12 py-4 rounded-xl font-semibold text-lg flex items-center gap-2  group`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Processing..."
                  ) : (
                    <>
                      Continue to Documents{" "}
                      <span className="material-symbols-outlined">
                        arrow_forward
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">
                  security
                </span>
              </div>
              <div>
                <h4 className="font-headline-md text-[18px] text-on-surface mb-2">
                  Zero-Knowledge Proofs
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  We verify your identity without storing unnecessary sensitive
                  data, keeping your profile secure from prying eyes.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">
                  timer
                </span>
              </div>
              <div>
                <h4 className="font-headline-md text-[18px] text-on-surface mb-2">
                  Real-time Processing
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Once submitted, your application enters the verification
                  queue. Track your status anytime from your Dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <MobileNav />
    </>
  );
};

export default Apply;
