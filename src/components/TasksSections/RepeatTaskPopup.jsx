import { Icon } from "@iconify/react/dist/iconify.js"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSupervisors } from "../../store/slices/supervisorsSlice"
import { getProjects } from "../../store/slices/projectsSlice"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { useForm } from "react-hook-form"
import { Select } from "antd"
import BaseButton from "../UI/BaseButton"
import { repeatTask } from "../../store/slices/tasksSlice"

const RepeatTaskPopup = ({ task }) => {
    const dispatch = useDispatch()
    const [togglePopup, setTogglePopup] = useState(false)
    const { projects } = useSelector(state => state.projects)
    const { supervisors } = useSelector(state => state.supervisors)
    const { loading } = useSelector(state => state.tasks)

    const validationSchema = yup.object({
        contractor_id: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        project_id: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
    })

    const { watch, setValue, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            count_of_workers: task.count_of_workers,
            contractor_id: null,
            project_id: null,
            employee_id: task.employee.id,
        }
    })
    const handleClose = (event) => {
        event.preventDefault()
        setTogglePopup(false)
    }

    const onSuccess = async (data, event) => {
        event.preventDefault()
        const response = await dispatch(repeatTask({ id: task.id, taskData: data }))
        if (repeatTask.fulfilled.match(response)) setTogglePopup(false)
    }

    const onSubmit = handleSubmit(onSuccess)

    useEffect(() => {
        reset()
    }, [togglePopup])

    useEffect(() => {
        dispatch(getProjects())
        dispatch(getSupervisors())
    }, [dispatch])
    return (
        <div>
            <button className={`main-btn !bg-black hover:!bg-gray-700`}
                onClick={() => setTogglePopup(true)}>
                <Icon icon="bi:arrow-repeat" fontSize={22} />
                <span>تكرار</span>
            </button>
            <AnimatePresence>
                {
                    (togglePopup && projects && supervisors) &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: "easeOut", duration: 0.1 }}
                        className='overlay grid place-items-center'
                    >
                        <motion.form
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ ease: "easeOut", duration: 0.1 }}
                            onSubmit={onSubmit}
                            className='box rounded-lg shadow-md bg-white p-6 w-[450px] flex flex-col gap-8'
                        >
                            <h2 className="text-2xl font-bold text-center">تكرار المهمة</h2>

                            <div className="w-full">
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
                            <div className="w-full">
                                <span className="text-mirage-800 block mb-2 font-semibold">المشروع</span>
                                <Select
                                    className={`w-full !font-cairo`}
                                    size='large'
                                    placeholder="قم باختيار المشروع"
                                    defaultValue={watch("project_id")}
                                    onChange={(value, index) => setValue("project_id", value, { shouldValidate: true })}
                                    options={projects.data.map((el, index) => ({ label: el.name, value: el.id }))}
                                />
                                {errors.project_id && <span className="text-rose-600 block mt-1 italic text-sm">{errors.project_id.message}</span>}
                            </div>
                            <div className=' flex items-center gap-2'>
                                <BaseButton className="w-full !text-white" title={"تكرار"} isLoading={loading} />
                                <button className='main-btn !bg-gray-200 w-full !text-black hover:!bg-gray-100'
                                    onClick={handleClose}
                                >
                                    الغاء
                                </button>
                            </div>
                        </motion.form>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default RepeatTaskPopup