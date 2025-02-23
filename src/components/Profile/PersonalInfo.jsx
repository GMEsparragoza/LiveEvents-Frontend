/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import api from '../../services/Fetch';
import { toast } from 'react-toastify';

const PersonalInfo = ({ user, refetch }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [userImage, setUserImage] = useState(null)
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            setUserImage(acceptedFiles[0])
        }
    });
    const { register, handleSubmit, reset } = useForm()
    const [status, setStatus] = useState({ loading: false, error: null })

    const onSubmit = async (data) => {
        setStatus({ loading: true, error: null })
        try {
            if (!data.name && !data.lastname && !userImage) {
                setStatus({ loading: false, error: 'You must enter data or an image to update' })
                return;
            }
            const formData = new FormData()
            formData.append('image', userImage)
            if (data.username || data.name || data.lastname) {
                const userData = {
                    username: data.username,
                    name: data.name,
                    lastname: data.lastname
                }
                formData.append('userData', JSON.stringify(userData))
            }

            const response = await api.put('/profile/data', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            reset()
            refetch()
            toast.success(`${response.data?.message}!`, {
                className: "font-semibold"
            })
            setIsEditing(false)
            setUserImage(null)
            setStatus({ loading: false, error: null })
        } catch (error) {
            setStatus({ loading: false, error: error.response?.data.message || error?.message })
            toast.error('Error updating user data', {
                className: "font-semibold"
            })
        }
    }

    return (
        <section className="bg-white p-6 rounded shadow mb-8">
            <h2 className="text-xl font-bold text-text mb-4">Personal Information</h2>
            <form
                key="UserDataForm"
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col md:flex-row gap-8 items-center"
            >
                {/* Contenedor de la imagen y dropzone */}
                <div className="flex flex-col items-center mx-auto w-full max-w-xs">
                    {user?.imageURL ? (
                        <img
                            src={userImage || user?.imageURL}
                            alt={user?.username}
                            className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover mb-2"
                        />
                    ) : (
                        <i className="bx bxs-user-circle text-9xl"></i>
                    )}
                    {isEditing && (
                        <>
                            <div
                                {...getRootProps()}
                                className="mt-2 w-full rounded-md bg-background-secondary px-3 py-6 text-text border-2 border-dashed border-border focus:outline-2 focus:outline-accent transition duration-300 hover:border-primary cursor-pointer"
                            >
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                    <p className="text-center text-sm">Drop the main image here...</p>
                                ) : (
                                    <p className="text-center text-sm">
                                        Drag & drop a main image, or click to select
                                    </p>
                                )}
                            </div>
                            <div>
                                {userImage && (
                                    <p className="text-text text-lg text-center">
                                        Featured image: {userImage.name}
                                    </p>
                                )}
                            </div>
                        </>
                    )}
                </div>
                {/* Contenedor de inputs */}
                <div className="flex flex-col flex-grow gap-4 w-full">
                    <div>
                        <label className="block text-text-secondary mb-1">First Name</label>
                        <input
                            type="text"
                            placeholder={`${user?.name || 'Add Your First Name'}`}
                            disabled={!isEditing}
                            className="w-full p-2 border border-border rounded"
                            {...register('name')}
                        />
                    </div>
                    <div>
                        <label className="block text-text-secondary mb-1">Last Name</label>
                        <input
                            type="text"
                            placeholder={`${user?.lastname || 'Add Your Last Name'}`}
                            disabled={!isEditing}
                            {...register('lastname')}
                            className="w-full p-2 border border-border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-text-secondary mb-1">User Name</label>
                        <input
                            type="text"
                            placeholder={`${user?.username}`}
                            disabled={!isEditing}
                            {...register('username')}
                            className="w-full p-2 border border-border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-text-secondary mb-1">E-mail</label>
                        <input
                            type="email"
                            value={user.email}
                            disabled
                            className="w-full p-2 border border-border rounded bg-background-secondary"
                        />
                    </div>
                    {status.error && <p className="text-error text-sm">{status.error}</p>}
                    <div className="flex gap-2">
                        {isEditing && (
                            <>
                                <button type="submit" className="buttonPrimary px-4 py-2 text-sm">
                                    {status.loading ? 'Saving...' : 'Save'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setUserImage(null);
                                        reset();
                                        setStatus({ loading: false, error: null });
                                    }}
                                    className="buttonSecondary px-4 py-2 text-sm"
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </form>
            {!isEditing && (
                <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="buttonPrimary px-4 py-2 text-sm mt-4"
                >
                    Edit Information
                </button>
            )}
        </section>

    );
};

export default PersonalInfo;