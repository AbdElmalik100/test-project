import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { updatePassword } from '../../store/slices/userSlice'
import BaseButton from '../UI/BaseButton'
import { NavLink } from 'react-router'

const SecuritySetting = () => {
    const dispatch = useDispatch()
    const { updateLoading } = useSelector(state => state.users)

    const validationSchema = yup.object({
        old_password: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        password: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        password_confirmation: yup.string().required("هذا الحقل لا يجب ان يكون فارغا").equals([yup.ref("password")], "تأكيد كلمة المرور غير متطابق"),
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            old_password: "",
            password: "",
            password_confirmation: "",
        }
    })


    const onSuccess = async (data) => {
        const response = await dispatch(updatePassword(data))
        if(updatePassword.fulfilled.match(response)) reset()
    }

    const onSubmit = handleSubmit(onSuccess)

    return (
        <form className='mt-6 grid grid-cols-4 gap-6' onSubmit={onSubmit}>
            <div className="w-full col-span-4">
                <span className="text-mirage-800 block mb-2 font-semibold">كلمة المرور القديمة</span>
                <input className={`w-full bg-white `} type="password" name="old_password" placeholder="قم بكتابة كلمة المرور" {...register("old_password")} />
                {errors.old_password && <span className="text-rose-600 block mt-1 italic text-sm">{errors.old_password.message}</span>}
            </div>
            <div className="w-full col-span-2 max-md:col-span-4">
                <span className="text-mirage-800 block mb-2 font-semibold">كلمة المرور الجديدة</span>
                <input className={`w-full bg-white `} type="password" name="password" placeholder="قم بتأكيد كلمة المرور" {...register("password")} />
                {errors.password && <span className="text-rose-600 block mt-1 italic text-sm">{errors.password.message}</span>}
            </div>
            <div className="w-full col-span-2 max-md:col-span-4">
                <span className="text-mirage-800 block mb-2 font-semibold">تأكيد كلمة المرور الجديدة</span>
                <input className={`w-full bg-white `} type="password" name="password_confirmation" placeholder="قم بتأكيد كلمة المرور" {...register("password_confirmation")} />
                {errors.password_confirmation && <span className="text-rose-600 block mt-1 italic text-sm">{errors.password_confirmation.message}</span>}
            </div>
            <BaseButton className={"col-span-2"} title={"تعديل"} isLoading={updateLoading} />
            <NavLink to="/" className='main-btn !bg-white !text-primary-400 col-span-2 transition-all ease-out hover:!bg-gray-50'>الغاء</NavLink>
        </form>)
}

export default SecuritySetting