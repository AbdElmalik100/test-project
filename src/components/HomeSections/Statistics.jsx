import { useSelector } from 'react-redux'
import { topStats } from '../../constants'
import { Icon } from "@iconify/react/dist/iconify.js"
import { NavLink, useNavigate } from 'react-router'

const Statistics = () => {
    const navigate = useNavigate()
    const { employees, tasks, projects, supervisors } = topStats
    const { reports } = useSelector(state => state.reports)

    return (
        <div className="top-stats flex gap-6 justify-between max-lg:flex-col">
            <div onClick={() => navigate('/projects-list')} className="box rounded-lg w-full bg-white shadow-md flex items-center gap-4 p-4 py-6 cursor-pointer">
                <div className="w-12 h-12 grid place-items-center rounded-full bg-primary-100 text-primary-400">
                    <Icon icon={projects.icon} fontSize={22} />
                </div>
                <div className='flex-1'>
                    <h2 className="font-bold text-2xl">{reports.projects_count}</h2>
                    <span className="text-paragrah-color font-bold text-sm">{projects.title}</span>
                </div>
            </div>
            <div onClick={() => navigate('/supervisors-list')} className="box rounded-lg w-full bg-white shadow-md flex items-center gap-4 p-4 py-6 cursor-pointer">
                <div className="w-12 h-12 grid place-items-center rounded-full bg-primary-100 text-primary-400">
                    <Icon icon={supervisors.icon} fontSize={22} />
                </div>
                <div className='flex-1'>
                    <h2 className="font-bold text-2xl">{reports.contractors_count}</h2>
                    <span className="text-paragrah-color font-bold text-sm">{supervisors.title}</span>
                </div>
            </div>
            <div onClick={() => navigate('/tasks-list')} className="box rounded-lg w-full bg-white shadow-md flex items-center gap-4 p-4 py-6 cursor-pointer">
                <div className="w-12 h-12 grid place-items-center rounded-full bg-green-100 text-green-400">
                    <Icon icon={tasks.icon} fontSize={22} />
                </div>
                <div className='flex-1'>
                    <h2 className="font-bold text-2xl">{reports.tasks_count}</h2>
                    <span className="text-paragrah-color font-bold text-sm">{tasks.title}</span>
                </div>
            </div>
            <div onClick={() => navigate('/employees-list')} className="box rounded-lg w-full bg-white shadow-md flex items-center gap-4 p-4 py-6 cursor-pointer">
                <div className="w-12 h-12 grid place-items-center rounded-full bg-orange-100 text-orange-400">
                    <Icon icon={employees.icon} fontSize={22} />
                </div>
                <div className='flex-1'>
                    <h2 className="font-bold text-2xl">{reports.employees_count}</h2>
                    <span className="text-paragrah-color font-bold text-sm">{employees.title}</span>
                </div>
            </div>
        </div>
    )
}

export default Statistics