import { useSelector } from 'react-redux'
import StatusBadge from '../UI/StatusBadge'

const ProjectDetails = () => {
    const { project } = useSelector(state => state.projects)
    
    return (
        <div className='rounded-lg bg-white shadow-md p-8'>
            <div className="heading mb-4 pb-4 border-b border-gray-200">
                <h2 className='font-bold px-4 relative before:absolute before:w-1 before:rounded-full before:h-full before:-right-0 before:bg-primary-400'>نبذه عن المشروع</h2>
            </div>
            <div className='flex flex-col'>
                <div className='flex items-center gap-4 py-6 justify-between border-b border-gray-200'>
                    <span className='font-bold'>اسم المشروع</span>
                    <span>{project.name}</span>
                </div>
                <div className='flex items-center gap-4 py-6 justify-between border-b border-gray-200'>
                    <span className='font-bold'>وصف المشروع</span>
                    <span>{project.desc}</span>
                </div>
                <div className='flex items-center gap-4 py-6 justify-between border-b border-gray-200'>
                    <span className='font-bold'>العنوان</span>
                    <span>{project.address}</span>
                </div>
                <div className='flex items-center gap-4 py-6 justify-between border-b border-gray-200'>
                    <span className='font-bold'>الحالة</span>
                    <StatusBadge statusType={project.status} />
                </div>
                <div className='flex items-center gap-4 pt-6 justify-between'>
                    <span className='font-bold'>تاريخ الاضافة</span>
                    <span>{new Date(project.created_at).toLocaleString()}</span>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails