import { useQuery } from "@tanstack/react-query";
import { InputField, LabelField, SelectField, TextAreaField } from "../../components/FormField";
import Aside from "../layouts/Aside";
import Footer from "../layouts/Footer";
import { FileText, ArrowRight, Save, Loader } from 'lucide-react';
import api from "../../api/axios";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";




const CreateElection = () => {

    const fetchElectionTypes = async () => {
        const response = await api.get("/admin/elections/types/");
        return response.data;
    }

    const { data: electionTypes = [], isLoading: electionTypesLoading, error: electionTypesError, refetch } = useQuery({
        queryKey: ["electionTypes"],
        queryFn: fetchElectionTypes,
        staleTime: 5 * 60 * 1000,
    });

    const fetchStatusTypes = async () => {
        const response = await api.get('/admin/elections/status_types/');
        return response.data;
    }

    const { data: statusTypes = [], isLoading: statusTypesLoading, error: statusTypesError } = useQuery({
        queryKey: ['statusTypes'],
        queryFn: fetchStatusTypes,
    });

    const selectOptions = electionTypes.map((type) => ({
        value: type.value,
        label: type.label,
    }));

    const statusOptions = statusTypes.map((type) => ({
        value: type.value,
        label: type.label,
    }));

    const validationSchema = yup.object().shape({
        title: yup.string().required("Election title is required."),
        description: yup.string().required('This field is required.'),
        election_type: yup.string().required("Election type is required."),
        status: yup.string().required('Select an initial status'),
        start_date: yup.date().typeError('Please enter a valid date').required('This field is required.'),
        end_date: yup.date().typeError('Please enter a valid date').min(yup.ref('start_date'), '').required('This field is required'),
    });

    const { register, handleSubmit, formState: { isSubmitting, errors }, setError } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {

        try {
            const response = await api.post('/admin/elections/', data);
            Swal.fire({
                title: 'Success',
                text: 'Election created successfully',
                icon: 'success'
            });

        } catch (err) {
            const error = err.response?.data;
            if (error) {

                if (error.detail || error.non_field_errors) {
                    setError('root', {
                        message: error.detail || error.non_field_errors
                    });
                } else {
                    Object.keys(error).forEach((field) => {
                        setError(field, { message: error[field][0] });
                    });
                }
            }
        }
    }

    return (
        <> <div className="min-h-screen flex flex-col bg-background">
            <Aside />

            <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="max-w-container-max mx-auto space-y-8">

                        <div className="flex items-start gap-4 pb-6 border-b border-slate-200">
                            <div className="p-3 bg-emerald-50 text-[#006847] rounded-xl">
                                <FileText className="w-7 h-7 stroke-[1.8]" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                                    Election Details
                                </h3>
                                <p className="text-sm text-slate-500 mt-1">
                                    Enter the fundamental parameters for the new electoral event.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <form onSubmit={handleSubmit(onSubmit)}>



                                {/* Section 1: General Election Information */}
                                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                                        <div className="p-2.5 bg-emerald-50 text-[#006847] rounded-xl">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-slate-900">General Information</h3>
                                            <p className="text-xs text-slate-500">Specify the primary identity and status of the election event.</p>
                                        </div>
                                    </div>

                                    {errors.root && (
                                        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                            <p className="text-sm text-red-600 font-medium">
                                                {errors.root.message}
                                            </p>
                                        </div>
                                    )}

                                    <div className="space-y-5">
                                        {/* Two Column: Election Type & Initial Status */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            {/* Election Title */}
                                            <div>
                                                <LabelField label={"Election Title"} className={'block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2'} id={'election_title'} />

                                                <div className="relative">
                                                    <InputField
                                                        id="election_title"
                                                        type="text"
                                                        placeholder="e.g., 2027 General Elections"
                                                        className={`w-full px-4 py-3 bg-slate-50/50 border rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${errors.title ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 ' : 'border-slate-200 focus:border-[#006847] focus:ring-[#006847]/20'}`}
                                                        name={'title'}
                                                        {...register('title')}
                                                        error={errors.title?.message} />
                                                </div>
                                                <p className="text-xs text-slate-400 mt-1.5">Provide an official, publicly recognizable title.</p>
                                            </div>

                                            {/* Election Type */}
                                            <div>
                                                <LabelField label={"Description"} className={'block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2'} id={'description'} />
                                                <div className="relative">
                                                    <TextAreaField
                                                        id="description"
                                                        rows={3}
                                                        placeholder="e.g., 2027 General Elections..."
                                                        className={`w-full px-4 py-3 bg-slate-50/50 border rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 ' : 'border-slate-200 focus:border-[#006847] focus:ring-[#006847]/20'}`}
                                                        name={'description'}
                                                        {...register('description')}
                                                        error={errors.description?.message} />
                                                </div>
                                            </div>



                                            {/* Election Type */}
                                            <div>
                                                <LabelField label={"Election Type"} className={'block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2'} id={'election_type'} />
                                                <div className="relative">
                                                    <SelectField
                                                        className={`w-full appearance-none px-4 py-3 bg-slate-50/50 border rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2  pr-10 transition-all cursor-pointer ${errors.election_type ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 ' : 'border-slate-200 focus:border-[#006847] focus:ring-[#006847]/20'}`}
                                                        id="election_type"
                                                        placeholder={"Select an Election type"}
                                                        options={selectOptions}
                                                        name={"election_type"}
                                                        disabled={electionTypesLoading}
                                                        {...register('election_type')}
                                                        error={errors.election_type?.message}

                                                    />

                                                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Initial Status */}
                                            <div>
                                                <LabelField label={" Initial Lifecycle Status"} className={'block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2'} id={'status'} />
                                                <div className="relative">
                                                    <SelectField
                                                        className={`w-full appearance-none px-4 py-3 bg-slate-50/50 border rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2  pr-10 transition-all cursor-pointer ${errors.status ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 ' : 'border-slate-200 focus:border-[#006847] focus:ring-[#006847]/20'}`}
                                                        id={"status"}
                                                        placeholder={"Select an Election Status"}
                                                        options={statusOptions}
                                                        name={"status"}
                                                        disabled={statusTypesLoading}
                                                        {...register('status')}
                                                        error={errors.status?.message}

                                                    />
                                                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Critical Timelines */}
                                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                                        <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-slate-900">Critical Timelines</h3>
                                            <p className="text-xs text-slate-500">Configure key deadlines for electoral compliance and voter operations.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {/* Election Start Date */}
                                        <div>
                                            <LabelField label={'Start Date'} id={'start_date'} className={'block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2'} />
                                            <InputField
                                                id="start_date"
                                                type="date"
                                                className={`w-full px-4 py-3 bg-slate-50/50 border rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${errors.title ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 ' : 'border-slate-200 focus:border-[#006847] focus:ring-[#006847]/20'}`}
                                                name={'start_date'}
                                                {...register('start_date')}
                                                error={errors.start_date?.message}

                                            />
                                        </div>

                                        {/* Election End Date */}
                                        <div>
                                            <LabelField label={'End Date'} id={'end_date'} className={'block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2'} />
                                            <InputField
                                                id="end_date"
                                                type="date"
                                                className={`w-full px-4 py-3 bg-slate-50/50 border rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${errors.title ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 ' : 'border-slate-200 focus:border-[#006847] focus:ring-[#006847]/20'}`}
                                                name={'end_date'}
                                                {...register('end_date')}
                                                error={errors.end_date?.message}

                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
                                    <button
                                        id="btn-save-draft-step1"
                                        type="button"

                                        className="px-5 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>Save as Draft</span>
                                    </button>

                                    <button
                                        id="btn-next-step-1"
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-2.5 bg-[#006847] hover:bg-[#005238] text-white rounded-lg text-sm font-semibold flex items-center gap-2 shadow-xs transition-colors"
                                    >
                                        {isSubmitting ?
                                            <><span>Processing</span>
                                                <Loader className="w-4 h-4" /></> :
                                            <><span>Next: Submit</span>
                                                <ArrowRight className="w-4 h-4" /></>}
                                    </button>
                                </div>
                            </form>


                        </div>

                    </div>
                </main>
                <Footer />
            </div>
        </div></>
    )
}

export default CreateElection