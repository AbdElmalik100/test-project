import EmptyData from '../EmptyData'
import { Pagination } from 'antd'

import ProjectCard from './ProjectCard'

const CardsGrid = ({ projects, projectsData }) => {

    return (
        projects &&
        <div className='mt-6'>
            {
                projectsData.length > 0
                    ?
                    <div className='grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 mb-10'>
                        {
                            projectsData.map((projectObj, index) => (
                                <ProjectCard key={projectObj.id} projectObj={projectObj} />
                            ))
                        }
                    </div>
                    :
                    <EmptyData title={"لا توجد مشاريع"} />
            }
            <Pagination align="center" defaultCurrent={1} total={projects.total} pageSize={projects.per_page} />
        </div>
    )
}

export default CardsGrid