"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ToDoForm = () => {
    const {
        register,
        watch,
        handleSubmit,
        getValues,
        formState: { errors },
        reset
    } = useForm();
    const formData = watch();

    const formSubmit = (data:object) => {
        reset();
        // e.preventDefault();
        console.log("To do user data", data);
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
                        {...register("email", { required: true })}
                        placeholder="Email"
                    />
                    {errors.email && <p className="error">Email address is required.</p>}
                    {/* ===================PASSWORD========================== */}
                    <input
                        className="p-2 focus:outline-none rounded-md mt-6"
                        type="password"
                        {...register("password", {
                            required: "Please Enter Your Password",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters long!"
                            }
                        })}
                        placeholder="Password"
                    />
                    <p className="error-message">{errors.password?.message as string}</p>
                    {/* {errors.password && <p className="error">Password is required.</p>} */}
                    {/* ===================CONFIRM PASSWORD========================== */}
                    <input
                        className="p-2 focus:outline-none rounded-md mt-6"
                        type="password"
                        {...register("confirmPassword", {
                            validate: (match) => {
                                const password = getValues("password")
                                return match === password || "Passwords should match!"
                            }
                        })}
                        placeholder="Confirm Password"
                    />
                    {/* {errors.password && <p className="error">Confirm Password is required.</p>} */}
                    {errors.password ? "Confirm Password is required" :
                        <p className="error-message">{errors.confirmPassword?.message as string}</p>
                    }
                </div>
                <div className="formData">
                    <input className="btn mt-6 text-white text-xl font-bold py-2.5 text-center bg-red-600 rounded-md w-full cursor-pointer duration-300 hover:bg-blue-950 hover:text-white" type="submit" value="Save" />
                </div>
            </form>
        </div>
    );
};

export default ToDoForm;