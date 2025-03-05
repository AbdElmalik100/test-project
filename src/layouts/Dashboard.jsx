import { Outlet } from 'react-router'
import SideBar from '../components/SideBar'
import Header from '../components/Header'

const Dashboard = () => {
    
    return (
        <main className='flex gap-8 bg-bg-color min-h-screen p-4 max-lg:flex-col'>
            <SideBar />
            <section className='w-full p-4'>
                <Header />
                <Outlet />
            </section>
        </main>
    )
}

export default Dashboard