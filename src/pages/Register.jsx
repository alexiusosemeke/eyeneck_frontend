import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../api/axios";
import Header from "../components/Header";
import Swal from "sweetalert2";

import { getStates } from "../api/voting-data";

import {
  LabelField,
  InputField,
  SelectField,
  RadioField,
} from "../components/FormField";

import { useQuery } from "@tanstack/react-query";

export default function Register() {
  const schema = yup.object({
    first_name: yup.string().required("First Name is required!."),
    last_name: yup.string().required("Last Name is required!."),
    email: yup
      .string()
      .required("Email address is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid Email address"),
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
    state_of_origin: yup.string().required("Please select a state of origin"),
    password: yup
      .string()
      .required("This field is required!")
      .min(8, "Password must be at least 8 characters"),
    confirm_password: yup
      .string()
      .required("This field is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    confirm: yup.boolean().oneOf([true], "You must give your consent"),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "others", label: "Others" },
  ];

  const {
    isLoading: isStatesLoading,
    error: statesError,
    data: states,
  } = useQuery({
    queryKey: ["states"],
    queryFn: getStates,
  });

  if (isStatesLoading) {
    return;
  }

  if (statesError) {
    return (
      <>
        <span className="text-red-500 font-semibold text-sm block">
          {statesError?.message}
        </span>
      </>
    );
  }

  const statesOptions = states.map((state) => ({
    value: state.id,
    label: state.name,
  }));

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await api.post("/register/", data);
      Swal.fire({
        title: "Success!",
        text: "Registration Successful",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
    } catch (err) {
      const error = err.response?.data;
      // console.log("status:", err.response?.status);
      // console.log("data:", err.response?.data);
      // console.log("full error:", err);

      if (error) {
        Object.keys(error).forEach((field) => {
          setError(field, { message: error[field][0] });
        });
      }

      Swal.fire({
        title: "Error!",
        text: "Please fix the highlighted errors on the form.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <>
      <Header />
      <main className="pt-32 pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="bg-primary/10 text-primary p-3 rounded-full mb-4">
            <span className="material-symbols-outlined text-[32px]">
              how_to_reg
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl mb-4 text-on-surface">
            New Voter Registration
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Official EYENECK digital registration portal. Please ensure all
            information provided matches your official identification documents.
          </p>
        </div>
        {/* <!-- Registration Layout --> */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* <!-- Left Sidebar Info --> */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface-container-low border border-outline-variant p-8 rounded-xl">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-6">
                Prerequisites
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-primary">
                    check_circle
                  </span>
                  <span className="text-on-surface-variant text-body-md">
                    Must be a Nigerian citizen.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-primary">
                    check_circle
                  </span>
                  <span className="text-on-surface-variant text-body-md">
                    Must be 18 years or older.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-primary">
                    check_circle
                  </span>
                  <span className="text-on-surface-variant text-body-md">
                    Have a valid NIN (National Identification Number).
                  </span>
                </li>
              </ul>
              <div className="mt-8 pt-8 border-t border-outline-variant">
                <div className="flex items-center gap-4 text-primary">
                  <span className="material-symbols-outlined">security</span>
                  <span className="font-label-lg">
                    Encrypted &amp; Secure Session
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative rounded-xl overflow-hidden aspect-video group">
              <div
                className="w-full h-full bg-cover bg-center"
                data-alt="A professional documentary-style photograph of a modern Nigerian civic center with clean architecture and lush green surroundings, captured in soft morning light. The atmosphere is peaceful and institutional, conveying a sense of organized democracy and national pride."
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCa9pJJJ7OrPltDMkqHcmvbOHxu7AcWwsFSKuMS9nAT_8GXcyaaw1CxtNxImh_tKmSgBIs0kc128IvdKB26ofiDNQu7GfqbNOsHzGGsZA_Slli4bI6iKi3zuIJ-OHs09Uytosq3aGcKp5tOjnl67L1SeRi6cQkYOUi7W1WQbpiqbH8tMKozqFkmui5i8_VhOWhD66r7dp-CVe_9NwrW-lLAFjFFrpCBFpzheCgCnRAFKWHjX06TEW6bRZkIA98QoVXZom_2z4vLpkk')`,
                }}
              ></div>
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-label-lg">
                  Registering today secures your voice for the next general
                  elections.
                </p>
              </div>
            </div>
          </div>
          {/* <!-- Registration Form Card --> */}
          <div className="lg:col-span-8">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0px_4px_20px_rgba(0,135,81,0.08)] overflow-hidden">
              {/* <!-- Form Header / Progress --> */}
              <div className="bg-surface-container-low p-6 border-b border-outline-variant flex justify-between items-center">
                <span className="font-label-lg text-primary">
                  STEP 1 OF 1: PERSONAL INFORMATION
                </span>
                <div className="flex gap-1">
                  <div className="h-1.5 w-12 rounded-full bg-primary"></div>
                </div>
              </div>
              <form
                className="p-8 md:p-12 space-y-10"
                id="registrationForm"
                onSubmit={handleSubmit(onSubmit, (errors) =>
                  console.log(errors),
                )}
              >
                {/* <!-- Name Section --> */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-2">
                    <LabelField
                      label="First Name"
                      id="first_name"
                      className="font-label-lg text-on-surface"
                    />
                    <InputField
                      className="h-12 px-4 border border-outline-variant rounded bg-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-on-surface-variant/40"
                      id={"first_name"}
                      name={"first_name"}
                      placeholder={"Enter first name"}
                      type={"text"}
                      {...register("first_name")}
                      error={errors.first_name?.message}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <LabelField
                      label="Middle Name"
                      id="middle_name"
                      className="font-label-lg text-on-surface"
                    />
                    <InputField
                      className="h-12 px-4 border border-outline-variant rounded bg-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-on-surface-variant/40"
                      id={"middle_name"}
                      name={"middle_name"}
                      placeholder={"Enter middle name"}
                      type={"text"}
                      {...register("middle_name")}
                      error={errors.middle_name?.message}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <LabelField
                      label="Last Name"
                      id="last_name"
                      className="font-label-lg text-on-surface"
                    />
                    <InputField
                      className="h-12 px-4 border border-outline-variant rounded bg-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-on-surface-variant/40"
                      id={"last_name"}
                      name={"last_name"}
                      placeholder={"Enter Last name"}
                      type={"text"}
                      {...register("last_name")}
                      error={errors.last_name?.message}
                    />
                  </div>
                </div>
                {/* <!-- Contact Info --> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <LabelField
                      label="Email Address"
                      id="email"
                      className="font-label-lg text-on-surface"
                    />
                    <InputField
                      className="h-12 px-4 border border-outline-variant rounded bg-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-on-surface-variant/40"
                      id={"email"}
                      name={"email"}
                      placeholder={"johndoe@example.com"}
                      type={"email"}
                      error={errors.email?.message}
                      {...register("email")}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <LabelField
                      label="Telephone Number"
                      id="telephone_number"
                      className="font-label-lg text-on-surface"
                    />
                    <InputField
                      className="h-12 px-4 border border-outline-variant rounded bg-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-on-surface-variant/40"
                      id={"telephone_number"}
                      name={"telephone_number"}
                      placeholder={"Enter telephone number"}
                      type="number"
                      {...register("telephone_number")}
                      error={errors.telephone_number?.message}
                    />
                  </div>
                </div>
                {/* <!-- Identity Info --> */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-2">
                    <LabelField
                      label={"Gender"}
                      id={"gender"}
                      className={"font-label-lg text-on-surface"}
                    />
                    <RadioField
                      label={"Gender"}
                      options={genderOptions}
                      name={"gender"}
                      id={"gender"}
                      className={
                        "w-4 h-4 text-primary focus:ring-primary border-outline"
                      }
                      {...register("gender")}
                      error={errors.gender?.message}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <LabelField
                      id={"date_of_birth"}
                      label={"Date of Birth"}
                      className={"font-label-lg text-on-surface"}
                    />
                    <InputField
                      id={"date_of_birth"}
                      name={"date_of_birth"}
                      className={
                        "h-12 px-4 border border-outline-variant rounded bg-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      }
                      type={"date"}
                      {...register("date_of_birth")}
                      error={errors.date_of_birth?.message}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <LabelField
                      id={"label"}
                      label={"State of Origin"}
                      className={"font-label-lg text-on-surface"}
                    />
                    <SelectField
                      id={"state_of_origin"}
                      name={"state_of_origin"}
                      className={
                        "h-12 px-4 border border-outline-variant rounded bg-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      }
                      options={statesOptions}
                      disabled={isStatesLoading}
                      {...register("state_of_origin")}
                      error={errors.state_of_origin?.message}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-2">
                    <LabelField
                      id={"password"}
                      label={"Password"}
                      htmlFor="password"
                      className={"font-label-lg text-on-surface"}
                    />
                    <InputField
                      id={"password"}
                      name={"password"}
                      className={
                        "h-12 px-4 border border-outline-variant rounded bg-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      }
                      type={"password"}
                      placeholder={"********"}
                      {...register("password")}
                      error={errors.password?.message}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <LabelField
                      id={"confirm_password"}
                      label={"Confirm Password"}
                      className={"font-label-lg text-on-surface"}
                      htmlFor="confirm_password"
                    />
                    <InputField
                      id={"confirm_password"}
                      name={"confirm_password"}
                      className={
                        "h-12 px-4 border border-outline-variant rounded bg-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      }
                      type={"password"}
                      placeholder="Repeat password"
                      {...register("confirm_password")}
                      error={errors.confirm_password?.message}
                    />
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-primary/5 rounded border border-primary/20">
                  <InputField
                    id={"confirm"}
                    name={"confirm"}
                    className={
                      "mt-1 w-4 h-4 text-primary focus:ring-primary border-outline rounded"
                    }
                    type={"checkbox"}
                    {...register("confirm")}
                  />
                  <LabelField
                    id={"confirm"}
                    label={
                      "I hereby declare that the information provided is true and accurate to the best of my knowledge. I understand that providing false information is a punishable offense under the Nigerian Law."
                    }
                    className={"font-label-lg text-on-surface"}
                    htmlFor="confirm"
                  />
                  <div className="flex-1 items-center justify-center">
                    {errors.confirm && (
                      <span className="text-sm text-red-500 font-medium mt-0.5 block">
                        {errors.confirm?.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    className={`${isSubmitting ? "bg-primary cursor-not-allowed" : "bg-primary hover:bg-primary-fixed-variant transition-all hover:shadow-lg active:scale-95"} text-on-primary px-12 py-4 rounded font-label-lg text-lg flex items-center gap-2  group`}
                    id="registerBtn"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? "Processing " : "Register"}</span>
                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                      {isSubmitting ? "sync" : "arrow_forward"}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
