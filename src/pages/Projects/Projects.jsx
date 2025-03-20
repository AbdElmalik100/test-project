import React, { useEffect, useState } from 'react'
import { deleteProject, getProjects } from '../../store/slices/projectsSlice'
import { useDispatch, useSelector } from 'react-redux'
import SearchBox from '../../components/UI/SearchBox'
import { Icon } from '@iconify/react/dist/iconify.js'
import GridSystemTab from '../../components/UI/GridSystemTab'
import TableGrid from '../../components/UI/TableGrid'
import Sort from '../../components/UI/Sort'
import { sortOptions } from '../../constants'
import Cookies from 'js-cookie'
import CardsGrid from '../../components/ProjectsSections/CardsGrid'



const Projects = () => {
    const dispatch = useDispatch()

    const [gridSystem, setGridSystem] = useState("cards")
    const [searchInput, setSearchInput] = useState("")
    const { projects } = useSelector(state => state.projects)
    const [filterationData, setFilterationData] = useState([])


    const handleDelete = async (projectObj) => {
        const response = await dispatch(deleteProject(projectObj.id))
        return deleteProject.fulfilled.match(response)
    }
    
    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch])

    useEffect(() => {
        if (Cookies.get("tab_type")) setGridSystem(Cookies.get("tab_type"))
    }, [])
    return (
        projects &&
        <div className='mt-10'>
            <SearchBox searchInput={searchInput} setSearchInput={setSearchInput} searchData={projects} setFilterationData={setFilterationData} />
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
                <Sort options={sortOptions} selected={0} sortData={projects} setFilterationData={setFilterationData} />
            </div>
            {
                gridSystem === 'table'
                    ?
                    <TableGrid
                        type="projects"
                        header={"عدد المشاريع"}
                        title={"اضافة مشروع جديد"}
                        tableData={projects}
                        filterationData={filterationData}
                        linkDirection={"/projects-add"}
                        deleteItem={handleDelete}
                    />
                    :
                    <CardsGrid projects={projects} projectsData={filterationData} />
            }
        </div>
    )
}

export default Projects