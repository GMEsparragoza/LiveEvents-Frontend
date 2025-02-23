import { useState } from 'react';
import EventBanner from '../components/EventDetails/EventBanner';
import EventOrganizers from '../components/EventDetails/EventOrganizer';
import AdditionalInfo from '../components/EventDetails/AditionalInfo';
import RealTimeChat from '../components/EventDetails/RealTimeChat';
import FinalCTA from '../components/EventDetails/FinalCTA';
import Footer from '../components/EventDetails/Footer';
import { useAuth } from '../context/AuthContext'
import { useEventDetail } from '../hooks/useEventDetails';
import { useParams } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO'
import EventForms from '../components/EventDetails/EventForms';

const EventDetail = () => {
    const { eventID } = useParams()
    const [event, setEvent] = useState([])
    const [organizer, setOrganizer] = useState([])
    const [isRegistered, setIsRegistered] = useState(false);
    const [amountEvents, setAmountEvents] = useState(0)
    const [editMode, setEditMode] = useState(false)
    const [deleteMode, setDeleteMode] = useState(false)
    const { user } = useAuth()
    const { loading } = useEventDetail({ eventID, setEvent, setOrganizer, setAmountEvents })
    useSEO({ title: loading ? 'Loading Event...' : event.tittle });


    const handleRegister = () => {
        // Lógica de registro
        setIsRegistered(!isRegistered);
    };

    const handleManageParticipants = () => {
        // Lógica para gestionar participantes
        console.log('Manage participants');
    };

    return (
        <div className="space-y-12 p-4 bg-background min-h-screen mt-20">
            {loading ? (
                <p className='text-3xl text-text font-bold text-center'>Loading Event...</p>
            ) : (
                <>
                    <EventBanner
                        event={event}
                        user={user}
                        isRegistered={isRegistered}
                        onRegister={handleRegister}
                        onEdit={setEditMode}
                        onDelete={setDeleteMode}
                    />
                    <AdditionalInfo event={event} />
                    <EventOrganizers org={organizer} amount={amountEvents} />
                    <RealTimeChat user={user} event={eventID} />
                    <FinalCTA
                        user={user}
                        onRegister={handleRegister}
                        isRegistered={isRegistered}
                        onEdit={setEditMode}
                        onManageParticipants={handleManageParticipants}
                    />
                    <Footer />
                    <EventForms 
                        event={event} 
                        isEditing={editMode} 
                        setEditMode={setEditMode} 
                        isDeleting={deleteMode}
                        setDeleteMode={setDeleteMode}
                    />
                </>
            )}
        </div>
    );
};

export default EventDetail