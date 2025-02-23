import { useQuery } from "@tanstack/react-query";
import api from "../services/Fetch";

const fetchMessagesData = async () => {
    try {
        const response = await api.get('/admin/messages')
        return response.data;
    } catch (error) {
        console.error("Error getting messages data:", error);
        throw error;
    }
}

export const useAdminMessages = () => {
    const { data: messages, isLoading, error, refetch } = useQuery({
        queryKey: ["Messages"],
        queryFn: fetchMessagesData,
        staleTime: 1000 * 60 * 60 * 24, // 24 horas antes de refetch automático
        retry: 1, // Intentar 1 vez más en caso de fallo
    });

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const day = dateObj.getDate().toString().padStart(2, "0");
        const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
        const year = dateObj.getFullYear();

        let hours = dateObj.getHours();
        const minutes = dateObj.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Si es 0, se asigna 12

        return `${day}/${month}/${year} ${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
    };

    return { messages, isLoading, error, refetch, formatDate }
}