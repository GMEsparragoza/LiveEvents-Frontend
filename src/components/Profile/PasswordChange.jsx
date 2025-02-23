import { useForm } from 'react-hook-form'
import { useState } from 'react';
import api from '../../services/Fetch'
import { toast } from 'react-toastify'

const PasswordChange = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [status, setStatus] = useState({ loading: false, error: null })

    const onSubmit = async (data) => {
        setStatus({ loading: true, error: null })
        try {
            if(data.newPassword !== data.confirmPassword) {
                setStatus({ loading: false, error: 'The passwords do not match' })
                return;
            }
            const response = api.put('/profile/password', {
                password: data.currentPassword,
                newPassword: data.newPassword
            })
            toast.success(`${response.data.message}!`,{
                className: 'font-semibold'
            })
            reset()
            setStatus({ loading: false, error: null })
        } catch (error) {
            setStatus({ loading: false, error: error.response?.data.message || error?.message})
        }
    }

    return (
        <section className="bg-white p-6 rounded shadow mb-8">
            <h2 className="text-xl font-bold text-text mb-4">Security and Password</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                    <label className="block text-text-secondary mb-1">Current Password</label>
                    <input
                        type="password"
                        placeholder='********'
                        className="w-full p-2 border border-border rounded"
                        {...register('currentPassword', {
                            required: 'The Current Password is required',
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[._-]).{6,20}$/,
                                message: 'The password format is not correct'
                            }
                        })}
                    />
                    {errors.currentPassword && <p className='text-sm text-error'>{errors.currentPassword.message}</p>}
                </div>
                <div>
                    <label className="block text-text-secondary mb-1">New Password</label>
                    <input
                        type="password"
                        placeholder='********'
                        className="w-full p-2 border border-border rounded"
                        {...register('newPassword', {
                            required: 'The New Password is required',
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[._-]).{6,20}$/,
                                message: 'The password must contain at least 1 uppercase, 1 lowercase and 1 special character'
                            }
                        })}
                    />
                    {errors.newPassword && <p className='text-sm text-error'>{errors.newPassword.message}</p>}
                </div>
                <div>
                    <label className="block text-text-secondary mb-1">Confirm New Password</label>
                    <input
                        type="password"
                        placeholder='********'
                        className="w-full p-2 border border-border rounded"
                        {...register('confirmPassword', {
                            required: 'The Confirm Password is required',
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[._-]).{6,20}$/,
                                message: 'The password must contain at least 1 uppercase, 1 lowercase and 1 special character'
                            }
                        })}
                    />
                    {errors.confirmPassword && <p className='text-sm text-error'>{errors.confirmPassword.message}</p>}
                </div>
                {status.error && <p className='text-lg text-error'>{status.error}</p>}
                <button type="submit" className="buttonPrimary px-4 py-2 text-sm">
                    {status.loading ? 'Changing password...' : 'Change Password'}
                </button>
            </form>
        </section>
    );
};

export default PasswordChange;
