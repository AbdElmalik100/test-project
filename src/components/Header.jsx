import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const Header = () => {
    return (
        <header className='flex items-center gap-10 justify-between'>
            <h1 className='text-primary-400 font-bold text-3xl'>الرئيسية</h1>
            <div className='actions ms-auto flex items-center gap-3'>
                <button className='w-10 h-10 rounded-full transition-all ease-out bg-white text-paragrah-color grid place-items-center hover:text-primary-400'>
                    <Icon icon='fluent:settings-32-regular' fontSize={22} />
                </button>
                <button className='w-10 h-10 rounded-full transition-all ease-out bg-white text-paragrah-color grid place-items-center hover:text-primary-400'>
                    <Icon icon='ph:bell' fontSize={22} />
                </button>
                <button className='w-10 h-10 rounded-full transition-all ease-out bg-white text-paragrah-color grid place-items-center hover:text-primary-400'>
                    <Icon icon='meteor-icons:search' fontSize={22} />
                </button>
            </div>
            <div className='user flex items-center gap-3 cursor-pointer'>
                <img src="https://placehold.co/100X100?text=?" className='w-10 h-10 rounded-full object-cover' alt="" />
                <span className='font-bold text-paragrah-color'>الادمن</span>
                <Icon icon='iconamoon:arrow-down-2-light' className='' fontSize={22} />
            </div>
        </header>
    )
}

export default Header