import { Routes, Route } from 'react-router-dom'

import { ProtectedRoutes } from './ProtectedRoutes'
import { PublicRoutes } from './PublicRoutes'
import { ResetRoutes } from './ResetRoutes'
import { AdminRoutes } from './AdminRoutes'

import Home from '../pages/Home'
import Events from '../pages/Events'
import NotFound from '../pages/NotFound'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Profile from '../pages/Profile'
import ResetPassword from '../pages/ResetPassword'
import Dashboard from '../pages/Dashboard'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/events' element={<Events />} />

            <Route element={<PublicRoutes />}>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Route>

            <Route element={<ProtectedRoutes />}>
                <Route path='/profile' element={<Profile />} />
            </Route>

            <Route element={<ResetRoutes />}>
                <Route path='/reset-password' element={<ResetPassword />} />
            </Route>

            <Route element={<AdminRoutes />}>
                <Route path='/admin/dashboard' element={<Dashboard />} />
            </Route>

            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes