import { useState } from 'react';
import { useUserEvents } from '../../hooks/useUserEvents'
import { Link } from 'react-router-dom';

const CreatedEvents = () => {
    const [events, setEvents] = useState([])
    useUserEvents({ setEvents })

    return (
        <section className="mb-8">
            <h2 className="text-xl font-bold text-text mb-4">Eventos Creados</h2>
            {events?.length === 0 ? (
                <div className="text-center text-2xl text-text py-8">
                    No created events.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events?.map((event) => (
                        <div key={event._id} className="bg-white rounded shadow overflow-hidden flex flex-col">
                            <img
                                src={event.bannerURL || event.imageURL}
                                alt={event.tittle}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-text mb-2">{event.tittle}</h3>
                                <p className="text-sm text-text-secondary mb-2">
                                    {new Date(event.date).toLocaleString()}
                                </p>
                                <p className="text-sm text-text mb-4 flex-grow">
                                    {event.description}
                                </p>
                                <Link to={`/event/${event._id}`} className='buttonPrimary py-2 px-4 md:max-w-1/3 text-center'>See Details</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default CreatedEvents;