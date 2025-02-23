import { useState } from 'react';
import { useAuth } from '../../context/AuthContext'
import { useHomeEvents } from '../../hooks/useHomeEvents'

const FeaturedEvents = () => {
    const [events, setEvents] = useState([])
    const { user } = useAuth()
    const { loading } = useHomeEvents({ setEvents })

    return (
        <section className="mt-12">
            <h2 className="text-2xl font-bold text-text mb-6">Featured Events</h2>
            {loading ? (
                <div className="bg-white shadow-md mb-6 p-6">
                    <h2 className="text-xl font-bold text-text text-center">Loading Events...</h2>
                </div>
            ) : (
                events?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events?.map((event) => (
                            <div key={event._id} className="bg-white rounded-lg shadow p-4 flex flex-col">
                                <img
                                    src={event.bannerURL || event.imageURL}
                                    alt={event.tittle}
                                    className="w-full h-48 object-cover rounded mb-4"
                                />
                                <h3 className="text-xl font-semibold text-text mb-2">{event.tittle}</h3>
                                <p className="text-sm text-text-secondary mb-2">
                                    {new Date(event.date).toLocaleString('en-GB', {
                                        timeZone: 'UTC',
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                    })}
                                </p>
                                <p className="text-sm text-text-secondary mb-4">{event.location}</p>
                                {!user ? (
                                    <button className="buttonSecondary mt-auto px-4 py-2 text-sm">
                                        Learn More
                                    </button>
                                ) : (
                                    <button className="buttonPrimary mt-auto px-4 py-2 text-sm">
                                        View Details
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-text-secondary">No featured events available.</p>
                )
            )}
        </section>
    );
};

export default FeaturedEvents;