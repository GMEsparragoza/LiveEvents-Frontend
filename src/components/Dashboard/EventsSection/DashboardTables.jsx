/* eslint-disable react/prop-types */
import { useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../../services/Fetch'
import { useForm } from 'react-hook-form'

export const Dashboardevents = ({ data, actions, setEvents, events }) => {
    const [deleteEvent, setDeleteEvent] = useState(false)
    const [updateEvent, setUpdateEvent] = useState(false)
    const [updatingEventData, setUpdatingEventData] = useState({
        tittle: '',
        description: '',
        date: '',
        location: '',
        price: ''
    })
    const [eventID, setEventID] = useState(null)
    const [error, setError] = useState(null)
    const { register, handleSubmit, reset } = useForm()

    const handleDeleteEvent = async (_id) => {
        try {
            const response = await api.delete(`/admin/event/${_id}`)
            toast.success(`${response.data.message}!`, {
                className: 'font-semibold'
            })
            setDeleteEvent(false)
            setEvents(events.filter(user => user._id !== _id))
        } catch (error) {
            toast.error(`${error.response.data.message || error.message}`, {
                className: 'font-semibold'
            })
        }
    }

    const handleUpdateEvent = async (data) => {
        setError(null)
        try {
            let formattedDate = data.date.trim();
            if (/^\d{2}[-/]\d{2}[-/]\d{4}$/.test(formattedDate)) {
                const [day, month, year] = formattedDate.split(/[-/]/);
                formattedDate = `${year}-${month}-${day}`;
            }
            if (!/^\d{4}-\d{2}-\d{2}$/.test(formattedDate)) {
                setError('Incorrect format for date')
                return;
            }
            data.date = new Date(formattedDate);
            const response = await api.put(`/admin/event/${eventID}`, {
                data
            })
            toast.success(`${response.data.message}!`, {
                className: 'font-semibold'
            })
            setUpdateEvent(false)
            reset()
            setEvents(events.map(user => user._id === response.data.event._id ? response.data.event : user));
        } catch (error) {
            console.error('Error trying to update Event', error.message)
            setError(error.response.data.message || error.message)
        }
    }

    return (
        <tr className='gap-4'>
            <td className="py-2">{data.tittle}</td>
            <td className="py-2">{new Date(data.date).toLocaleDateString('en-GB', {
                timeZone: 'UTC',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            })}</td>
            <td className="py-2 flex gap-2 flex-wrap">
                <button className="buttonPrimary px-3 py-1 text-sm">{actions.primary}</button>
                <button onClick={() => {
                    setUpdateEvent(true);
                    setUpdatingEventData({
                        tittle: data.tittle,
                        description: data.description,
                        date: new Date(data.date).toLocaleDateString('en-GB', {
                            timeZone: 'UTC',
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                        }),
                        location: data.location,
                        price: data.price
                    })
                    setEventID(data._id)
                }} className="buttonSecondary px-3 py-1 text-sm">{actions.secondary}</button>
                <button onClick={() => setDeleteEvent(true)} className="buttonSecondary px-3 py-1 text-sm">{actions.tertiary}</button>
            </td>
            {deleteEvent && (
                <div className='fixed inset-0 flex items-center justify-center bg-background-dark/50'>
                    <div className='bg-background-secondary p-6 rounded-lg shadow-xl w-full max-w-md border border-border'>
                        <h1 className="text-2xl text-center font-bold text-primary mb-4">Delete Event</h1>
                        <h2 className='text-lg text-start font-medium text-text-secondary '>Are you sure you want to delete this Event?</h2>
                        <div className='my-2 py-2'>
                            <p className='text-sm text-text-secondary'><strong>Tittle:</strong> {data.tittle}</p>
                            <p className='text-sm text-text-secondary'><strong>Description:</strong> {data.description}</p>
                            <p className='text-sm text-text-secondary'><strong>Date:</strong> {new Date(data.date).toLocaleDateString('en-GB', {
                                timeZone: 'UTC',
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                            })}</p>
                            <p className='text-sm text-text-secondary'><strong>Location:</strong> {data.location}</p>
                        </div>
                        <div className='flex gap-4 my-2'>
                            <button onClick={() => setDeleteEvent(false)} className='w-full py-2 buttonSecondary'>Cancel</button>
                            <button onClick={() => handleDeleteEvent(data._id)} className='w-full py-2 buttonPrimary'>Delete</button>
                        </div>
                    </div>
                </div>
            )}
            {updateEvent && (
                <div className='fixed inset-0 flex items-center justify-center bg-background-dark/50'>
                    <div className='bg-background-secondary p-6 rounded-lg shadow-xl w-full max-w-md border border-border'>
                        <h1 className="text-2xl text-center font-bold text-primary mb-4">Update Event</h1>
                        <form key='edit' onSubmit={handleSubmit(handleUpdateEvent)} className="mt-2 grid grid-cols-1 gap-4">
                            <input
                                type="text"
                                placeholder={`Current Tittle: ${updatingEventData.tittle}`}
                                {...register('tittle')}
                                className="p-2 rounded-md bg-background-secondary border border-border text-text"
                            />
                            <textarea
                                type="text"
                                placeholder={`Current Description: ${updatingEventData.description}`}
                                {...register('description')}
                                className="p-2 rounded-md bg-background-secondary border border-border text-text"
                            />
                            <input
                                type="text"
                                placeholder={`Current Date: ${updatingEventData.date}`}
                                {...register('date')}
                                className="p-2 rounded-md bg-background-secondary border border-border text-text"
                            />
                            <input
                                type="text"
                                placeholder={`Current Location: ${updatingEventData.location}`}
                                {...register('location')}
                                className="p-2 rounded-md bg-background-secondary border border-border text-text"
                            />
                            <input
                                type="text"
                                placeholder={`Current Price: ${updatingEventData.price}`}
                                {...register('price')}
                                className="p-2 rounded-md bg-background-secondary border border-border text-text"
                            />
                            {error && <p className='text-error text-md text-center my-2'>{error}</p>}
                            <div className='flex gap-4 my-2'>
                                <button type='button' onClick={() => { setUpdateEvent(false); reset(); setError(null); setEventID(null) }} className='w-full py-2 buttonSecondary'>Cancel</button>
                                <button type='submit' className='w-full py-2 buttonPrimary'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </tr>
    )
}

export const DashboardUsers = ({ data, actions, setUsers, users }) => {
    const [deleteUser, setDeleteUser] = useState(false)
    const [updateUser, setUpdateUser] = useState(false)
    const { register, formState: { errors }, handleSubmit, reset } = useForm()
    const [updatingUserData, setUpdatingUserData] = useState({
        username: '',
        email: '',
        role: '',
    })
    const [error, setError] = useState(null)
    const [userID, setUserID] = useState(null)

    const handleDeleteUser = async (_id) => {
        try {
            const response = await api.delete(`/admin/user/${_id}`)
            toast.success(`${response.data.message}!`, {
                className: 'font-semibold'
            })
            setDeleteUser(false)
            setUsers(users.filter(user => user._id !== _id))
        } catch (error) {
            toast.error(`${error.response.data.message || error.message}`, {
                className: 'font-semibold'
            })
        }
    }

    const handleUpdateUser = async (data) => {
        setError(null)
        try {
            const response = await api.put(`/admin/user/${userID}`, {
                data
            })
            toast.success(`${response.data.message}!`, {
                className: 'font-semibold'
            })
            setUpdateUser(false)
            reset()
            setUsers(users.map(user => user._id === response.data.user._id ? response.data.user : user));
        } catch (error) {
            console.error('Error trying to update user', error.message)
            setError(error.response.data.message || error.message)
        }
    }

    return (
        <tr>
            <td className="py-2 mx-4">{data.username}</td>
            <td className="py-2 break-all whitespace-normal mx-4">{data.email}</td>
            <td className="py-2 mx-4">{data.role}</td>
            <td className="py-2 flex gap-2 flex-wrap mx-4">
                <button className="buttonPrimary px-3 py-1 text-sm">{actions.primary}</button>
                <button onClick={() => {
                    setUpdateUser(true);
                    setUpdatingUserData({
                        username: data.username,
                        email: data.email,
                        role: data.role
                    });
                    setUserID(data._id)
                }} className="buttonSecondary px-3 py-1 text-sm">{actions.secondary}</button>
                <button onClick={() => setDeleteUser(true)} className="buttonSecondary px-3 py-1 text-sm">{actions.tertiary}</button>
            </td>
            {deleteUser && (
                <div className='fixed inset-0 flex items-center justify-center bg-background-dark/50'>
                    <div className='bg-background-secondary p-6 rounded-lg shadow-xl w-full max-w-md border border-border'>
                        <h1 className="text-2xl text-center font-bold text-primary mb-4">Delete User</h1>
                        <h2 className='text-lg text-start font-medium text-text-secondary '>Are you sure you want to delete this user?</h2>
                        <div className='my-2 py-2'>
                            <p className='text-sm text-text-secondary'><strong>Email:</strong> {data.email}</p>
                            <p className='text-sm text-text-secondary'><strong>Username:</strong> {data.username}</p>
                            <p className='text-sm text-text-secondary'><strong>Role:</strong> {data.role}</p>
                        </div>
                        <div className='flex gap-4 my-2'>
                            <button onClick={() => setDeleteUser(false)} className='w-full py-2 buttonSecondary'>Cancel</button>
                            <button onClick={() => handleDeleteUser(data._id)} className='w-full py-2 buttonPrimary'>Delete</button>
                        </div>
                    </div>
                </div>
            )}
            {updateUser && (
                <div className='fixed inset-0 flex items-center justify-center bg-background-dark/50'>
                    <div className='bg-background-secondary p-6 rounded-lg shadow-xl w-full max-w-md border border-border'>
                        <h1 className="text-2xl text-center font-bold text-primary mb-4">Update User</h1>
                        <form key='edit' onSubmit={handleSubmit(handleUpdateUser)} className="mt-2 grid grid-cols-1 gap-4">
                            <input
                                type="text"
                                placeholder={`Current Username: ${updatingUserData.username}`}
                                {...register('username')}
                                className="p-2 rounded-md bg-background-secondary border border-border text-text"
                            />
                            <input
                                type="text"
                                placeholder={`Current email: ${updatingUserData.email}`}
                                {...register('email', {
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                        message: 'The email format is not correct'
                                    }
                                })}
                                className="p-2 rounded-md bg-background-secondary border border-border text-text"
                            />
                            {errors.email && <p className='text-sm text-center text-error'>{errors.email.message}</p>}
                            <select
                                {...register('role')}
                                defaultValue={updatingUserData.role}
                                className="p-2 rounded-md bg-background-secondary border border-border text-text cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary transition"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                            {error && <p className='text-error text-md text-center my-2'>{error}</p>}
                            <div className='flex gap-4 my-2'>
                                <button type='button' onClick={() => { setUpdateUser(false); reset(); setError(null); setUserID(null) }} className='w-full py-2 buttonSecondary'>Cancel</button>
                                <button type='submit' className='w-full py-2 buttonPrimary'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </tr>
    )
}