import { Icon } from '@iconify/react/dist/iconify.js'
import { NavLink, useLocation } from 'react-router'

const Error = () => {
    const location = useLocation();

    return (
        <div className='min-h-screen grid place-items-center'>
            {
                location?.state?.error === 401
                    ?
                    <div className='flex flex-col gap-4 justify-center items-center text-center p-6'>
                        <img src="/images/401 Error Unauthorized-pana.svg" className='w-1/2 max-md:w-full' alt="401 Unauthrozied Image" />
                        <h2 className='font-bold text-2xl'>غير مصرح بالتوجة الي هذه الصفحة</h2>
                        <p className='text-paragrah-color w-2/3 mx-auto max-md:w-full'>
                            انت تحاول الدخول علي صفحة غير مصرح لك بالدخول عليها بالموقع , و هذا ضد القوانين , حاول الرجوع الي الصفحة الرئيسية و التنقل عبر الصفحات المصرح لك بها فقط.
                        </p>
                        <NavLink to="/" className="main-btn">
                            <span>العودة للصفحة الرئيسيه</span>
                            <Icon icon="famicons:arrow-back-outline" fontSize={22} />
                        </NavLink>
                    </div>
                    :
                    <div className='flex flex-col gap-4 justify-center items-center text-center p-6'>
                        <img src="/images/404 error.svg" alt="404 Error Not Found Image" />
                        <h2 className='font-bold text-2xl'>هذه الصفحه غير موجودة</h2>
                        <p className='text-paragrah-color'>
                            انت تحاول الدخول علي صفحة غير موجود بالموقع , برجاء التأكيد من وجهة الصفحة.
                        </p>
                        <NavLink to="/" className="main-btn">
                            <span>العودة للصفحة الرئيسيه</span>
                            <Icon icon="famicons:arrow-back-outline" fontSize={22} />
                        </NavLink>
                    </div>
            }
        </div>
    )
}

export default Error