import { yupResolver } from '@hookform/resolvers/yup'
import { Icon } from '@iconify/react/dist/iconify.js'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import BaseButton from '../UI/BaseButton'
import { Checkbox } from 'antd'
import { useClickAway } from '@uidotdev/usehooks'
import { updateRole } from '../../store/slices/rolesSlice'


const EditPermission = ({ className, btnTitle, itemObj }) => {
    const dispatch = useDispatch()
    const [togglePopup, setTogglePopup] = useState(false)
    const { roles, loading } = useSelector(state => state.roles)

    const popupRef = useClickAway(() => setTogglePopup(false))

    const validationSchema = yup.object({
        name: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        permissions: yup.array().min(1, "يجب اختيار صلاحية واحده علي الاقل")
    })

    const { register, setValue, getValues, watch, handleSubmit, reset, formState: { errors } } = useForm({
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

    const handleClose = (e) => {
        e.preventDefault()
        setTogglePopup(false)
    }

    const onSuccess = async (data, event) => {
        event.preventDefault()
        const formData = new FormData()
        for (let key in data) {
            if (key === 'permissions') {
                data[key].forEach(el => formData.append(`${key}[]`, el))
            } else formData.append(key, data[key])
        }
        const response = await dispatch(updateRole({ id: itemObj.id, roleData: formData }))
        if (updateRole.fulfilled.match(response)) setTogglePopup(false)
    }

    const onSubmit = handleSubmit(onSuccess)


    useEffect(() => {
        if (itemObj) {
            reset({
                name: itemObj.name,
                permissions: itemObj.permissions.map(el => el.id),
            });
        }
    }, [itemObj, togglePopup])
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
                            ref={popupRef}
                            className='box bg-white shadow-md rounded-lg p-6 w-[750px] max-h-[750px] grid grid-cols-4 gap-4 overflow-auto'
                        >
                            <h2 className='font-bold text-2xl text-primary-400 mb-6 text-center col-span-4'>تعديل بيانات الصلاحيات</h2>
                            <div className="w-full my-6 col-span-4">
                                <span className="text-mirage-800 block mb-2 font-semibold">الدور</span>
                                <input className={`w-full bg-white `} type="text" name="name" placeholder="قم بكتابة اسم الموظف" {...register("name")} />
                                {errors.name && <span className="text-rose-600 block mt-1 italic text-sm">{errors.name.message}</span>}
                            </div>
                            <div className='my-6 col-span-4'>
                                <span className="text-mirage-800 block mb-2 font-semibold">الصلاحيات</span>
                                <div className='grid grid-cols-4 gap-4'>
                                    {
                                        roles.data[0].permissions.map((permission, index) => (
                                            <Checkbox key={index} onChange={(event) => onChange(event, permission.id)} checked={watch("permissions").includes(permission.id)}>{permission.display_name}</Checkbox>
                                        ))
                                    }
                                </div>
                                {errors.permissions && <span className="text-rose-600 block mt-1 italic text-sm">{errors.permissions.message}</span>}
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

export default EditPermission