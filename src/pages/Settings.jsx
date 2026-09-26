import { useEffect, useState } from "react";
import MobileNav from "../components/layouts/MobileNav";
import SideNav from "../components/layouts/SideNav";
import TopNavBar from "../components/layouts/TopNavBar";
import { Link, NavLink, useNavigate, Outlet } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../contexts/useAuth";

const Settings = () => {
  const { user } = useAuth();
  return (
    <>
      <SideNav />
      <TopNavBar />
      <main className="md:ml-64 pt-24 pb-16 px-margin-mobile md:px-margin-desktop min-h-screen">
        <div className="max-w-container-max mx-auto">
          <header className="mb-10">
            <h1 className="font-headline-xl text-headline-xl text-on-surface mb-2">
              Account Settings
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Manage your profile, security, and portal preferences.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            <nav className="lg:col-span-3 space-y-2">
              <NavLink
                to="profile"
                className={({ isActive }) =>
                  `w-full text-left flex items-center gap-3 px-4 py-4 rounded-lg border transition-all
                    ${
                      isActive
                        ? "bg-surface border-primary"
                        : "bg-surface border-outline-variant hover:bg-surface-container"
                    }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className="active-tab-indicator"
                      id="indicator-profile"
                    ></div>
                    <span
                      className={`material-symbols-outlined ${
                        isActive ? "text-primary" : "text-on-surface-variant"
                      }`}
                    >
                      person
                    </span>

                    <span
                      className={`font-label-lg ${
                        isActive ? "text-primary" : "text-on-surface-variant"
                      }`}
                    >
                      Profile Information
                    </span>
                  </>
                )}
              </NavLink>
                <NavLink
                    to={"changepassword"}
                    className={({ isActive }) =>
                        `w-full text-left flex items-center gap-3 px-4 py-4 rounded-lg border transition-all
                    ${
                            isActive
                                ? "bg-surface border-primary"
                                : "bg-surface border-outline-variant hover:bg-surface-container"
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <div
                                className="active-tab-indicator"
                                id="indicator-changepassword"
                            ></div>
                            <span
                                className={`material-symbols-outlined ${
                                    isActive ? "text-primary" : "text-on-surface-variant"
                                }`}
                            >
                      lock
                    </span>

                            <span
                                className={`font-label-lg ${
                                    isActive ? "text-primary" : "text-on-surface-variant"
                                }`}
                            >
                      Change Password
                    </span>
                        </>
                    )}
                </NavLink>
              <NavLink
                to={"security"}
                className={({ isActive }) =>
                  `w-full text-left flex items-center gap-3 px-4 py-4 rounded-lg border transition-all
                    ${
                      isActive
                        ? "bg-surface border-primary"
                        : "bg-surface border-outline-variant hover:bg-surface-container"
                    }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className="active-tab-indicator"
                      id="indicator-profile"
                    ></div>
                    <span
                      className={`material-symbols-outlined ${
                        isActive ? "text-primary" : "text-on-surface-variant"
                      }`}
                    >
                      security
                    </span>

                    <span
                      className={`font-label-lg ${
                        isActive ? "text-primary" : "text-on-surface-variant"
                      }`}
                    >
                      Security
                    </span>
                  </>
                )}
              </NavLink>

              <NavLink
                to={"help"}
                className={({ isActive }) =>
                  `w-full text-left flex items-center gap-3 px-4 py-4 rounded-lg border transition-all
                    ${
                      isActive
                        ? "bg-surface border-primary"
                        : "bg-surface border-outline-variant hover:bg-surface-container"
                    }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className="active-tab-indicator"
                      id="indicator-profile"
                    ></div>
                    <span
                      className={`material-symbols-outlined ${
                        isActive ? "text-primary" : "text-on-surface-variant"
                      }`}
                    >
                      help
                    </span>

                    <span
                      className={`font-label-lg ${
                        isActive ? "text-primary" : "text-on-surface-variant"
                      }`}
                    >
                      Help
                    </span>
                  </>
                )}
              </NavLink>
            </nav>

            <div className="lg:col-span-9 space-y-8">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
      <MobileNav />
    </>
  );
};

export default Settings;
