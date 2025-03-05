import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import AuthHeader from '../../components/AuthSections/AuthHeader'
import BaseButton from '../../components/UI/BaseButton'

const SetPassword = () => {
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.users)
    
    const validationSchema = yup.object({
        password: yup
            .string()
            .required("هذا الحقل لا يجب ان يكون فارغا"),
        confirmPassword: yup
            .string()
            .required("هذا الحقل لا يجب ان يكون فارغا")
            .equals([yup.ref("password")], "تأكيد كلمة المرور غير متطابق")
    })

    const { register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })

    const onSuccess = (data) => {
        console.log(data);
    } 

    const onSubmit = handleSubmit(onSuccess)

    return (
        <section className="set-password grid place-items-center w-full p-10">
            <div className="w-3/4 max-md:w-full">
                <AuthHeader title={"تعيين كلمة المرور الجديدة"} desc={"مرحبا بعودتك! برجاء تسجيل بياناتك"} />
                <form className="mt-8 flex flex-col gap-6" onSubmit={onSubmit}>
                    <div className="w-full">
                        <span className="text-mirage-800 block mb-2">كلمة المرور الجديدة</span>
                        <input className={`w-full ${(errors.password || errors.confirmPassword) && 'error'}`} type="password" name="password" placeholder="ادخل البريد الالكتروني" {...register("password")} />
                        {errors.password && <span className="text-rose-600 block mt-1 italic text-sm">{errors.password.message}</span>}
                    </div>
                    <div className="w-full">
                        <span className="text-mirage-800 block mb-2">تأكيد كلمة المرور الجديدة</span>
                        <input className={`w-full ${errors.confirmPassword && 'error'}`} type="password" name="confirm password" placeholder="ادخل كلمة المرور" {...register("confirmPassword")} />
                        {errors.confirmPassword && <span className="text-rose-600 block mt-1 italic text-sm">{errors.confirmPassword.message}</span>}
                    </div>
                    <BaseButton title={"تأكيد"} isLoading={loading}/>
                </form>
            </div>
        </section>
    )
}

export default SetPassword