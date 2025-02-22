/* eslint-disable react/prop-types */
import EventCard from './EventCard';

const EventList = ({ events, loading }) => {
    if (loading) {
        return (
            <div className="text-center text-2xl text-text py-8">
                Loading Events...
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className="text-center text-2xl text-text py-8">
                No events found.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
                <EventCard key={event._id} event={event} />
            ))}
        </div>
    );
};

export default EventList;
