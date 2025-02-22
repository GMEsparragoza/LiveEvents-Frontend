import DashboardOverview from "../components/Dashboard/DashboardOverview"
import EventManagement from "../components/Dashboard/EventManagement"
import NotificationsAndMessages from "../components/Dashboard/NotificationsAndMessages"
import UserManagement from "../components/Dashboard/UserManagement"


const Dashboard = () => {
    return (
        <div className="pt-20 p-4 bg-background min-h-screen">
            <DashboardOverview />
            <UserManagement />
            <EventManagement />
            <NotificationsAndMessages />
        </div>
    )
}

export default Dashboard