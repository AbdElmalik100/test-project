import { Icon } from '@iconify/react/dist/iconify.js'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import BaseButton from '../../UI/BaseButton'
import { useClickAway } from '@uidotdev/usehooks'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import BaseFileUpload from '../../UI/BaseFileUpload'
import { useDispatch, useSelector } from 'react-redux'
import { createTaskFile } from '../../../store/slices/tasksSlice'



const FileAddPopup = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const [openPopup, setOpenPopup] = useState(false)
    const { loading } = useSelector(state => state.tasks)
    const popupRef = useClickAway(() => setOpenPopup(false))
    
    const validationSchema = yup.object({
        address: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        file: yup.mixed()
            .required("هذا الحقل لا يجب ان يكون فارغا")
            .test("file size", "يجب علي الملف ان يكون اقل من 7 ميجا", (value) => value && value.size <= (1024 * 1024 * 7)), // Value <= 7MB
    })

    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            task_id: "",
            address: "",
            file: null,
        }
    })

    const onSuccess = async (data) => {
        const formData = new FormData()
        for (let key in data) formData.append(key, data[key])
        const response = await dispatch(createTaskFile(formData))
        if(createTaskFile.fulfilled.match(response)) setOpenPopup(false)
    }

    const onSubmit = handleSubmit(onSuccess)

    useEffect(() => {
        reset({
            task_id: params.id,
            address: "",
            file: null,
        })
    }, [openPopup])
    return (
        <div>
            <button className='main-btn !gap-1' onClick={() => setOpenPopup(true)}>
                <Icon icon="ic:round-plus" fontSize={24} />
                <span>اضف ملف</span>
            </button>
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
                            className='box bg-white shadow-md rounded-lg p-6 w-[750px]'
                            onSubmit={onSubmit}
                        >
                            <h2 className='font-bold text-2xl text-primary-400 mb-6 text-center'>اضافة ملف</h2>
                            <div className="w-full my-6">
                                <span className="text-mirage-800 block mb-2 font-semibold">العنوان</span>
                                <input className={`w-full bg-white `} type="text" name="address" placeholder="قم بكتابة العنوان" {...register("address")} />
                                {errors.address && <span className="text-rose-600 block mt-1 italic text-sm">{errors.address.message}</span>}
                            </div>
                            <div className="w-full my-6">
                                <span className="text-mirage-800 block mb-2 font-semibold">الملف</span>
                                <BaseFileUpload fieldName={"file"} register={register} setValue={setValue} watch={watch} />
                                {errors.file && <span className="text-rose-600 block mt-1 italic text-sm">{errors.file.message}</span>}
                            </div>
                            <div className='flex items-center gap-2 '>
                                <BaseButton className={"col-span-2"} title={"اضافة ملف جديد"} isLoading={loading} />
                                <button onClick={() => setOpenPopup(false)} className='main-btn !bg-gray-200 !text-black col-span-2 transition-all ease-out hover:!bg-gray-100'>الغاء</button>
                            </div>
                        </motion.form>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default FileAddPopup