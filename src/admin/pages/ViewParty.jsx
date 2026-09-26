import Aside from "../layouts/Aside"
import Footer from "../layouts/Footer"

const ViewParty = () => {
    return (
        <>
            <div className="min-h-screen flex flex-col bg-background">
                <Aside />

                <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
                    <main className="grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-16">

                        <div className="mb-8">
                            <div className="flex items-center gap-2 text-on-surface-variant font-label-md mb-4">
                                <span>Voter Info</span>
                                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                                <span>Political Parties</span>
                                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                                <span className="text-primary font-bold">Party Profile</span>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-surface-container-highest border border-outline-variant flex items-center justify-center overflow-hidden shrink-0">
                                        <img className="w-full h-full object-cover" data-alt="A highly detailed official emblem of a fictional political party, designed in a modern corporate style. The logo features sharp geometric shapes in deep green and gold on a pristine white background, conveying stability and national pride. The lighting is flat and bright, suitable for a light-mode UI context." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5q9pCHavr7kLTNTGXGxkqR271ZY4qcsKnf1oJ38WFcd3bADXYLwMwg8TebhO264ymOR_ZftCKscDsEOGiFtF0DqXgLSS1IE49LfV4RQy_SmRdhP7yaZhDmQfhI7OagTJOGZtiz5p2YcIRSlRNA0VG_fJIh0l7FqdyOMcBPnhuEBbyLrRi7JEauxatTnepPKEd7HlCC78YWeYh9PL8Ik5kAjxyrg9vacDj5SxQr49npaXvbWcvVhcG" />
                                    </div>
                                    <div>
                                        <h1 className="font-headline-xl text-on-surface mb-2">National Progress Party</h1>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="px-3 py-1 bg-surface-container-high rounded-full font-label-md text-on-surface-variant border border-outline-variant">Acronym: NPP</span>
                                            <span className="px-3 py-1 bg-primary-container/10 text-primary rounded-full font-label-md border border-primary/20 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                                Fully Registered
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 px-6 py-3 bg-surface-container-high text-on-surface font-label-lg rounded-full border border-outline-variant hover:bg-surface-container-highest transition-colors">
                                    <span className="material-symbols-outlined">download</span>
                                    Download Manifesto
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-gutter">

                            <div className="lg:col-span-1 flex flex-col gap-6">

                                <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,107,63,0.05)]">
                                    <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant">
                                        <h2 className="font-headline-md text-on-surface">Quick Facts</h2>
                                    </div>
                                    <div className="p-6 flex flex-col gap-6">
                                        <div>
                                            <span className="block font-label-md text-on-surface-variant mb-1 uppercase tracking-wider">Founded</span>
                                            <span className="font-body-lg text-on-surface flex items-center gap-2">
                                                <span className="material-symbols-outlined text-outline">calendar_month</span>
                                                October 1, 1998
                                            </span>
                                        </div>
                                        <hr className="border-outline-variant/50" />
                                        <div>
                                            <span className="block font-label-md text-on-surface-variant mb-1 uppercase tracking-wider">Headquarters</span>
                                            <span className="font-body-lg text-on-surface flex items-start gap-2">
                                                <span className="material-symbols-outlined text-outline mt-1">location_on</span>
                                                <div>
                                                    14 Independence Avenue,<br />
                                                    Central Business District,<br />
                                                    Abuja, FCT.
                                                </div>
                                            </span>
                                        </div>
                                        <hr className="border-outline-variant/50" />
                                        <div>
                                            <span className="block font-label-md text-on-surface-variant mb-1 uppercase tracking-wider">Official Colors</span>
                                            <div className="flex gap-2 mt-2">
                                                <div className="w-8 h-8 rounded-full bg-primary border border-outline-variant" title="Nigerian Green"></div>
                                                <div className="w-8 h-8 rounded-full bg-[#ffffff] border border-outline-variant" title="White"></div>
                                                <div className="w-8 h-8 rounded-full bg-tertiary-container border border-outline-variant" title="Gold"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,107,63,0.05)]">
                                    <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant">
                                        <h2 className="font-headline-md text-on-surface">Core Ideology</h2>
                                    </div>
                                    <div className="p-6">
                                        <p className="font-body-md text-on-surface-variant leading-relaxed">
                                            The National Progress Party is committed to social democracy, emphasizing equitable wealth distribution, massive infrastructure development, and strong central governance. The party advocates for policies that support small businesses and agricultural expansion to drive national self-sufficiency.
                                        </p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <span className="px-3 py-1 bg-surface-container rounded-lg font-label-md text-on-surface">Social Democracy</span>
                                            <span className="px-3 py-1 bg-surface-container rounded-lg font-label-md text-on-surface">Agrarian Reform</span>
                                            <span className="px-3 py-1 bg-surface-container rounded-lg font-label-md text-on-surface">Federalism</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2 flex flex-col gap-6">

                                <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,107,63,0.05)]">
                                    <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant flex justify-between items-center">
                                        <h2 className="font-headline-md text-on-surface">National Working Committee</h2>
                                        <span className="font-label-md text-on-surface-variant bg-surface-container px-3 py-1 rounded-full border border-outline-variant">Term: 2022 - 2026</span>
                                    </div>
                                    <div className="p-0">

                                        <div className="flex items-center gap-4 p-4 md:px-6 border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                                            <div className="w-12 h-12 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant shrink-0">
                                                <img className="w-full h-full object-cover" data-alt="A professional headshot of a middle-aged Nigerian man in traditional attire, smiling confidently. The lighting is bright and corporate, set against a clean white background, reflecting a trustworthy institutional style suitable for a light-mode civic platform." src="https://lh3.googleusercontent.com/aida-public/AB6AXuApt8oW2CGKZrYqftp4LO0-aNckcvxXTq-MrDbTYacVKYpzXohgmYG0AlxwJ_ttNNUolcC85PCL7uEn8TB3VFD2hS25cUiFusy-3rZzrJC-u_4EU4EzGGUI5Db1CuCxS-vrrxyaBGmTavcNY_Cxkh14mCZkcTgJyNMwJRXYUe_g5lNRomVuaM1RexjzbKgBc88jDkbuniDFOiiGpx1CkJJazgN0swWM80FD92Uq3XrtLAlshONIVi5Q" />
                                            </div>
                                            <div className="grow">
                                                <h3 className="font-body-lg font-bold text-on-surface">Chief Adebayo Olanrewaju</h3>
                                                <p className="font-body-md text-on-surface-variant">National Chairman</p>
                                            </div>
                                            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined">info</span>
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-4 p-4 md:px-6 border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                                            <div className="w-12 h-12 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant shrink-0">
                                                <img className="w-full h-full object-cover" data-alt="A professional headshot of a mature Nigerian woman wearing modern corporate business wear, looking composed and authoritative. The lighting is bright and studio-quality, set against a light grey background, perfectly matching a clean, light-mode civic platform aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkL0Tao8bnbPWAtK-3Brb3H8n6gqhdfxhJHZIZXIswhxK2HIN3nL2wEO6denNVR4FwavoK5Mku_IRQOO98PyK-GctnwN4594LQE29VqCKuuR9-EmfukdrQuXX9Me14XHgge16B2D1S41d6-x33eHpCq6uEujVNGYuntTnvamzYNl0NSaaxNATNufjjk2Wxaik-g_CKScMwds0UlEcRjFZ_YLnlYgKfUZ287ka-1F0Kr2lKz2mA5Q5N" />
                                            </div>
                                            <div className="grow">
                                                <h3 className="font-body-lg font-bold text-on-surface">Hajiya Fatima Bello</h3>
                                                <p className="font-body-md text-on-surface-variant">National Secretary</p>
                                            </div>
                                            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined">info</span>
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-4 p-4 md:px-6 border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                                            <div className="w-12 h-12 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant shrink-0 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-outline">person</span>
                                            </div>
                                            <div className="grow">
                                                <h3 className="font-body-lg font-bold text-on-surface">Dr. Emmanuel Nwachukwu</h3>
                                                <p className="font-body-md text-on-surface-variant">National Publicity Secretary</p>
                                            </div>
                                            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined">info</span>
                                            </button>
                                        </div>
                                        <div className="p-4 bg-surface-container-lowest text-center">
                                            <a className="font-label-lg text-primary hover:underline" href="#">View All Executives</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default ViewParty