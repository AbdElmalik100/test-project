import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { deleteSupervisor, getSupervisor } from "../../store/slices/supervisorsSlice"
import DetailsHeader from "../../components/UI/DetailsHeader"
import PersonalDetails from "../../components/SupervisorsSections/PersonalDetails"
import OtherDetails from "../../components/SupervisorsSections/OtherDetails"
import ProjectsList from "../../components/SupervisorsSections/ProjectsList"
import Loader from "../../components/UI/Loader"
import TasksList from "../../components/UI/TasksList"


const SupervisorsDetails = () => {
    const dispatch = useDispatch()
    const { supervisor } = useSelector(state => state.supervisors)
    const params = useParams()


    const handleDelete = async () => {
        const response = await dispatch(deleteSupervisor(supervisor.id))
        return deleteSupervisor.fulfilled.match(response)
    }

    useEffect(() => {
        dispatch(getSupervisor(params.id))
    }, [dispatch])
    return (
        supervisor
            ?
            <div className='mt-10'>
                <DetailsHeader
                    dataObject={supervisor}
                    currRoute={"تفاصيل المقاول"}
                    prevRoute={"المقاولين"}
                    navigation={"/supervisors-list"}
                    handleDelete={() => handleDelete()}
                    editType={"supervisors"}
                />
                <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
                    <PersonalDetails />
                    <OtherDetails />
                    <TasksList className={"col-span-2"} tasksListData={supervisor.tasks} />
                    {/* <ProjectsList supervisor={supervisor} /> */}
                </div>
            </div>
            :
            <Loader className={"h-screen"} />
    )
}

export default SupervisorsDetails