import { yupResolver } from '@hookform/resolvers/yup'
import { Checkbox } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import BaseButton from '../UI/BaseButton'
import { useClickAway } from '@uidotdev/usehooks'
import { createRole } from '../../store/slices/rolesSlice'

const PermissionAddPopup = ({ title }) => {
    const [openPopup, setOpenPopup] = useState(false)
    const dispatch = useDispatch()
    const { roles, loading } = useSelector(state => state.roles)

    const popupRef = useClickAway(() => setOpenPopup(false))

    const handleClose = (e) => {
        e.preventDefault()
        setOpenPopup(false)
    }

    const validationSchema = yup.object({
        name: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        permissions: yup.array().min(1, "يجب اختيار صلاحية واحده علي الاقل")
    })

    const { register, setValue, getValues,  handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: "",
            permissions: []
        }
    })

    
    const onChange = (e, id) => {
        if (e.target.checked) setValue("permissions", [...getValues("permissions"), id])
        else setValue("permissions", getValues("permissions").filter(el => el !== id))
    };
    
    const onSuccess = async (data, event) => {
        event.preventDefault()
        const formData = new FormData()
        for (let key in data) {
            if (key === 'permissions') {
                data[key].forEach(el => formData.append(`${key}[]`, el)) 
            } else formData.append(key, data[key])
        }
        const response = await dispatch(createRole(formData))
        if (createRole.fulfilled.match(response)) {
            reset()
            setOpenPopup(false)
        }
    }

    const onSubmit = handleSubmit(onSuccess)

    useEffect(() => reset(), [openPopup])

    return (
        roles &&
        <div>
            <button className='main-btn font-cairo' onClick={() => setOpenPopup(true)}>{title}</button>
            <AnimatePresence>
                {
                    openPopup &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: "easeOut", duration: 0.1 }}
                        className="overlay grid place-items-center"
                    >
                        <motion.form
                            ref={popupRef}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ ease: "easeOut", duration: 0.1 }}
                            onSubmit={onSubmit}
                            className='box bg-white shadow-md rounded-lg p-6 w-[750px]'
                        >
                            <h2 className='font-bold text-2xl text-primary-400 mb-6 text-center'>اضافة الصلاحيات</h2>
                            <div className="w-full my-6">
                                <span className="text-mirage-800 block mb-2 font-semibold">الدور</span>
                                <input className={`w-full bg-white `} type="text" name="name" placeholder="قم بكتابة اسم الموظف" {...register("name")} />
                                {errors.name && <span className="text-rose-600 block mt-1 italic text-sm">{errors.name.message}</span>}
                            </div>
                            <div className='my-6'>
                                <span className="text-mirage-800 block mb-2 font-semibold">الصلاحيات</span>
                                <div className='grid grid-cols-4 gap-4'>
                                    {
                                        roles.data[0].permissions.map((permission, index) => (
                                            <Checkbox key={index} onChange={(event) => onChange(event, permission.id)}>{permission.display_name}</Checkbox>
                                        ))
                                    }
                                </div>
                                {errors.permissions && <span className="text-rose-600 block mt-1 italic text-sm">{errors.permissions.message}</span>}
                            </div>
                            <div className='flex items-center gap-2 '>
                                <BaseButton className={"col-span-2"} title={"اضافة صلاحية جديد"} isLoading={loading} />
                                <button onClick={handleClose} className='main-btn !bg-gray-200 !text-black col-span-2 transition-all ease-out hover:!bg-gray-100'>الغاء</button>
                            </div>
                        </motion.form>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default PermissionAddPopup