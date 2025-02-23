/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useContext, createContext } from "react";
import api from "../services/Fetch";
import { useQuery } from "@tanstack/react-query";

const AuthContext = createContext();

const fetchUserData = async () => {
    try {
        const { data } = await api.get("/auth/profile");
        return data;
    } catch (error) {
        console.error("Error getting user data:", error);
        throw error;
    }
};

export const AuthProvider = ({ children }) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["User"],
        queryFn: fetchUserData,
        staleTime: 1000 * 60 * 60 * 24, // 24 horas antes de refetch automático
        retry: 1, // Intentar 1 vez más en caso de fallo
    });

    return (
        <AuthContext.Provider value={{ user: data?.user || '', isLoading, error, refetch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}
