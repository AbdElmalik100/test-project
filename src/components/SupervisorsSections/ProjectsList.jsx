import React from 'react'

const ProjectsList = ({supervisor}) => {
    return (
        <div className='rounded-lg bg-white shadow-md p-8 col-span-2'>
            <div className="heading mb-4 pb-4 border-b border-gray-200">
                <h2 className='font-bold px-4 relative before:absolute before:w-1 before:rounded-full before:h-full before:-right-0 before:bg-primary-400'>قائمه المشاريع</h2>
            </div>
        </div>
    )
}

export default ProjectsList