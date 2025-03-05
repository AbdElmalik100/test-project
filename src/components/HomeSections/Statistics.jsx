import { topStats } from '../../constants'
import { Icon } from "@iconify/react/dist/iconify.js"

const Statistics = () => {
    const {employees, missions, projects, supervisors} = topStats

    return (
        <div className="top-stats flex items-center gap-6 justify-between max-lg:flex-col">
            <div className="box rounded-lg w-full bg-white shadow-md flex items-center gap-4 p-4 py-6">
                <div className="w-12 h-12 grid place-items-center rounded-full bg-primary-100 text-primary-400">
                    <Icon icon={projects.icon} fontSize={22} />
                </div>
                <div>
                    <h2 className="font-bold text-2xl">{projects.total}</h2>
                    <span className="text-paragrah-color font-bold text-sm">{projects.title}</span>
                </div>
            </div>
            <div className="box rounded-lg w-full bg-white shadow-md flex items-center gap-4 p-4 py-6">
                <div className="w-12 h-12 grid place-items-center rounded-full bg-primary-100 text-primary-400">
                    <Icon icon={supervisors.icon} fontSize={22} />
                </div>
                <div>
                    <h2 className="font-bold text-2xl">{supervisors.total}</h2>
                    <span className="text-paragrah-color font-bold text-sm">{supervisors.title}</span>
                </div>
            </div>
            <div className="box rounded-lg w-full bg-white shadow-md flex items-center gap-4 p-4 py-6">
                <div className="w-12 h-12 grid place-items-center rounded-full bg-green-100 text-green-400">
                    <Icon icon={missions.icon} fontSize={22} />
                </div>
                <div>
                    <h2 className="font-bold text-2xl">{missions.total}</h2>
                    <span className="text-paragrah-color font-bold text-sm">{missions.title}</span>
                </div>
            </div>
            <div className="box rounded-lg w-full bg-white shadow-md flex items-center gap-4 p-4 py-6">
                <div className="w-12 h-12 grid place-items-center rounded-full bg-orange-100 text-orange-400">
                    <Icon icon={employees.icon} fontSize={22} />
                </div>
                <div>
                    <h2 className="font-bold text-2xl">{employees.total}</h2>
                    <span className="text-paragrah-color font-bold text-sm">{employees.title}</span>
                </div>
            </div>
        </div>
    )
}

export default Statistics