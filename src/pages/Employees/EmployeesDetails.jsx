import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { deleteEmployee, getEmployee } from '../../store/slices/employeesSlice';
import PersonalDetails from '../../components/EmployeesSections/PersonalDetails';
import PermissionsDetails from '../../components/EmployeesSections/PermissionsDetails';
import DetailsHeader from '../../components/UI/DetailsHeader'
import Loader from '../../components/UI/Loader';

const EmployeesDetails = () => {
    const dispatch = useDispatch()
    const { employee } = useSelector(state => state.employees)
    const params = useParams()

    const handleDelete = async () => {
        const response = await dispatch(deleteEmployee(employee.id))
        return deleteEmployee.fulfilled.match(response)
    }


    useEffect(() => {
        dispatch(getEmployee(params.id))
    }, [dispatch])
    return (
        employee
            ?
            <div className='mt-10'>
                <DetailsHeader
                    handleDelete={handleDelete}
                    navigation={"/employees-list"}
                    prevRoute={"الموظفين"}
                    currRoute={"تفاصيل الموظف"}
                    dataObject={employee}
                    editType={"employees"}
                />
                <div className='flex flex-col gap-6'>
                    <PersonalDetails />
                    <PermissionsDetails />
                </div>
            </div>
            :
            <Loader className={"h-screen"} />

    )
}

export default EmployeesDetails