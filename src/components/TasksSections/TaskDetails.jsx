import { useSelector } from "react-redux"
import StatusBadge from "../UI/StatusBadge"

const TaskDetails = () => {
    const { task } = useSelector(state => state.tasks)
    
    return (
        <div className='rounded-lg bg-white shadow-md p-8'>
            <div className="heading mb-4 pb-4 border-b border-gray-200">
                <h2 className='font-bold px-4 relative before:absolute before:w-1 before:rounded-full before:h-full before:-right-0 before:bg-primary-400'>نبذه عن المهمة</h2>
            </div>
            <div className='flex flex-col'>
                <div className='flex items-center gap-4 py-6 justify-between border-b border-gray-200'>
                    <span className='font-bold'>اسم المهمة</span>
                    <span>{task.name}</span>
                </div>
                <div className='flex items-center gap-4 py-6 justify-between border-b border-gray-200'>
                    <span className='font-bold'>وصف المهمة</span>
                    <span>{task.desc}</span>
                </div>
                <div className='flex items-center gap-4 py-6 justify-between border-b border-gray-200'>
                    <span className='font-bold'>اسم المقاول</span>
                    <span>{task.contractor.name}</span>
                </div>
                <div className='flex items-center gap-4 py-6 justify-between border-b border-gray-200'>
                    <span className='font-bold'>الحالة</span>
                    <StatusBadge statusType={task.status} />
                </div>
                <div className='flex items-center gap-4 pt-6 justify-between'>
                    <span className='font-bold'>تاريخ انشاء المهمة</span>
                    <span>{new Date(task.created_at).toLocaleString()}</span>
                </div>
            </div>
        </div>
    )
}

export default TaskDetails