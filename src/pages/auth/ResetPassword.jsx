import { useForm } from "react-hook-form"
import AuthHeader from "../../components/AuthSections/AuthHeader"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useDispatch, useSelector } from "react-redux"
import BaseButton from "../../components/UI/BaseButton"
import { resetPassword } from "../../store/slices/userSlice"
import { useNavigate } from "react-router"


const ResetPassword = () => {
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.users)
    const navigate = useNavigate()

    const validationSchema = yup.object({
        email: yup
            .string()
            .required("هذا الحقل لا يجب ان يكون فارغا")
            .test("email-or-phone", "البريد الالكتروني أو رقم الهاتف غير صحيح", (value) => {
                if (!value) return false;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex
                const phoneRegex = /^\+?[0-9]{10,15}$/; // Phone number should be 10-15 digits can contain country code e.g. +20
                return emailRegex.test(value) || phoneRegex.test(value);
            }),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            email: ""
        }
    })

    const onSuccess = async (data) => {
        const response = await dispatch(resetPassword(data))
        if (resetPassword.fulfilled.match(response)) navigate(`/set-otp?email=${data.email}`)
    }

    const onSubmit = handleSubmit(onSuccess)

    return (
        <section className="reset-password grid place-items-center w-full p-10">
            <div className="w-3/4 max-md:w-full">
                <AuthHeader title={"إعادة تعيين كلمة المرور"} desc={"مرحبا بعودتك! برجاء تسجيل بياناتك"} />
                <form className="mt-8 flex flex-col gap-6" onSubmit={onSubmit}>
                    <div className="w-full">
                        <span className="text-mirage-800 block mb-2">البريد الألكتروني او رقم الهاتف</span>
                        <input className={`w-full ${errors.email && 'error'}`} type="text" name="email" placeholder="البريد الألكتروني او رقم الهاتف" {...register("email")} />
                        {errors.email && <span className="text-rose-600 block mt-1 italic text-sm">{errors.email.message}</span>}
                    </div>
                    <BaseButton title={"ارسال"} isLoading={loading}/>
                </form>
            </div>
        </section>
    )
}

export default ResetPassword