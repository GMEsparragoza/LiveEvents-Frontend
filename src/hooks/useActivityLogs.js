import { useQuery } from "@tanstack/react-query";
import api from "../services/Fetch";

const fetchMessagesData = async () => {
    try {
        const response = await api.get('/profile/logs')
        return response.data;
    } catch (error) {
        console.error("Error getting messages data:", error);
        throw error;
    }
}

export const useActivityLogs = () => {
    const { data: logs, isLoading, error, refetch } = useQuery({
        queryKey: ["UserLogs"],
        queryFn: fetchMessagesData,
        staleTime: 1000 * 60 * 60 * 24, // 24 horas antes de refetch automático
        retry: 1, // Intentar 1 vez más en caso de fallo
    });

    return { logs, isLoading, error, refetch }
}