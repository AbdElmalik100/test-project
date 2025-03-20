import { useDispatch, useSelector } from 'react-redux'
import { deleteSupervisor, getSupervisors } from '../../store/slices/supervisorsSlice'
import CardsGrid from '../../components/SupervisorsSections/CardsGrid'
import { useEffect, useState } from 'react'
import SearchBox from '../../components/UI/SearchBox'
import GridSystemTab from '../../components/UI/GridSystemTab'
import Sort from '../../components/UI/Sort'
import { Icon } from '@iconify/react/dist/iconify.js'
import { sortOptions } from '../../constants'
import TableGrid from '../../components/UI/TableGrid'
import Cookies from 'js-cookie'


const Supervisors = () => {
    const dispatch = useDispatch()

    const [gridSystem, setGridSystem] = useState("cards")
    const [searchInput, setSearchInput] = useState("")
    const { supervisors } = useSelector(state => state.supervisors)
    const [filterationData, setFilterationData] = useState([])

    const handleDelete = async (supervisorObj) => {
        const response = await dispatch(deleteSupervisor(supervisorObj.id))
        return deleteSupervisor.fulfilled.match(response)
    }

    useEffect(() => {
        dispatch(getSupervisors())
    }, [dispatch])

    useEffect(() => {
        if (Cookies.get("tab_type")) setGridSystem(Cookies.get("tab_type"))
    }, [])

    return (
        supervisors &&
        <div className='mt-10'>
            <SearchBox searchInput={searchInput} setSearchInput={setSearchInput} searchData={supervisors} setFilterationData={setFilterationData} />
            <div className='flex items-center justify-between gap-4 mt-6 max-md:flex-col max-md:items-end !text-sm'>
                <div className='flex items-center gap-4'>
                    <div className='filter'>
                        <button className='flex items-center font-semibold !gap-1 main-btn'>
                            <Icon icon='flowbite:filter-outline' fontSize={22} />
                            <span>فلتر</span>
                        </button>
                    </div>
                    <button className='flex items-center font-semibold !gap- main-btn !bg-white !text-black hover:!bg-gray-50'>
                        <Icon icon='material-symbols-light:print-outline-rounded' fontSize={22} />
                        <span>طباعة</span>
                    </button>
                    <button className='flex items-center font-semibold !gap-1 main-btn !bg-white !text-black hover:!bg-gray-50'>
                        <Icon icon='ph:eye-slash' fontSize={22} />
                        <span>اخفاء اعمدة</span>
                    </button>
                </div>
                <GridSystemTab tab={gridSystem} setTab={setGridSystem} />
            </div>
            <div className='mt-6 flex justify-end'>
                <Sort options={sortOptions} selected={0} sortData={supervisors} setFilterationData={setFilterationData} />
            </div>
            {
                gridSystem === 'table'
                    ?
                    <TableGrid
                        type="supervisors"
                        header={"عدد المقاولين"}
                        title={"اضافة مقاول جديد"}
                        tableData={supervisors}
                        filterationData={filterationData}
                        linkDirection={"/supervisors-add"}
                        deleteItem={handleDelete}
                    />
                    :
                    <CardsGrid supervisors={supervisors} supervisorsData={filterationData} />
            }
        </div>
    )
}

export default Supervisors