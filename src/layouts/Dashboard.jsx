import { Outlet } from 'react-router'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { me } from '../store/slices/userSlice'

const Dashboard = () => {
    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(me())
    }, [dispatch])
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