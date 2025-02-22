import { useState, useEffect } from 'react'
import api from '../services/Fetch';

export const useFilterEvents = ({ setEvents }) => {
    const [filterEvents, setFilterEvents] = useState('all')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true)
            try {
                const response = await api.get(`/admin/events?filter=${filterEvents}`);
                setEvents(response.data)
            } catch (error) {
                console.error("Error fetching Events:", error);
            } finally {
                setLoading(false)
            }
        };

        fetchEvents();
    }, [filterEvents, setEvents]);

    return { setFilterEvents, loading }
}