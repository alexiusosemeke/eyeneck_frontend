import Aside from "../layouts/Aside"
import Footer from "../layouts/Footer"
import { Link } from "react-router-dom"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import api from "../../api/axios"
import { InputField, TextAreaField, SelectField } from "../../components/FormField"
import Swal from "sweetalert2"
import { useQuery } from "@tanstack/react-query"


const CreatePosition = () => {


    const validationSchema = yup.object().shape({
        name: yup.string().required('This field is required.'),
        election: yup.string().required('This field is required'),
        description: yup.string().required('This field is required'),
    });

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const selectedPosition = watch("name")

    const fetchPositionChoices = async () => {
        const res = await api.get('/positions/choices/');
        return res?.data;
    }

    const { data: choicesData = [], isLoading: choicesLoading, error: choicesError } = useQuery({
        queryKey: ['choices'],
        queryFn: fetchPositionChoices,

    })

    const fetchElections = async () => {
        const res = await api.get('/elections/');
        return res?.data?.results
    }

    const { data: electionsData = [], isLoading: electionsLoading, error: electionsError, refetch: electionsRefetch } = useQuery({
        queryKey: ['elections'],
        queryFn: fetchElections,
        enabled: !!selectedPosition
    });

    const electionsSelectOption = electionsData.map((elections) => ({
        value: elections?.id,
        label: `${elections?.title} (${elections?.election_type})`,
    }));

    const choicesOption = choicesData.map((choice) => ({
        value: choice?.label,
        label: choice?.label
    }));

    console.log(choicesOption)




    const onSubmit = async (data) => {
        try {
            const response = await api.post("/positions/", data);
            Swal.fire({
                title: "Success!",
                text: "Position created successfully",
                icon: "success",
            });
            electionsRefetch
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
                                to={"/admin/positions"}
                                className="inline-flex items-center text-xs font-semibold text-primary hover:underline mb-2 gap-1"
                            >
                                <span className="material-symbols-outlined text-sm">arrow_back</span>
                                Back to Positions
                            </Link>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Create Position</h1>
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
                                    <div>

                                        <label htmlFor="positionName" className="block text-xs font-semibold mb-2">
                                            Postion Name <span className="text-red-500">*</span>
                                        </label>
                                        <SelectField
                                            placeholder={'Select a position'}
                                            error={errors?.name?.message}
                                            options={choicesOption}
                                            disabled={choicesLoading}
                                            name={"name"}
                                            id={"name"}
                                            {...register('name')}
                                            error={errors?.name?.message}
                                            className={`w-full px-4 py-2.5 rounded-xl border ${errors?.name ? 'border-error focus:ring-error/30' : 'border-outline-variant focus:ring-primary/30'} text-sm focus:outline-none focus:ring-2 capitalize`}
                                        />

                                    </div>

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

                                </div>
                            </div>

                            {/* Card 2: Election & Position Details */}
                            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="material-symbols-outlined text-primary">how_to_vote</span>
                                    <h2 className="text-lg font-bold">2. Position Description</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
                                    {/* Position Description Field */}
                                    <div>
                                        <label htmlFor="positionDescription" className="block text-xs font-semibold mb-2">
                                            Position Description
                                        </label>
                                        <TextAreaField
                                            id="positionDescription"
                                            rows={3}
                                            name={'description'}
                                            {...register('description')}
                                            error={errors?.description?.message}
                                            placeholder="Write a brief description about the position"
                                            className={`w-full px-4 py-2.5 rounded-xl border ${errors?.description ? 'border-error' : 'border-outline-variant'}text-sm focus:outline-none focus:ring-2 ${errors?.description ? 'focus:ring-error/30' : 'focus:ring-primary/30'} resize-y`}
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
                                    {isSubmitting ? 'Processing' : 'Save Position'}
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

export default CreatePosition