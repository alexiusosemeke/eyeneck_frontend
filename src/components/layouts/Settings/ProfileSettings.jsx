import { useForm } from "react-hook-form";
import { useAuth } from "../../../contexts/useAuth";
import api from "../../../api/axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { InputField, LabelField, TextAreaField } from "../../FormField";
import { useRef, useEffect, useState } from "react";
import { Camera, UploadCloud, X } from "lucide-react";

const ProfileSettings = () => {
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const FILE_SIZE_LIMIT = 2 * 1024 * 1024;
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    telephone_number: yup
      .string()
      .required("Enter your telephone number")
      .matches(/^(0\d{10}|\+?234\d{10})$/, "Phone number must be 11 digits"),
    address: yup.string().required("Invalid"),
    profile_image: yup
      .mixed()
      .required("A profile photo is required")
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
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: user?.email?.trim(),
      telephone_number: user?.profile?.telephone_number?.trim(),
      address: user?.profile?.address?.trim(),
      profile_image: user?.profile?.profile_image?.trim(),
    },
  });

  const [preview, setPreview] = useState(null);

  const fileList = watch("profile_image");

  useEffect(() => {

    if (!fileList || fileList.length === 0) {
      setPreview(null);
      return;
    }


    if (typeof fileList === "string") {
      setPreview(fileList);
      return;
    }

    const file = fileList[0];


    if (typeof file === "string") {
      setPreview(file);
      return;
    }


    if (file instanceof File || file instanceof Blob) {
      const url = URL.createObjectURL(file);
      setPreview(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [fileList]);

  const handleRemove = () => {
    setPreview(null);
    setValue("profile_image", null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "profile_image") {
          formData.append(key, value[0]);
        } else {
          formData.append(key, value);
        }
      });

      const response = await api.patch("/users/update_user/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        title: "Success!",
        text: "Profile Updated Successfully",
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
      <section
        className="settings-card bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden"
        id="profile"
      >
        <div className="bg-surface-container px-6 py-4 border-b border-outline-variant flex justify-between items-center">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Profile Information
          </h2>
          <span
            className="material-symbols-outlined text-primary font-label-lg bg-primary/10 px-3 py-1 rounded-full"
            data-icon="person"
          >
            person
          </span>
        </div>
        <div className="p-8">
          <form
            onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
            encType="multipart/form-data"
          >
            <div className="flex flex-col md:flex-row items-start gap-10">
              <div className="flex flex-col items-center gap-4">
                <LabelField
                  id="profile_image"
                  label="Profile Photo"
                  className="font-label-lg text-label-lg text-on-surface-variant"
                />

                {/* Hidden File Input */}
                <input
                  id="profile_image"
                  type="file"
                  ref={fileInputRef}
                  capture="user"
                  accept="image/*"
                  className="hidden"
                  {...register("profile_image")}
                />

                {/* Styled Interactive Frame */}
                {!preview ? (
                  <label
                    htmlFor="profile_image"
                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl h-44 cursor-pointer transition-all gap-2 bg-surface-variant/10
                      ${
                        errors.profile_image
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
                        Tap to snap or upload profile photo
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
                      alt="Profile Image Preview"
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
                {errors.profile_image?.message && (
                  <span className="text-sm text-red-500 font-medium mt-0.5 block">
                    {errors.profile_image?.message}
                  </span>
                )}
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="flex flex-col gap-2">
                  <LabelField
                    label={"Full Name"}
                    className={"font-label-lg text-on-surface-variant"}
                    id={"full_name"}
                  />
                  <div className="flex items-center gap-2 bg-surface-container-low border border-outline-variant px-4 h-12 rounded text-on-surface font-body-md opacity-80 cursor-not-allowed">
                    <span>
                      {user?.first_name} {user?.middle_name} {user?.last_name}
                    </span>
                    <span
                      className="material-symbols-outlined text-sm ml-auto"
                      data-icon="lock"
                      style={{ fontSize: "16px" }}
                    >
                      lock
                    </span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant italic">
                    Locked to PVC records.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <LabelField
                    label={"Email Address"}
                    className={"font-label-lg text-on-surface-variant"}
                    id={"email"}
                  />
                  <InputField
                    className="bg-white border border-outline-variant px-4 h-12 rounded focus:border-2 focus:border-primary outline-none text-on-surface font-body-md transition-all"
                    type="email"
                    id="email"
                    {...register("email")}
                    error={errors.email?.message}
                    name="email"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <LabelField
                    label={"Phone Number"}
                    className={"font-label-lg text-on-surface-variant"}
                    id={"telephone_number"}
                  />
                  <InputField
                    className="bg-white border border-outline-variant px-4 h-12 rounded focus:border-2 focus:border-primary outline-none text-on-surface font-body-md transition-all"
                    type="text"
                    id="telephone_number"
                    {...register("telephone_number")}
                    error={errors.telephone_number?.message}
                    name="telephone_number"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <LabelField
                    label={"Residential Address"}
                    className={"font-label-lg text-on-surface-variant"}
                    id={"address"}
                  />
                  <TextAreaField
                    className="bg-white border border-outline-variant px-4 py-2 rounded focus:border-2 focus:border-primary outline-none text-on-surface font-body-md transition-all resize-none"
                    id="address"
                    {...register("address")}
                    error={errors.address?.message}
                    rows={2}
                    name={"address"}
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 flex justify-end">
              <button
                type="submit"
                className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-lg hover:opacity-90 active:scale-95 transition-all shadow-md"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ProfileSettings;
