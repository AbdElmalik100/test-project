import { NavLink } from "react-router"
import { Icon } from "@iconify/react";
import AuthHeader from "../../components/AuthSections/AuthHeader";
import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/userSlice";
import BaseButton from "../../components/UI/BaseButton";

const Login = () => {
    const dispatch = useDispatch()
    const { user, loading } = useSelector(state => state.users)

    const validationSchema = yup.object({
        email: yup.string().required("هذا الحقل لا يجب ان يكون فارغا").email("البريد الالكتروني غير صحيح"),
        password: yup.string().required("هذا الحقل لا يجب ان يكون فارغا")
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSuccess = (data) => {
        dispatch(login(data))
    }

    const onSubmit = handleSubmit(onSuccess)


    return (
        <section className="login grid place-items-center w-full p-10">
            <div className="w-3/4 max-md:w-full">
                <AuthHeader title={"تسجيل الدخول"} desc={"مرحبا بعودتك! برجاء تسجيل بياناتك"} />
                <form className="mt-8 flex flex-col gap-6" onSubmit={onSubmit}>
                    <div className="w-full">
                        <span className="text-mirage-800 block mb-2">البريد الالكتروني</span>
                        <input className={`w-full ${errors.password && 'error'}`} type="text" name="email" placeholder="ادخل البريد الالكتروني" {...register("email")} />
                        {errors.email && <span className="text-rose-600 block mt-1 italic text-sm">{errors.email.message}</span>}
                    </div>
                    <div className="w-full">
                        <span className="text-mirage-800 block mb-2">كلمة المرور</span>
                        <input className={`w-full ${errors.password && 'error'}`} type="password" name="password" placeholder="ادخل كلمة المرور" {...register("password")} />
                        {errors.password && <span className="text-rose-600 block mt-1 italic text-sm">{errors.password.message}</span>}
                    </div>
                    <div className=" flex items-center justify-between gap-4">
                        <label className="remember-me flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" name="remember" className="hidden" />
                            <div className="w-6 h-6 transition-all ease-out rounded border-2 border-gray-200 group-has-checked:border-primary-400 flex justify-center items-center">
                                <Icon
                                    icon="material-symbols:check-rounded"
                                    fontSize={20}
                                    className="text-primary-400 opacity-0 group-has-checked:opacity-100 transition-opacity"
                                />
                            </div>
                            <span className="text-paragrah-color">تذكرني</span>
                        </label>
                        <NavLink to='/reset-password' className="text-primary-400 hover:underline">نسيت كلمة المرور؟</NavLink>
                    </div>
                    <BaseButton title={"تسجيل الدخول"} isLoading={loading}/>
                </form>
            </div>
        </section>
    )
}

export default Login