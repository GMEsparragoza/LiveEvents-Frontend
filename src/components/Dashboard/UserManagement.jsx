import { useState } from 'react'
import { useSearchUsers } from '../../hooks/useSearchUsers';
import { DashboardUsers } from './EventsSection/DashboardTables';

const UserManagement = () => {
    const [users, setUsers] = useState([])
    const { loading, filter, setFilter } = useSearchUsers({ setUsers })
    const usersActions = {
        primary: 'View Profile',
        secondary: 'Edit',
        tertiary: 'Delete'
    }

    return (
        <section className="mb-8">
            <h2 className="text-xl font-bold text-text mb-4">User Management</h2>
            <div className="bg-white p-4 rounded shadow">
                <div className="mb-4 flex justify-between items-center">
                    <input
                        type="text"
                        placeholder="Search User..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="p-2 border border-border rounded w-full md:w-1/3"
                    />
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-text-secondary">
                            <th className="py-2 text-center sm:text-start">User name</th>
                            <th className="py-2 text-center sm:text-start">E-mail</th>
                            <th className="py-2 text-center sm:text-start">Role</th>
                            <th className="py-2 text-center sm:text-start">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="3" className="py-4 text-center text-2xl text-text">
                                    Loading Users...
                                </td>
                            </tr>
                        ) : users.length > 0 ? (
                            users.map((user) => (
                                <DashboardUsers
                                    key={user._id}
                                    data={user}
                                    actions={usersActions}
                                    setUsers={setUsers}
                                    users={users}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="py-4 text-center text-2xl text-text">
                                    There are no users to display
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </section>
    );
};

export default UserManagement;
