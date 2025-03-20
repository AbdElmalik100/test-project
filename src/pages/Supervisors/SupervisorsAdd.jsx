import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import BaseImageUpload from '../../components/UI/BaseImageUpload'
import BaseButton from '../../components/UI/BaseButton'
import { NavLink, useNavigate } from 'react-router'
import { createSupervisor } from '../../store/slices/supervisorsSlice'
import { hasPermission } from '../../utils'

const SupervisorsAdd = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.users)
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
            .test("file size", "يجب علي الصوره ان تكون اقل من 7 ميجا", (value) => value && value.size <= (1024 * 1024 * 7)), // Value <= 7MB
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

    const onSuccess = async (data) => {
        const formData = new FormData()
        for (let key in data) formData.append(key, data[key])        
        const response = await dispatch(createSupervisor(formData))        
        if (createSupervisor.fulfilled.match(response)) {
            hasPermission(user, "عرض المقاولين") ? navigate(`/supervisors-list/${response.payload.contractor.id}`) : reset()
        }
    }

    const onSubmit = handleSubmit(onSuccess)


    return (
        <div className='mt-10'>
            <form className='grid grid-cols-4 gap-6' onSubmit={onSubmit}>
                <h3 className='text-primary-400 font-semibold mb-4 text-xl col-span-4'>تفاصيل المقاول</h3>
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

                <BaseButton className={"col-span-2"} title={"اضافة مقاول جديد"} isLoading={loading} />
                <NavLink to="/supervisors-list" className='main-btn !bg-white !text-primary-400 col-span-2 transition-all ease-out hover:!bg-gray-50'>الغاء</NavLink>
            </form>
        </div>
    )
}

export default SupervisorsAdd