import { useState } from 'react';
import StatusBadge from '../UI/StatusBadge'
import Tooltip from './Tooltip'
import { NavLink, useNavigate } from 'react-router'
import { Icon } from '@iconify/react/dist/iconify.js';

const ProjectCard = ({ projectObj }) => {
    const navigate = useNavigate()
    const [isHovered, setIsHovered] = useState(null);
    return (
        <div onClick={() => navigate(`/projects-list/${projectObj.id}`)} className='shadow-md flex flex-col transition-all ease-out hover:shadow-lg rounded-3xl w-full bg-white p-6 cursor-pointer'>
            <StatusBadge statusType={projectObj.status} />
            <div className='my-4 flex items-center gap-3'>
                <div className='image-wrapper w-16 h-16 rounded-full grid place-items-center bg-[#cdfaec] text-[#1ABC9C]'>
                    <Icon icon="ion:construct" fontSize={32} />
                </div>
                <h4 className='font-bold text-xl flex-1 text-primary-400'>
                    {projectObj.name}
                </h4>
            </div>
            <p className='text-gray-400 text-sm line-clamp-4'>
                {projectObj.desc}
            </p>
            {
                projectObj.employees.length > 0 &&
                <div className='my-3 flex items-center gap-2'>
                    {
                        projectObj.employees.map((employee, index) => (
                            index <= 3
                                ?
                                <NavLink key={employee.id}
                                    onClick={(event) => event.stopPropagation()}
                                    to={`/employees-list/${employee.id}`}
                                    className='group relative hover:z-10'
                                    onMouseEnter={() => setIsHovered({ projId: projectObj.id, empId: employee.id })}
                                    onMouseLeave={() => setIsHovered(null)}
                                    style={{ transform: `translateX(${index * 20}px)` }}
                                >
                                    <div className="image-wrapper cursor-pointer">
                                        <img className='rounded-full w-8 border-2 border-white h-8 object-cover' src={employee.image ? `${import.meta.env.VITE_MEDIA_URL}/${employee.image}` : 'https://placehold.co/100X100?text=?'} alt="Employee Image" />
                                    </div>
                                    <Tooltip showCondition={(isHovered?.projId === projectObj.id && isHovered?.empId === employee.id)} employee={employee} />
                                </NavLink>
                                :
                                <div key={employee.id} className='w-8 h-8 rounded-full border border-white text-sm grid place-items-center bg-[#F1EDF9] translate-x-[80px]'>+{projectObj.employees.length - 4}</div>
                        ))
                    }
                </div>
            }
            <div className='mt-auto w-full rounded-lg shadow-md p-4 flex items-center gap-4 justify-between'>
                <div className='flex flex-col gap-1'>
                    <h4 className='font-bold text-2xl text-primary-400'>{projectObj.finished_tasks_count}</h4>
                    <span className='text-paragrah-color text-xs'>مهام مكتملة</span>
                </div>
                <div className='flex flex-col gap-1'>
                    <h4 className='font-bold text-2xl text-primary-400'>{projectObj.pending_tasks_count}</h4>
                    <span className='text-paragrah-color text-xs'>مهام جارية</span>
                </div>
                <div className='flex flex-col gap-1'>
                    <h4 className='font-bold text-2xl text-primary-400'>{projectObj.on_going_tasks_count}</h4>
                    <span className='text-paragrah-color text-xs'>مهام قادمة</span>
                </div>
            </div>
            <div className='mt-6'>
                <div className='complete-progress relative w-full h-3 rounded-full bg-gray-100'>
                    <span className="progress absolute top-0 left-0 h-full rounded-full bg-black"
                        style={{width: `${projectObj.completion_percentage}%`}}></span>
                </div>
                <span className='percentage flex justify-end text-sm text-paragrah-color'>{projectObj.completion_percentage}%</span>
            </div>
        </div>
    )
}

export default ProjectCard