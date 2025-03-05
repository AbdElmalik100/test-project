import React from 'react'
import AuthHero from '../components/AuthSections/AuthHero'
import { Outlet } from 'react-router'

const Auth = () => {
    return (
        <main className="flex p-4 max-xl:min-h-screen xl:h-screen max-md:flex-col max-md:justify-between">
            <Outlet />
            <AuthHero />
        </main>
    )
}

export default Auth