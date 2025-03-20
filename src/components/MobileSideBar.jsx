import { NavLink, useNavigate } from 'react-router'
import { Icon } from '@iconify/react/dist/iconify.js'
import { asideLinks } from '../constants'
import { useEffect, useState } from 'react'
import { useClickAway } from '@uidotdev/usehooks'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/slices/userSlice'
import BaseButton from './UI/BaseButton'
import { hasPermission } from '../utils'


const MobileSideBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [toggleMenu, setToggleMenu] = useState(false)
    const { user, updateLoading } = useSelector(state => state.users)
    const menuRef = useClickAway(() => setToggleMenu(false))

    const userLogout = async () => {
        const response = await dispatch(logout())
        if (logout.fulfilled.match(response)) navigate('/login')
    }

    useEffect(() => {
        toggleMenu ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible'
    }, [toggleMenu])

    return (
        <div className='ms-auto max-lg:block hidden'>
            <button onClick={() => setToggleMenu(true)} className='w-10 h-10 grid rounded-full transition-all ease-out bg-white text-paragrah-color place-items-center hover:text-primary-400'>
                <Icon icon='hugeicons:menu-02' fontSize={22} />
            </button>
            <AnimatePresence>
                {
                    toggleMenu &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: "easeOut" }}
                        className="overlay ">
                        <motion.aside
                            initial={{ opacity: 0, right: "-100%" }}
                            animate={{ opacity: 1, right: "0" }}
                            exit={{ opacity: 0, right: "-100%" }}
                            transition={{ ease: "easeOut", duration: 0.1 }}
                            ref={menuRef}
                            className="bg-white p-8 px-4 flex transition-all ease-out flex-col gap-6 shadow-lg h-full fixed top-0 duration-500 w-3/4 overflow-auto z-50"
                        >
                            <button onClick={() => setToggleMenu(false)} className='w-10 h-10 place-items-center max-lg:grid hidden rounded-full border border-gray-400 text-gray-400 absolute top-4 left-4'>
                                <Icon icon="material-symbols:close-rounded" fontSize={26} />
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
                                                        <NavLink onClick={() => setToggleMenu(false)} to={link.path} className="flex items-center gap-3 transition-all ease-out p-2 px-4 rounded-lg hover:bg-primary-50 hover:text-primary-400">
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
                                <NavLink onClick={() => setToggleMenu(false)} to='/settings' className="flex items-center gap-3 transition-all ease-out p-2 px-4 rounded-lg hover:bg-primary-50 hover:text-primary-400">
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
                        </motion.aside>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default MobileSideBar