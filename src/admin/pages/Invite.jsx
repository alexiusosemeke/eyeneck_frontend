import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Footer from "../layouts/Footer.jsx";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { InputField } from "../../components/FormField.jsx";
import api from "../../api/axios.js";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const validationSchema = yup.object().shape({
  first_name: yup.string().required("This field is required."),
  last_name: yup.string().required("This field is required."),
  username: yup.string().required("This field is required"),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("This field is required."),
  password: yup
    .string()
    .required("This field is required.")
    .min(8, "Password must be at least 8 characters"),
  confirm_password: yup
    .string()
    .required("This field is required.")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const InviteAdmin = () => {
  const { navigate } = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    setError,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleToggle = () => {
    setShowPassword(!showPassword);
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/admin/users/invite_admin/", data);

      if (response.status === 201) {
        await Swal.fire({
          title: "Success",
          text: "Registration Successful. Redirecting to Login...",
          icon: "success",
        }).then((result) => {
          navigate("./login");
        });
      } else {
        await Swal.fire({
          title: "Error",
          icon: "error",
          text: response.data?.message || "An error occurred.",
        });
      }
    } catch (err) {
      const errors = err.response?.data;
      const nonFieldError = err.response?.data?.non_field_errors?.[0];

      Object.entries(errors || {}).forEach(([field, messages]) => {
        if (field !== "non_field_errors") {
          setError(field, {
            type: "server",
            message: messages[0],
          });
        }
      });

      if (nonFieldError) {
        await Swal.fire({
          title: "Error",
          icon: "error",
          text: nonFieldError,
        });
      }
      console.error(err);
      await Swal.fire({
        title: "Error",
        icon: "error",
        text:
          err.response?.data?.detail ||
          err.response?.data?.message ||
          "An error occurred.",
      });
    }
  };

  return (
    <>
      <main className="grow flex items-center justify-center p-margin-mobile md:p-margin-desktop z-10 relative">
        <div className="w-full max-w-120 bg-surface rounded-xl border border-outline-variant shadow-ambient overflow-hidden flex flex-col">
          <div className="bg-surface-container-low border-b border-outline-variant p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
              <span
                className="material-symbols-outlined text-on-primary text-[32px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                shield_locked
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md text-on-surface mb-1">
              EYENECK Voter Portal
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Administrative Access Console
            </p>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">
                  admin_panel_settings
                </span>
                <span className="font-label-md text-label-md uppercase tracking-wider text-primary">
                  Secure System Access
                </span>
              </div>
            </div>
            <form
              className="flex flex-col gap-6"
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-2">
                <label
                  className="font-label-lg text-label-lg text-on-surface flex items-center gap-2"
                  htmlFor="officer_id"
                >
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline">
                      person
                    </span>
                  </div>
                  <InputField
                    className="block w-full pl-10 pr-3 py-3 border border-outline rounded-lg bg-surface text-on-surface font-body-md text-body-md placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    id="first_name"
                    name="first_name"
                    placeholder="Enter first name"
                    type={"text"}
                    {...register("first_name")}
                  />
                </div>
                <span className="text-error text-body-sm">
                  {errors.first_name?.message}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="font-label-lg text-label-lg text-on-surface flex items-center gap-2"
                  htmlFor="officer_id"
                >
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline">
                      person
                    </span>
                  </div>
                  <InputField
                    className="block w-full pl-10 pr-3 py-3 border border-outline rounded-lg bg-surface text-on-surface font-body-md text-body-md placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    id="last_name"
                    name="last_name"
                    placeholder="Enter last name"
                    type={"text"}
                    {...register("last_name")}
                  />
                </div>
                <span className="text-error text-body-sm">
                  {errors.last_name?.message}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="font-label-lg text-label-lg text-on-surface flex items-center gap-2"
                  htmlFor="officer_id"
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline">
                      badge
                    </span>
                  </div>
                  <InputField
                    className="block w-full pl-10 pr-3 py-3 border border-outline rounded-lg bg-surface text-on-surface font-body-md text-body-md placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    id="username"
                    name="username"
                    placeholder="Enter username"
                    type={"text"}
                    {...register("username")}
                  />
                </div>
                <span className="text-error text-body-sm">
                  {errors.username?.message}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="font-label-lg text-label-lg text-on-surface flex items-center gap-2"
                  htmlFor="officer_id"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline">
                      email
                    </span>
                  </div>
                  <InputField
                    className="block w-full pl-10 pr-3 py-3 border border-outline rounded-lg bg-surface text-on-surface font-body-md text-body-md placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    id="email"
                    name="email"
                    placeholder="Enter email address"
                    type={"text"}
                    {...register("email")}
                  />
                </div>
                <span className="text-error text-body-sm">
                  {errors.email?.message}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="font-label-lg text-label-lg text-on-surface flex items-center gap-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline">
                      key
                    </span>
                  </div>
                  <InputField
                    className="block w-full pl-10 pr-3 py-3 border border-outline rounded-lg bg-surface text-on-surface font-body-md text-body-md placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    id="password"
                    name="password"
                    placeholder="********"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                  />
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-primary transition-colors focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    onChange={(e) => setPassword(e.target.value)}
                  >
                    <span
                      className="material-symbols-outlined"
                      id="toggle_icon"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                  </button>
                </div>
                <span className="text-error text-body-sm">
                  {errors.password?.message}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="font-label-lg text-label-lg text-on-surface flex items-center gap-2"
                  htmlFor="password"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline">
                      key
                    </span>
                  </div>
                  <InputField
                    className="block w-full pl-10 pr-3 py-3 border border-outline rounded-lg bg-surface text-on-surface font-body-md text-body-md placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    id="confirm_password"
                    name="confirm_password"
                    placeholder="********"
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    {...register("confirm_password")}
                  />
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-primary transition-colors focus:outline-none"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    type="button"
                  >
                    <span
                      className="material-symbols-outlined"
                      id="toggle_icon"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </span>
                  </button>
                </div>
                <span className="text-error text-body-sm">
                  {errors.confirm_password?.message}
                </span>
              </div>

              <div className="mt-2">
                <button
                  className="w-full flex justify-center items-center gap-2 bg-primary text-on-primary font-label-lg text-label-lg py-3.5 px-4 rounded-full hover:bg-on-primary-fixed-variant active:scale-[0.98] transition-all border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? "Processing" : "Submit"}</span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {isSubmitting ? "sync" : "login"}
                  </span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2 pt-6 border-t border-surface-container-highest">
                <Link
                  to={"../login"}
                  className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors underline flex items-center gap-1"
                >
                  Already have an account? Login
                </Link>

                <a
                  className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors underline flex items-center gap-1"
                  href="#"
                >
                  {/*<span className="material-symbols-outlined text-[14px]">support_agent</span>*/}
                  Contact IT Support
                </a>
              </div>
            </form>
          </div>

          <div className="h-1.5 w-full bg-primary"></div>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default InviteAdmin;
