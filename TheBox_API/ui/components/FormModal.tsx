"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import Signup from "./ui/Signup";
import Login from "./ui/Login";
import ResertPw from "./ui/ResertPw";

type FormType = "signup" | "login" | "reset";

type FormModalProps = {
    closeModal: () => void;
};

type FormDetailsProps = {
    Email: string | null,
    password: string | null
}


const formHeaderMap: Record<FormType, { title: string; subtitle: string }> = {
    signup: {
        title: "Create an account",
        subtitle: "Sign up now and get started with unlimited purchase",
    },
    login: {
        title: "Welcome back",
        subtitle: "Log in to your dashboard and continue shopping with us.",
    },
    reset: {
        title: "Reset your password",
        subtitle: "Lost access to your account, Input recovery email.",
    },
};



export default function FormModal({ closeModal }: FormModalProps) {
    // Handle the state of form slider
    const [form, setForm] = useState<FormType>("signup");

    // Form submission state
    const [formDetails, setFormDetails] = useState<FormDetailsProps>({
        Email: null,
        password: null,
    });

    const translateValue =
        form === "signup" ? "0%" : form === "login" ? "-33.3333%" : "-66.6667%";


    return (
        <div className="sm:max-w-[400px] w-full text-black sm:h-[450px] bg-white rounded-md px-4 py-5">
            {/* modal heading */}
            <div className="flex flex-col gap-7">
                <div className="flex justify-between items-center">
                    <Image
                        src="/logo-2.png"
                        alt="TheBox logo"
                        width={100}
                        height={100}
                        className="w-7 h-7 sm:w-9 sm:h-9"
                    />

                    {/* onclick closes the form modal */}
                    <button
                        type="button"
                        className="bg-[#f2f2f2] p-1.5 cursor-pointer rounded-sm"
                        onClick={closeModal}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" /></svg>
                    </button>
                </div>

                <div className="overflow-hidden">
                    <div className="poppins font-normal text-xl">
                        {formHeaderMap[form].title}
                        <p className=" text-gray-800 mt-1 text-[13px] montserrat max-w-[70%]">
                            {formHeaderMap[form].subtitle}
                        </p>
                    </div>

                    {/* form slider container*/}
                    <div className="mt-7 sm:h-[300px] overflow-hidden">
                        <div
                            className="flex w-[300%] h-full transition-transform duration-300 ease-in-out"
                            style={{ transform: `translateX(${translateValue})` }}
                        >
                            {/* Signup slide */}
                            <div
                                className={`w-1/3 transition-opacity duration-300 ${form === "signup" ? "opacity-100" : "opacity-40"
                                    }`}
                            >
                                <div className="h-full pr-2">
                                    <Signup setForm={setForm} setFormDetails={setFormDetails} />
                                </div>
                            </div>

                            {/* Login slide */}
                            <div
                                className={`w-1/3 transition-opacity duration-300 ${form === "login" ? "opacity-100" : "opacity-40"
                                    }`}
                            >
                                <div className="h-full px-2">
                                    <Login setForm={setForm} setFormDetails={setFormDetails} />
                                </div>
                            </div>

                            {/* Reset password slide */}
                            <div
                                className={`w-1/3 transition-opacity duration-300 ${form === "reset" ? "opacity-100" : "opacity-40"
                                    }`}
                            >
                                <div className="h-full pl-2">
                                    <ResertPw setForm={setForm} setFormDetails={setFormDetails} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}