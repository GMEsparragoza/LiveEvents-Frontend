import { useActivityLogs } from "../../hooks/useActivityLogs";

const AuditLog = () => {
    const { logs, isLoading, error } = useActivityLogs()

    return (
        <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-text">Activity History</h2>

            {error ? (
                <h2 className="text-2xl mb-4 text-error text-center">{error?.message}</h2>
            ) : isLoading ? (
                <h2 className="text-2xl mb-4 text-text-secondary text-center">Loading Activity Logs...</h2>
            ) : (
                logs.length > 0 ? (
                    <ul className="mt-4 space-y-4">
                        {logs.map((log) => (
                            <li
                                key={log._id}
                                className="bg-background p-4 rounded-lg shadow flex flex-col sm:flex-row sm:justify-between sm:items-center border border-border"
                            >
                                <div className="flex flex-col gap-1">
                                    <p className="text-text font-medium">{log.action.replace(/_/g, " ")}</p>
                                    <span className="text-sm text-text-secondary">
                                        {new Date(log.createdAt).toLocaleString()}
                                    </span>
                                    <p className="text-sm text-text-secondary">{log.details}</p>
                                </div>
                                <div className="mt-2 sm:mt-0 flex flex-col sm:text-right text-sm text-text-secondary">
                                    <p><strong>IP:</strong> {log.ipAddress}</p>
                                    <p className="truncate"><strong>Agent:</strong> {log.userAgent}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-text-secondary">No recent activities.</p>
                )
            )}
        </section>
    );
};

export default AuditLog;
