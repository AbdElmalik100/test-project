import { useSelector } from 'react-redux'

const WorkList = () => {
    const { task } = useSelector(state => state.tasks)
    
    return (
        <div className='rounded-lg bg-white shadow-md p-8'>
            <div className="heading pb-8">
                <h2 className='font-bold px-4 relative before:absolute before:w-1 before:rounded-full before:h-full before:-right-0 before:bg-primary-400'>قائمة العمالة</h2>
            </div>
            <table className='w-full !text-center'>
                <thead>
                    <tr>
                        <th className='border-y p-4 border-gray-200'>اسم المقاول</th>
                        <th className='border-y p-4 border-gray-200'>نوع العمالة</th>
                        <th className='border-y p-4 border-gray-200'>عدد العمالة</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-4 border-gray-200">
                            {task.contractor.name}
                        </td>
                        <td className="p-4 border-gray-200">
                            {task.contractor.type_of_work}
                        </td>
                        <td className="p-4 border-gray-200">
                            {task.count_of_workers}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default WorkList