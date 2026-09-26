import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";

import Swal from "sweetalert2";

import * as yup from "yup";

import api from "../api/axios";

import { useQuery } from "@tanstack/react-query";
import MobileNav from "../components/layouts/MobileNav";
import SideNav from "../components/layouts/SideNav";
import TopNavBar from "../components/layouts/TopNavBar";
import { useAuth } from "../contexts/useAuth";
import { capitalize } from "../utils/stringUtils";

const Pvc = () => {
  const { user } = useAuth();

  const voterStatus = user?.voter?.voter_status;

  const statusConfig = {
    not_applied: {
      bg: "bg-gray-500/10",
      text: "text-gray-500",
      dot: "bg-gray-500",
      label: "Not Applied",
    },
    pending: {
      bg: "bg-yellow-500/10",
      text: "text-yellow-500",
      dot: "bg-yellow-500",
      label: "Pending",
    },
    approved: {
      bg: "bg-primary/10",
      text: "text-primary",
      dot: "bg-primary",
      label: "Active",
    },
    rejected: {
      bg: "bg-red-500/10",
      text: "text-red-500",
      dot: "bg-red-500",
      label: "Rejected",
    },
  };

  return (
    <>
      <SideNav />
      <TopNavBar />
      <main className="md:ml-64 pt-24 pb-12 px-margin-mobile md:px-margin-desktop min-h-screen">
        <div className="max-w-container-max mx-auto space-y-8">
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h3 className="font-headline-lg text-headline-lg text-on-surface">
                Permanent Voter Card
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Manage your digital credentials and voter identity records.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-primary-fixed text-on-primary-fixed px-4 py-2 rounded-full">
              <span
                className="material-symbols-outlined text-base"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span className="font-label-lg text-label-lg">
                Identity Verified
              </span>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 flex justify-center lg:block">
              <div className="relative w-full max-w-135 aspect-[1.586/1] pvc-card-gradient rounded-2xl border border-outline-variant shadow-xl overflow-hidden group">
                <div className="absolute inset-0 guilloche-pattern opacity-40"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] scale-150 pointer-events-none">
                  <img
                    className="w-full h-full grayscale"
                    data-alt="Detailed monochromatic watermark of the Nigerian Coat of Arms featuring two white horses, a black shield with a white 'Y' shape, and a red eagle on top. The style is classic governmental heraldry, rendered as a subtle security texture for a high-security identification card."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB4aA6UE5ACqvNJ7bSm7nirt819PApD15x5qx8YK5ODPaRehpw2_AxNS_xVyfxEiHheZ20dgXTvwaAlk0sbE1M_CQTj4PNE6SVpC6yWdanMKGI1QGRd9uJziwHXZHyVMTnSDew_mqRwgJhxzoHVANK1Q7tKJ95SxIm3e4TSTSOLhFqsDYXx4PJcTBqZBgjymXRgtvpby8hlq6RYnM-AJe-QJQ-DugexN0mnflRBF1gC7nhX64WANtj"
                  />
                </div>

                <div className="relative z-10 p-6 flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12">
                      <img
                        className="w-full h-full object-contain"
                        data-alt="The official logo of the Independent National Electoral Commission of Nigeria (INEC) in vibrant green and red. A clean, high-resolution vector style illustration on a transparent background, perfect for a government issued identification document."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCoxsnBYToSY3dHfxyud_hUsf3NxR0EgJsooCKtgezqSikNydHHgp0e-Wzwo-ZbdzsCjNRnWn9XnSLWpI8paa8n3ASDG9AfYQxOPrrG6RjTv8xX-KBveQtE-sLM7bU-XCDbIDKG7Ee4KU9AAuB-N3iZgh8WCJSneqMpvVzuV4g6B3UCEDP7a_AjB3aRuA2AjcAWMvyxWbykIxVRfcLSku5yg_fK3LZ2Mv6hfgVjzcx94ExKBRYIqhe"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-lg leading-tight">
                        EYENECK
                      </h4>
                      <p className="text-[10px] tracking-[0.2em] font-extrabold text-on-surface-variant opacity-70">
                        PERMANENT VOTER'S CARD
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-bold text-on-surface-variant">
                      REPUBLIC OF OLANIYI
                    </p>
                  </div>
                </div>

                <div className="relative z-10 px-6 flex gap-6">
                  <div className="w-32 h-40 bg-surface-container border-2 border-primary/20 rounded-md overflow-hidden relative">
                    <img
                      className="w-full h-full object-cover grayscale"
                      data-alt={`A professional passport-style photograph of ${user?.first_name} ${user?.last_name}, a Nigerian with a friendly expression. The image is clear with a plain white background, framed with subtle holographic overlays to simulate a secure identification card. The lighting is bright and professional.`}
                      src={
                        user?.voter?.passport ||
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuDS237_bPgiyFJQfkmQ7WyaBpnhcY0OdsJe5YRI4URhV2-D22CHr3VD2C4WgLzonZTmL0iWs08A_SPfdrIZ7Am0LpDbU4vMA-IdlAEKEsLo6b6i21fw7Hd81WzfImvOdkGKSdQRktBdr82l4aN6-b_v2HpKtLMFzK2ezXvXdSQLDOlugZxOVZ3IT2dsu0dP7iU9av5znvOhQ0RFavQkwfrAPDRh-V9XDlrzPf3dXmKCxQOGKw8rw7V3"
                      }
                    />
                    <div className="absolute inset-0 bg-primary/5 mix-blend-overlay"></div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <p className="text-[10px] text-on-surface-variant font-bold uppercase">
                        Full Name
                      </p>
                      <p className="font-headline-md text-on-surface tracking-tight">
                        {user?.first_name.toUpperCase()}{" "}
                        {user?.last_name.toUpperCase()}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-[10px] text-on-surface-variant font-bold uppercase">
                          VIN
                        </p>
                        <p className="font-label-lg text-primary">
                          {user?.voter?.vin}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-on-surface-variant font-bold uppercase">
                          Date of Birth
                        </p>
                        <p className="font-label-lg text-on-surface">
                          {user?.profile?.date_of_birth}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-on-surface-variant font-bold uppercase">
                        Registration Area / Center
                      </p>
                      <p className="font-label-md text-on-surface">
                        {user?.voter?.polling_unit?.ward?.lga?.state?.name.toUpperCase()}
                        ,
                        {user?.voter?.polling_unit?.ward?.lga?.name.toUpperCase()}
                        ,
                      </p>
                      <p className="font-label-md text-on-surface">
                        {user?.voter?.polling_unit?.ward?.name.toUpperCase()},{" "}
                        {user?.voter?.polling_unit?.name.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-10 bg-primary px-6 flex items-center justify-between">
                  <p className="text-[10px] text-on-primary font-bold tracking-widest uppercase"></p>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                    <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
                <h5 className="font-label-lg text-label-lg text-on-surface-variant mb-4 uppercase tracking-wider">
                  PVC Status
                </h5>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span
                      className="material-symbols-outlined text-3xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  </div>
                  <div>
                    <p className="font-headline-md text-on-surface">
                      {voterStatus.toUpperCase()}
                    </p>
                    <p className="font-body-md text-primary font-medium">
                      Verified Account
                    </p>
                  </div>
                </div>
                <div className="space-y-3 pt-4 border-t border-outline-variant">
                  <div className="flex justify-between items-center">
                    <span className="font-body-md text-on-surface-variant">
                      Registration Date
                    </span>
                    <span className="font-label-lg text-on-surface">
                      {user?.voter?.registration_date}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body-md text-on-surface-variant">
                      Collection Status
                    </span>
                    <span className="text-[12px] bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded font-bold">
                      COLLECTED
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  onClick={() => {
                    Swal.fire({
                      title: "Coming Soon",
                      text: "This feature is coming soon...",
                      icon: "info",
                    });
                  }}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg hover:bg-primary-container transition-all shadow-md active:scale-95"
                >
                  <span className="material-symbols-outlined">download</span>
                  Download Digital PVC (PDF)
                </button>
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Coming Soon",
                      text: "This feature is coming soon...",
                      icon: "info",
                    });
                  }}
                  className="flex items-center justify-center gap-2 w-full py-4 border-2 border-primary text-primary bg-white rounded-xl font-label-lg text-label-lg hover:bg-primary/5 transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined">autorenew</span>
                  Request PVC Replacement
                </button>
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Coming Soon",
                      text: "This feature is coming soon...",
                      icon: "info",
                    });
                  }}
                  className="flex items-center justify-center gap-2 w-full py-4 text-on-surface-variant font-label-lg text-label-lg hover:bg-surface-container-high rounded-xl transition-all"
                >
                  <span className="material-symbols-outlined">
                    edit_location
                  </span>
                  Update Residential Address
                </button>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary">
                  person
                </span>
                <h6 className="font-headline-md text-on-surface text-lg">
                  Personal Details
                </h6>
              </div>
              <ul className="space-y-4">
                <li>
                  <p className="text-[12px] text-on-surface-variant uppercase font-bold">
                    Full Legal Name
                  </p>
                  <p className="font-body-lg text-on-surface">
                    {user?.first_name} {user?.middle_name || ""}{" "}
                    {user?.last_name}
                  </p>
                </li>
                <li>
                  <p className="text-[12px] text-on-surface-variant uppercase font-bold">
                    Gender
                  </p>
                  <p className="font-body-lg text-on-surface">
                    {capitalize(user?.profile?.gender)}
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary">
                  location_on
                </span>
                <h6 className="font-headline-md text-on-surface text-lg">
                  Voter Location
                </h6>
              </div>
              <ul className="space-y-4">
                <li>
                  <p className="text-[12px] text-on-surface-variant uppercase font-bold">
                    State of Registration
                  </p>
                  <p className="font-body-lg text-on-surface">
                    {user?.voter?.polling_unit?.ward?.lga?.state?.name} State
                  </p>
                </li>
                <li>
                  <p className="text-[12px] text-on-surface-variant uppercase font-bold">
                    Local Government Area
                  </p>
                  <p className="font-body-lg text-on-surface">
                    {user?.voter?.polling_unit?.ward?.lga?.name} LGA
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary">
                  how_to_reg
                </span>
                <h6 className="font-headline-md text-on-surface text-lg">
                  Polling Unit Info
                </h6>
              </div>
              <ul className="space-y-4">
                <li>
                  <p className="text-[12px] text-on-surface-variant uppercase font-bold">
                    Registration Area (Ward)
                  </p>
                  <p className="font-body-lg text-on-surface">
                    {user?.voter?.polling_unit?.ward?.name}
                  </p>
                </li>
                <li>
                  <p className="text-[12px] text-on-surface-variant uppercase font-bold">
                    Polling Unit Name
                  </p>
                  <div className="flex items-start gap-2">
                    <p className="font-body-lg text-on-surface">
                      {user?.voter?.polling_unit?.name}
                    </p>
                    <a className="text-primary hover:underline mt-1" href="#">
                      <span className="material-symbols-outlined text-sm">
                        map
                      </span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-xl flex gap-4 items-start">
            <span className="material-symbols-outlined text-primary shrink-0">
              info
            </span>
            <div className="space-y-1">
              <h6 className="font-label-lg text-label-lg text-primary uppercase">
                Security Reminder
              </h6>
              <p className="font-body-md text-on-surface-variant">
                Your digital PVC is a valid temporary identification. However,
                for physical voting, you must present your physical Permanent
                Voter Card at your designated polling unit. Protect your VIN and
                personal details from unauthorized parties.
              </p>
            </div>
          </div>
        </div>
      </main>
      <MobileNav />
    </>
  );
};

export default Pvc;
