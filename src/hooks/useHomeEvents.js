import { useState, useEffect } from 'react'
import api from '../services/Fetch';

export const useHomeEvents = ({ setEvents }) => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true)
            try {
                const response = await api.get(`/event/reduced`);
                setEvents(response.data)
            } catch (error) {
                console.error("Error fetching Events:", error);
            } finally {
                setLoading(false)
            }
        };

        fetchEvents();
    }, [setEvents]);

    return { loading }
}