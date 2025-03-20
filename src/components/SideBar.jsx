import { Icon } from '@iconify/react/dist/iconify.js'
import { NavLink, useNavigate } from 'react-router'
import { asideLinks } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/slices/userSlice'
import BaseButton from './UI/BaseButton'
import { useEffect } from 'react'
import { hasPermission } from '../utils'

const SideBar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, updateLoading } = useSelector(state => state.users)

    const userLogout = async () => {
        const response = await dispatch(logout())
        if (logout.fulfilled.match(response)) navigate('/login')
    }
    
    return (
        <aside className='aside bg-white relative p-8 px-4 rounded-3xl flex flex-col gap-6 shadow-lg 2xl:w-1/6 max-lg:h-full xl:w-1/5 lg:w-1/3 max-lg:hidden'>
            <button className='w-10 h-10 place-items-center max-lg:grid hidden rounded-full border border-gray-400 text-gray-400 absolute top-4 left-4'>
                <Icon icon="material-symbols:close-rounded" fontSize={26} className='' />
            </button>
            <img src="/logo.svg" className='w-2/4 mx-auto' alt="Logo Image" />
            {
                asideLinks.map((asideLink, index) => (
                    hasPermission(user, asideLink.permissions) &&
                    <div key={index}>
                        <span className='text-paragrah-color block mb-3 text-xs'>{asideLink.title}</span>
                        <ul className='flex flex-col gap-2'>
                            {
                                asideLink.links.map((link, index) => (
                                    hasPermission(user, link.permission) &&
                                    <li key={index}>
                                        <NavLink to={link.path} className="flex items-center gap-3 transition-all ease-out p-2 px-4 rounded-lg hover:bg-primary-50 hover:text-primary-400">
                                            <Icon icon={link.icon} fontSize={24} />
                                            <span className='text-sm flex-1'>{link.name}</span>
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ))
            }
            <div className='mt-auto pt-10 flex flex-col gap-2'>
                <NavLink to='/settings' className="flex items-center gap-3 transition-all ease-out p-2 px-4 rounded-lg hover:bg-primary-50 hover:text-primary-400">
                    <Icon icon='fluent:settings-32-regular' fontSize={24} />
                    <span className='text-sm'>الاعدادات</span>
                </NavLink>
                <BaseButton
                    isLoading={updateLoading}
                    onClick={userLogout}
                    title="تسجيل الخروج"
                    icon={"solar:logout-3-outline"}
                    className={"!text-rose-400 !justify-start !bg-white hover:!bg-rose-50"}
                />
            </div>
        </aside>
    )
}

export default SideBar