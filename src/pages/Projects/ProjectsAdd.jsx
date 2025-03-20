import { yupResolver } from "@hookform/resolvers/yup"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Select } from "antd"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import * as yup from 'yup'
import BaseButton from "../../components/UI/BaseButton"
import { NavLink, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { getEmployees } from "../../store/slices/employeesSlice"
import { createProject } from "../../store/slices/projectsSlice"
import { hasPermission } from "../../utils"



const ProjectsAdd = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.users)
    const { employees } = useSelector(state => state.employees)
    const { loading } = useSelector(state => state.projects)
    const [employeesOtions, setEmployeesOptions] = useState([])
    const [employeesSelection, setEmployeesSelection] = useState([])

    const validationSchema = yup.object({
        name: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        desc: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
        address: yup.string().required("هذا الحقل لا يجب ان يكون فارغا"),
    })

    const { register, setValue, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: "",
            desc: "",
            address: "",
            employees: []
        }
    })

    const handleAddEmployee = (e) => {
        e.preventDefault()
        const updatedEmployees = [...employeesSelection, employeesOtions[0].value]
        setEmployeesSelection(updatedEmployees)
        setValue("employees", updatedEmployees)
    }
    const handleChangeEmployee = (value, index) => {
        const updatedEmployees = employeesSelection.map((el, indx) => indx === index ? value : el)
        setEmployeesSelection(updatedEmployees)
        setValue("employees", updatedEmployees)
    }
    const handleDeleteEmployee = (index) => {
        const updatedEmployees = employeesSelection.filter((_, indx) => index !== indx)
        setEmployeesSelection(updatedEmployees)
        setValue("employees", updatedEmployees)
    }


    const onSuccess = async (data) => {
        const formData = new FormData()
        for (let key in data) {
            if (key === 'employees') {
                data[key].forEach(el => formData.append(`${key}[]`, el)) 
            } else formData.append(key, data[key])
        }
        const response = await dispatch(createProject(formData))
        if (createProject.fulfilled.match(response)) 
        if (createProject.fulfilled.match(response)) {
            if (hasPermission(user, "عرض المشاريع")) {
                navigate(`/projects-list/${response.payload.project.id}`)
            } else {
                reset()
                setEmployeesSelection([employeesOtions[0].value])
            }
        }
    }

    const onSubmit = handleSubmit(onSuccess)


    useEffect(() => {
        if (employees) {
            const options = employees.data.map((el, index) => ({ label: el.name, value: el.id }))
            setEmployeesOptions(options)
            setEmployeesSelection([options[0].value])
        }
    }, [employees])

    useEffect(() => {
        dispatch(getEmployees())
        setValue("employees", employeesSelection)
    }, [dispatch])
    return (
        (employees && employeesOtions.length > 0) &&
        <div className='mt-10'>
            <form className='grid grid-cols-4 gap-6' onSubmit={onSubmit}>
                <h3 className='text-primary-400 font-semibold mb-4 text-xl col-span-4'>تفاصيل المشروع</h3>
                <div className="w-full col-span-2 max-md:col-span-4">
                    <span className="text-mirage-800 block mb-2 font-semibold">اسم المشروع</span>
                    <input className={`w-full bg-white `} type="text" name="name" placeholder="قم بكتابة اسم المشروع" {...register("name")} />
                    {errors.name && <span className="text-rose-600 block mt-1 italic text-sm">{errors.name.message}</span>}
                </div>
                <div className="w-full col-span-2 max-md:col-span-4">
                    <span className="text-mirage-800 block mb-2 font-semibold">وصف المشروع</span>
                    <input className={`w-full bg-white `} type="text" name="desc" placeholder="قم بكتابة وصف المشروع" {...register("desc")} />
                    {errors.desc && <span className="text-rose-600 block mt-1 italic text-sm">{errors.desc.message}</span>}
                </div>
                <div className="w-full col-span-4">
                    <span className="text-mirage-800 block mb-2 font-semibold">موقع المشروع</span>
                    <input className={`w-full bg-white `} type="text" name="address" placeholder="قم بكتابة موقع المشروع" {...register("address")} />
                    {errors.address && <span className="text-rose-600 block mt-1 italic text-sm">{errors.address.message}</span>}
                </div>
                <h3 className='text-primary-400 font-semibold mb-4 text-xl col-span-4'>مشرفين المشروع</h3>
                <div className="w-full col-span-4">
                    <span className="text-mirage-800 block mb-2 font-semibold">الموظف</span>
                    {
                        employeesSelection.map((el, index) => (
                            <div key={index} className="flex justify-between gap-4 mt-2">
                                <Select
                                    key={index}
                                    className={`w-full !font-cairo`}
                                    size='large'
                                    placeholder="قم باختيار الموظف"
                                    value={el}
                                    onChange={value => handleChangeEmployee(value, index)}
                                    options={employeesOtions}
                                />
                                {
                                    index > 0 &&
                                    <button className="text-rose-400 transition-all ease-out hover:text-rose-300 p-2 bg-rose-50 rounded-lg"
                                        onClick={() => handleDeleteEmployee(index)}>
                                        <Icon icon="meteor-icons:trash" fontSize={22} />
                                    </button>
                                }
                            </div>
                        ))
                    }
                    {errors.employees && <span className="text-rose-600 block mt-1 italic text-sm">{errors.employees.message}</span>}
                </div>
                <div className='col-span-4'>
                    <button className='main-btn !bg-black text-sm hover:!bg-gray-800 flex items-center gap-2'
                        onClick={handleAddEmployee}>
                        <Icon icon="akar-icons:plus" fontSize={20} />
                        <span>اضافة موظف جديد</span>
                    </button>
                </div>
                <BaseButton className={"col-span-2"} title={"اضافة مشروع جديدة"} isLoading={loading}/>
                <NavLink to="/projects-list" className='main-btn !bg-white !text-primary-400 col-span-2 transition-all ease-out hover:!bg-gray-50'>الغاء</NavLink>
            </form>
        </div>
    )
}

export default ProjectsAdd