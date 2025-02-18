import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import api from "../services/Fetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    useSEO({ title: "Login" });
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState({ loading: false, error: null })
    const navigate = useNavigate();
    const { refetch } = useAuth();

    const onSubmit = async (data) => {
        setStatus({ loading: true, error: null });
        try {
            const response = await api.post('/auth/login', {
                email: data.email,
                password: data.password
            })
            toast.success(`${response.data.message}! Redirecting to Profile`, {
                className: "font-semibold",
            })
            setStatus({ loading: false, error: null });
            refetch();
            setTimeout(() => {
                navigate('/profile')
            }, 1000);
        } catch (error) {
            setStatus({ loading: false, error: error.response?.data.message || error.message });
            toast.error("An error occurred while logging in, please try again.", {
                className: "font-semibold",
            })
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-background-secondary p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl text-primary font-bold text-center">Sign In</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                    <div className="mb-4">
                        <label className="block text-text mb-1 required">E-mail</label>
                        <input
                            type="email"
                            placeholder="user123@gmail.com"
                            {...register("email", {
                                required: "E-mail is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    message: "The email is not valid"
                                }
                            })}
                            className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-text mb-1 required">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Must be at least 6 characters"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Must not exceed 20 characters"
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[._-]).{6,20}$/,
                                    message: 'The password must contain lowercase, uppercase and a special character'
                                }
                            })}
                            className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <i className={`${showPassword ? 'bx bx-show' : 'bx bx-hide'} absolute right-3 top-13 -translate-y-1/2 cursor-pointer text-text text-xl font-semibold`}
                            onClick={() => setShowPassword(!showPassword)}></i>
                        {errors.password && <p className="text-error text-xs mt-1">{errors.password.message}</p>}
                    </div>
                    {status.error && <p className="text-error text-md text-center my-2">{status.error}</p>}
                    <button type="submit" disabled={status.loading} className="w-full bg-primary text-white p-3 rounded-lg hover:bg-secondary transition-all cursor-pointer">
                        {status.loading ? <i className="bx bx-loader bx-spin"></i> : "Sign In"}
                    </button>
                </form>
                <p className="text-center text-text mt-4">
                    Dont have an account? <Link to="/register" className="text-primary hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
