/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

// Configuración de la conexión al servidor de socket.io
const socket = io(import.meta.env.VITE_BACKEND_URL, {
    secure: true,
    withCredentials: true,
    transports: ['websocket', 'polling']
});

const RealTimeChat = ({ user, event }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    // Obtener el historial de mensajes al conectar
    useEffect(() => {
        if (event) {
            socket.emit('joinEvent', event);

            socket.on('chatHistory', (history) => {
                setMessages(history);
            });

            socket.on('chatMessage', (msg) => {
                setMessages((prev) => [...prev, msg]);
            });

            // Limpiar el listener al desmontar el componente
            return () => {
                socket.off('chatHistory');
                socket.off('chatMessage');
            };
        }
    }, [event]);


    // Hacer scroll automático al final cuando se agrega un mensaje nuevo
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (input.trim()) {
            const messageData = {
                content: input,    // Actualizado a 'content'
                user: user.id,    // Se envía el ID del usuario
                event,             // Se envía el ID del evento
                sent_at: new Date()
            };

            // Emitir el mensaje al servidor
            socket.emit('chatMessage', messageData);

            setInput('');
        }
    };

    return (
        <section className="mb-8">
            <h2 className="text-2xl font-bold text-text mb-4">Live Chat</h2>
            {!user ? (
                <div className='bg-white p-4 rounded-lg shadow-md'>
                    <p className="text-text-secondary text-center text-xl">Login to join the chat.</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="h-64 overflow-y-auto mb-4">
                        {messages?.length > 0 ? (
                            messages.map((msg) => (
                                <div key={msg._id} className="mb-2">
                                    <p className="text-info font-medium">
                                        {msg.user.username}
                                        <span className={`text-xs ${msg.user.role === 'admin' ? 'text-accent' : 'text-decoration-blue'}`}> ({msg.user.role})</span>
                                    </p>
                                    <p className="text-text-secondary text-sm">{msg.content}</p>
                                    <span className="text-xs text-text-secondary">
                                        {new Date(msg.sent_at).toLocaleTimeString()}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-text-secondary">No messages yet.</p>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSend} className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-grow p-2 border border-border rounded"
                        />
                        <button type="submit" className="buttonPrimary px-4 py-2 text-sm">
                            Send
                        </button>
                    </form>
                </div>
            )}
        </section>
    );
};

export default RealTimeChat;