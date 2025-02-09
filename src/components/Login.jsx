import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import LoginImage from "../images/Login.png"

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
        <div className="flex min-h-[80vh] items-center justify-center bg-gray-50">
            <div className="flex w-[900px] bg-white shadow-xl rounded-2xl">
                {/* Left Side - Form */}
                <div className="w-1/2 p-8">
                    <div className="flex flex-col items-start">
                        <h2 className="text-2xl font-bold mb-2">Sign In</h2>
                        <p className="text-gray-600 mb-8">
                            Don't have an account?&nbsp;
                            <Link to="/signup" className="text-blue-500 hover:underline">
                                Sign Up here
                            </Link>
                        </p>
                        {error && <p className="text-red-600 mb-4">{error}</p>}
                        <form onSubmit={handleSubmit(login)} className="space-y-5 w-full">
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
                </div>

                {/* Right Side - Visible Full Image */}
                <div className="w-1/2 relative">
                    <img
                        src={LoginImage}
                        alt="Login Image"
                        className="absolute inset-0 w-full h-full object-cover rounded-r-2xl"
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;
