// EventsPage.jsx
import { useState } from 'react';
import EventsHeader from '../components/Events/EventsHeader';
import EventList from '../components/Events/EventList';
import Pagination from '../components/Events/Pagination';
import { useSEO } from '../hooks/useSEO'
import { usePublicEvents } from '../hooks/usePublicEvents';

const Events = () => {
    useSEO({ title: 'Events' })
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { loading, error } = usePublicEvents({ setEvents, setTotalPages, currentPage, searchTerm, filterDate })

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-4 min-h-screen mt-20">
            <EventsHeader
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterDate={filterDate}
                setFilterDate={setFilterDate}
            />
            {error && (
                <div className="text-center text-error py-4">
                    {error}
                </div>
            )}
            <EventList events={events} loading={loading} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default Events;