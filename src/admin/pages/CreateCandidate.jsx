import { useState, useRef } from "react"
import Aside from "../layouts/Aside"
import Footer from "../layouts/Footer"
import { Link } from "react-router-dom"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import api from "../../api/axios"
import { InputField, SelectField, TextAreaField } from "../../components/FormField"
import Swal from "sweetalert2"
import { useQuery } from "@tanstack/react-query"

const CreateCandidate = () => {
    const fileInputRef = useRef(null)
    const FILE_SIZE_LIMIT = 2 * 1024 * 1024;
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];


    const validationSchema = yup.object().shape({
        user: yup.number().required('This field is required.'),
        is_active: yup.boolean(),
        party: yup.string().required('This field is required'),
        election: yup.string().required('This field is required'),
        position: yup.string().required('This field is required'),
        candidate_image: yup
            .mixed()
            .required("Candidate image is required")
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

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const selectedElection = watch("election");

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (key === "candidate_image") {
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
                text: "Candidate added successfully",
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

    const fetchUsers = async () => {
        const response = await api.get('/users/');
        return response?.data?.results
    }

    const { data: usersData = [], isLoading: usersLoading, error: usersError, refetch: userRefetch } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers
    });



    const fetchElections = async () => {
        const res = await api.get('/elections/');
        return res?.data?.results
    }

    const { data: electionsData = [], isLoading: electionsLoading, error: electionsError, refetch: electionsRefetch } = useQuery({
        queryKey: ['elections'],
        queryFn: fetchElections
    });

    const fetchParties = async () => {
        const res = await api.get('/parties/');
        return res?.data?.results
    }

    const { data: partiesData = [], isLoading: partiesLoading, error: partiesError } = useQuery({
        queryKey: ['parties'],
        queryFn: fetchParties,
    });

    const fetchPositions = async () => {
        const res = await api.get(`/positions/?election=${selectedElection}`);
        return res?.data?.results
    }

    const { data: positionsData = [], isLoading: positionsLoading, error: positionsError, refetch: positionsRefetch } = useQuery({
        queryKey: ['positions', selectedElection],
        queryFn: fetchPositions,
        enabled: !!selectedElection,
    });

    const userSelectOption = usersData.map((users) => ({
        value: users?.id,
        label: `${users?.first_name} ${users?.last_name}`,
    }));

    const partiesSelectOption = partiesData.map((parties) => ({
        value: parties?.id,
        label: `${parties?.name} (${parties?.party_initials})`,
    }));

    const electionsSelectOption = electionsData.map((elections) => ({
        value: elections?.id,
        label: `${elections?.title} (${elections?.election_type})`,
    }));

    const positionsSelectOption = positionsData.map((positions) => ({
        value: positions?.id,
        label: `${positions?.name}`,
    }));

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Aside />

            <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
                <main className="flex-1 overflow-y-auto p-6 md:p-8">

                    {/* Top Action Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-outline-variant/50">
                        <div>
                            <Link
                                to={"/admin/candidates"}
                                className="inline-flex items-center text-xs font-semibold text-primary hover:underline mb-2 gap-1"
                            >
                                <span className="material-symbols-outlined text-sm">arrow_back</span>
                                Back to Candidates
                            </Link>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Create a New Candidate</h1>
                        </div>

                        {/* Top Form Actions */}

                    </div>

                    {/* 2-Column Dashboard Grid Layout */}
                    <form onSubmit={handleSubmit(onSubmit)} id="create-candidate-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-12 space-y-6">

                            {/* Card 1: Candidate & Affiliation */}
                            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="material-symbols-outlined text-primary">person</span>
                                    <h2 className="text-lg font-bold">1. Candidate Information</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* User Field */}
                                    <div>
                                        <label htmlFor="user" className="block text-xs font-semibold mb-2">
                                            Select User / Candidate <span className="text-red-500">*</span>
                                        </label>
                                        <SelectField
                                            placeholder={'Choose a User'}
                                            error={errors?.user?.message}
                                            options={userSelectOption}
                                            disabled={usersLoading}
                                            name={"user"}
                                            {...register('user')}
                                            id={"user"}
                                            className={`w-full px-4 py-2.5 rounded-xl border ${errors?.user ? 'border-error focus:ring-error/30' : 'border-outline-variant focus:ring-primary/30'} text-sm focus:outline-none focus:ring-2 capitalize`}
                                        />
                                    </div>

                                    {/* Party Field */}
                                    <div>
                                        <label htmlFor="party" className="block text-xs font-semibold mb-2">
                                            Political Party <span className="text-red-500">*</span>
                                        </label>
                                        <SelectField
                                            placeholder={'Choose a Party'}
                                            error={errors?.party?.message}
                                            options={partiesSelectOption}
                                            disabled={partiesLoading}
                                            {...register('party')}
                                            name={"party"}
                                            id={"party"}
                                            className={`w-full px-4 py-2.5 rounded-xl border ${errors?.party ? 'border-error focus:ring-error/30' : 'border-outline-variant focus:ring-primary/30'} text-sm focus:outline-none focus:ring-2 capitalize`}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Election & Position Details */}
                            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="material-symbols-outlined text-primary">how_to_vote</span>
                                    <h2 className="text-lg font-bold">2. Election & Position</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Election Field */}
                                    <div>
                                        <label htmlFor="election" className="block text-xs font-semibold mb-2">
                                            Election <span className="text-red-500">*</span>
                                        </label>
                                        <SelectField
                                            placeholder={'Select election'}
                                            error={errors?.election?.message}
                                            options={electionsSelectOption}
                                            disabled={electionsLoading}
                                            name={"election"}
                                            id={"election"}
                                            {...register('election')}
                                            error={errors?.election?.message}
                                            className={`w-full px-4 py-2.5 rounded-xl border ${errors?.election ? 'border-error focus:ring-error/30' : 'border-outline-variant focus:ring-primary/30'} text-sm focus:outline-none focus:ring-2 capitalize`}
                                        />
                                    </div>

                                    {/* Position Field */}
                                    <div>
                                        <label htmlFor="position" className="block text-xs font-semibold mb-2">
                                            Position Contested <span className="text-red-500">*</span>
                                        </label>
                                        <SelectField
                                            placeholder={'Select position'}
                                            error={errors?.position?.message}
                                            disabled={positionsLoading}
                                            options={positionsSelectOption}
                                            name={"position"}
                                            id={"position"}
                                            {...register('position')}
                                            error={errors?.position?.message}
                                            className={`w-full px-4 py-2.5 rounded-xl border ${errors?.position ? 'border-error focus:ring-error/30' : 'border-outline-variant focus:ring-primary/30'} text-sm focus:outline-none focus:ring-2 capitalize`}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Card 3: Media & Status */}
                            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="material-symbols-outlined text-primary">settings</span>
                                    <h2 className="text-lg font-bold">3. Media & Status</h2>
                                </div>

                                <div className="space-y-6">
                                    {/* Candidate Image Field */}
                                    <div>
                                        <label htmlFor="candidate_image" className="block text-xs font-semibold mb-2">
                                            Candidate Photo / Image
                                        </label>
                                        <InputField
                                            id="candidate_image"
                                            type="file"
                                            name="candidate_image"
                                            {...register('candidate_image')}
                                            error={errors?.candidate_image?.message}
                                            accept="image/*"
                                            className="w-full border-2 border-dashed border-outline-variant hover:border-primary rounded-xl p-4 text-center cursor-pointer transition-colors bg-background flex flex-col items-center justify-center"
                                        />
                                    </div>

                                    {/* Is Active Toggle / Checkbox */}
                                    <div className="flex items-center gap-3 pt-2">
                                        <input
                                            type="checkbox"
                                            id="is_active"
                                            name="is_active"
                                            {...register('is_active')}
                                            className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary/30 cursor-pointer"
                                        />
                                        <label htmlFor="is_active" className="text-xs font-semibold text-on-surface cursor-pointer select-none">
                                            Active Candidate Status (Check to enable participation)
                                        </label>
                                    </div>
                                    {errors?.is_active?.message && (
                                        <p className="text-xs text-error mt-1">{errors.is_active.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 justify-end">
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
                                    form="create-candidate-form"
                                    className="px-6 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-semibold shadow-sm hover:opacity-95 transition-opacity disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Processing...' : 'Save Candidate'}
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

export default CreateCandidate