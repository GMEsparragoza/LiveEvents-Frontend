// EventsPage.jsx
import { useState, useEffect } from 'react';
import EventsHeader from '../components/Events/EventsHeader';
import EventList from '../components/Events/EventList';
import Pagination from '../components/Events/Pagination';
import api from '../services/Fetch'

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Función para obtener los eventos con posibles filtros y paginación.
    const fetchEvents = async () => {
        setLoading(true);
        try {
            let query = `page=${currentPage}`;
            if (searchTerm) {
                query += `&search=${encodeURIComponent(searchTerm)}`;
            }
            if (filterDate) {
                query += `&date=${encodeURIComponent(filterDate)}`;
            }
            // Ajusta la URL del endpoint según tu API.
            const res = await api.get(`/event/?${query}`);
            setEvents(res.data.events);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            setError(err.response?.data.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, filterDate, currentPage]);

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