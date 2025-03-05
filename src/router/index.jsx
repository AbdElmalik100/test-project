import { Navigate, Route, Routes } from 'react-router'
import ResetPassword from '../pages/auth/ResetPassword.jsx'
import Login from '../pages/auth/Login.jsx'
import Cookies from 'js-cookie'
import Home from '../pages/Home.jsx'
import Dashboard from '../layouts/Dashboard.jsx'
import About from '../pages/About.jsx'
import Auth from '../layouts/Auth.jsx'
import SetPassword from '../pages/auth/SetPassword.jsx'

const isAuthenticated = () => {
    return !Cookies.get("user_token")
}

const AppRouter = () => {
    
    return (
        <Routes>
            <Route path="/" element={isAuthenticated() ? <Dashboard /> : <Navigate to='/login' />} >
                <Route index element={<Home />} />
                <Route path='about' element={<About />} />
            </Route>
            <Route element={isAuthenticated() ? <Navigate to='/' /> : <Auth />}>
                <Route path='/login' element={<Login />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/set-password" element={<SetPassword />} />
            </Route>
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    )
}

export default AppRouter