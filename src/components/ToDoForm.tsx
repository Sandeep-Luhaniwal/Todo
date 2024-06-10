"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ClosedEyeIcon, EyeIcon } from "./Icons";

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const ToDoForm = () => {
    const {
        register,
        watch,
        handleSubmit,
        getValues,
        formState: { errors },
        reset
    } = useForm<UserData>();

    const formData = watch();
    const [passwordShow, setPasswordShow] = useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
    const [userDataShow, setUserDataShow] = useState<UserData[]>([]);

    const formSubmit: SubmitHandler<UserData> = (data) => {
        reset();
        console.log("To do user data", data);
        setUserDataShow(prevData => [...prevData, data]);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <form className="max-w-[500px] bg-blue-800 bg-opacity-60 p-6 rounded-lg shadow-xl w-full" onSubmit={handleSubmit(formSubmit)}>
                <div className="flex flex-col">
                    <label className="label text-3xl font-bold py-6 text-white text-center">TO DO LIST</label>
                    {/* ===================FIRST NAME========================== */}

                    <input
                        className="p-2 focus:outline-none rounded-md mt-6"
                        {...register("firstName", { required: true })}
                        placeholder="First name"
                    />

                    {errors.firstName && <p className="error">First Name is required.</p>}

                    {/* ===================LAST NAME========================== */}

                    <input
                        className="p-2 focus:outline-none rounded-md mt-6"
                        {...register("lastName", { required: true, minLength: 2 })}
                        placeholder="Last name"
                    />

                    {errors.lastName && <p className="error">Last Name is required.</p>}

                    {/* ===================EMAIL ADDRESS========================== */}
                    <input
                        className="p-2 focus:outline-none rounded-md mt-6"
                        type="email"
                        {...register("email", {
                            required: "Email Address is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Please enter a valid email address"
                            }
                        })}
                        placeholder="Email"
                    />
                    {errors.email && (
                        <p className="error">{errors.email.message}</p>
                    )}
                    {/* ===================PASSWORD========================== */}
                    <div className="relative mt-6">
                        <div onClick={() => setPasswordShow(!passwordShow)} className="absolute top-1/2 -translate-y-1/2 end-2 cursor-pointer"> {passwordShow ? <EyeIcon /> : <ClosedEyeIcon />}</div>
                        <input
                            className="p-2 pe-10 focus:outline-none w-full rounded-md"
                            type={passwordShow ? 'text' : 'password'}
                            {...register("password", {
                                required: "Please Enter Your Password 8-16 characters long",
                                pattern: {
                                    value:
                                        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                                    message: "Pasword must be strong at least one uppercase,lowercase, number and special character letter",
                                },
                            })}
                            placeholder="Password"
                        />
                    </div>
                    <p className="error-message">{errors.password?.message}</p>
                    {/* ===================CONFIRM PASSWORD========================== */}
                    <div className="relative mt-6">
                        <div onClick={() => setConfirmPasswordShow(!confirmPasswordShow)} className="absolute top-1/2 -translate-y-1/2 end-2 cursor-pointer"> {confirmPasswordShow ? <EyeIcon /> : <ClosedEyeIcon />}</div>
                        <input
                            className="p-2 pe-10 w-full focus:outline-none rounded-md "
                            type={confirmPasswordShow ? 'text' : 'password'}
                            {...register("confirmPassword", {
                                required: "Confirm Password is required",
                                validate: (match) => {
                                    const password = getValues("password")
                                    return match === password || "Passwords should match!"
                                }
                            })}
                            placeholder="Confirm Password"
                        />
                    </div>
                    <p className="error-message">{errors.confirmPassword?.message as string}</p>
                </div>
                <div className="formData">
                    <input className="btn mt-6 text-white text-xl font-bold py-2.5 text-center bg-red-600 rounded-md w-full cursor-pointer duration-300 hover:bg-blue-950 hover:text-white" type="submit" value="Save" />
                </div>
            </form>
            {userDataShow.length > 0 && (
                <div className="formValues mt-10 max-w-[900px] w-full">
                    <div className="flex gap-16 border border-b-0 p-2 translate-y-1">
                        <p className="values text-base font-bold">First Name</p>
                        <p className="values text-base font-bold">Last Name</p>
                        <p className="values text-base font-bold">Email</p>
                        <p className="values text-base font-bold">Password</p>
                    </div>
                    {userDataShow.map((value, index) => {
                        return (
                            <div key={index} className="flex items-center p-2 gap-5 border justify-between mt-1">
                                <p className="values text-base">{value.firstName}</p>
                                <p className="values text-base">{value.lastName}</p>
                                <p className="values text-base">{value.email}</p>
                                <p className="values text-base">{value.password}</p>
                                <button className="py-2 px-10 bg-blue-800 rounded-md text-white font-bold border border-blue-800 hover:bg-white duration-200 hover:text-blue-800">Update</button>
                                <button className="py-2 px-10 bg-blue-800 rounded-md text-white font-bold border border-blue-800 hover:bg-white duration-200 hover:text-blue-800">Delete</button>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
};

export default ToDoForm;
