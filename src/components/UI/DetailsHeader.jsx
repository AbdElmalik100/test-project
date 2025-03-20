import { Breadcrumb } from 'antd'
import DeletePopup from '../UI/DeletePopup'
import { NavLink } from 'react-router'
import RepeatTaskPopup from '../TasksSections/RepeatTaskPopup'
import EditProject from '../ProjectsSections/EditProject'
import EditTask from '../TasksSections/EditTask'
import EditSupervisor from '../SupervisorsSections/EditSupervisor'
import EditEmployee from '../EmployeesSections/EditEmployee'

const DetailsHeader = ({ dataObject, navigation, prevRoute, currRoute, handleDelete, repeatTask, editType }) => {
    const handleEdit = () => {
        switch (editType) {
            case "projects":
                return <EditProject
                    className={"main-btn"}
                    btnTitle={"تعديل"}
                    itemObj={dataObject}
                />
            case "tasks":
                return <EditTask
                    className={"main-btn"}
                    btnTitle={"تعديل"}
                    itemObj={dataObject}
                />
            case "employees":
                return <EditEmployee
                    className={"main-btn"}
                    btnTitle={"تعديل"}
                    itemObj={dataObject}
                />
            case "supervisors":
                return <EditSupervisor
                    className={"main-btn"}
                    btnTitle={"تعديل"}
                    itemObj={dataObject}
                />
            default:
                return null;
        }
    }


    return (
        dataObject &&
        <div className='header mb-6 flex items-center justify-between gap-4'>
            <Breadcrumb
                separator=">"
                items={[
                    { title: <NavLink to={navigation} className="font-bold">{prevRoute}</NavLink>, },
                    { title: <span className='font-bold text-primary-400'>{currRoute}</span>, },
                ]}
            />
            <div className='flex items-center gap-2'>
                {
                    repeatTask &&
                    <RepeatTaskPopup task={dataObject} />
                }
                {
                    handleEdit()
                }
                <DeletePopup
                    handleDelete={() => handleDelete()}
                    itemObj={dataObject}
                    className={"main-btn text-white !bg-rose-400 hover:!bg-rose-300"}
                    btnTitle={"حذف"}
                    navigation={navigation}
                />
            </div>
        </div>
    )
}

export default DetailsHeader