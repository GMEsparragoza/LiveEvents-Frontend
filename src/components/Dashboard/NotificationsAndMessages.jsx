

const NotificationsAndMessages = () => {
    return (
        <section className="mb-8">
            <h2 className="text-xl font-bold text-text mb-4">Notificaciones y Mensajes</h2>
            <div className="bg-white p-4 rounded shadow">
                <div className="mb-4">
                    <textarea
                        placeholder="Escribe tu mensaje aquí..."
                        className="w-full p-2 border border-border rounded"
                        rows="3"
                    ></textarea>
                    <button className="buttonPrimary mt-2 px-4 py-2 text-sm">Enviar Mensaje</button>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-text mb-2">Historial de Mensajes</h3>
                    <ul className="space-y-1">
                        <li className="text-sm">10:30 AM - Recordatorio de mantenimiento</li>
                        <li className="text-sm">09:15 AM - Actualización de seguridad</li>
                        {/* Se pueden agregar más mensajes según el historial */}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default NotificationsAndMessages;
