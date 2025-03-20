import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { NavLink } from 'react-router'

const LatestNotifications = () => {
    return (
        <div className="col-span-2 bg-white p-8 rounded-lg shadow-md flex flex-col max-lg:col-span-6">
            <h3 className="text-xl font-bold">اخر الاشعارات</h3>
            <div className='flex flex-col gap-3 mt-4 h-full'>
                {
                    Array.from(Array(2)).map((el, index) => (
                        <div key={index} className='flex items-center gap-3 cursor-pointer odd:border-b odd:border-gray-100 odd:pb-4'>
                            <div className='image-wrapper'>
                                <img className='rounded-full' src="https://placehold.co/50X50?text=?" alt="Notification Image" />
                            </div>
                            <div>
                                <h4 className='font-semibold'>قام المحاسب خالد بمراجعة الفاتورة</h4>
                                <span className='text-paragrah-color text-sm'>منذ خمس دقائق</span>
                            </div>
                        </div>
                    ))
                }
                <NavLink className="flex text-sm pt-4 mt-auto justify-center items-center gap-2 text-paragrah-color transition-all ease-out hover:text-primary-400" to='/notifications'>
                    <span>عرض الكل</span>
                    <Icon icon="iconamoon:arrow-left-2-light" fontSize={22} />
                </NavLink>
            </div>
        </div>
    )
}

export default LatestNotifications