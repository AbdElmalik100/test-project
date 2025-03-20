import { Icon } from '@iconify/react/dist/iconify.js'

const EmptyData = ({ title, children }) => {
    return (
        <div className='grid place-items-center w-full py-32'>
            <div className='flex flex-col gap-4 items-center justify-center'>
                <Icon icon="emojione-v1:empty-note-pad" fontSize={75} />
                <h3 className='text-gray-400 font-semibold text-lg'>{title}</h3>
                {children}
            </div>
        </div>
    )
}

export default EmptyData