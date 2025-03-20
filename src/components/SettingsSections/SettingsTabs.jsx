import React from 'react'

const SettingsTabs = ({tab, setTab}) => {
    return (
        <div className='tabs flex items-center text-center max-md:justify-center'>
            <span className={`font-bold p-4 px-8 border-b max-md:w-full cursor-pointer hover:border-primary-400 hover:text-primary-400 text-paragrah-color transition-all ease-out [&.active]:border-primary-400 [&.active]:text-primary-400 ${tab === 'profile' ? 'active' : ''}`} onClick={() => setTab("profile")}>اعدادات الحساب</span>
            <span className={`font-bold p-4 px-8 border-b max-md:w-full cursor-pointer hover:border-primary-400 hover:text-primary-400 text-paragrah-color transition-all ease-out [&.active]:border-primary-400 [&.active]:text-primary-400 ${tab === 'security' ? 'active' : ''}`} onClick={() => setTab("security")}>كلمة المرور</span>
        </div>
    )
}

export default SettingsTabs