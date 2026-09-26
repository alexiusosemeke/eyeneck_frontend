import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function VotingGuidelines() {
  const [activeTab, setActiveTab] = useState("bvas");
  const [openFaq, setOpenFaq] = useState(null);

  const stepList = [
    {
      step: "01",
      title: "Arrival & Polling Unit Verification",
      time: "8:30 AM - 2:30 PM",
      description:
        "Arrive at your registered Polling Unit (PU). Check the printed voter register list posted at the center to confirm your name is listed before joining the queue.",
      icon: "pin_drop",
      highlight: "Must have physical PVC",
    },
    {
      step: "02",
      title: "Biometric Accreditation via BVAS",
      time: "Biometric Scan",
      description:
        "Present your physical Permanent Voter Card (PVC) to the Assistant Presiding Officer. The BVAS device will scan your card and verify your fingerprints or facial biometrics.",
      icon: "fingerprint",
      highlight: "Facial fallback if fingerprints fail",
    },
    {
      step: "03",
      title: "Register Ticking & Ballot Paper Issuance",
      time: "Official Stamp",
      description:
        "Once verified, your name is ticked on the official voter register and your indelible finger ink is applied. You receive an officially stamped and signed ballot paper.",
      icon: "description",
      highlight: "Ensure ballot is stamped & signed",
    },
    {
      step: "04",
      title: "Secret Voting in Cubicle",
      time: "Privacy Guaranteed",
      description:
        "Proceed into the voting cubicle. Stain your thumb with indelible ink and mark cleanly inside the box next to your preferred party logo. Fold the paper vertically inward.",
      icon: "how_to_vote",
      highlight: "No cameras/phones in cubicle",
    },
    {
      step: "05",
      title: "Casting Your Ballot",
      time: "Ballot Box",
      description:
        "Step out of the cubicle and gently drop your folded ballot paper into the transparent ballot box corresponding to that specific election.",
      icon: "archive",
      highlight: "Cast ballot in plain view",
    },
    {
      step: "06",
      title: "Peaceful Observation or Departure",
      time: "Post-Voting",
      description:
        "After casting your vote, you may leave peacefully or remain at least 300 meters away to observe open ballot counting and PU result declaration.",
      icon: "visibility",
      highlight: "Results uploaded to IReV portal",
    },
  ];

  const faqs = [
    {
      id: "faq-1",
      question: "What time do Polling Units open and close on Election Day?",
      answer:
        "Polling units open officially nationwide at 8:30 AM. Accreditation and voting happen simultaneously until 2:30 PM. However, any voter already standing in line at or before 2:30 PM is legally entitled to be accredited and cast their vote.",
    },
    {
      id: "faq-2",
      question: "Can I vote with a Temporary Voter Slip (TVC) or digital copy?",
      answer:
        "No. Under the Electoral Act 2022, only voters presenting their physical Permanent Voter Card (PVC) can be accredited by the BVAS device and allowed to vote.",
    },
    {
      id: "faq-3",
      question:
        "What happens if the BVAS device fails to read my fingerprints?",
      answer:
        "If fingerprint authentication fails after multiple attempts, poll officials will instantly initiate facial recognition biometrics on the same BVAS device to verify your identity.",
    },
    {
      id: "faq-4",
      question: "Are smartphones or cameras allowed inside the voting cubicle?",
      answer:
        "No. To preserve ballot secrecy and prevent vote-buying (photo-proof of vote), phones, smartwatches, and cameras are strictly prohibited inside the voting cubicle.",
    },
    {
      id: "faq-5",
      question: "How are election results verified at the Polling Unit level?",
      answer:
        "When voting ends, ballots are counted openly at the PU. The Presiding Officer records the scores on Form EC8A, signs it alongside party agents, takes a photo of Form EC8A with BVAS, and uploads it directly to the public INEC Result Viewing Portal (IReV).",
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-surface py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Banner Header */}
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 sm:p-10 space-y-4 shadow-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-surface-container-high border border-outline-variant/60 text-primary text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-base">
                  gavel
                </span>
                Official Voter Education
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                Electoral Act 2022 Compliant
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
              Official Election Day Voting Guidelines
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
              Understand your rights, step-by-step accreditation procedures,
              BVAS biometric rules, ballot secrecy enforcement, and election
              offenses to ensure your vote counts smoothly.
            </p>
          </div>

          {/* Essential Rules Notice Box */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-surface-container-low border border-outline-variant/60 rounded-2xl flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-2xl shrink-0 mt-0.5">
                badge
              </span>
              <div>
                <h3 className="font-bold text-sm text-on-surface">
                  No PVC, No Voting
                </h3>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  You must present your physical Permanent Voter Card for BVAS
                  scanning. Copies or temporary slips are not valid.
                </p>
              </div>
            </div>

            <div className="p-5 bg-surface-container-low border border-outline-variant/60 rounded-2xl flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-2xl shrink-0 mt-0.5">
                schedule
              </span>
              <div>
                <h3 className="font-bold text-sm text-on-surface">
                  Queue Cut-Off Time
                </h3>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Voting runs 8:30 AM to 2:30 PM. Every registered voter in
                  queue at 2:30 PM must be accredited and allowed to vote.
                </p>
              </div>
            </div>

            <div className="p-5 bg-surface-container-low border border-outline-variant/60 rounded-2xl flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-2xl shrink-0 mt-0.5">
                no_photography
              </span>
              <div>
                <h3 className="font-bold text-sm text-on-surface">
                  No Cameras in Cubicle
                </h3>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Phones and cameras are prohibited in the voting booth to
                  guarantee secret balloting and prevent vote-buying.
                </p>
              </div>
            </div>
          </div>

          {/* Step-by-Step Voting Process Timeline */}
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                <span className="material-symbols-outlined text-base">
                  format_list_numbered
                </span>
                Election Day Manual
              </div>
              <h2 className="text-2xl font-extrabold text-on-surface tracking-tight mt-1">
                6 Steps to Cast Your Vote
              </h2>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Follow this procedure from the moment you arrive at your
                designated Polling Unit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {stepList.map((item) => (
                <div
                  key={item.step}
                  className="p-5 bg-surface-container-low border border-outline-variant/40 rounded-2xl space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-9 h-9 rounded-xl bg-primary text-on-primary font-black text-sm flex items-center justify-center">
                        {item.step}
                      </span>
                      <span className="text-[11px] font-bold text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">
                          {item.icon}
                        </span>
                        {item.time}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-on-surface leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-outline-variant/30 text-[11px] font-semibold text-primary">
                    Key Note: {item.highlight}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Regulatory Policy Tabs */}
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex border-b border-outline-variant/60 overflow-x-auto">
              {[
                {
                  id: "bvas",
                  label: "BVAS & Accreditation",
                  icon: "fingerprint",
                },
                {
                  id: "ballot",
                  label: "Ballot Rules & Validity",
                  icon: "how_to_vote",
                },
                {
                  id: "rights",
                  label: "Voter Rights & Inclusion",
                  icon: "accessible",
                },
                { id: "offences", label: "Electoral Offences", icon: "report" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 px-5 font-bold text-xs sm:text-sm transition-colors border-b-2 -mb-px flex items-center gap-2 shrink-0 ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content Display */}
            <div className="space-y-4 text-xs text-on-surface-variant leading-relaxed">
              {activeTab === "bvas" && (
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-on-surface">
                    Bimodal Voter Accreditation System (BVAS) Standard Operating
                    Rules
                  </h3>
                  <p>
                    The BVAS device authenticates voters using dual biometric
                    technology—fingerprint scanning and facial
                    recognition—replacing older smart card reader models.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/40 space-y-1">
                      <span className="font-bold text-on-surface">
                        1. Primary Fingerprint Scan
                      </span>
                      <p>
                        Card is scanned; voter presses thumb/index finger on the
                        sensor for verification.
                      </p>
                    </div>
                    <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/40 space-y-1">
                      <span className="font-bold text-on-surface">
                        2. Facial Recognition Fallback
                      </span>
                      <p>
                        If fingerprint quality fails, the APO takes a live photo
                        to match stored facial features.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "ballot" && (
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-on-surface">
                    How to Ensure Your Ballot Paper is Valid
                  </h3>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>
                      <strong>Stamp & Signature:</strong> Confirm that the APO
                      signed and stamped the back of your ballot paper before
                      handing it to you. Unstamped ballot papers are void.
                    </li>
                    <li>
                      <strong>Clean Thumbprint:</strong> Apply indelible ink
                      inside the dedicated party symbol box. Do not allow ink to
                      smudge across lines into adjacent party logos.
                    </li>
                    <li>
                      <strong>Inward Folding:</strong> Fold the ballot paper
                      vertically with the printed side inward so ink does not
                      bleed onto other logos.
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === "rights" && (
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-on-surface">
                    Priority Voting & Inclusive Access
                  </h3>
                  <p>
                    Under INEC guidelines, poll officials must extend priority
                    queue privileges and assistance to specific voter
                    categories:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/40">
                      <span className="material-symbols-outlined text-primary text-2xl">
                        elderly
                      </span>
                      <span className="block font-bold text-on-surface mt-1">
                        Elderly Citizens
                      </span>
                    </div>
                    <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/40">
                      <span className="material-symbols-outlined text-primary text-2xl">
                        pregnant_woman
                      </span>
                      <span className="block font-bold text-on-surface mt-1">
                        Pregnant Women
                      </span>
                    </div>
                    <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/40">
                      <span className="material-symbols-outlined text-primary text-2xl">
                        child_care
                      </span>
                      <span className="block font-bold text-on-surface mt-1">
                        Nursing Mothers
                      </span>
                    </div>
                    <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/40">
                      <span className="material-symbols-outlined text-primary text-2xl">
                        accessible
                      </span>
                      <span className="block font-bold text-on-surface mt-1">
                        Persons with Disabilities
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "offences" && (
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-on-surface">
                    Prohibited Electoral Offences & Penalties
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-red-500/5 border border-red-500/20 rounded-xl space-y-1">
                      <span className="font-bold text-red-700">
                        Vote Buying & Selling
                      </span>
                      <p className="text-[11px]">
                        Offering or receiving monetary/material incentives for
                        votes carries heavy fines or imprisonment under the
                        Electoral Act.
                      </p>
                    </div>
                    <div className="p-3.5 bg-red-500/5 border border-red-500/20 rounded-xl space-y-1">
                      <span className="font-bold text-red-700">
                        Double Voting / Impersonation
                      </span>
                      <p className="text-[11px]">
                        Attempting to vote more than once or using another
                        citizen's PVC is a criminal offense recorded by BVAS
                        logs.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-on-surface">
              <span className="material-symbols-outlined text-primary text-lg">
                help_outline
              </span>
              Frequently Asked Questions
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="border border-outline-variant/60 rounded-2xl overflow-hidden bg-surface-container-low transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      className="w-full p-4 text-left font-bold text-xs sm:text-sm text-on-surface flex items-center justify-between gap-3"
                    >
                      <span>{faq.question}</span>
                      <span className="material-symbols-outlined text-lg shrink-0 text-on-surface-variant">
                        {isOpen ? "expand_less" : "expand_more"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-on-surface-variant leading-relaxed border-t border-outline-variant/30 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-surface-container-low border border-outline-variant/60 rounded-3xl">
            <div>
              <h3 className="text-sm font-bold text-on-surface">
                Ready for Election Day?
              </h3>
              <p className="text-xs text-on-surface-variant">
                Confirm your registration status or find your assigned Polling
                Unit location.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                to="/pvc-verification"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-primary text-on-primary px-5 py-2.5 rounded-xl font-semibold text-xs"
              >
                <span className="material-symbols-outlined text-base">
                  verified
                </span>
                Verify PVC Status
              </Link>
              <Link
                to="/polling-units"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-surface-container-high text-on-surface border border-outline-variant/60 px-5 py-2.5 rounded-xl font-semibold text-xs hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-base">
                  pin_drop
                </span>
                Find Polling Unit
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
