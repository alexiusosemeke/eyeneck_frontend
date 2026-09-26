import {useState, useEffect} from "react";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import { useAuth } from "../../../contexts/useAuth";
import {InputField, LabelField} from "../../FormField.jsx";
import Swal from "sweetalert2";
import api from "../../../api/axios.js";


const ChangePassword = () => {

    const {user} = useAuth();

    const validationSchema = yup.object().shape({
        password: yup.string().required('This field is required'),
        new_password: yup.string().required('This field is required').min(8, 'Password must be at least 8 characters'),
        confirm_password: yup.string().required('This field is required').oneOf([yup.ref('new_password')], 'Passwords must match'),
    });

    const {register, handleSubmit, formState: {errors, isSubmitting}, setError,} = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {
        // const response = await api.patch('/users/change_password/', data);
        try {
            const response = await api.patch('/users/change_password/', data);
            Swal.fire({
                icon: "success",
                title: "Password Changed Successfully",
                text: "Your password has been changed."
            });
        } catch (error) {
            if (error.response?.data) {
                const errors = error.response.data;

                Object.entries(errors).forEach(([field, messages]) => {
                    setError(field, {
                        type: "server",
                        message: Array.isArray(messages)
                            ? messages[0]
                            : messages,
                    });
                });
            }
        }

    }
    return (
        <>
            <section
                className="settings-card bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden"
                id="profile"
            >
                <div className="bg-surface-container px-6 py-4 border-b border-outline-variant flex justify-between items-center">
                    <h2 className="font-headline-md text-headline-md text-on-surface">
                        Change Password
                    </h2>
                    <span
                        className="material-symbols-outlined text-primary font-label-lg bg-primary/10 px-3 py-1 rounded-full"
                        data-icon="lock"
                    >
            lock
          </span>
                </div>
                <div className="p-8">
                    <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
                        <div className="flex flex-col md:flex-row items-start gap-10">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                <div className="flex flex-col gap-2">
                                    <LabelField
                                        label={"Current Password"}
                                        className={"font-label-lg text-on-surface-variant"}
                                        id={"password"}
                                    />
                                    <InputField
                                        className="bg-white border border-outline-variant px-4 h-12 rounded focus:border-2 focus:border-primary outline-none text-on-surface font-body-md transition-all"
                                        type="password"
                                        id="password"
                                        name="password"
                                        {...register('password')}
                                        error={errors.password?.message}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <LabelField
                                        label={"New Password"}
                                        className={"font-label-lg text-on-surface-variant"}
                                        id={"new_password"}
                                    />
                                    <InputField
                                        className="bg-white border border-outline-variant px-4 h-12 rounded focus:border-2 focus:border-primary outline-none text-on-surface font-body-md transition-all"
                                        type="password"
                                        id="new_password"
                                        name="new_password"
                                        {...register('new_password')}
                                        error={errors.new_password?.message}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <LabelField
                                        label={"Confirm Password"}
                                        className={"font-label-lg text-on-surface-variant"}
                                        id={"confirm_password"}
                                    />
                                    <InputField
                                        className="bg-white border border-outline-variant px-4 h-12 rounded focus:border-2 focus:border-primary outline-none text-on-surface font-body-md transition-all"
                                        type="password"
                                        id="confirm_password"
                                        name="confirm_password"
                                        {...register('confirm_password')}
                                        error={errors.confirm_password?.message}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 flex justify-end">
                            <button
                                type="submit"
                                name={"submit"}
                                className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-lg hover:opacity-90 active:scale-95 transition-all shadow-md"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Changing Password..." : "Change Password"}
                            </button>

                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
export default ChangePassword
