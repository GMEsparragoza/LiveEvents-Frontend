/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import api from '../../services/Fetch'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const EventForms = ({ event, isEditing, setEditMode, isDeleting, setDeleteMode }) => {
    const { register, handleSubmit, reset } = useForm()
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleEditEventData = async (data) => {
        setError(null)
        try {
            if (data.date) {
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
            }
            const response = await api.put(`/admin/event/${event._id}`, {
                data
            })
            toast.success(`${response.data.message}!`, {
                className: 'font-semibold'
            })
            reset()
            setEditMode(false)
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (error) {
            setError(error.response?.data.message || error.message)
        }
    }

    const handleDeleteEvent = async () => {
        try {
            const response = await api.delete(`/admin/event/${event._id}`)
            toast.success(`${response.data.message}!`, {
                className: 'font-semibold'
            })
            navigate(`/events/`)
            setDeleteMode(false)
        } catch (error) {
            toast.error(`${error.response.data.message || error.message}`, {
                className: 'font-semibold'
            })
        }
    }

    return (
        <div>
            {isEditing && (
                <div className='fixed inset-0 flex items-center justify-center bg-background-dark/50'>
                    <div className='bg-background-secondary p-6 rounded-lg shadow-xl w-full max-w-md border border-border'>
                        <h1 className="text-2xl text-center font-bold text-primary mb-4">Edit Event</h1>
                        <form key='edit' onSubmit={handleSubmit(handleEditEventData)} className="mt-2 grid grid-cols-1 gap-4">
                            <input
                                type="text"
                                placeholder={`Current Tittle: ${event.tittle}`}
                                {...register('tittle')}
                                className="p-2 rounded-md bg-background-secondary border border-border text-text"
                            />
                            <textarea
                                type="text"
                                placeholder={`Current Description: ${event.description}`}
                                {...register('description')}
                                className="p-2 rounded-md bg-background-secondary border border-border text-text"
                            />
                            <input
                                type="text"
                                placeholder={`Current Date: ${event.date}`}
                                {...register('date')}
                                className="p-2 rounded-md bg-background-secondary border border-border text-text"
                            />
                            <input
                                type="text"
                                placeholder={`Current Location: ${event.location}`}
                                {...register('location')}
                                className="p-2 rounded-md bg-background-secondary border border-border text-text"
                            />
                            <input
                                type="text"
                                placeholder={`Current Price: ${event.price}`}
                                {...register('price')}
                                className="p-2 rounded-md bg-background-secondary border border-border text-text"
                            />
                            {error && <p className='text-error text-md text-center my-2'>{error}</p>}
                            <div className='flex gap-4 my-2'>
                                <button type='button' onClick={() => { setEditMode(false); reset(); setError(null) }} className='w-full py-2 buttonSecondary'>Cancel</button>
                                <button type='submit' className='w-full py-2 buttonPrimary'>Edit Event</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {isDeleting && (
                <div className='fixed inset-0 flex items-center justify-center bg-background-dark/50'>
                    <div className='bg-background-secondary p-6 rounded-lg shadow-xl w-full max-w-md border border-border'>
                        <h1 className="text-2xl text-center font-bold text-primary mb-4">Delete Event</h1>
                        <h2 className='text-lg text-start font-medium text-text-secondary '>Are you sure you want to delete this Event?</h2>
                        <div className='my-2 py-2'>
                            <p className='text-sm text-text-secondary'><strong>Tittle:</strong> {event.tittle}</p>
                            <p className='text-sm text-text-secondary'><strong>Description:</strong> {event.description}</p>
                            <p className='text-sm text-text-secondary'><strong>Date:</strong> {new Date(event.date).toLocaleDateString('en-GB', {
                                timeZone: 'UTC',
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                            })}</p>
                            <p className='text-sm text-text-secondary'><strong>Location:</strong> {event.location}</p>
                        </div>
                        <div className='flex gap-4 my-2'>
                            <button onClick={() => setDeleteMode(false)} className='w-full py-2 buttonSecondary'>Cancel</button>
                            <button onClick={handleDeleteEvent} className='w-full py-2 buttonPrimary'>Delete Event</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EventForms