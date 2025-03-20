import EmptyData from '../EmptyData'
import { useSelector } from 'react-redux'

const ProjectEmployees = () => {
    const { project } = useSelector(state => state.projects)

    return (
        <div className='rounded-lg bg-white shadow-md p-8'>
            <div className="heading mb-4 pb-4 border-b border-gray-200">
                <h2 className='font-bold px-4 relative before:absolute before:w-1 before:rounded-full before:h-full before:-right-0 before:bg-primary-400'>مشرفي المشروع</h2>
            </div>
            <div className='overflow-auto'>
                {
                    project.employees.length > 0
                        ?
                        <table className='w-full max-md:w-[1024px]'>
                            <thead>
                                <tr className='font-bold border-b border-gray-200 [&>th]:text-start [&>th]:p-4'>
                                    <th>اسم الموظف</th>
                                    <th>البريد الالكتروني</th>
                                    <th>رقم الهاتف</th>
                                    <th>العنوان</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    project.employees.map((employee, index) => (
                                        <tr key={employee.id} className='border-gray-200 [&>td]:p-4 [&:not(:last-of-type)]:border-b'>
                                            <td >{employee.name}</td>
                                            <td>{employee.email}</td>
                                            <td>{employee.phone}</td>
                                            <td>{employee.address}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        :
                        <EmptyData title={"لا يوجد موظفين"} />
                }
            </div>
        </div>
    )
}

export default ProjectEmployees