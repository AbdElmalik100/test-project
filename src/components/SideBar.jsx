import { Icon } from '@iconify/react/dist/iconify.js'
import { NavLink } from 'react-router'
import { asideLinks } from '../constants'

const SideBar = () => {
    return (
        <aside className='bg-white p-8 px-4 rounded-3xl flex flex-col gap-6 shadow-lg 2xl:w-1/6 xl:w-1/5 lg:w-1/3 max-lg:hidden'>
            <img src="/logo.svg" className='w-2/4 mx-auto' alt="Logo Image" />
            {
                asideLinks.map((asideLink, index) => (
                    <div key={index}>
                        <span className='text-paragrah-color block mb-3 text-xs'>{asideLink.title}</span>
                        <ul className='flex flex-col gap-2'>
                            {
                                asideLink.links.map((link, index) => (
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
                <button className="flex items-center gap-3 transition-all w-full ease-out p-2 px-4 rounded-lg hover:bg-rose-50 text-rose-400">
                    <Icon icon="solar:logout-3-outline" fontSize={24} />
                    <span className='text-sm'>تسجيل الخروج</span>
                </button>
            </div>
        </aside>
    )
}

export default SideBar