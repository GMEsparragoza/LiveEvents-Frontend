import { useAuth } from "../context/AuthContext"

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className='text-5xl text-primary'>Profile</h1>
            {user && <p className='text-2xl text-accent'>Welcome {user.username}</p>}
        </div>
    )
}

export default Profile