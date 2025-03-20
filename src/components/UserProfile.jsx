import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router'
import BaseButton from './UI/BaseButton'
import { logout } from '../store/slices/userSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { useClickAway } from '@uidotdev/usehooks'

const UserProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const { user, loading } = useSelector(state => state.users)
    const [openMenu, setOpenMenu] = useState(false)
    
    const userRef = useClickAway(() => setOpenMenu(false))

    const userLogout = async () => {
        const response = await dispatch(logout())
        if (logout.fulfilled.match(response)) navigate("/login")
    }


    return (
        user &&
        <div ref={userRef} className='user relative'>
            <div className='user-item flex items-center gap-2 max-md:gap-1 cursor-pointer p-1.5 px-2 transition-all ease-out rounded-lg hover:bg-white hover:shadow-sm'
                onClick={() => setOpenMenu(val => !val)}>
                <img src={user.image ? `${import.meta.env.VITE_MEDIA_URL}/${user.image}` : "https://placehold.co/100X100?text=?"} className='w-10 h-10 flex-grow rounded-full object-cover' alt="User Image" />
                <span className='font-bold text-paragrah-color max-md:hidden'>{user.name}</span>
                <Icon icon='iconamoon:arrow-down-2-light' fontSize={22} />
            </div>
            <AnimatePresence>
                {
                    openMenu &&
                        <motion.div
                                initial={{scale: 0.9, opacity: 0, y: -5, x: -5}}
                                animate={{scale: 1, opacity: 1, y: 0, x: 0}}
                                exit={{scale: 0.9, opacity: 0, y: -5, x: -5}}
                                transition={{ease: "easeOut", duration: 0.1}}
                                className='meny absolute top-full mt-2 left-0 p-1 rounded-lg bg-white shadow-md text-sm w-[200px] flex flex-col gap-1'>
                        <NavLink onClick={() => setOpenMenu(false)} to="/settings" className="main-btn !justify-start hover:!bg-primary-50 !bg-white !text-black !rounded-md">
                            <Icon icon='fluent:settings-32-regular' fontSize={22} />
                            <span>الاعدادات</span>
                        </NavLink>
                        <BaseButton
                            isLoading={loading}
                            onClick={userLogout}
                            title="تسجيل الخروج"
                            icon={"solar:logout-3-outline"}
                            className={"!text-rose-400 !justify-start w-full !bg-white hover:!bg-rose-50 !rounded-md"}
                        />
                    </motion.div>
                }
            </AnimatePresence>

        </div>
    )
}

export default UserProfile