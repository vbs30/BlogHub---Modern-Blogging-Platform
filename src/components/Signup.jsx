import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import SignUpImage from '../images/Signup.jpg'

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center bg-white">
            <div className="flex w-[900px] bg-white shadow-xl rounded-2xl">
                {/* Left Side - Image */}
                <div className="w-1/2 relative">
                    <img
                        src={SignUpImage}
                        alt="Signup Visual"
                        className="absolute inset-0 w-full h-full object-cover rounded-l-2xl"
                    />
                </div>

                {/* Right Side - Signup Form */}
                <div className="w-1/2 p-10">
                    <div className="flex flex-col items-start">
                        <h2 className="text-2xl font-bold mb-2">Sign Up to Create Account</h2>
                        <p className="text-gray-600 mb-8">
                            Already have an account?&nbsp;
                            <Link to="/login" className="text-blue-500 hover:underline">
                                Login here
                            </Link>
                        </p>
                        {error && <p className="text-red-600 mb-4">{error}</p>}
                        <form onSubmit={handleSubmit(create)} className="space-y-5 w-full">
                            <Input
                                label="Full Name:"
                                placeholder="Enter your full name"
                                {...register("name", { required: true })}
                            />
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
                                {...register("password", { required: true })}
                            />
                            <Button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                                Create Account
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
