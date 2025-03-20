import { Icon } from '@iconify/react/dist/iconify.js'
import { useSelector } from 'react-redux'

const TaskProjectAndStage = () => {
    const { task } = useSelector(state => state.tasks)
    
    return (
        <div className='flex items-center gap-6 max-md:flex-col'>
            <div className='rounded-lg bg-white shadow-md p-6 flex items-center gap-2 w-full'>
                <div className='grid place-items-center bg-emerald-100 text-emerald-500 rounded-full w-12 h-12'>
                    <Icon icon="ion:construct" fontSize={24} />
                </div>
                <h3 className='font-bold'>{task.project.name}</h3>
            </div>
            <div className='rounded-lg bg-white shadow-md p-6 flex items-center gap-2 w-full'>
                <div className='grid place-items-center bg-purple-100 text-purple-500 rounded-full w-12 h-12'>
                    <Icon icon="famicons:layers" fontSize={24} />
                </div>
                <h3 className='font-bold'>{task.stage.name}</h3>
            </div>
        </div>
    )
}

export default TaskProjectAndStage