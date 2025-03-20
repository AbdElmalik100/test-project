import { useSelector } from 'react-redux'
import { hasPermission } from '../../utils'
import EmptyData from '../EmptyData'
import StatusBadge from '../UI/StatusBadge'
import { NavLink } from 'react-router'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Select } from 'antd'
import { stagesOptions } from '../../constants'
import { useWindowSize } from '@uidotdev/usehooks'
import { useEffect, useState } from 'react'

const TasksList = ({ tasksListData, className }) => {
    const { user } = useSelector(state => state.users)
    const { width } = useWindowSize();
    const [filteredTasks, setFilteredTasks] = useState([])


    useEffect(() => {
        setFilteredTasks(tasksListData)
    }, [tasksListData])
    return (
        <div className={`rounded-lg bg-white shadow-md p-8 ${className}`}>
            <div className="heading mb-4 pb-4 border-b border-gray-200 flex items-center justify-between gap-4">
                <h2 className='font-bold px-4 relative before:absolute before:w-1 before:rounded-full before:h-full before:-right-0 before:bg-primary-400'>قائمة المهام</h2>
                <Select
                    placeholder="فلتر المراحل"
                    size='large'
                    style={{
                        width: width <= 991 ? 150 : 225,
                    }}
                    onChange={value => setFilteredTasks(tasksListData.filter(task => value === '' ? task : task.stage.name === value))}
                    options={stagesOptions}
                />
            </div>
            <div className='overflow-auto'>
                {
                    filteredTasks.length > 0
                        ?
                        <table className='w-full max-md:w-[1024px]'>
                            <thead>
                                <tr className='font-bold border-b border-gray-200 [&>th]:text-start [&>th]:p-4 [&>th] [&>th]:w-[calc(100%/6)]'>
                                    <th>اسم المهمة</th>
                                    <th>اسم المشروع</th>
                                    <th>المرحلة</th>
                                    <th>الموظف</th>
                                    <th>الحالة</th>
                                    <th>تاريخ المهمة</th>
                                    <th>العمليات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredTasks.map((task, index) => (
                                        <tr key={task.id} className='border-gray-200 [&>td]:p-4 [&:not(:last-of-type)]:border-b'>
                                            <td >{task.name}</td>
                                            <td>{task.project.name}</td>
                                            <td>{task.stage.name}</td>
                                            <td>{task.employee.name}</td>
                                            <td>{<StatusBadge className={"mx-auto"} statusType={task.status} />}</td>
                                            <td>{new Date(task.created_at).toLocaleString()}</td>
                                            <td >
                                                <div className='flex items-center justify-center gap-2 h-full'>
                                                    {
                                                        hasPermission(user, "عرض المهام") &&
                                                        <NavLink className="!text-black hover:!text-primary-400 transition-all ease-out grid place-items-center" to={`/tasks-list/${task.id}`}>
                                                            <Icon icon="iconamoon:eye-light" fontSize={22} />
                                                        </NavLink>
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        :
                        <EmptyData title={"لا توجد مهام"} />
                }
            </div>
        </div>
    )
}

export default TasksList