import { yupResolver } from '@hookform/resolvers/yup'
import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import BaseButton from '../UI/BaseButton'
import { AnimatePresence, motion } from 'framer-motion'
import { getEmployeesBelongToProject } from '../../store/slices/employeesSlice'
import { getProjects, getProjectStages } from '../../store/slices/projectsSlice'
import { Icon } from '@iconify/react/dist/iconify.js'
import { getSupervisors } from '../../store/slices/supervisorsSlice'
import { updateTask } from '../../store/slices/tasksSlice'
import { projectStatus } from '../../constants'
import Loader from '../UI/Loader'


const EditTask = ({ className, btnTitle, itemObj }) => {
    const dispatch = useDispatch()
    const [togglePopup, setTogglePopup] = useState(false)
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
            status: "",
            count_of_workers: "",
            contractor_id: null,
            project_id: null,
            stage_id: null,
            employee_id: null,
        }
    })

    const handleClose = (e) => {
        e.preventDefault()
        setTogglePopup(false)
    }

    const onSuccess = async (data) => {
        const response = await dispatch(updateTask({ id: itemObj.id, taskData: data }))
        if (updateTask.fulfilled.match(response)) setTogglePopup(false)
    }

    const onSubmit = handleSubmit(onSuccess)


    useEffect(() => {
        if (itemObj) {
            reset({
                name: itemObj.name,
                desc: itemObj.desc,
                status: itemObj.status,
                count_of_workers: itemObj.count_of_workers,
                contractor_id: +itemObj.contractor_id,
                project_id: +itemObj.project_id,
                stage_id: +itemObj.stage_id,
                employee_id: +itemObj.user_id,
            });
            dispatch(getEmployeesBelongToProject(itemObj.project_id))
            dispatch(getProjectStages(itemObj.project_id))
        }
    }, [itemObj, togglePopup, dispatch])

    useEffect(() => {
        dispatch(getProjects())
        dispatch(getSupervisors())
    }, [dispatch])


    return (
        <div>
            <button className={`flex justify-center transition-all ease-out items-center text-primary-400 hover:text-primary-300 ${className}`}
                onClick={() => setTogglePopup(true)}>
                <Icon icon="tdesign:edit" fontSize={22} />
                {btnTitle && <span>{btnTitle}</span>}
            </button>
            <AnimatePresence>
                {
                    togglePopup &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: "easeOut", duration: 0.1 }}
                        className="overlay grid place-items-center py-5"
                    >
                        <motion.form
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ ease: "easeOut", duration: 0.1 }}
                            onSubmit={onSubmit}
                            className='box bg-white shadow-md rounded-lg p-6 w-[750px] min-h-[450px] max-h-[750px] grid grid-cols-4 gap-4 overflow-auto'
                        >
                            {
                                (projects && supervisors && projectEmployees)
                                    ?
                                    <>
                                        <h2 className='font-bold text-2xl text-primary-400 mb-6 text-center col-span-4'>تعديل بيانات المهمة</h2>
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
                                            <Select
                                                className={`w-full !font-cairo`}
                                                size='large'
                                                placeholder="قم باختيار المرحلة"
                                                defaultValue={watch("stage_id")}
                                                value={watch("stage_id")}
                                                onChange={value => setValue("stage_id", value, { shouldValidate: true })}
                                                options={stages.map(el => ({ label: el.name, value: el.id }))}
                                            />
                                            {errors.stage_id && <span className="text-rose-600 block mt-1 italic text-sm">{errors.stage_id.message}</span>}
                                        </div>
                                        <div className="w-full col-span-4">
                                            <span className="text-mirage-800 block mb-2 font-semibold">حالة المشروع</span>
                                            <Select
                                                className={`w-full !font-cairo`}
                                                size='large'
                                                placeholder="قم باختيار حالة المشروع"
                                                value={watch("status")}
                                                onChange={value => setValue("status", value)}
                                                options={projectStatus}
                                            />
                                            {errors.status && <span className="text-rose-600 block mt-1 italic text-sm">{errors.status.message}</span>}
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
                                        <BaseButton className={"col-span-2"} title={"تعديل"} isLoading={loading} />
                                        <button onClick={handleClose} className='main-btn !bg-gray-200 !text-black col-span-2 transition-all ease-out hover:!bg-gray-100'>الغاء</button>
                                    </>
                                    :
                                    <Loader />
                            }
                        </motion.form>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default EditTask