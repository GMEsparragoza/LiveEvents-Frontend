/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const EventCard = ({ event }) => {
    return (
        <div className="bg-white rounded shadow overflow-hidden flex flex-col">
            <img
                src={event.bannerURL || event.imageURL}
                alt={event.tittle}
                className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-text mb-2">{event.tittle}</h2>
                <p className="text-sm text-text-secondary mb-2">
                    {new Date(event.date).toLocaleString('en-GB', {
                        timeZone: 'UTC',
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                    })}
                </p>
                <p className="text-sm text-text mb-4 flex-grow">
                    {event.description}
                </p>
                <p className="text-sm text-text mb-4 flex-grow">
                    Entrance: ${event?.price || 'FREE'}
                </p>
                <Link to={`/event/${event._id}`} className="buttonPrimary px-4 py-2 text-sm self-end">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default EventCard;
