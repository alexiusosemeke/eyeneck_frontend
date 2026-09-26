import { useState, useRef } from "react"
import Aside from "../layouts/Aside"
import Footer from "../layouts/Footer"
import { Link } from "react-router-dom"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import api from "../../api/axios"
import { InputField, TextAreaField } from "../../components/FormField"
import Swal from "sweetalert2"

const CreateParty = () => {
    const fileInputRef = useRef(null)
    const FILE_SIZE_LIMIT = 2 * 1024 * 1024;
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];


    const validationSchema = yup.object().shape({
        name: yup.string().required('This field is required.'),
        party_initials: yup.string().max(5, 'Acronym should not be more than 5 characters').required('This field is required.'),
        party_slogan: yup.string().required('This field is required'),
        description: yup.string().required('This field is required'),
        logo: yup
            .mixed()
            .required("Logo is required")
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

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (key === "logo") {
                    formData.append(key, value[0]);
                } else {
                    formData.append(key, value);
                }
            });

            const response = await api.post("/parties/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            Swal.fire({
                title: "Success!",
                text: "Party added successfully",
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

    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Aside />

            <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
                <main className="flex-1 overflow-y-auto p-6 md:p-8">

                    {/* Top Action Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-outline-variant/50">
                        <div>
                            <Link
                                to={"/admin/parties"}
                                className="inline-flex items-center text-xs font-semibold text-primary hover:underline mb-2 gap-1"
                            >
                                <span className="material-symbols-outlined text-sm">arrow_back</span>
                                Back to Parties
                            </Link>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Register Political Party</h1>
                        </div>

                        {/* Top Form Actions */}

                    </div>

                    {/* 2-Column Dashboard Grid Layout */}
                    <form onSubmit={handleSubmit(onSubmit)} id="create-party-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* LEFT COLUMN: Main Form Inputs (8/12 cols) */}
                        <div className="lg:col-span-12 space-y-6">

                            {/* Card 1: Basic Information */}
                            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="material-symbols-outlined text-primary">badge</span>
                                    <h2 className="text-lg font-bold">1. Basic Information</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="md:col-span-2">
                                        <label htmlFor="partyName" className="block text-xs font-semibold mb-2">
                                            Official Party Name <span className="text-red-500">*</span>
                                        </label>
                                        <InputField id="partyName"
                                            type="text"
                                            name="name"
                                            {...register('name')}
                                            error={errors?.name?.message}
                                            placeholder="e.g. National Democratic Progress Party"
                                            className="w-full px-4 py-2.5 rounded-xl border border-outline-variant text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />

                                    </div>

                                    <div>
                                        <label htmlFor="acronym" className="block  text-xs font-semibold mb-2">
                                            Acronym <span className="text-red-500">*</span>
                                        </label>
                                        <InputField
                                            id="acronym"
                                            type="text"
                                            {...register('party_initials')}
                                            error={errors?.party_initials?.message}
                                            name={'party_initials'}
                                            placeholder="e.g. NDPP"
                                            className={`w-full px-4 py-2.5 rounded-xl border ${errors?.party_initials ? 'border-error' : 'border-outline-variant'}  text-sm focus:outline-none focus:ring-2 ${errors?.party_initials ? 'focus:ring-error/30' : 'focus:ring-primary/30'} uppercase`}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="slogan" className="block text-xs font-semibold mb-2">
                                            Official Slogan
                                        </label>
                                        <InputField
                                            id="slogan"
                                            type="text"
                                            name={'party_slogan'}
                                            {...register('party_slogan')}
                                            placeholder="e.g. Progress for All"
                                            error={errors?.party_slogan?.message}
                                            className={`w-full px-4 py-2.5 rounded-xl border ${errors?.party_slogan ? 'border-error' : 'border-outline-variant'}  text-sm focus:outline-none focus:ring-2 ${errors?.party_slogan ? 'focus:ring-error/30' : 'focus:ring-primary/30'} uppercase`}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Card 3: Address & Dates */}
                            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="material-symbols-outlined text-primary">location_city</span>
                                    <h2 className="text-lg font-bold">3. Other Information</h2>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label htmlFor="hqAddress" className="block text-xs font-semibold mb-2">
                                            Party Description
                                        </label>
                                        <TextAreaField
                                            id="hqAddress"
                                            rows={3}
                                            name={'description'}
                                            {...register('description')}
                                            error={errors?.description?.message}
                                            placeholder="Write a brief description about your party"
                                            className={`w-full px-4 py-2.5 rounded-xl border ${errors?.description ? 'border-error' : 'border-outline-variant'}text-sm focus:outline-none focus:ring-2 ${errors?.description ? 'focus:ring-error/30' : 'focus:ring-primary/30'} resize-y`}
                                        />
                                    </div>

                                    <h2 className="text-sm font-bold border-b border-outline-variant/40 pb-3">Visual Branding</h2>

                                    {/* Logo Dropzone */}
                                    <div>
                                        <label className="block text-xs font-semibold mb-2">Party Emblem / Logo</label>
                                        <InputField
                                            type="file"
                                            name="logo"
                                            {...register('logo')}
                                            error={errors?.logo?.message}
                                            accept="image/*"
                                            className="w-full border-2 border-dashed border-outline-variant hover:border-primary rounded-xl p-4 text-center cursor-pointer transition-colors bg-background flex flex-col items-center justify-center"
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => reset()}
                                    className="px-5 py-2.5 rounded-xl border border-outline text-xs font-semibold hover:bg-surface-container-high transition-colors"
                                >
                                    Reset
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    form="create-party-form"
                                    className="px-6 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-semibold shadow-sm hover:opacity-95 transition-opacity"
                                >
                                    {isSubmitting ? 'Processing' : 'Save Party'}
                                </button>
                            </div>
                        </div>



                    </form>
                </main>

                <Footer />
            </div>
        </div>
    )
}

export default CreateParty