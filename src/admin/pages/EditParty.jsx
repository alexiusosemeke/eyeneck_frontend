import Swal from "sweetalert2"
import Aside from "../layouts/Aside"
import Footer from "../layouts/Footer"
import { useQuery } from "@tanstack/react-query"
import { Link, useNavigate, useParams } from "react-router-dom"
import api from "../../api/axios"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { useForm } from "react-hook-form"
import { InputField, LabelField, TextAreaField } from "../../components/FormField"
import { useEffect } from "react"

const EditParty = () => {

    const FILE_SIZE_LIMIT = 2 * 1024 * 1024;
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

    const updateSchema = yup.object().shape({
        name: yup.string().required('This field is required'),
        party_initials: yup.string().required('This field is required').max(6, 'Party initials cannot exceed 6 characters'),
        description: yup.string().required('This field is required'),
        party_slogan: yup.string('Slogan must contain only alphabets'),
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

    const { id } = useParams();
    const navigate = useNavigate();

    const { data: getParty = {}, isLoading: partyLoading, error: partyError } = useQuery({
        queryKey: ['party', id],
        queryFn: async () => {
            const response = await api.get(`/parties/${id}/`)
            return response?.data
        }
    });

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: yupResolver(updateSchema),
        defaultValues: ({
            name: "",
            party_initials: "",
            party_slogan: "",
            description: "",
            logo: null
        })
    });

    useEffect(() => {
        if (getParty) {
            reset({
                name: getParty?.name,
                party_initials: getParty.party_initials,
                party_slogan: getParty.party_slogan,
                description: getParty.description,
                logo: null,
            });
        }
    }, [getParty, reset]);

    const onSubmit = async (data) => {

        try {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (key === 'logo') {
                    formData.append(key, value[0]);
                } else {
                    formData.append(key, value)
                }
            });

            const response = await api.patch(`/parties/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Swal.fire({
                title: "Success!",
                text: "Party updated successfully",
                icon: "success",
            });
        } catch (error) {
            console.error("An error occurred: ", error);
            const data = error.response?.data;

            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: data?.non_field_errors?.[0] || "An error occurred.",
            });
        }

    }
    return (
        <>
            <div className="min-h-screen flex flex-col bg-background">
                <Aside />

                <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
                    <main className="grow flex flex-col min-w-0">

                        <div className="mb-8">
                            <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md mb-2">
                                <a className="hover:underline" href="#">Dashboard</a>
                                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                                <Link className="hover:underline" to={'/admin/parties'}>Political Parties</Link>
                                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                                <span className="text-on-surface">Update Party</span>
                            </div>
                            <h1 className="font-headline-lg md:font-headline-xl text-headline-lg md:text-headline-xl text-on-surface">Update Party Information</h1>
                            <p className="font-body-md text-body-md text-on-surface-variant mt-2">Modify the official records for the selected political entity.</p>
                        </div>

                        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_4px_20px_rgba(0,107,63,0.05)] overflow-hidden">
                            <div className="bg-surface-container-low px-8 py-4 border-b border-outline-variant">
                                <h2 className="font-headline-md text-headline-md text-on-surface">Party Details</h2>
                            </div>
                            {partyError && <div className="font-bold text-2xl text-red-500">An error occurred</div>}
                            {partyLoading ? <div>Loading...</div> :
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="p-8 flex flex-col gap-8"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                        <div className="flex flex-col gap-2">
                                            <LabelField
                                                id={'party_name'}
                                                label={'Party Name'}
                                                className="font-label-lg text-label-lg text-on-surface"
                                            />
                                            <InputField
                                                className="h-12 px-4 rounded border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-md text-body-md text-on-surface transition-all"
                                                id="party_name"
                                                type="text"
                                                name={'name'}
                                                {...register('name')}
                                                error={errors.name?.message}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <LabelField
                                                id={'party_initials'}
                                                label={'Party Initials'}
                                                className="font-label-lg text-label-lg text-on-surface"
                                            />
                                            <InputField
                                                className="h-12 px-4 rounded border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-md text-body-md text-on-surface transition-all uppercase"
                                                id="partyAcronym"
                                                type="text"
                                                name={'party_initials'}
                                                {...register('party_initials')}
                                                error={errors.party_initials?.message}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <LabelField
                                            id={'party_slogan'}
                                            label={'Party Slogan'}
                                            className="font-label-lg text-label-lg text-on-surface"
                                        />
                                        <InputField
                                            className="h-12 px-4 rounded border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-md text-body-md text-on-surface transition-all uppercase"
                                            id="partyAcronym"
                                            type="text"
                                            name={'party_slogan'}
                                            {...register('party_slogan')}
                                            error={errors.party_slogan?.message}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                                        <div className="flex flex-col gap-2">
                                            <LabelField
                                                id={'logo'}
                                                label={'Official Party Logo'}
                                                className="font-label-lg text-label-lg text-on-surface"
                                            />
                                            <InputField
                                                type="file"
                                                name="logo"
                                                id="logo"
                                                {...register('logo')}
                                                error={errors?.logo?.message}
                                                accept="image/*"
                                                className="w-full border-2 border-dashed border-outline-variant hover:border-primary rounded-xl p-4 text-center cursor-pointer transition-colors bg-background flex flex-col items-center justify-center"
                                            />
                                        </div>


                                        <div className="flex flex-col gap-2">
                                            <LabelField
                                                id={'description'}
                                                label={'Party Description'}
                                                className="font-label-lg text-label-lg text-on-surface"
                                            />
                                            <TextAreaField
                                                className={`w-full px-4 rounded border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-md text-body-md text-on-surface transition-all uppercase ${errors?.description ? 'border-error' : 'border-outline-variant'} ${errors?.description ? 'focus:ring-error/30' : 'focus:ring-primary/30'}`}
                                                id="description"
                                                rows={4}
                                                name={'description'}
                                                {...register('description')}
                                                error={errors.description?.message}
                                            />
                                        </div>

                                    </div>

                                    <div className="flex justify-end gap-4 pt-6 border-t border-outline-variant mt-4">
                                        <button className="px-6 py-3 rounded border border-outline-variant text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high transition-colors" type="button">
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-3 rounded bg-primary text-on-primary font-label-lg text-label-lg hover:opacity-90 transition-opacity shadow-[0_4px_20px_rgba(0,107,63,0.1)]"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Processing...' : 'Save Changes'}
                                        </button>
                                    </div>
                                </form>
                            }

                        </div>

                    </main>
                </div >
                <Footer />
            </div >
        </>
    )
}

export default EditParty