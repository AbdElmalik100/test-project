import { yupResolver } from '@hookform/resolvers/yup'
import { Icon } from '@iconify/react/dist/iconify.js'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import BaseImageUpload from '../UI/BaseImageUpload'
import PhoneInput from 'react-phone-input-2'
import BaseButton from '../UI/BaseButton'
import { Select } from 'antd'
import { getRoles } from '../../store/slices/rolesSlice'
import { updateEmployee } from '../../store/slices/employeesSlice'



const EditEmployee = ({ className, btnTitle, itemObj }) => {
    const dispatch = useDispatch()
    const [togglePopup, setTogglePopup] = useState(false)
    const { roles } = useSelector(state => state.roles)
    const { loading } = useSelector(state => state.employees)


    const validationSchema = yup.object({
        name: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        phone: yup.string().required("هذا الحقل لا يجب ان يكون فارغا").min(10, "رقم الهاتف غير صحيح").max(15, "رقم الهاتف غير صحيح"),
        email: yup.string().required("هذا الحقل لا يجب ان يكون فارغا").email("البريد الالكتروني غير صحيح"),
        address: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        role_id: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        // password: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        // password_confirmation: yup.string().required("هذا الحقل لا يجب ان يكون فارغا").equals([yup.ref("password")], "تأكيد كلمة المرور غير متطابق"),
        image: yup.mixed()
            .required("هذا الحقل لا يجب ان يكون فارغا")
            .test("file size", "يجب علي الصوره ان تكون اقل من 7 ميجا", (value) => typeof value !== 'string' ? value.size <= (1024 * 1024 * 7) : true), // Value <= 7MB
        id_image: yup.mixed()
            .required("هذا الحقل لا يجب ان يكون فارغا")
            .test("file size", "يجب علي الصوره ان تكون اقل من 7 ميجا", (value) => typeof value !== 'string' ? value.size <= (1024 * 1024 * 7) : true), // Value <= 7MB
    })

    const { register, watch, setValue, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            address: "",
            // password: "",
            // password_confirmation: "",
            image: null,
            id_image: null,
            role_id: null,
        }
    })

    const handleClose = (e) => {
        e.preventDefault()
        setTogglePopup(false)
    }

    const onSuccess = async (data) => {
        const formData = new FormData()
        for (let key in data) {
            if (key === 'image' || key === 'id_image') {
                if (data[key] && typeof data[key] === 'object') formData.append(key, data[key]); // Append only if it's an object
            } else formData.append(key, data[key]); // Append all other data
        }
        const response = await dispatch(updateEmployee({ id: itemObj.id, employeeData: formData }))
        if (updateEmployee.fulfilled.match(response)) setTogglePopup(false)
    }

    const onSubmit = handleSubmit(onSuccess)

    useEffect(() => {
        if (itemObj) {            
            reset({
                name: itemObj.name,
                phone: itemObj.phone,
                address: itemObj.address,
                email: itemObj.email,
                // password: itemObj.password,
                // password_confirmation: itemObj.password_confirmation,
                image: itemObj.image,
                id_image: itemObj.id_image,
                role_id: itemObj.roles[0].id,
            });

        }
    }, [itemObj, togglePopup])

    useEffect(() => {
        dispatch(getRoles())
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
                            <h2 className='font-bold text-2xl text-primary-400 mb-6 text-center col-span-4'>تعديل بيانات الموظف</h2>
                            <div className="w-full col-span-2 max-md:col-span-4">
                                <span className="text-mirage-800 block mb-2 font-semibold">اسم الموظف</span>
                                <input className={`w-full bg-white `} type="text" name="name" placeholder="قم بكتابة اسم الموظف" {...register("name")} />
                                {errors.name && <span className="text-rose-600 block mt-1 italic text-sm">{errors.name.message}</span>}
                            </div>
                            <div className="w-full col-span-2 max-md:col-span-4">
                                <span className="text-mirage-800 block mb-2 font-semibold">رقم الهاتف</span>
                                <PhoneInput
                                    containerClass="phone-input"
                                    inputClass={`!rounded-lg ${errors.phone ? 'error' : ''}`}
                                    disableDropdown={false}
                                    country={'sa'}
                                    preferredCountries={["sa", 'eg']}
                                    specialLabel={false}
                                    placeholder="رقم الهاتف"
                                    value={watch("phone")}
                                    onChange={value => setValue("phone", value, { shouldValidate: true })}
                                />
                                {errors.phone && <span className="text-rose-600 block mt-1 italic text-sm">{errors.phone.message}</span>}
                            </div>
                            <div className="w-full col-span-2 max-md:col-span-4">
                                <span className="text-mirage-800 block mb-2 font-semibold">البريد الالكتروني</span>
                                <input className={`w-full bg-white `} type="text" name="email" placeholder="قم بكتابة البريد الالكتروني" {...register("email")} />
                                {errors.email && <span className="text-rose-600 block mt-1 italic text-sm">{errors.email.message}</span>}
                            </div>
                            <div className="w-full col-span-2 max-md:col-span-4">
                                <span className="text-mirage-800 block mb-2 font-semibold">العنوان</span>
                                <input className={`w-full bg-white `} type="text" name="address" placeholder="قم بكتابة العنوان" {...register("address")} />
                                {errors.address && <span className="text-rose-600 block mt-1 italic text-sm">{errors.address.message}</span>}
                            </div>
                            {
                                roles &&
                                <div className="w-full col-span-4">
                                    <span className="text-mirage-800 block mb-2 font-semibold">الدور</span>
                                    <Select
                                        className={`w-full !font-cairo`}
                                        size='large'
                                        placeholder="قم باختيار دور  الموظف"
                                        defaultValue={watch("role_id")}
                                        onChange={value => setValue("role_id", value, { shouldValidate: true })}
                                        options={roles.data.map((el, index) => ({ label: el.name, value: el.id }))}
                                    />
                                    {errors.role_id && <span className="text-rose-600 block mt-1 italic text-sm">{errors.role_id.message}</span>}
                                </div>
                            }
                            {/* <div className="w-full col-span-2 max-md:col-span-4">
                                <span className="text-mirage-800 block mb-2 font-semibold">كلمة المرور</span>
                                <input className={`w-full bg-white `} type="password" name="password" placeholder="قم بكتابة كلمة المرور" {...register("password")} />
                                {errors.password && <span className="text-rose-600 block mt-1 italic text-sm">{errors.password.message}</span>}
                            </div>
                            <div className="w-full col-span-2 max-md:col-span-4">
                                <span className="text-mirage-800 block mb-2 font-semibold">تأكيد كلمة المرور</span>
                                <input className={`w-full bg-white `} type="password" name="password_confirmation" placeholder="قم بتأكيد كلمة المرور" {...register("password_confirmation")} />
                                {errors.password_confirmation && <span className="text-rose-600 block mt-1 italic text-sm">{errors.password_confirmation.message}</span>}
                            </div> */}
                            <div className="w-full col-span-4">
                                <span className="text-mirage-800 block mb-2 font-semibold">صورة شخصية</span>
                                <BaseImageUpload register={register} watch={watch} setValue={setValue} fieldName="image" />
                                {errors.image && <span className="text-rose-600 block mt-1 italic text-sm">{errors.image.message}</span>}
                            </div>
                            <div className="w-full col-span-4">
                                <span className="text-mirage-800 block mb-2 font-semibold">صورة بطاقة الهوية</span>
                                <BaseImageUpload register={register} watch={watch} setValue={setValue} fieldName="id_image" />
                                {errors.id_image && <span className="text-rose-600 block mt-1 italic text-sm">{errors.id_image.message}</span>}
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

export default EditEmployee