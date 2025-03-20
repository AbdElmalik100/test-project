import { Select } from "antd"
import BaseButton from "../../components/UI/BaseButton"
import { NavLink, useNavigate } from "react-router"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import * as yup from 'yup'
import { createTask } from "../../store/slices/tasksSlice"
import { useEffect } from "react"
import { getProjects, getProjectStages } from "../../store/slices/projectsSlice"
import { getSupervisors } from "../../store/slices/supervisorsSlice"
import { getEmployeesBelongToProject } from "../../store/slices/employeesSlice"
import { hasPermission } from "../../utils"


const TasksAdd = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.users)
    const { loading } = useSelector(state => state.tasks)
    const { projects, stages } = useSelector(state => state.projects)
    const { supervisors } = useSelector(state => state.supervisors)
    const { projectEmployees } = useSelector(state => state.employees)

    const validationSchema = yup.object({
        name: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        desc: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        count_of_workers: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        contractor_id: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        project_id: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        stage_id: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        employee_id: yup.string().required("هذا الحقل لا يجب ان يكون فارغا")
    })

    const { register, watch, setValue, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: "",
            desc: "",
            count_of_workers: "",
            contractor_id: null,
            project_id: null,
            stage_id: null,
            employee_id: null,
        }
    })

    const onSuccess = async (data) => {
        const response = await dispatch(createTask(data))
        if (createTask.fulfilled.match(response)) {
            hasPermission(user, "عرض المهام") ? navigate(`/tasks-list/${response.payload.task.id}`) : reset()
        }
    }

    const onSubmit = handleSubmit(onSuccess)


    useEffect(() => {
        dispatch(getProjects())
        dispatch(getSupervisors())
    }, [dispatch])
    return (
        (projects && supervisors) &&
        <div className='mt-10'>
            <form className='grid grid-cols-4 gap-6' onSubmit={onSubmit}>
                <h3 className='text-primary-400 font-semibold mb-4 text-xl col-span-4'>تفاصيل المهمة</h3>
                <div className="w-full col-span-2 max-md:col-span-4">
                    <span className="text-mirage-800 block mb-2 font-semibold">اسم المهمة</span>
                    <input className={`w-full bg-white `} type="text" name="name" placeholder="قم بكتابة اسم المهمة" {...register("name")} />
                    {errors.name && <span className="text-rose-600 block mt-1 italic text-sm">{errors.name.message}</span>}
                </div>
                <div className="w-full col-span-2 max-md:col-span-4">
                    <span className="text-mirage-800 block mb-2 font-semibold">وصف المهمة</span>
                    <input className={`w-full bg-white `} type="text" name="desc" placeholder="قم بكتابة وصف المهمة" {...register("desc")} />
                    {errors.desc && <span className="text-rose-600 block mt-1 italic text-sm">{errors.desc.message}</span>}
                </div>
                <div className="w-full col-span-2 max-md:col-span-4">
                    <span className="text-mirage-800 block mb-2 font-semibold">المشروع</span>
                    <Select
                        className={`w-full !font-cairo`}
                        size='large'
                        placeholder="قم باختيار المشروع"
                        defaultValue={watch("project_id")}
                        onChange={(value, index) => {
                            setValue("project_id", value, { shouldValidate: true })
                            setValue("stage_id", null)
                            setValue("employee_id", null)
                            dispatch(getEmployeesBelongToProject(value))
                            dispatch(getProjectStages(value))
                        }}
                        options={projects.data.map((el, index) => ({ label: el.name, value: el.id }))}
                    />
                    {errors.project_id && <span className="text-rose-600 block mt-1 italic text-sm">{errors.project_id.message}</span>}
                </div>
                <div className="w-full col-span-2 max-md:col-span-4">
                    <span className="text-mirage-800 block mb-2 font-semibold">المرحلة</span>
                    {

                        <Select
                            className={`w-full !font-cairo`}
                            size='large'
                            placeholder="قم باختيار المرحلة"
                            defaultValue={watch("stage_id")}
                            value={watch("stage_id")}
                            onChange={value => setValue("stage_id", value, { shouldValidate: true })}
                            options={stages.map(el => ({ label: el.name, value: el.id }))}
                        />
                    }
                    {errors.stage_id && <span className="text-rose-600 block mt-1 italic text-sm">{errors.stage_id.message}</span>}
                </div>
                <h3 className='text-primary-400 font-semibold mb-4 text-xl col-span-4'>تفاصيل العمالة</h3>
                <div className="w-full col-span-4">
                    <span className="text-mirage-800 block mb-2 font-semibold">المقاول</span>
                    <Select
                        className={`w-full !font-cairo`}
                        size='large'
                        placeholder="قم باختيار المقاول"
                        defaultValue={watch("contractor_id")}
                        onChange={value => setValue("contractor_id", value, { shouldValidate: true })}
                        options={supervisors.data.map((el, index) => ({ label: el.name, value: el.id }))}
                    />
                    {errors.contractor_id && <span className="text-rose-600 block mt-1 italic text-sm">{errors.contractor_id.message}</span>}
                </div>
                <div className="w-full col-span-2 max-md:col-span-4">
                    <span className="text-mirage-800 block mb-2 font-semibold">الموظف المرسل</span>
                    <Select
                        className={`w-full !font-cairo`}
                        size='large'
                        placeholder="قم باختيار الموظف المرسل"
                        defaultValue={watch("employee_id")}
                        value={watch("employee_id")}
                        onChange={value => setValue("employee_id", value, { shouldValidate: true })}
                        options={projectEmployees.map((el, index) => ({ label: el.name, value: el.id }))}
                    />
                    {errors.employee_id && <span className="text-rose-600 block mt-1 italic text-sm">{errors.employee_id.message}</span>}
                </div>
                <div className="w-full col-span-2 max-md:col-span-4">
                    <span className="text-mirage-800 block mb-2 font-semibold">عدد العمالة</span>
                    <input className={`w-full bg-white `} type="text" name="count_of_workers" placeholder="قم بكتابة عدد العمالة" {...register("count_of_workers")} />
                    {errors.count_of_workers && <span className="text-rose-600 block mt-1 italic text-sm">{errors.count_of_workers.message}</span>}
                </div>
                <BaseButton className={"col-span-2"} title={"اضافة مهمة جديدة"} isLoading={loading} />
                <NavLink to="/tasks-list" className='main-btn !bg-white !text-primary-400 col-span-2 transition-all ease-out hover:!bg-gray-50'>الغاء</NavLink>
            </form>
        </div>
    )
}

export default TasksAdd