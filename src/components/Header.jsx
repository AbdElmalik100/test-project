import UserProfile from './UserProfile'
import MobileSideBar from './MobileSideBar'
import { useLocation, useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'


const Header = () => {
    const location = useLocation()
    const params = useParams()
    
    const [header, setHeader] = useState('/')
    
    useEffect(() => {        
        switch (location.pathname) {
            case '/projects-list':
                setHeader("قائمة المشاريع")
                break;
            case `/projects-list/${params.id}`:
                setHeader("تفاصيل المشروع")
                break;
            case '/projects-add':
                setHeader("انشاء المشاريع")
                break;
            case '/tasks-list':
                setHeader("قائمة المهام")
                break;
            case `/tasks-list/${params.id}`:
                setHeader("تفاصيل المهمة")
                break;
            case '/tasks-add':
                setHeader("انشاء المهام")
                break;
            case '/employees-list':
                setHeader("قائمة الموظفين")
                break;
            case `/employees-list/${params.id}`:                
                setHeader("تفاصيل الموظف")
                break;
            case '/employees-add':
                setHeader("اضافة الموظفين")
                break;
            case '/employees-permission':
                setHeader("الصلاحيات")
                break;
            case '/supervisors-list':
                setHeader("قائمة المقاولين")
                break;
            case `/supervisors-list/${params.id}`:
                setHeader("تفاصيل المقاول")
                break;
            case '/supervisors-add':
                setHeader("اضافة المقاولين")
                break;
            case '/permissions':
                setHeader("الصلاحيات")
                break;
            case '/reports':
                setHeader("التقارير")
                break;
            case '/settings':
                setHeader("الاعدادات")
                break;
            default:
                setHeader("الرئيسية")
                break;
        }
    }, [location.pathname])
    return (
        <header className='flex items-center gap-10 max-lg:gap-2 justify-between'>
            <h1 className='text-primary-400 font-bold text-3xl'>{header}</h1>
            <MobileSideBar />
            <UserProfile />
        </header>
    )
}

export default Header