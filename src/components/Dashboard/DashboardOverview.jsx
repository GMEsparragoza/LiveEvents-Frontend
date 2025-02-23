import { useAdminMessages } from "../../hooks/useAdminMessages";
import { useAdminOverview } from "../../hooks/useAdminOverview";

const DashboardOverview = () => {
    const { messages, isLoading: loadingMessages, error: messageError } = useAdminMessages();
    const { Overview, isLoading: loadingOverview, error: overviewError } = useAdminOverview();

    const filteredNotifications = messages?.filter(message => message.type === 'notification');

    return (
        <section className="mb-8">
            <h2 className="text-2xl font-bold text-text mb-4">Control Panel</h2>
            <div className={`grid grid-cols-1 ${loadingOverview || overviewError ? '' : 'md:grid-cols-3'} gap-4`}>
                {overviewError ? (
                    <div className="p-4 bg-white rounded shadow w-1/3 mx-auto">
                        <p className="text-lg text-error text-center">{overviewError?.message}</p>
                    </div>
                ) : loadingOverview ? (
                    <div className="p-4 bg-white rounded shadow w-1/3 mx-auto">
                        <p className="text-lg text-text-secondary text-center">Loading Overview Stats</p>
                    </div>
                ) : (
                    <>
                        <div className="p-4 bg-white rounded shadow">
                            <p className="text-sm text-text-secondary">Total Users</p>
                            <p className="text-2xl font-semibold text-primary">{Overview?.totalUsers || 0}</p>
                        </div>
                        <div className="p-4 bg-white rounded shadow">
                            <p className="text-sm text-text-secondary">Upcoming Events</p>
                            <p className="text-2xl font-semibold text-primary">{Overview?.upcomingEvents.length || 0}</p>
                        </div>
                        <div className="p-4 bg-white rounded shadow">
                            <p className="text-sm text-text-secondary">New Users</p>
                            <p className="text-2xl font-semibold text-primary">{Overview?.recentUsers.length || 0}</p>
                        </div>
                    </>
                )}
            </div>
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-text">Notifications</h3>
                {messageError ? (
                    <p className="text-sm text-error py-6 px-4">{messageError?.message}</p>
                ) : loadingMessages ? (
                    <p className="text-lg text-text py-6 px-4">Loading Notifications...</p>
                ) : filteredNotifications.length === 0 ? (
                    <p className="text-lg text-text py-6 px-4">There are no notifications to display at this time</p>
                ) : (
                    <ul className="space-y-1">
                        {filteredNotifications?.map((message) => (
                            <li key={message?._id}>
                                <p className={`text-sm ${message?.notification === 'error' ? 'text-error' : message?.notification === 'info' ? 'text-info' : 'text-warning'}`}>
                                    {message?.tittle}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
};

export default DashboardOverview;
