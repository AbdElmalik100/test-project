import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { NavLink } from 'react-router'

const LatestProjects = () => {
    return (
        <div className="col-span-6 bg-white p-8 rounded-lg shadow-md">
            <div className='flex items-center justify-between gap-4'>
                <h3 className="text-xl font-bold">اخر المشاريع</h3>
                <NavLink className="flex items-center gap-2 text-paragrah-color transition-all ease-out hover:text-primary-400" to="/projects">
                    <span>عرض الكل</span>
                    <Icon icon="iconamoon:arrow-left-2-light" fontSize={22} />
                </NavLink>
            </div>
            <div className='mt-4 grid xl:grid-cols-4 lg:grid-cols-2 gap-4 justify-between'>
                {
                    Array.from(Array(4)).map(el => (
                        <div className='shadow-lg rounded-3xl w-full bg-white p-8'>
                            <span className='badge p-0.5 px-2 flex items-center ms-auto w-fit gap-1 rounded-full text-xs bg-primary-400 text-white'>
                                <span>قيد التنفيذ</span>
                                <Icon icon="material-symbols:settings-rounded" className='animate-spin' fontSize={18} />
                            </span>
                            <div className='my-4 flex items-center gap-3'>
                                <div className='image-wrapper'>
                                    <img className='rounded-full' src="http://placehold.co/60X60?text=?" alt="Project Image" />
                                </div>
                                <h4 className='font-bold text-xl text-primary-400'>اسم المشروع</h4>
                            </div>
                            <p className='text-gray-400 leading-7 text-sm'>
                                هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى
                            </p>
                            <div className='mt-6 w-full rounded-lg shadow-md p-4 flex items-center gap-4 justify-between'>
                                <div className='flex flex-col gap-2'>
                                    <h4 className='font-bold text-2xl text-primary-400'>16</h4>
                                    <span className='text-paragrah-color text-sm'>مهمه جارية</span>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h4 className='font-bold text-2xl text-primary-400'>16</h4>
                                    <span className='text-paragrah-color text-sm'>مهمه منتهية</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default LatestProjects