import { useSelector } from "react-redux"


const OtherDetails = () => {
    const { supervisor } = useSelector(state => state.supervisors)

    return (
        <div className='rounded-lg bg-white shadow-md p-8 col-span-1 max-md:col-span-2'>
            <div className="heading mb-4 pb-4 border-b border-gray-200">
                <h2 className='font-bold px-4 relative before:absolute before:w-1 before:rounded-full before:h-full before:-right-0 before:bg-primary-400'>معلومات اخري</h2>
            </div>
            <div className='flex flex-col'>
                <div className='flex items-center gap-4 py-6 justify-between border-b border-gray-200'>
                    <span className='font-bold'>نوع الاعمال</span>
                    <span>{supervisor.type_of_work}</span>
                </div>
                <div className='flex items-center gap-4 py-6 justify-between border-b border-gray-200'>
                    <span className='font-bold'>عدد الاعمال</span>
                    <span>{supervisor.count_of_workers}</span>
                </div>
                <div className='flex items-center gap-4 pt-6 justify-between '>
                    <span className='font-bold'>الاجمالي التعاقدي</span>
                    <span>{supervisor.total_contract}</span>
                </div>
            </div>
        </div>
    )
}

export default OtherDetails