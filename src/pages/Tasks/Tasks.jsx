import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteTask, getTasks } from "../../store/slices/tasksSlice"
import Cookies from 'js-cookie'
import { Icon } from "@iconify/react/dist/iconify.js"
import SearchBox from "../../components/UI/SearchBox"
import GridSystemTab from "../../components/UI/GridSystemTab"
import Sort from "../../components/UI/Sort"
import TableGrid from '../../components/UI/TableGrid'
import { sortOptions } from "../../constants"


const Tasks = () => {
    const dispatch = useDispatch()

    const [gridSystem, setGridSystem] = useState("table")
    const [searchInput, setSearchInput] = useState("")
    const { tasks } = useSelector(state => state.tasks)
    const [filterationData, setFilterationData] = useState([])


    const handleDelete = async (taskObj) => {
        const response = await dispatch(deleteTask(taskObj.id))
        return deleteTask.fulfilled.match(response)
    }

    useEffect(() => {
        dispatch(getTasks())
    }, [dispatch])

    // useEffect(() => {
    //     if (Cookies.get("tab_type")) setGridSystem(Cookies.get("tab_type"))
    // }, [])
    return (
        !Array.isArray(tasks) &&
        <div className='mt-10'>
            <SearchBox searchInput={searchInput} setSearchInput={setSearchInput} searchData={tasks} setFilterationData={setFilterationData} />
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
                <GridSystemTab tab={gridSystem} setTab={setGridSystem} hideCards={true} />
            </div>
            <div className='mt-6 flex justify-end'>
                <Sort options={sortOptions} selected={0} sortData={tasks} setFilterationData={setFilterationData} />
            </div>
            {
                gridSystem === 'table' &&
                <TableGrid
                    type="tasks"
                    header={"عدد المهام"}
                    title={"اضافة مهمة جديد"}
                    tableData={tasks}
                    filterationData={filterationData}
                    linkDirection={"/tasks-add"}
                    deleteItem={handleDelete}
                />
            }
        </div>
    )
}

export default Tasks