import { useSelector } from "react-redux"

const PersonalDetails = () => {
    const { supervisor } = useSelector(state => state.supervisors)

    return (
        <div className='rounded-lg bg-white shadow-md p-8 col-span-1 max-md:col-span-2'>
            <div className="heading mb-4 pb-4 border-b border-gray-200">
                <h2 className='font-bold px-4 relative before:absolute before:w-1 before:rounded-full before:h-full before:-right-0 before:bg-primary-400'>نبذه عن المقاول</h2>
            </div>
            <div className='flex flex-col'>
                <div className='flex items-center gap-4 py-6 justify-between border-b border-gray-200'>
                    <span className='font-bold'>صورة المقاول</span>
                    <img className='w-14 h-14 rounded-full object-cover' src={`${import.meta.env.VITE_MEDIA_URL}/${supervisor.image}`} alt="Supervisor Image" />
                </div>
                <div className='flex items-center gap-4 py-6 justify-between border-b border-gray-200'>
                    <span className='font-bold'>اسم المقاول</span>
                    <span>{supervisor.name}</span>
                </div>
                <div className='flex items-center gap-4 py-6 justify-between border-b border-gray-200'>
                    <span className='font-bold'>رقم الهاتف</span>
                    <span>{supervisor.phone}</span>
                </div>
                <div className='flex items-center gap-4 py-6 justify-between border-b border-gray-200'>
                    <span className='font-bold'>العنوان</span>
                    <span>{supervisor.address}</span>
                </div>
                <div className='flex items-center gap-4 pt-6 justify-between '>
                    <span className='font-bold'>تاريخ الاضافة</span>
                    <span>{new Date(supervisor.created_at).toLocaleString()}</span>
                </div>
            </div>
        </div>
    )
}

export default PersonalDetails