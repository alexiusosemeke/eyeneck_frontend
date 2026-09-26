import Swal from "sweetalert2";
import {useForm} from "react-hook-form";
import Footer from "../layouts/Footer.jsx";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import {Link, useNavigate} from "react-router-dom";
import {InputField} from "../../components/FormField.jsx";
import api from "../../api/axios.js";
import {useAuth} from "../../contexts/useAuth.js";


const validationSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email address.").required("This field is required."),
    password: yup.string().required("This field is required.")
})


const Login = () => {

    const navigate = useNavigate();
    const { adminLogin } = useAuth();

    const {register, formState: {errors, isSubmitting}, handleSubmit} = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (data) => {
        try {
            const user = await adminLogin(data);

            console.log(user);

            if(user.role === 'admin') {
                navigate('/admin/dashboard');
            }else{
                Swal.fire({
                    title: 'Error',
                    text: 'Unauthorized',
                    icon: 'error',
                });
            }
        }catch(error) {
            console.log(error)
        }

    }


    return (
        <>
            <main className="grow flex items-center justify-center p-margin-mobile md:p-margin-desktop z-10 relative">

                <div
                    className="w-full max-w-120 bg-surface rounded-xl border border-outline-variant shadow-ambient overflow-hidden flex flex-col">

                    <div
                        className="bg-surface-container-low border-b border-outline-variant p-8 flex flex-col items-center justify-center text-center">

                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-on-primary text-[32px]"
                                  style={{ fontVariationSettings: "'FILL' 1" }}>shield_locked</span>
                        </div>
                        <h1 className="font-headline-md text-headline-md text-on-surface mb-1">EYENECK Voter Portal</h1>
                        <p className="font-body-md text-body-md text-on-surface-variant">Administrative Access Console</p>
                    </div>

                    <div className="p-8">

                        <div className="flex items-center justify-center mb-8">
                            <div
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant text-on-surface-variant">
                                <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
                                <span className="font-label-md text-label-md uppercase tracking-wider text-primary">Secure System Access</span>
                            </div>
                        </div>
                        <form className="flex flex-col gap-6" method="POST" onSubmit={handleSubmit(onSubmit)}>

                            <div className="flex flex-col gap-2">
                                <label className="font-label-lg text-label-lg text-on-surface flex items-center gap-2"
                                       htmlFor="officer_id">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-outline">badge</span>
                                    </div>
                                    <InputField
                                        className="block w-full pl-10 pr-3 py-3 border border-outline rounded-lg bg-surface text-on-surface font-body-md text-body-md placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        id="email"
                                        name="email"
                                        placeholder="Enter email address"
                                        type={'text'}
                                        {...register('email')}
                                        error={errors.email?.message}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-label-lg text-label-lg text-on-surface flex items-center gap-2"
                                       htmlFor="password">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-outline">key</span>
                                    </div>
                                    <InputField
                                        className="block w-full pl-10 pr-3 py-3 border border-outline rounded-lg bg-surface text-on-surface font-body-md text-body-md placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        id="password"
                                        name="password"
                                        placeholder="********"
                                        type={'password'}
                                        {...register('password')}
                                        error={errors.password?.message}
                                    />
                                    <button
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-primary transition-colors focus:outline-none"
                                        onClick="togglePassword()" type="button">
                                        <span className="material-symbols-outlined" id="toggle_icon">visibility</span>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-2">
                                <button
                                    className="w-full flex justify-center items-center gap-2 bg-primary text-on-primary font-label-lg text-label-lg py-3.5 px-4 rounded-full hover:bg-on-primary-fixed-variant active:scale-[0.98] transition-all border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    type="submit" disabled={isSubmitting}>

                                    <span>{isSubmitting ? 'Processing' : 'Authenticate'}</span>
                                    <span
                                        className="material-symbols-outlined"
                                        style={{ fontVariationSettings: "'FILL' 1" }}>{isSubmitting ? "sync" : "login"}
                                    </span>
                                </button>
                            </div>

                            <div
                                className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2 pt-6 border-t border-surface-container-highest">
                                <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors underline flex items-center gap-1"
                                   href="#">
                                    <span className="material-symbols-outlined text-[14px]">help</span>
                                    Forgot ID?
                                </a>
                                <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors underline flex items-center gap-1"
                                   href="#">
                                    <span className="material-symbols-outlined text-[14px]">support_agent</span>
                                    Contact IT Support
                                </a>
                            </div>
                        </form>
                    </div>

                    <div className="h-1.5 w-full bg-primary"></div>
                </div>
            </main>
            <Footer/>
        </>
    )
}
export default Login
