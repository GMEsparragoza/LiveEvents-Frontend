import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import api from "../services/Fetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
    useSEO({ title: "Login" });
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState({ loading: false, error: null })
    const [resetPassword, setResetPassword] = useState(false);
    const navigate = useNavigate();
    const { refetch } = useAuth();

    // Instancia para el formulario de Login
    const {
        register: loginRegister,
        handleSubmit: handleLoginSubmit,
        reset: resetLogin,
        formState: { errors: loginErrors },
    } = useForm();

    // Instancia para el formulario de Reseteo de Contraseña
    const {
        register: resetRegister,
        handleSubmit: handleResetSubmit,
        reset: resetReset,
        formState: { errors: resetErrors },
    } = useForm();

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

    const handleResetPassword = async (data) => {
        setStatus({ loading: true, error: null });
        try {
            const response = await api.post('/auth/reset-password', {
                email: data.resetEmail
            })
            toast.info(response.data.message, {
                className: "font-semibold",
            })
            setStatus({ loading: false, error: null });
            setResetPassword(false);
        } catch (error) {
            setStatus({ loading: false, error: error.response?.data.message || error.message });
            toast.error("An error occurred while resetting your password, please try again.", {
                className: "font-semibold text-error",
            })
        }
    }

    const handleSuccess = async (response) => {
        const idToken = response.credential;

        try {
            const response = await api.post('/auth/google', {
                idToken
            }, { withCredentials: true });

            toast.success(`${response.data.message}! Redirecting to Profile`, {
                className: "font-semibold",
            })
            setStatus({ loading: false, error: null })
            refetch();
            setTimeout(() => {
                navigate('/profile')
            }, 1000);
        } catch (error) {
            setStatus({ loading: false, error: error.response.data.message || error.message })
            toast.error("An error occurred while logging in, please try again.", {
                className: "font-semibold",
            })
        }
    }

    const handleError = (err) => {
        setStatus({ loading: false, error: err.message || 'Error verifying session' })
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-background-secondary p-8 rounded-lg shadow-xl w-96">
                <h2 className="text-3xl text-primary font-bold text-center">Sign In</h2>
                <form key="login" onSubmit={handleLoginSubmit(onSubmit)} className="mt-6 flex flex-col">
                    <div className="mb-4">
                        <label className="block text-text mb-1 required">E-mail</label>
                        <input
                            type="email"
                            placeholder="user123@gmail.com"
                            {...loginRegister("email", {
                                required: "E-mail is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    message: "The email is not valid"
                                }
                            })}
                            className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {loginErrors.email && <p className="text-error text-xs mt-1">{loginErrors.email.message}</p>}
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-text required">Password</label>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setResetPassword(true);
                                        resetLogin();
                                        setStatus({ loading: false, error: null });
                                    }}
                                    className="text-primary hover:underline cursor-pointer"
                                >Forgot Password?</button>
                            </div>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                {...loginRegister("password", {
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
                            <i className={`${showPassword ? 'bx bx-show' : 'bx bx-hide'} absolute right-3 top-6 -translate-y-1/2 cursor-pointer text-text text-xl font-semibold`}
                                onClick={() => setShowPassword(!showPassword)}></i>
                            {loginErrors.password && <p className="text-error text-xs mt-1">{loginErrors.password.message}</p>}
                        </div>
                    </div>
                    <div className="my-4 mx-auto">
                        <GoogleLogin
                            onSuccess={handleSuccess}
                            onError={handleError}
                        />
                    </div>
                    {status.error && <p className="text-error text-md text-center mb-2">{status.error}</p>}
                    <button type="submit" disabled={status.loading} className="w-full buttonPrimary p-3">
                        {status.loading ? <i className="bx bx-loader bx-spin"></i> : "Sign In"}
                    </button>
                </form>
                <p className="text-center text-text mt-4">
                    Dont have an account? <Link to="/register" className="text-primary hover:underline">Sign up</Link>
                </p>
            </div>
            {resetPassword && (
                <div className="fixed inset-0 bg-background-dark/50 flex items-center justify-center z-30">
                    <div className="bg-background-secondary p-8 rounded-lg shadow-lg w-96">
                        <h2 className="text-2xl text-center text-primary">Reset Password</h2>
                        <form key='reset' onSubmit={handleResetSubmit(handleResetPassword)} className="mt-4">
                            <div className="mb-4">
                                <label className="block text-text mb-1 required">E-mail</label>
                                <input
                                    type="email"
                                    placeholder="user123@gmail.com"
                                    {...resetRegister('resetEmail', {
                                        required: "E-mail is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                            message: "The email is not valid"
                                        }
                                    })}
                                    className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                {resetErrors.resetEmail && <p className="text-error text-xs mt-1">{resetErrors.resetEmail.message}</p>}
                            </div>
                            {status.error && <p className="text-error text-md text-center my-2">{status.error}</p>}
                            <div className="flex justify-between items-center space-x-2">
                                <button
                                    type="button"
                                    className="w-full py-2 buttonSecondary"
                                    onClick={() => {
                                        setResetPassword(false);
                                        resetReset();
                                        setStatus({ loading: false, error: null });
                                    }}
                                >Cancel</button>
                                <button type="submit" disabled={status.loading} className="w-full py-2 buttonPrimary">
                                    {status.loading ? <i className="bx bx-loader bx-spin"></i> : "Reset Password"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
