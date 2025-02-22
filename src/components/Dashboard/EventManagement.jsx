import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import api from '../../services/Fetch'
import { Dashboardevents } from './EventsSection/DashboardTables';
import { useSEO } from '../../hooks/useSEO'
import { useFilterEvents } from '../../hooks/useFilterEvents';
import { toast } from 'react-toastify';

const EventManagement = () => {
    useSEO({ title: 'Admin Dashboard' })
    const [createEvent, setCreateEvent] = useState(false)
    const [eventImage, setEventImage] = useState(null)
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [bannerImage, setBannerImage] = useState(null)
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            setEventImage(acceptedFiles[0])
        }
    });
    const { getRootProps: getRootBannerProps, getInputProps: getInputBannerProps, isDragActive: isDragBannerActive } = useDropzone({
        accept: 'image/*',
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            setBannerImage(acceptedFiles[0])
        }
    });
    const [events, setEvents] = useState([])
    const { setFilterEvents, loading } = useFilterEvents({ setEvents })
    const eventActions = {
        primary: 'View attendees',
        secondary: 'Edit',
        tertiary: 'Delete'
    }
    const [status, setStatus] = useState({ loading: false, error: null })

    const onCreateEvent = async (data) => {
        setStatus({ loading: true, error: null })
        try {
            let formattedDate = data.date.trim();
            if (/^\d{2}[-/]\d{2}[-/]\d{4}$/.test(formattedDate)) {
                const [day, month, year] = formattedDate.split(/[-/]/);
                formattedDate = `${year}-${month}-${day}`;
            }
            if (!/^\d{4}-\d{2}-\d{2}$/.test(formattedDate)) {
                setStatus({ loading: false, error: 'Incorrect format for date' })
                return;
            }
            const dateObject = new Date(formattedDate);

            const formData = new FormData();
            formData.append('image', eventImage)
            formData.append('banner', bannerImage)
            const eventData = {
                tittle: data.tittle,
                description: data.description,
                date: dateObject,
                location: data.location,
                price: data.price
            }
            formData.append('eventData', JSON.stringify(eventData))

            const response = await api.post('/admin/event', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            setStatus({ loading: false, error: null })
            setEventImage(null)
            setBannerImage(null)
            reset()
            setEvents([...events, response.data.event])
            toast.success(`${response.data.message}!`, {
                className: 'font-semibold'
            })
            setCreateEvent(false)
        } catch (error) {
            setStatus({ loading: false, error: error.response?.data.message || error.message })
        }
    }

    return (
        <section className="mb-8">
            <h2 className="text-xl font-bold text-text mb-4">Event Management</h2>
            <div className="bg-white p-4 rounded shadow">
                <div className="flex justify-between mb-4">
                    <button onClick={() => setCreateEvent(true)} className="buttonPrimary px-4 py-2 text-sm">Create Event</button>
                    <select onChange={(e) => setFilterEvents(e.target.value)} className="p-2 border border-border rounded">
                        <option value="all">All</option>
                        <option value="upcomings">Upcomings</option>
                        <option value="completeds">Completeds</option>
                    </select>
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-text-secondary">
                            <th className="py-2 text-center sm:text-start">Event Tittle</th>
                            <th className="py-2 text-center sm:text-start">State</th>
                            <th className="py-2 text-center sm:text-start">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan='3' className='py-4 text-center text-2xl text-text'>
                                    Loading Events...
                                </td>
                            </tr>
                        ) : events.length > 0 ? (
                            events?.map((event) => (
                                <Dashboardevents
                                    key={event._id}
                                    data={event}
                                    actions={eventActions}
                                    setEvents={setEvents}
                                    events={events}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="py-4 text-center text-2xl text-text">
                                    There are no events to display
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {createEvent && (
                <div className="my-4">
                    {/* Formulario para añadir un nuevo producto */}
                    <h3 className="text-xl font-semibold text-text-primary">Create New Event</h3>
                    <form key='create' className="mt-2 grid grid-cols-1 gap-4 bg-white rounded p-4 shadow" onSubmit={handleSubmit(onCreateEvent)}>
                        <input
                            type="text"
                            placeholder="Tittle"
                            {...register('tittle', {
                                required: {
                                    value: true,
                                    message: 'Event tittle is required'
                                }
                            })}
                            className="p-2 rounded-md bg-background-secondary border border-border text-text"
                        />
                        {errors.tittle && <p className='text-error font-medium text-center'>{errors.tittle.message}</p>}
                        <textarea
                            placeholder="Description"
                            {...register('description')}
                            className="p-2 rounded-md bg-background-secondary border border-border text-text"
                        />
                        <input
                            type="text"
                            placeholder="Date"
                            {...register('date', {
                                required: {
                                    value: true,
                                    message: 'Event Date is required'
                                },
                                pattern: {
                                    value: /^(?:(?:(0[1-9]|[12]\d|3[01])[-/](0[1-9]|1[0-2])[-/](\d{4}))|((\d{4})[-/](0[1-9]|1[0-2])[-/](0[1-9]|[12]\d|3[01])))$/,
                                    message: 'Date format is not correct'
                                }
                            })}
                            className="p-2 rounded-md bg-background-secondary border border-border text-text"
                        />
                        {errors.date && <p className='text-error font-medium text-center'>{errors.date.message}</p>}
                        <input
                            type="text"
                            placeholder="Location"
                            {...register('location', {
                                required: {
                                    value: true,
                                    message: 'Event Location is required'
                                }
                            })}
                            className="p-2 rounded-md bg-background-secondary border border-border text-text"
                        />
                        {errors.location && <p className='text-error font-medium text-center'>{errors.location.message}</p>}
                        <input
                            type="number"
                            placeholder="Price"
                            {...register('price')}
                            className="p-2 rounded-md bg-background-secondary border border-border text-text"
                        />
                        <div
                            {...getRootProps()}
                            className="mt-2 w-full rounded-md bg-background-secondary px-3 py-6 text-text border-2 border-dashed border-border focus:outline-2 focus:outline-accent transition duration-300 hover:border-primary cursor-pointer"
                        >
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <p className="text-center text-sm">Drop the main image here...</p>
                            ) : (
                                <p className="text-center text-sm">Drag & drop an main image, or click to select</p>
                            )}
                        </div>
                        {eventImage && <p className='text-text text-lg text-center'>Featured image: {eventImage.name}</p>}
                        <div
                            {...getRootBannerProps()}
                            className="mt-2 w-full rounded-md bg-background-secondary px-3 py-6 text-text border-2 border-dashed border-border focus:outline-2 focus:outline-accent transition duration-300 hover:border-primary cursor-pointer"
                        >
                            <input {...getInputBannerProps()} />
                            {isDragBannerActive ? (
                                <p className="text-center text-sm">Drop the banner image here...</p>
                            ) : (
                                <p className="text-center text-sm">Drag & drop an banner image, or click to select</p>
                            )}
                        </div>
                        {bannerImage && <p className='text-text text-lg text-center'>Featured banner image: {bannerImage.name}</p>}
                        <div className='flex'>
                            <button type="button" onClick={() => {
                                setEventImage(null)
                                setCreateEvent(false)
                                reset()
                            }} className="w-1/2 mx-2 px-4 py-2 buttonSecondary">
                                Cancel
                            </button>
                            <button type="submit" className="w-1/2 mx-2 px-4 py-2 buttonPrimary">
                                {status.loading ? 'Creating Event...' : 'Create Event'}
                            </button>
                        </div>
                        {status.error && <p className='text-error font-medium text-center'>{status.error}</p>}
                    </form>
                </div>
            )}
        </section>
    );
};

export default EventManagement;
