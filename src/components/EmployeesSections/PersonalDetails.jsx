import { useSelector } from 'react-redux'

const PersonalDetails = () => {
    const { employee } = useSelector(state => state.employees)
    
    return (
        <div className='rounded-lg bg-white shadow-md p-8'>
            <div className="heading mb-4 pb-4 border-b border-gray-200">
                <h2 className='font-bold px-4 relative before:absolute before:w-1 before:rounded-full before:h-full before:-right-0 before:bg-primary-400'>نبذه عن الموظف</h2>
            </div>
            <div className='flex flex-col'>
                <div className='flex items-center gap-4 py-6 justify-between border-b border-gray-200'>
                    <span className='font-bold'>صورة الموظف</span>
                    <img className='w-14 h-14 rounded-full object-cover' src={`${import.meta.env.VITE_MEDIA_URL}/${employee.image}`} alt="Supervisor Image" />
                </div>
                <div className='flex items-center gap-4 py-6 justify-between border-b border-gray-200'>
                    <span className='font-bold'>اسم الموظف</span>
                    <span>{employee.name}</span>
                </div>
                <div className='flex items-center gap-4 py-6 justify-between border-b border-gray-200'>
                    <span className='font-bold'>البريد الالكتروني</span>
                    <span>{employee.email}</span>
                </div>
                <div className='flex items-center gap-4 py-6 justify-between border-b border-gray-200'>
                    <span className='font-bold'>تاريخ الاضافة</span>
                    <span>{new Date(employee.created_at).toLocaleString()}</span>
                </div>
                <div className='flex items-center gap-4 py-6 justify-between border-b border-gray-200'>
                    <span className='font-bold'>رقم الهاتف</span>
                    <span>{employee.phone}</span>
                </div>
                <div className='flex items-center gap-4 py-6 justify-between border-b border-gray-200'>
                    <span className='font-bold'>العنوان</span>
                    <span>{employee.address}</span>
                </div>
                <div className='flex items-center gap-4 pt-6 justify-between'>
                    <span className='font-bold'>الدور</span>
                    <span>{employee.roles[0].display_name}</span>
                </div>
            </div>
        </div>
    )
}

export default PersonalDetails