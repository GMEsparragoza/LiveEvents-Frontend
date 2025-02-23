import api from "../../services/Fetch";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const SessionSecurity = () => {
    const { refetch } = useAuth()
    const handleLogOut = async () => {
            try {
                await api.post('/auth/logout')
                toast.success("Logged out successfully", {
                    className: "font-semibold text-success",
                })
                refetch()
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            } catch (error) {
                toast.error(error.response.data.message || error.message, {
                    className: "font-semibold text-error",
                })
            }
        }

    return (
        <section className="bg-white p-6 rounded shadow mb-8">
            <h2 className="text-xl font-bold text-text mb-4">Sesión y Seguridad</h2>
            <button onClick={handleLogOut} className="buttonPrimary px-6 py-3 text-md">
                Log Out
            </button>
        </section>
    );
};

export default SessionSecurity;
