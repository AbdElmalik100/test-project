import { useSelector } from 'react-redux'

const TaskEmployee = () => {
    const { task } = useSelector(state => state.tasks)
    
    return (
        <div className='rounded-lg bg-white shadow-md p-8'>
            <div className="heading mb-4 pb-4 border-b border-gray-200">
                <h2 className='font-bold px-4 relative before:absolute before:w-1 before:rounded-full before:h-full before:-right-0 before:bg-primary-400'>الموظف المرسل</h2>
            </div>
            <div className='flex flex-col'>
                <div className='flex items-center gap-4 py-6 justify-between border-b border-gray-200'>
                    <span className='font-bold'>اسم الموظف</span>
                    <span>{task.employee.name}</span>
                </div>
                <div className='flex items-center gap-4 py-6 justify-between border-b border-gray-200'>
                    <span className='font-bold'>الموقع</span>
                    <span>{task.project.address}</span>
                </div>
                <div className='flex items-center gap-4 pt-6 justify-between'>
                    <span className='font-bold'>تاريخ الارسال</span>
                    <span>{new Date(task.project.created_at).toLocaleString()}</span>
                </div>
            </div>
        </div>
    )
}

export default TaskEmployee