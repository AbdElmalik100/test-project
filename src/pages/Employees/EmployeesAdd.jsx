import { yupResolver } from '@hookform/resolvers/yup'
import { Select } from 'antd'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import BaseButton from '../../components/UI/BaseButton'
import BaseImageUpload from '../../components/UI/BaseImageUpload'
import { NavLink, useNavigate } from 'react-router'
import { getRoles } from '../../store/slices/rolesSlice'
import { createEmployee } from '../../store/slices/employeesSlice'
import { hasPermission } from '../../utils'



const EmployeesAdd = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.users)
    const { roles } = useSelector(state => state.roles)
    const { loading } = useSelector(state => state.employees)

    const validationSchema = yup.object({
        name: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        phone: yup.string().required("هذا الحقل لا يجب ان يكون فارغا").min(10, "رقم الهاتف غير صحيح").max(15, "رقم الهاتف غير صحيح"),
        email: yup.string().required("هذا الحقل لا يجب ان يكون فارغا").email("البريد الالكتروني غير صحيح"),
        address: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        role_id: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        password: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        password_confirmation: yup.string().required("هذا الحقل لا يجب ان يكون فارغا").equals([yup.ref("password")], "تأكيد كلمة المرور غير متطابق"),
        image: yup.mixed()
            .required("هذا الحقل لا يجب ان يكون فارغا")
            .test("file size", "يجب علي الصوره ان تكون اقل من 7 ميجا", (value) => value && value.size <= (1024 * 1024 * 7)), // Value <= 7MB
        id_image: yup.mixed()
            .required("هذا الحقل لا يجب ان يكون فارغا")
            .test("file size", "يجب علي الصوره ان تكون اقل من 7 ميجا", (value) => value && value.size <= (1024 * 1024 * 7)), // Value <= 7MB
    })

    const { register, watch, setValue, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            address: "",
            password: "",
            password_confirmation: "",
            image: null,
            id_image: null,
            role_id: null,
        }
    })
    
    const onSuccess = async (data) => {
        const formData = new FormData()
        for (let key in data) formData.append(key, data[key])
        const response = await dispatch(createEmployee(formData))
        if (createEmployee.fulfilled.match(response)) {
            hasPermission(user, "عرض الموظفين") ? navigate(`/employees-list/${response.payload.employee.id}`) : reset()
        }
    }

    const onSubmit = handleSubmit(onSuccess)

    useEffect(() => {
        dispatch(getRoles())
    }, [dispatch])

    return (
        <div className='mt-10'>
            <form className='grid grid-cols-4 gap-6' onSubmit={onSubmit}>
                <h3 className='text-primary-400 font-semibold mb-4 text-xl col-span-4'>تفاصيل الموظف</h3>
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
                <div className="w-full col-span-2 max-md:col-span-4">
                    <span className="text-mirage-800 block mb-2 font-semibold">كلمة المرور</span>
                    <input className={`w-full bg-white `} type="password" name="password" placeholder="قم بكتابة كلمة المرور" {...register("password")} />
                    {errors.password && <span className="text-rose-600 block mt-1 italic text-sm">{errors.password.message}</span>}
                </div>
                <div className="w-full col-span-2 max-md:col-span-4">
                    <span className="text-mirage-800 block mb-2 font-semibold">تأكيد كلمة المرور</span>
                    <input className={`w-full bg-white `} type="password" name="password_confirmation" placeholder="قم بتأكيد كلمة المرور" {...register("password_confirmation")} />
                    {errors.password_confirmation && <span className="text-rose-600 block mt-1 italic text-sm">{errors.password_confirmation.message}</span>}
                </div>
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
                <BaseButton className={"col-span-2"} title={"اضافة موظف جديد"} isLoading={loading} />
                <NavLink to="/employees-list" className='main-btn !bg-white !text-primary-400 col-span-2 transition-all ease-out hover:!bg-gray-50'>الغاء</NavLink>
            </form>
        </div>
    )
}

export default EmployeesAdd