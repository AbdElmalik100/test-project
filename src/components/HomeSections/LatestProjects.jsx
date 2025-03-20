import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router'
import EmptyData from '../EmptyData'
import ProjectCard from '../ProjectsSections/ProjectCard'

const LatestProjects = () => {
    const { latestProjects } = useSelector(state => state.reports)
    
    return (
        <div className="col-span-6 bg-white p-8 rounded-lg shadow-md">
            <div className='flex items-center justify-between gap-4'>
                <h3 className="text-xl font-bold">اخر المشاريع</h3>
                <NavLink className="flex items-center gap-2 text-paragrah-color transition-all ease-out hover:text-primary-400" to="/projects-list">
                    <span>عرض الكل</span>
                    <Icon icon="iconamoon:arrow-left-2-light" fontSize={22} />
                </NavLink>
            </div>
            {
                latestProjects.length > 0
                    ?
                    <div className='mt-4 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 justify-between'>
                        {
                            latestProjects.map((projectObj, index) => (
                                <ProjectCard key={projectObj.id} projectObj={projectObj} />
                            ))
                        }
                    </div>
                    :
                    <EmptyData title={"لا توجد مشاريع الي الان"} />
            }
        </div>
    )
}

export default LatestProjects