import { Icon } from '@iconify/react/dist/iconify.js'
import { useSelector } from 'react-redux'

const LatestProjectsChart = () => {
    const { latestProjects } = useSelector(state => state.reports)

    return (
        latestProjects.length > 0 &&
        <div className='p-8 rounded-lg bg-white shadow-md col-span-6'>
            <h3 className="text-xl font-bold">اخر المشاريع</h3>
            <div className='flex flex-col gap-6 mt-6'>
                {
                    latestProjects.map((project, index) => (
                        <div key={project.id} className='flex items-center gap-4 justify-between max-md:flex-col max-md:items-start'>
                            <div className='details flex items-center gap-2 '>
                                <div className='image-wrapper w-12 h-12 rounded-full grid place-items-center bg-[#1ABC9C] text-white'>
                                    <Icon icon="fa:gears" fontSize={24} />
                                </div>
                                <h4 className='font-bold'>{project.name}</h4>
                            </div>
                            <div className='progress w-3/4 flex items-center gap-2 max-md:w-full'>
                                <span className='text-sm text-gray-300'>{project.completion_percentage}%</span>
                                <div className="progress-bar w-full h-2 rounded-full relative bg-gray-300">
                                    <span className='percentage-progress h-full absolute rounded-full bg-black' style={{ width: `${project.completion_percentage}%` }}></span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default LatestProjectsChart