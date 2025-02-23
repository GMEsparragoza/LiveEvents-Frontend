import { useState, useEffect } from "react";
import api from '../services/Fetch'

export const usePublicEvents = ({ setEvents, setTotalPages, currentPage, searchTerm, filterDate }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);
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

    return { loading, error }
}