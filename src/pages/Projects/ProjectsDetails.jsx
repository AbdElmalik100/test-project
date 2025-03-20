import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import DetailsHeader from '../../components/UI/DetailsHeader'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProject, getProject } from '../../store/slices/projectsSlice'
import ProjectDetails from '../../components/ProjectsSections/ProjectDetails'
import StagesList from './StagesList'
import ProjectEmployees from '../../components/ProjectsSections/ProjectEmployees'
import { getTasksByProjectId } from '../../store/slices/tasksSlice'
import Loader from '../../components/UI/Loader'
import TasksList from '../../components/UI/TasksList'

const ProjectsDetails = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const { project } = useSelector(state => state.projects)
    const { tasks } = useSelector(state => state.tasks)

    const handleDelete = async () => {
        const response = await dispatch(deleteProject(project.id))
        return deleteProject.fulfilled.match(response)
    }


    useEffect(() => {
        dispatch(getProject(params.id))
        dispatch(getTasksByProjectId(params.id))
    }, [dispatch])
    return (

        (project && tasks)
            ?
            <div className='mt-10'>
                <DetailsHeader
                    handleDelete={handleDelete}
                    navigation={"/projects-list"}
                    prevRoute={"المشاريع"}
                    currRoute={"تفاصيل المشروع"}
                    dataObject={project}
                    editType={"projects"}
                />
                <div className='flex flex-col gap-6'>
                    <ProjectDetails />
                    <ProjectEmployees />
                    <TasksList tasksListData={tasks} />
                    {/* <StagesList project={project} /> */}
                </div>
            </div>
            :
            <Loader className={"h-screen"} />
    )
}

export default ProjectsDetails