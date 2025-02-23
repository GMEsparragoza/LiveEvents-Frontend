import { useState, useEffect } from 'react'
import api from '../services/Fetch';

export const useUserEvents = ({ setEvents }) => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true)
            try {
                const response = await api.get(`/profile/events`);
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