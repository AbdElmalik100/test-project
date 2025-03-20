import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useEffect, useState } from 'react'
import GridSystemTab from '../../components/UI/GridSystemTab'
import SearchBox from '../../components/UI/SearchBox'
import TableGrid from '../../components/UI/TableGrid'
import { deleteEmployee, getEmployees } from '../../store/slices/employeesSlice'
import { useDispatch, useSelector } from 'react-redux'
import Sort from '../../components/UI/Sort'
import { sortOptions } from '../../constants'
import CardsGrid from '../../components/EmployeesSections/CardsGrid'
import Cookies from 'js-cookie'


const Employees = () => {
    const dispatch = useDispatch()

    const [gridSystem, setGridSystem] = useState("cards")
    const [searchInput, setSearchInput] = useState("")
    const { employees } = useSelector(state => state.employees)
    const [filterationData, setFilterationData] = useState([])


    const handleDelete = async (employeeObj) => {
        const response = await dispatch(deleteEmployee(employeeObj.id))
        return deleteEmployee.fulfilled.match(response)
    }

    useEffect(() => {
        dispatch(getEmployees())
    }, [dispatch])

    useEffect(() => {
        if (Cookies.get("tab_type")) setGridSystem(Cookies.get("tab_type"))
    }, [])

    return (
        employees &&
        <div className='mt-10'>
            <SearchBox searchInput={searchInput} setSearchInput={setSearchInput} searchData={employees} setFilterationData={setFilterationData} />
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
                <Sort options={sortOptions} selected={0} sortData={employees} setFilterationData={setFilterationData} />
            </div>
            {
                gridSystem === 'table'
                    ?
                    <TableGrid
                        type="employees"
                        header={"عدد الموظفين"}
                        title={"اضافة موظف جديد"}
                        tableData={employees}
                        filterationData={filterationData}
                        linkDirection={"/employees-add"}
                        deleteItem={handleDelete}
                    />
                    :
                    <CardsGrid employees={employees} employeesData={filterationData} />
            }
        </div>
    )
}

export default Employees