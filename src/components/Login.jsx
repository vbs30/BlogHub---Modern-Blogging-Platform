import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import LoginImage from "../images/Login.png";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="flex flex-col w-full max-w-sm bg-white shadow-xl rounded-xl">
                {/* Form Section */}
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
                    <p className="text-gray-600 text-center mb-6">
                        Don't have an account?&nbsp;
                        <Link to="/signup" className="text-blue-500 hover:underline">
                            Sign Up here
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
                    <form onSubmit={handleSubmit(login)} className="space-y-5">
                        <Input
                            label="Email:"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                },
                            })}
                        />
                        <Input
                            label="Password:"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Sign In
                        </Button>
                    </form>
                </div>

                {/* Image Section */}
                <div className="relative mt-6">
                    <img
                        src={LoginImage}
                        alt="Login Illustration"
                        className="w-full h-40 object-cover rounded-b-xl"
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;
