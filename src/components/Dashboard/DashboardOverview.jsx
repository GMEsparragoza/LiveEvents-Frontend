

const DashboardOverview = () => {
    return (
        <section className="mb-8">
            <h2 className="text-xl font-bold text-text mb-4">Panel de Control</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded shadow">
                    <p className="text-sm text-text-secondary">Total de Usuarios</p>
                    <p className="text-2xl font-semibold text-primary">1234</p>
                </div>
                <div className="p-4 bg-white rounded shadow">
                    <p className="text-sm text-text-secondary">Eventos Activos</p>
                    <p className="text-2xl font-semibold text-primary">12</p>
                </div>
                <div className="p-4 bg-white rounded shadow">
                    <p className="text-sm text-text-secondary">Registros Recientes</p>
                    <p className="text-2xl font-semibold text-primary">45</p>
                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-text">Notificaciones Importantes</h3>
                <ul className="mt-2 space-y-1">
                    <li className="text-error">Error crítico: fallo en el servidor a las 12:34 PM</li>
                    <li className="text-warning">Advertencia de seguridad: posible intento de intrusión</li>
                </ul>
            </div>
        </section>
    );
};

export default DashboardOverview;
