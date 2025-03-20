import { Icon } from "@iconify/react/dist/iconify.js"
import StatusBadge from "../../components/UI/StatusBadge"


const StagesList = ({ project }) => {
    return (
        <div className='rounded-lg bg-white shadow-md p-8'>
            <div className="heading mb-4 pb-4 border-b border-gray-200">
                <h2 className='font-bold px-4 relative before:absolute before:w-1 before:rounded-full before:h-full before:-right-0 before:bg-primary-400'>قائمة المراحل</h2>
            </div>
            <div className='flex flex-col gap-12 mt-6'>
                {
                    project.stages.map((stage, index) => (
                        <div key={stage.id} className="flex items-center gap-4 justify-between">
                            <div className="flex flex-col gap-2 w-full">
                                <div className="flex items-center gap-2">
                                    <div
                                        className={
                                            `   
                                                image-wrapper relative w-12 h-12 rounded-full grid place-items-center bg-[#1ABC9C] text-white
                                                ${index === 1 ? 'before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:h-full before:bg-primary-400 before:w-0.5 before:rounded-full after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:h-full after:bg-primary-400 after:w-0.5 after:rounded-full' : 'z-50'}
                                            `
                                        }
                                    >
                                        <Icon icon="fa:gears" fontSize={24} />
                                    </div>
                                    <h3 className="font-bold">{stage.name}</h3>
                                </div>
                                {/* <p className="ms-[23px] text-paragrah-color ps-6 relative before:absolute before:right-0 before:h-full before:bg-primary-400 before:w-0.5 before:rounded-full">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur dignissimos sequi repudiandae velit at eveniet?</p> */}
                            </div>
                            <div className="w-full">
                                <StatusBadge className={"mx-auto"} statusType={"منتهي"} />
                            </div>
                            <div className='w-full'>
                                <div className='complete-progress relative w-full h-3 rounded-full bg-gray-100'>
                                    <span className="progress absolute top-0 right-0 h-full rounded-full bg-black"
                                        style={{ width: `${30}%` }}></span>
                                </div>
                                <span className='percentage flex justify-start mt-1 text-sm text-paragrah-color'>{30}%</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default StagesList