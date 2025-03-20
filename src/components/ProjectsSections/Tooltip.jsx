import { AnimatePresence, motion } from 'framer-motion'

const Tooltip = ({ showCondition, employee}) => {
    return (
        <AnimatePresence>
            {
                showCondition &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ ease: "easeOut", duration: 0.1 }}
                    className='tooltip absolute bottom-full mb-2 rounded-lg right-1/2 translate-x-1/2 p-4 bg-white shadow-md'>
                    <div className='flex items-center gap-2'>
                        <div className='image-wrapper w-10 h-10'>
                            <img className='w-full h-full rounded-full object-cover' src={employee.image ? `${import.meta.env.VITE_MEDIA_URL}/${employee.image}` : 'https://placehold.co/100X100?text=?'} alt="Employee Image" />
                        </div>
                        <div className='flex flex-col text-sm'>
                            <h3 className='font-bold'>{employee.name}</h3>
                            <span className='text-primary-400'>{employee.email}</span>
                        </div>
                    </div>
                </motion.div>
            }
        </AnimatePresence>

    )
}

export default Tooltip