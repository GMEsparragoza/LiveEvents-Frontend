import { useState, useEffect } from "react";
import { useAdminMessages } from "../../hooks/useAdminMessages";
import api from "../../services/Fetch";

const NotificationsAndMessages = () => {
    const { messages, isLoading, error, formatDate, refetch } = useAdminMessages();
    const [filteredMessages, setFilteredMessages] = useState([])
    const [newMessage, setNewMessage] = useState(null)
    const [eStatus, setEStatus] = useState({ loading: false, error: null })

    useEffect(() => {
        setFilteredMessages(messages?.filter(message => message.type === 'message') || []);
    }, [messages]);

    const handleNewMessage = async (e) => {
        e.preventDefault();
        setEStatus({ loading: true, error: null })
        try {
            await api.post('/admin/message', {newMessage})
            setNewMessage(null)
            refetch()
            setEStatus({ loading: false, error: null })
        } catch (error) {
            setEStatus({ loading: false, error: error.response?.data.mesage || error.message })
        }
    }

    return (
        <section className="mb-8">
            <h2 className="text-xl font-bold text-text mb-4">Notifications and Messages</h2>
            <div className="bg-white p-4 rounded shadow">
                <form onSubmit={handleNewMessage} className="mb-4">
                    <textarea
                        placeholder="Write your message here..."
                        className="w-full p-2 border border-border rounded"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        rows="3"
                    ></textarea>
                    {eStatus?.error && <p className="text-sm text-error my-2">{eStatus.error}</p>}
                    <button type="submit" className="buttonPrimary mt-2 px-4 py-2 text-sm">
                        {eStatus?.loading ? 'Sending Message...' : 'Send Message'}
                    </button>
                </form>
                <div>
                    <h3 className="text-lg font-semibold text-text mb-2">Message History</h3>
                    {error ? (
                        <p className="text-sm text-error py-6 px-4">{error?.message}</p>
                    ) : isLoading ? (
                        <p className="text-lg text-text py-6 px-4">Loading Messages...</p>
                    ) : filteredMessages?.length === 0 ? (
                        <p className="text-lg text-text py-6 px-4">There are no messages to display at this time</p>
                    ) : (
                        <ul className="space-y-1">
                            {filteredMessages?.map((message) => (
                                <li key={message?._id}>
                                    <p className="text-sm">
                                        {formatDate(message?.date)} - {message?.message}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
};

export default NotificationsAndMessages;