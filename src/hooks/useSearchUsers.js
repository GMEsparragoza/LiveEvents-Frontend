import { useState, useEffect } from 'react'
import api from '../services/Fetch'

export const useSearchUsers = ({ setUsers }) => {
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProductsByFilters = async () => {
            setLoading(true)
            try {
                const response = await api.get(`/admin/users/?filter=${filter}`)
                setUsers(response.data)
            } catch (error) {
                console.error("Error fetching Products:", error);
            } finally {
                setLoading(false)
            }
        }

        fetchProductsByFilters()
    }, [filter, setUsers]);

    return { loading, filter, setFilter }
}