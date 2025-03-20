import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import AuthHeader from '../../components/AuthSections/AuthHeader'
import BaseButton from '../../components/UI/BaseButton'
import { useNavigate, useSearchParams } from 'react-router'
import { changePassword } from '../../store/slices/userSlice'

const SetPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading } = useSelector(state => state.users)
    const [searchParams, setSearchParams] = useSearchParams()
    
    const validationSchema = yup.object({
        password: yup
            .string()
            .required("هذا الحقل لا يجب ان يكون فارغا"),
        password_confirmation: yup
            .string()
            .required("هذا الحقل لا يجب ان يكون فارغا")
            .equals([yup.ref("password")], "تأكيد كلمة المرور غير متطابق")
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            password: "",
            password_confirmation: ""
        }
    })

    const onSuccess = async (data) => {
        console.log(data);
        const changePasswordData = {
            ...data,
            otp: searchParams.get("otp"),
            email: searchParams.get("email"),
        }
        console.log(changePasswordData);
        const response = await dispatch(changePassword(changePasswordData))
        if (changePassword.fulfilled.match(response)) navigate('/login')
    }

    const onSubmit = handleSubmit(onSuccess)

    return (
        <section className="set-password grid place-items-center w-full p-10">
            <div className="w-3/4 max-md:w-full">
                <AuthHeader title={"تعيين كلمة المرور الجديدة"} desc={"مرحبا بعودتك! برجاء تسجيل بياناتك"} />
                <form className="mt-8 flex flex-col gap-6" onSubmit={onSubmit}>
                    <div className="w-full">
                        <span className="text-mirage-800 block mb-2">كلمة المرور الجديدة</span>
                        <input className={`w-full ${(errors.password || errors.password_confirmation) && 'error'}`} type="password" name="password" placeholder="ادخل كلمة المرور" {...register("password")} />
                        {errors.password && <span className="text-rose-600 block mt-1 italic text-sm">{errors.password.message}</span>}
                    </div>
                    <div className="w-full">
                        <span className="text-mirage-800 block mb-2">تأكيد كلمة المرور الجديدة</span>
                        <input className={`w-full ${errors.password_confirmation && 'error'}`} type="password" name="password_confirmation" placeholder="قم بتأكيد كلمة المرور" {...register("password_confirmation")} />
                        {errors.password_confirmation && <span className="text-rose-600 block mt-1 italic text-sm">{errors.password_confirmation.message}</span>}
                    </div>
                    <BaseButton title={"تأكيد"} />
                </form>
            </div>
        </section>
    )
}

export default SetPassword