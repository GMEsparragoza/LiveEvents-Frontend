import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import api from '../services/Fetch'

const ResetPassword = () => {
    const [status, setStatus] = useState({ loading: false, error: null })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        setStatus({ loading: true, error: null })
        if (data.password !== data.confirmPassword) {
            setStatus({ loading: false, error: "Passwords do not match" })
            return;
        }
        const oobCode = searchParams.get("oobCode");
        const userID = searchParams.get("secretUserID");
        try {
            const response = await api.put(`/auth/reset-password/${userID}/${oobCode}`, { password: data.password })
            setStatus({ loading: false, error: null })
            toast.success(`${response.data.message}, please log in`, {
                className: "font-semibold text-success",
            })
            setTimeout(() => {
                navigate("/login")
            }, 500);
        } catch (error) {
            setStatus({ loading: false, error: error.response.data.message || error.message })
            toast.error("An error occurred while resetting your password!", {
                className: "font-semibold text-error",
            })
        }
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-background-secondary p-8 rounded-lg shadow-xl w-96">
                    <h2 className="text-3xl text-primary font-bold text-center">Reset Password</h2>
                    <form key="reset-form" onSubmit={handleSubmit(onSubmit)} className="mt-6">
                        <div className="mb-4 relative">
                            <label className="block text-text mb-1">Password</label>
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
                        <div className="mb-4 relative">
                            <label className="block text-text mb-1">Confirm Password</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="********"
                                {...register("confirmPassword", {
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
                            <i className={`${showConfirmPassword ? 'bx bx-show' : 'bx bx-hide'} absolute right-3 top-13 -translate-y-1/2 cursor-pointer text-text text-xl font-semibold`}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}></i>
                            {errors.confirmPassword && <p className="text-error text-xs mt-1">{errors.confirmPassword.message}</p>}
                        </div>
                        {status.error && <p className="text-error text-md text-center my-2">{status.error}</p>}
                        <button type="submit" disabled={status.loading} className="w-full bg-primary text-white p-3 rounded-lg hover:bg-secondary transition-all cursor-pointer duration-300">
                            {status.loading ? <i className="bx bx-loader bx-spin"></i> : "Reset"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword