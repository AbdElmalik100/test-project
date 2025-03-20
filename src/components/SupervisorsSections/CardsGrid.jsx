import { Pagination } from 'antd'
import EmptyData from '../EmptyData'
import { useNavigate } from 'react-router'


const CardsGrid = ({ supervisors, supervisorsData }) => {
    const navigate = useNavigate()
    
    return (
        supervisorsData &&
        <div className='mt-6'>
            {
                supervisorsData.length > 0
                    ?
                    <div className='grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 mb-10'>
                        {
                            supervisorsData.map(supervisor => (
                                <div onClick={() => navigate(`/supervisors-list/${supervisor.id}`)} key={supervisor.id} className='box cursor-pointer shadow-md transition-all ease-out hover:shadow-lg rounded-3xl py-8 bg-white p-4 flex items-center justify-center gap-4 flex-col'>
                                    <div className='image-wrapper'>
                                        <img className='rounded-full w-[100px] h-[100px] object-cover' src={supervisor.image ? `${import.meta.env.VITE_MEDIA_URL}/${supervisor.image}` : "https://placehold.co/100X100?text=?"} alt="Supervisor Image" />
                                    </div>
                                    <div className='text-center'>
                                        <h3 className='font-bold text-lg'>{supervisor.name}</h3>
                                        <span className='text-paragrah-color text-sm'>{supervisor?.role}</span>
                                    </div>
                                    <div className='flex gap-3 w-full mt-auto'>
                                        <div className='flex w-full p-4 rounded-lg bg-white shadow-md items-start gap-1 flex-col'>
                                            <h4 className='text-lg font-semibold text-primary-400'>{supervisor.finished_tasks_count}</h4>
                                            <span className='text-xs text-paragrah-color font-semibold'>المهام المنجزة</span>
                                        </div>
                                        <div className='flex w-full p-4 rounded-lg bg-white shadow-md items-start gap-1 flex-col'>
                                            <h4 className='text-lg font-semibold text-primary-400'>{supervisor.in_progress_tasks_count}</h4>
                                            <span className='text-xs text-paragrah-color font-semibold'>المهام قيد التنفيذ</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    :
                    <EmptyData title={"لا يوجد مقاولين"} />
            }
            <Pagination align="center" defaultCurrent={1} total={supervisors.total} pageSize={supervisors.per_page} />
        </div>
    )
}

export default CardsGrid