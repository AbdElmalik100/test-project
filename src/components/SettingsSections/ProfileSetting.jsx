import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { updateProfile } from '../../store/slices/userSlice'
import { useEffect } from 'react'
import PhoneInput from 'react-phone-input-2'
import BaseButton from '../UI/BaseButton'
import { NavLink } from 'react-router'

const ProfileSetting = () => {
    const dispatch = useDispatch()
    const { user, updateLoading } = useSelector(state => state.users)

    const validationSchema = yup.object({
        name: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        phone: yup.string().required("هذا الحقل لا يجب ان يكون فارغا").min(10, "رقم الهاتف غير صحيح").max(15, "رقم الهاتف غير صحيح"),
        email: yup.string().required("هذا الحقل لا يجب ان يكون فارغا").email("البريد الالكتروني غير صحيح"),
        address: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
    })

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            address: "",
        }
    })


    const onSuccess = (data) => {
        dispatch(updateProfile(data))
    }

    const onSubmit = handleSubmit(onSuccess)

    useEffect(() => {
        if (user) {
            setValue('name', user.name)
            setValue('phone', user.phone)
            setValue('email', user.email)
            setValue('address', user.address)
        }
    }, [user])
    return (
        <form className='mt-6 grid grid-cols-4 gap-6' onSubmit={onSubmit}>
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
            <BaseButton className={"col-span-2"} title={"تعديل"} isLoading={updateLoading} />
            <NavLink to="/" className='main-btn !bg-white !text-primary-400 col-span-2 transition-all ease-out hover:!bg-gray-50'>الغاء</NavLink>
        </form>
    )
}

export default ProfileSetting