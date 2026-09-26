import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState("acceptance");
  const [lastUpdated] = useState("September 9, 2026");

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms & Platform Purpose",
      icon: "gavel",
      content: (
        <div className="space-y-3">
          <p>
            By accessing or using this Electoral & Civic Engagement Portal ("the
            Platform"), you agree to be legally bound by these Terms of Service
            and our Privacy Policy. This Platform is a non-partisan civic
            technology service designed to provide voters with verified election
            schedules, polling unit locations, certified candidate lists, and
            voter rights education.
          </p>
          <p>
            If you do not agree with any portion of these terms, you must
            immediately cease accessing the platform and its associated
            verification services.
          </p>
        </div>
      ),
    },
    {
      id: "eligibility",
      title: "2. User Eligibility & PVC Verification",
      icon: "verified_user",
      content: (
        <div className="space-y-3">
          <p>
            Our Permanent Voter Card (PVC) verification and Polling Unit locator
            tools rely on official statutory electoral databases. By utilizing
            these lookup services, you affirm that:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>
              You are accessing your own voter record or querying on behalf of a
              consent-giving registered voter.
            </li>
            <li>
              You will not submit fraudulent, misleading, or automated bulk
              queries to scrape voter registry data.
            </li>
            <li>
              You understand that digital verification does not replace physical
              PVC presentation on Election Day.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "neutrality",
      title: "3. Non-Partisanship & Political Neutrality",
      icon: "balance",
      content: (
        <div className="space-y-3">
          <p>The Platform maintains strict political neutrality:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>
              We do not endorse, sponsor, or oppose any political party,
              presidential candidate, or legislative aspirant.
            </li>
            <li>
              Candidate profiles, manifesto summaries, and party symbols are
              presented strictly for voter education without editorial bias.
            </li>
            <li>
              Candidate order and search listings are generated neutrally based
              on official electoral commission accreditations.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "prohibited",
      title: "4. Prohibited Conduct & Disinformation",
      icon: "report_off",
      content: (
        <div className="space-y-3">
          <p>
            You agree not to engage in any of the following prohibited
            activities:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl space-y-1">
              <span className="font-bold text-red-700 text-xs">
                Electoral Disinformation
              </span>
              <p className="text-[11px] text-on-surface-variant">
                Intentionally spreading false voting dates, fake polling unit
                relocations, or deceptive voting procedures.
              </p>
            </div>
            <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl space-y-1">
              <span className="font-bold text-red-700 text-xs">
                Automated Scraping
              </span>
              <p className="text-[11px] text-on-surface-variant">
                Deploying bots, crawlers, or automated scripts to extract
                platform data without written permission.
              </p>
            </div>
            <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl space-y-1">
              <span className="font-bold text-red-700 text-xs">
                Voter Harassment
              </span>
              <p className="text-[11px] text-on-surface-variant">
                Using public representative contact details to send threats,
                hate speech, or commercial spam.
              </p>
            </div>
            <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl space-y-1">
              <span className="font-bold text-red-700 text-xs">
                System Interference
              </span>
              <p className="text-[11px] text-on-surface-variant">
                Attempting to bypass security controls, denial-of-service
                attacks, or unauthorized API access.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "data_privacy",
      title: "5. Data Protection & Privacy Rights",
      icon: "shield_lock",
      content: (
        <div className="space-y-3">
          <p>
            Your personal data and voter verification queries are processed in
            full compliance with the Nigeria Data Protection Act (NDPA) 2023:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>
              We do NOT sell, rent, or monetize voter lookup history or personal
              identifiers to third-party political campaigns.
            </li>
            <li>
              All transmissions are secured using TLS 1.3 encryption and stored
              with strict role-based access restrictions.
            </li>
            <li>
              Users retain the right to request access, rectification, or
              restriction of voluntarily provided data under applicable
              statutory laws.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "open_data",
      title: "6. Intellectual Property & Open Civic Data",
      icon: "dataset",
      content: (
        <div className="space-y-3">
          <p>
            Public government data, election schedules, and official candidate
            listings remain in the public domain. However:
          </p>
          <p>
            The custom design, code, interface components, and compiled
            visualizations of this Platform are protected by copyright.
            Researchers, journalists, and civic organizations may cite or reuse
            our compiled public datasets for non-commercial educational purposes
            provided clear attribution is given.
          </p>
        </div>
      ),
    },
    {
      id: "limitation",
      title: "7. Disclaimers & Limitation of Liability",
      icon: "warning",
      content: (
        <div className="space-y-3">
          <p>
            While we strive for 100% accuracy by syncing directly with certified
            electoral feeds, election data can change rapidly. The Platform is
            provided on an "AS IS" and "AS AVAILABLE" basis.
          </p>
          <p>
            We are not liable for delayed election results, local polling unit
            schedule changes enacted by official commissioners, or network
            disruptions beyond our reasonable control.
          </p>
        </div>
      ),
    },
    {
      id: "changes",
      title: "8. Amendments & Dispute Resolution",
      icon: "gavel",
      content: (
        <div className="space-y-3">
          <p>
            We reserve the right to update these Terms at any time. Revisions
            will take effect immediately upon posting, with the "Last Updated"
            date updated accordingly.
          </p>
          <p>
            Any legal inquiries or dispute notices regarding these Terms must be
            submitted in writing to{" "}
            <strong className="text-on-surface">
              legal@elections-portal.gov.ng
            </strong>
            . We commit to acknowledging inquiries within 5 business days.
          </p>
        </div>
      ),
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-surface py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Banner Header */}
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 sm:p-10 space-y-4 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface-container-high border border-outline-variant/60 text-primary text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-base">
                  policy
                </span>
                Legal & Policy Documentation
              </div>
              <span className="text-xs font-semibold text-on-surface-variant">
                Effective Date: {lastUpdated}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
              Terms of Service
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
              Please read these terms carefully before using our electoral
              verification services, candidate directory, or polling unit
              locator tools. These terms set out your rights and obligations
              when participating in our civic platform.
            </p>
          </div>

          {/* Quick Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-5 bg-surface-container-low border border-outline-variant/60 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-on-surface text-sm">
                <span className="material-symbols-outlined text-primary text-xl">
                  balance
                </span>
                Strictly Non-Partisan
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                We present certified election data, party candidates, and voting
                guidelines objectively without political bias or endorsements.
              </p>
            </div>

            <div className="p-5 bg-surface-container-low border border-outline-variant/60 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-on-surface text-sm">
                <span className="material-symbols-outlined text-primary text-xl">
                  lock
                </span>
                NDPA 2023 Compliant
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                Your PVC searches and personal interaction logs are encrypted
                under modern data protection regulations.
              </p>
            </div>

            <div className="p-5 bg-surface-container-low border border-outline-variant/60 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-on-surface text-sm">
                <span className="material-symbols-outlined text-primary text-xl">
                  verified
                </span>
                Official Data Sources
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                All polling unit addresses, candidate listings, and election
                schedules originate from statutory commission feeds.
              </p>
            </div>
          </div>

          {/* Main Content Layout: Sidebar Navigation + Detailed Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Table of Contents Sticky Sidebar */}
            <div className="lg:col-span-1 bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-5 space-y-3 sticky top-6 shadow-xs">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-on-surface border-b border-outline-variant/40 pb-2">
                Sections
              </h3>
              <nav className="space-y-1 text-xs">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setActiveSection(sec.id);
                      document
                        .getElementById(sec.id)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-semibold transition-colors flex items-center gap-2 ${
                      activeSection === sec.id
                        ? "bg-primary text-on-primary"
                        : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                    }`}
                  >
                    <span className="material-symbols-outlined text-base shrink-0">
                      {sec.icon}
                    </span>
                    <span className="truncate">{sec.title}</span>
                  </button>
                ))}
              </nav>

              <div className="pt-3 border-t border-outline-variant/40">
                <Link
                  to="/privacy-policy"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                >
                  <span className="material-symbols-outlined text-sm">
                    shield
                  </span>
                  View Privacy Policy
                </Link>
              </div>
            </div>

            {/* Detailed Terms Sections */}
            <div className="lg:col-span-3 space-y-6">
              {sections.map((sec) => (
                <div
                  key={sec.id}
                  id={sec.id}
                  className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs scroll-mt-6"
                >
                  <div className="flex items-center gap-3 border-b border-outline-variant/40 pb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl">
                        {sec.icon}
                      </span>
                    </div>
                    <h2 className="text-lg font-extrabold text-on-surface">
                      {sec.title}
                    </h2>
                  </div>

                  <div className="text-xs text-on-surface-variant leading-relaxed">
                    {sec.content}
                  </div>
                </div>
              ))}

              {/* Contact Legal Section Card */}
              <div className="bg-surface-container-low border border-outline-variant/60 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-on-surface">
                  <span className="material-symbols-outlined text-primary text-lg">
                    contact_support
                  </span>
                  Legal Questions & Compliance Inquiries
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  If you have any questions regarding these Terms of Service,
                  data privacy rights, or candidate registration verification,
                  please contact our legal desk:
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-on-surface pt-1">
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/40">
                    <span className="material-symbols-outlined text-primary text-base">
                      mail
                    </span>
                    legal@elections-portal.gov.ng
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/40">
                    <span className="material-symbols-outlined text-primary text-base">
                      call
                    </span>
                    +234 (0) 700-CALL-CIVIC
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
