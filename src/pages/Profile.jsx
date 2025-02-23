import { useState } from 'react' 
import { useAuth } from "../context/AuthContext"
import { useSEO } from '../hooks/useSEO';
import PersonalInfo from '../components/Profile/PersonalInfo'
import PasswordChange from '../components/Profile/PasswordChange'
import CreatedEvents from '../components/Profile/CreatedEvents'
import SessionSecurity from '../components/Profile/SessionSecurity'
import AuditLog from '../components/Profile/AuditLog'

const Profile = () => {
    const { user, refetch } = useAuth();
    useSEO({ title: `${user.username} Profile` })

    // createdEvents: eventos creados por el usuario (solo si es admin)
    const [events, setEvents] = useState([]);

    const handleEditEvent = (event) => {
        // Lógica para editar el evento.
        console.log('Edit event', event);
    };

    const handleDeleteEvent = (event) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            // Lógica para eliminar el evento.
            console.log('Delete event', event);
            setEvents(events.filter((e) => e._id !== event._id));
        }
    };

    return (
        <div className="p-4 bg-background min-h-screen space-y-8 mt-20">
            <PersonalInfo user={user} refetch={refetch} />
            <PasswordChange />
            {user.role === 'admin' && (
                <CreatedEvents
                    events={events}
                    onEdit={handleEditEvent}
                    onDelete={handleDeleteEvent}
                />
            )}
            <SessionSecurity />
            <AuditLog />
        </div>
    );
}

export default Profile