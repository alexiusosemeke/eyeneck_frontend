// React Router Imports
import { Link, useNavigate } from "react-router-dom";

// Component Import
import { LabelField, InputField } from "../components/FormField";
import LogoImage from "../components/Logo";

// Sweetalert2 import
import Swal from "sweetalert2";

// React Hook Form imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../contexts/useAuth";

export default function LoginPage() {
  const validationSchema = yup.object().shape({
    email: yup.string().required("Required").email("Invalid Email Address"),
    password: yup.string().required("Required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();

  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const user = await login(data);
      if (user.is_staff) {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      // const error = err.response?.data;
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.detail || err.message,
        icon: "error",
      });
      console.err(err);
    }
  };

  return (
    <>
      <main className="w-full grow flex items-center justify-center glass-background px-margin-mobile py-12">
        <div className="max-w-120 w-full space-y-8 flex flex-col items-center">
          <div className="text-center space-y-6">
            <LogoImage />
            <div className="space-y-1">
              <h1 className="font-headline-md text-headline-md text-primary">
                Secure Voter Access
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
                Please identify yourself to proceed to your secure voting
                dashboard.
              </p>
            </div>
          </div>

          <div className="w-full bg-surface-container-lowest border border-outline-variant rounded shadow-sm p-8 md:p-10 space-y-8">
            <div className="flex items-center justify-center gap-2 py-2 px-4 bg-surface-container-low rounded-full w-fit mx-auto">
              <span
                className="material-symbols-outlined text-[18px] text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                shield
              </span>
              <span className="font-label-md text-label-md text-primary uppercase tracking-wider">
                Official Secure Login
              </span>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <LabelField
                  id={"email"}
                  label={"Email Address"}
                  className={
                    "block font-label-lg text-label-lg text-on-surface"
                  }
                />
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">
                    email
                  </span>
                  <InputField
                    type="email"
                    className={`${errors.email ? "border-2 border-red-500" : "border border-green-500"} w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-0 focus:border-primary font-body-md text-body-md text-on-surface placeholder:text-outline-variant transition-all outline-none`}
                    name="email"
                    placeholder="mail@example.com"
                    id="email"
                    {...register("email")}
                  />
                </div>
                <div className="flex-1 items-center justify-center">
                  {errors.email && (
                    <span className="text-sm text-red-500 font-medium mt-0.5 block">
                      {errors.email?.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <LabelField
                    id={"password"}
                    label={"Password"}
                    className={
                      "block font-label-lg text-label-lg text-on-surface"
                    }
                  />
                  <Link
                    to="/forgot-password"
                    className="font-label-md text-label-md text-primary hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">
                    lock
                  </span>
                  <InputField
                    type="password"
                    className={`${errors.password ? "border-2 border-red-500" : "border border-green-500"} w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline rounded-lg focus:ring-0 focus:border-primary font-body-md text-body-md text-on-surface placeholder:text-outline-variant transition-all outline-none`}
                    name="password"
                    placeholder="*********"
                    id="password"
                    {...register("password")}
                  />

                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-colors"
                    id="passwordToggle"
                    type="button"
                  >
                    visibility
                  </button>
                </div>
                <div className="flex-1 items-center justify-center">
                  {errors.password && (
                    <span className="text-sm text-red-500 font-medium mt-0.5 block">
                      {errors.password?.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  className="w-5 h-5 rounded border-outline text-primary focus:ring-primary-container transition-all"
                  id="remember"
                  type="checkbox"
                />
                <label
                  className="font-body-md text-body-md text-on-surface-variant cursor-pointer select-none"
                  htmlFor="remember"
                >
                  Remember this device
                </label>
              </div>

              <button
                className={`${isSubmitting ? "bg-primary cursor-not-allowed" : "bg-primary hover:bg-primary-fixed-variant transition-all active:scale-[0.98] hover:shadow-lg active:scale-95"} w-full py-4  text-on-primary font-label-lg text-label-lg rounded-lg duration-200 flex items-center justify-center gap-2 shadow-sm`}
                type="submit"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? "Processing..." : "Sign In"}</span>
                <span className="material-symbols-outlined text-[20px]">
                  {isSubmitting ? "sync" : "login"}
                </span>
              </button>
            </form>

            <div className="pt-6 border-t border-outline-variant text-center">
              <p className="font-body-md text-body-md text-on-surface-variant">
                Don't have an account? &nbsp;
                <Link
                  to="/register"
                  className="text-primary font-bold hover:underline transition-all"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <img
              className="h-10 opacity-30"
              data-alt="A clean vector silhouette of the Coat of Arms of Nigeria, simple and authoritative, rendered in a subtle grey tone suitable for a footer or secondary brand element in a government application."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiE3GroUzRskOgZW6FfNOuk-XcLQIcNbA7r2EFLTza-g3LIi4b_J8ixizPAFNYcRWNog0MXNOgpAduzOQisn9T8gcafNSnozVpKY66SOfxZOVFq7YOU9pfEDsgV1arNNoEEyduozCStRjhve8x4URgAlQRn5ojn0ylnwqNIVGBd2IZzIMlTpJknQkoGwSFdAOdYuUc7KRSMFEsKOvNQHV6TLUhp_KJEXK4SDY_TUQM_W3dGcOA156OrpoTHodaoCLqAAmaALl3XoA"
            />
            <div className="w-px h-8 bg-outline-variant"></div>
            <p className="font-label-md text-label-md text-on-surface-variant">
              Powered by INEC Nigeria Decides Infrastructure
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
