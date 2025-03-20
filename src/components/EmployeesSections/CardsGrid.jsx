import { Icon } from '@iconify/react/dist/iconify.js'
import { Pagination } from 'antd'
import { NavLink, useNavigate } from 'react-router'
import EmptyData from '../EmptyData'

const CardsGrid = ({ employees, employeesData }) => {
    const navigate = useNavigate()
    
    return (
        employees &&
        <div className='mt-6'>
            {
                employeesData.length > 0
                    ?
                    <div className='grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 mb-10'>
                        {
                            employeesData.map(employee => (
                                <div onClick={() => navigate(`/employees-list/${employee.id}`)} key={employee.id} className='box rounded-3xl shadow-md transition-all ease-out hover:shadow-lg py-8 bg-white p-4 flex items-center justify-center gap-4 flex-col cursor-pointer'>
                                    <div className='image-wrapper'>
                                        <img className='rounded-full w-[100px] h-[100px] object-cover' src={employee.image ? `${import.meta.env.VITE_MEDIA_URL}/${employee.image}` : "https://placehold.co/100X100?text=?"} alt="Employee Image" />
                                    </div>
                                    <div className='text-center'>
                                        <h3 className='font-bold text-lg'>{employee.name}</h3>
                                        <span className='text-paragrah-color text-sm'>{employee.roles[0]?.display_name}</span>
                                    </div>
                                    <div className='flex items-center gap-8'>
                                        <NavLink to={`mailto:${employee.email}`} target='_blank' className="w-10 h-10 hover:bg-gray-50 transition-all ease-out text-primary-400 bg-gray-100 rounded-full grid place-items-center">
                                            <Icon icon="mdi:email-outline" fontSize={22} />
                                        </NavLink>
                                        <NavLink to={`tel:${employee.phone}`} target='_blank' className="w-10 h-10 hover:bg-gray-50 transition-all ease-out text-primary-400 bg-gray-100 rounded-full grid place-items-center">
                                            <Icon icon="tabler:phone" fontSize={22} />
                                        </NavLink>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    :
                    <EmptyData title={"لا يوجد موظفين"} />
            }
            <Pagination align="center" defaultCurrent={1} total={employees.total} pageSize={employees.per_page} />
        </div>
    )
}

export default CardsGrid