import { useAuth } from "../context/AuthContext"
import api from "../services/Fetch";
import { toast } from "react-toastify";
import { useSEO } from '../hooks/useSEO';

const Profile = () => {
    const { user, refetch } = useAuth();
    useSEO({ title: `${user.username} Profile` })

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
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className='text-5xl text-primary'>Profile</h1>
            {user && <p className='text-2xl text-accent'>Welcome {user.username}</p>}
            <button onClick={handleLogOut} className="px-6 py-4 bg-primary text-white rounded-lg hover:bg-secondary transition-all cursor-pointer duration-300">Log Out</button>
        </div>
    )
}

export default Profile