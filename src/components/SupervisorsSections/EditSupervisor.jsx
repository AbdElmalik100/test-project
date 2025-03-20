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
import { updateSupervisor } from '../../store/slices/supervisorsSlice'

const EditSupervisor = ({ className, btnTitle, itemObj }) => {
    const dispatch = useDispatch()
    const [togglePopup, setTogglePopup] = useState(false)
    const { loading } = useSelector(state => state.supervisors)

    const validationSchema = yup.object({
        name: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        phone: yup.string().required("هذا الحقل لا يجب ان يكون فارغا").min(10, "رقم الهاتف غير صحيح").max(15, "رقم الهاتف غير صحيح"),
        address: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        type_of_work: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        count_of_workers: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        total_contract: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        image: yup.mixed()
            .required("هذا الحقل لا يجب ان يكون فارغا")
            .test("file size", "يجب علي الصوره ان تكون اقل من 7 ميجا", (value) => typeof value !== 'string' ? value.size <= (1024 * 1024 * 7) : true), // Value <= 7MB
    })

    const { register, watch, setValue, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: "",
            phone: "",
            address: "",
            type_of_work: null,
            count_of_workers: "",
            total_contract: "",
            image: null,
        }
    })

    const handleClose = (e) => {
        e.preventDefault()
        setTogglePopup(false)
    }

    const onSuccess = async (data) => {
        const formData = new FormData()
        for (let key in data) {
            if (key === 'image') {
                if (data[key] && typeof data[key] === 'object') formData.append(key, data[key]); // Append only if it's an object
            } else formData.append(key, data[key]); // Append all other data
        }
        const response = await dispatch(updateSupervisor({id: itemObj.id, supervisorData: formData}))
        if (updateSupervisor.fulfilled.match(response)) setTogglePopup(false)
    }

    const onSubmit = handleSubmit(onSuccess)


    useEffect(() => {
        if (itemObj) {
            reset({
                name: itemObj.name,
                phone: itemObj.phone,
                address: itemObj.address,
                type_of_work: itemObj.type_of_work,
                count_of_workers: itemObj.count_of_workers,
                total_contract: itemObj.total_contract,
                image: itemObj.image,
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
                            className='box bg-white shadow-md rounded-lg p-6 w-[750px] max-h-[750px] grid grid-cols-4 gap-4 overflow-auto'
                        >
                            <h2 className='font-bold text-2xl text-primary-400 mb-6 text-center col-span-4'>تعديل بيانات المقاول</h2>
                            <div className="w-full col-span-2 max-md:col-span-4">
                                <span className="text-mirage-800 block mb-2 font-semibold">اسم المقاول</span>
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
                            <div className="w-full col-span-4">
                                <span className="text-mirage-800 block mb-2 font-semibold">العنوان</span>
                                <input className={`w-full bg-white `} type="text" name="address" placeholder="قم بكتابة العنوان" {...register("address")} />
                                {errors.address && <span className="text-rose-600 block mt-1 italic text-sm">{errors.address.message}</span>}
                            </div>
                            <div className="w-full col-span-4">
                                <span className="text-mirage-800 block mb-2 font-semibold">صورة شخصية</span>
                                <BaseImageUpload register={register} watch={watch} setValue={setValue} fieldName="image" />
                                {errors.image && <span className="text-rose-600 block mt-1 italic text-sm">{errors.image.message}</span>}
                            </div>
                            <h3 className='text-primary-400 font-semibold mb-4 text-xl col-span-4'>تفاصيل التعاقد</h3>
                            <div className="w-full col-span-2 max-md:col-span-4">
                                <span className="text-mirage-800 block mb-2 font-semibold">نوع الاعمال</span>
                                <input className={`w-full bg-white `} type="text" name="type_of_work" placeholder="قم بكتابة نوع الاعمال" {...register("type_of_work")} />
                                {errors.type_of_work && <span className="text-rose-600 block mt-1 italic text-sm">{errors.type_of_work.message}</span>}
                            </div>
                            <div className="w-full col-span-2 max-md:col-span-4">
                                <span className="text-mirage-800 block mb-2 font-semibold">عدد العمالة</span>
                                <input className={`w-full bg-white `} type="text" name="count_of_workers" placeholder="قم بكتابة عدد العمالة" {...register("count_of_workers")} />
                                {errors.count_of_workers && <span className="text-rose-600 block mt-1 italic text-sm">{errors.count_of_workers.message}</span>}
                            </div>
                            <div className="w-full col-span-4">
                                <span className="text-mirage-800 block mb-2 font-semibold">الاجمالي التعاقدي وفقا للعقد</span>
                                <input className={`w-full bg-white `} type="text" name="total_contract" placeholder="قم بكتابة الاجمالي" {...register("total_contract")} />
                                {errors.total_contract && <span className="text-rose-600 block mt-1 italic text-sm">{errors.total_contract.message}</span>}
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

export default EditSupervisor