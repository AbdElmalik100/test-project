import { Icon } from '@iconify/react/dist/iconify.js'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import BaseButton from '../UI/BaseButton'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { getEmployees } from '../../store/slices/employeesSlice'
import { Select } from 'antd'
import { projectStatus } from '../../constants'
import { updateProject } from '../../store/slices/projectsSlice'


const EditProject = ({ className, btnTitle, itemObj }) => {
    const dispatch = useDispatch()
    const [togglePopup, setTogglePopup] = useState(false)
    const { employees } = useSelector(state => state.employees)
    const { loading } = useSelector(state => state.projects)
    const [employeesOtions, setEmployeesOptions] = useState([])
    const [employeesSelection, setEmployeesSelection] = useState(itemObj.employees.map(el => el.id))
    
    const validationSchema = yup.object({
        name: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        desc: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        address: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        status: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
    })

    const { register, setValue, watch, getValues, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: "",
            desc: "",
            address: "",
            status: "",
            employees: [],
        }
    })

    const handleClose = (e) => {
        e.preventDefault()
        setTogglePopup(false)
    }

    const handleAddEmployee = (e) => {
        e.preventDefault()
        const updatedEmployees = [...employeesSelection, employeesOtions[0].value]
        setEmployeesSelection(updatedEmployees)
        setValue("employees", updatedEmployees)
    }
    const handleChangeEmployee = (value, index) => {
        const updatedEmployees = employeesSelection.map((el, indx) => indx === index ? value : el)
        setEmployeesSelection(updatedEmployees)
        setValue("employees", updatedEmployees)
    }
    const handleDeleteEmployee = (index) => {
        const updatedEmployees = employeesSelection.filter((_, indx) => index !== indx)
        setEmployeesSelection(updatedEmployees)
        setValue("employees", updatedEmployees)
    }


    const onSuccess = async (data) => {
        const response = await dispatch(updateProject({id: itemObj.id, projectData: data}))
        if (updateProject.fulfilled.match(response)) setTogglePopup(false)
    }

    const onSubmit = handleSubmit(onSuccess)

    useEffect(() => {
        if (itemObj) {
            reset({
                name: itemObj.name, 
                desc: itemObj.desc, 
                address: itemObj.address, 
                status: itemObj.status, 
                employees: itemObj.employees.map(el => el.id)
            });
            setEmployeesSelection(itemObj.employees.map(el => el.id)); // Update employees selection            
        }
    }, [itemObj, togglePopup])

    useEffect(() => {
        if (employees) {
            const options = employees.data.map((el, index) => ({ label: el.name, value: el.id }))
            setEmployeesOptions(options)
        }
    }, [employees])

    useEffect(() => {
        dispatch(getEmployees())   
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
                            className='box bg-white shadow-md rounded-lg p-6 w-[750px] max-h-[750px] grid grid-cols-4 gap-4 overflow-auto'
                                >
                            <h2 className='font-bold text-2xl text-primary-400 mb-6 text-center col-span-4'>تعديل بيانات المشروع</h2>
                            <div className="w-full col-span-2 max-md:col-span-4">
                                <span className="text-mirage-800 block mb-2 font-semibold">اسم المشروع</span>
                                <input className={`w-full bg-white `} type="text" name="name" placeholder="قم بكتابة اسم المشروع" {...register("name")} />
                                {errors.name && <span className="text-rose-600 block mt-1 italic text-sm">{errors.name.message}</span>}
                            </div>
                            <div className="w-full col-span-2 max-md:col-span-4">
                                <span className="text-mirage-800 block mb-2 font-semibold">وصف المشروع</span>
                                <input className={`w-full bg-white `} type="text" name="desc" placeholder="قم بكتابة وصف المشروع" {...register("desc")} />
                                {errors.desc && <span className="text-rose-600 block mt-1 italic text-sm">{errors.desc.message}</span>}
                            </div>
                            <div className="w-full col-span-4">
                                <span className="text-mirage-800 block mb-2 font-semibold">موقع المشروع</span>
                                <input className={`w-full bg-white `} type="text" name="address" placeholder="قم بكتابة موقع المشروع" {...register("address")} />
                                {errors.address && <span className="text-rose-600 block mt-1 italic text-sm">{errors.address.message}</span>}
                            </div>
                            <div className="w-full col-span-4">
                                <span className="text-mirage-800 block mb-2 font-semibold">حالة المشروع</span>
                                <Select
                                    className={`w-full !font-cairo`}
                                    size='large'
                                    placeholder="قم باختيار حالة المشروع"
                                    value={ watch("status") }
                                    onChange={value => setValue("status", value)}
                                    options={projectStatus}
                                />
                                {errors.status && <span className="text-rose-600 block mt-1 italic text-sm">{errors.status.message}</span>}
                            </div>
                            <h3 className='text-primary-400 font-semibold mb-4 text-xl col-span-4'>مشرفين المشروع</h3>
                            <div className="w-full col-span-4">
                                <span className="text-mirage-800 block mb-2 font-semibold">الموظف</span>
                                {
                                    employeesSelection.map((el, index) => (
                                        <div key={index} className="flex justify-between gap-4 mt-2">
                                            <Select
                                                key={index}
                                                className={`w-full !font-cairo`}
                                                size='large'
                                                placeholder="قم باختيار الموظف"
                                                value={el}
                                                onChange={value => handleChangeEmployee(value, index)}
                                                options={employeesOtions}
                                            />
                                            {
                                                index > 0 &&
                                                <button className="text-rose-400 transition-all ease-out hover:text-rose-300 p-2 bg-rose-50 rounded-lg"
                                                    onClick={() => handleDeleteEmployee(index)}>
                                                    <Icon icon="meteor-icons:trash" fontSize={22} />
                                                </button>
                                            }
                                        </div>
                                    ))
                                }
                                {errors.employees && <span className="text-rose-600 block mt-1 italic text-sm">{errors.employees.message}</span>}
                            </div>
                            <div className='col-span-4'>
                                <button className='main-btn !bg-black text-sm hover:!bg-gray-800 flex items-center gap-2'
                                    onClick={handleAddEmployee}>
                                    <Icon icon="akar-icons:plus" fontSize={20} />
                                    <span>اضافة موظف جديد</span>
                                </button>
                            </div>
                            <BaseButton className={"col-span-2"} title={"تعديل"} isLoading={loading} />
                            <button onClick={handleClose} className='main-btn !bg-gray-200 !text-black col-span-2 transition-all ease-out hover:!bg-gray-100'>الغاء</button>
                        </motion.form>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default EditProject