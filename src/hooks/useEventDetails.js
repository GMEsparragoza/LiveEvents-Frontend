import { useState, useEffect } from "react"
import api from "../services/Fetch";

export const useEventDetail = ({ eventID, setEvent, setOrganizer, setAmountEvents }) => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true)
            try {
                const response = await api.get(`/event/${eventID}`);
                setEvent(response.data.event)
                setOrganizer(response.data.organizer)
                setAmountEvents(response.data.amountEvents)
            } catch (error) {
                console.error("Error fetching Events:", error);
            } finally {
                setLoading(false)
            }
        };

        fetchEvents();
    }, [setEvent, eventID, setOrganizer, setAmountEvents]);

    return { loading }
}