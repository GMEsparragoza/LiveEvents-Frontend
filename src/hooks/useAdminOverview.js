import { useQuery } from "@tanstack/react-query";
import api from "../services/Fetch";

const fetchOverviewData = async () => {
    try {
        const response = await api.get('/admin/overview')
        return response.data;
    } catch (error) {
        console.error("Error getting overview data:", error);
        throw error;
    }
}

export const useAdminOverview = () => {
    const { data: Overview, isLoading, error, refetch } = useQuery({
        queryKey: ["Overview"],
        queryFn: fetchOverviewData,
        staleTime: 1000 * 60 * 60 * 24, // 24 horas antes de refetch automático
        retry: 1, // Intentar 1 vez más en caso de fallo
    });

    return { Overview, isLoading, error, refetch }
}