/* eslint-disable react/prop-types */

const EventBanner = ({ user, event, isRegistered, onRegister, onEdit, onDelete }) => {

    return (
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
            {event?.bannerURL && (
                <div className="w-full h-64 md:h-96 overflow-hidden rounded-lg mb-4">
                    <img
                        src={event?.bannerURL}
                        alt={event?.tittle}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">{event?.tittle}</h1>
                    <p className="text-lg text-text-secondary mb-1">
                        {new Date(event?.date).toLocaleString('en-GB', {
                            timeZone: 'UTC',
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                        })}
                    </p>
                    <p className="text-md text-text-secondary">{event?.location}</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-4">
                    {!user && (
                        <button className="buttonSecondary px-4 py-2 text-sm">
                            Login to Register
                        </button>
                    )}
                    {user.role === 'user' && (
                        <>
                            {!isRegistered ? (
                                <button onClick={onRegister} className="buttonPrimary px-4 py-2 text-sm">
                                    Register
                                </button>
                            ) : (
                                <button onClick={onRegister} className="buttonSecondary px-4 py-2 text-sm">
                                    Cancel Registration
                                </button>
                            )}
                        </>
                    )}
                    {user.role === 'admin' && (
                        <>
                            <button onClick={onEdit} className="buttonPrimary px-4 py-2 text-sm">
                                Edit Event
                            </button>
                            <button onClick={onDelete} className="buttonSecondary px-4 py-2 text-sm">
                                Delete Event
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default EventBanner;