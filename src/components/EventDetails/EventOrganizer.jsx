/* eslint-disable react/prop-types */


const EventOrganizers = ({ org, amount }) => {
    return (
        <section className="mb-8">
            <h2 className="text-2xl font-bold text-text mb-4">Event Organizers</h2>
            <div className="grid grid-cols-1 gap-6">
                <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                    <img
                        src={org.imageURL}
                        alt={org.username}
                        className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                        <h3 className="text-xl font-semibold text-text">{org.username}</h3>
                        <p className="text-sm break-all whitespace-normal text-text-secondary">{org.email}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-text">Amount Events: {amount}</h3>
                        <p className="text-sm text-text-secondary">Joined: {new Date(org?.createdAt).toLocaleString('en-GB', {
                            timeZone: 'UTC',
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                        })}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventOrganizers;