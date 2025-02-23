/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'

const FinalCTA = ({ user, onRegister, isRegistered, onEdit, onManageParticipants }) => {
    const navigate = useNavigate()

    return (
        <section className="mt-12 bg-white shadow-md p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold text-text mb-4">
                {!user
                    ? 'Sign Up to Join the Event!'
                    : user.role === 'user'
                        ? 'Register Now or Explore More Events!'
                        : 'Edit Event or Manage Participants!'}
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                {!user && (
                    <>
                        <button onClick={() => navigate('/login')} className="buttonPrimary px-6 py-3 text-lg">Sign Up to Join</button>
                        <button onClick={() => navigate('/events')} className="buttonSecondary px-6 py-3 text-lg">Explore More Events</button>
                    </>
                )}
                {user.role === 'user' && (
                    <button onClick={onRegister} className={`${isRegistered ? 'buttonSecondary' : 'buttonPrimary'} px-6 py-3 text-lg`}>
                        {isRegistered ? 'Cancel Registration' : 'Register Now'}
                    </button>
                )}
                {user.role === 'admin' && (
                    <>
                        <button onClick={onEdit} className="buttonPrimary px-6 py-3 text-lg">
                            Edit Event
                        </button>
                        <button onClick={onManageParticipants} className="buttonSecondary px-6 py-3 text-lg">
                            Manage Participants
                        </button>
                    </>
                )}
            </div>
        </section>
    );
};

export default FinalCTA;