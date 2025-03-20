import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, getTask } from '../../store/slices/tasksSlice'
import { useParams } from 'react-router'
import TaskDetails from '../../components/TasksSections/TaskDetails'
import DetailsHeader from '../../components/UI/DetailsHeader'
import TaskEmployee from '../../components/TasksSections/TaskEmployee'
import WorkList from '../../components/TasksSections/WorkList'
import TaskProjectAndStage from '../../components/TasksSections/TaskProjectAndStage'
import TaskFiles from '../../components/TasksSections/TaskFiles'
import Loader from '../../components/UI/Loader'

const TasksDetails = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const { task } = useSelector(state => state.tasks)

    const handleDelete = async () => {
        const response = await dispatch(deleteTask(task.id))
        return deleteTask.fulfilled.match(response)
    }


    useEffect(() => {
        dispatch(getTask(params.id))
    }, [dispatch])
    return (
        task
            ?
            <div className='mt-10'>
                <DetailsHeader
                    handleDelete={handleDelete}
                    navigation={"/tasks-list"}
                    prevRoute={"المهام"}
                    currRoute={"تفاصيل المهمة"}
                    dataObject={task}
                    repeatTask={true}
                    editType={"tasks"}
                />
                <div className='flex flex-col gap-6'>
                    <TaskProjectAndStage />
                    <TaskDetails />
                    <TaskEmployee />
                    <WorkList />
                    <TaskFiles />
                </div>
            </div>
            :
            <Loader className={"h-screen"} />
    )
}

export default TasksDetails