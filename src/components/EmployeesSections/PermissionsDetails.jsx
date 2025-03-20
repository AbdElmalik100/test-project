import { useSelector } from 'react-redux'

const PermissionsDetails = () => {
    const { employee } = useSelector(state => state.employees)
    
    return (
        <div className='rounded-lg bg-white shadow-md'>
            <div className="heading p-8">
                <h2 className='font-bold px-4 relative before:absolute before:w-1 before:rounded-full before:h-full before:-right-0 before:bg-primary-400'>الصلاحيات</h2>
            </div>
            <table className='w-full !text-center'>
                <thead>
                    <tr>
                        <th className='border-y p-4 border-gray-200'>اسم الصلاحيات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr  className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
                    {
                        employee.roles[0].permissions.map((permission, index) => (
                                <td key={permission.id} className={` p-4 border-gray-200 col-span-1 ${index !== employee.roles[0].permissions.length - 1 ? 'border-b' : ''}`}>
                                    {permission.display_name}
                                </td>                                
                        ))
                    }
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default PermissionsDetails