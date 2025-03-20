import { NavLink } from 'react-router'
import EmptyData from '../EmptyData'
import FileAddPopup from './TaskFiles/FileAddPopup'
import { Icon } from '@iconify/react/dist/iconify.js'
import DeletePopup from '../UI/DeletePopup'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTaskFile } from '../../store/slices/tasksSlice'

const TaskFiles = () => {
    const dispatch = useDispatch()
    const { task } = useSelector(state => state.tasks)

    const handleDelete = async (fileObj) => {
        const response = await dispatch(deleteTaskFile(fileObj.id))
        return deleteTaskFile.fulfilled.match(response)
    }
    
    return (
        <div className='rounded-lg bg-white shadow-md p-8'>
            <div className="heading pb-8 flex items-center gap-4 justify-between">
                <h2 className='font-bold px-4 relative before:absolute before:w-1 before:rounded-full before:h-full before:-right-0 before:bg-primary-400'>قائمة الملفات</h2>
                <FileAddPopup />
            </div>
            <div className='overflow-auto'>
                {
                    task.files.length > 0
                        ?
                        <table className='w-full max-md:w-[1024px]'>
                            <thead>
                                <tr className='font-bold border-b border-gray-200 [&>th]:text-start [&>th]:p-4 [&>th]:w-[calc(100%/4)]'>
                                    <th>صيغة الملف</th>
                                    <th>العنوان</th>
                                    <th>تاريخ الانشاء</th>
                                    <th>العمليات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    task.files.map((file, index) => (
                                        <tr key={file.id} className=' border-gray-200 [&:not(:last-of-type)]:border-b [&>td]:p-4'>
                                            <td className='uppercase'>
                                                <div className='flex items-center gap-2'>
                                                    <Icon className='text-primary-400' icon={file.file?.split(".")[1] === 'pdf' ? 'bxs:file-pdf' : 'mage:image-fill'} fontSize={32} />
                                                    <span>{file.file.split(".")[1]}</span>
                                                </div>
                                            </td>
                                            <td >{file.address}</td>
                                            <td>{new Date(file.created_at).toLocaleString()}</td>
                                            <td className='flex items-center gap-2 '>
                                                <NavLink
                                                    className='main-btn !bg-primary-400 hover:!bg-primary-300 !text-white !gap-1'
                                                    to={`${import.meta.env.VITE_MEDIA_URL}/${file.file}`}
                                                    target='_blank'
                                                    download={true}
                                                >
                                                    <Icon icon="ic:round-download" fontSize={22} />
                                                    <span>تحميل</span>
                                                </NavLink>
                                                <NavLink
                                                    className='main-btn !bg-primary-100 !text-primary-400 !gap-1'
                                                    to={file.file.split(".")[1] === 'pdf' ? `https://docs.google.com/gview?url=${import.meta.env.VITE_MEDIA_URL}/${file.file}&embedded=true` : `${import.meta.env.VITE_MEDIA_URL}/${file.file}`}
                                                    target='_blank'
                                                >
                                                    <Icon icon="iconamoon:eye-light" fontSize={22} />
                                                    <span>عرض</span>
                                                </NavLink>
                                                <DeletePopup
                                                    btnTitle={"حذف"}
                                                    itemObj={file}
                                                    handleDelete={() => handleDelete(file)}
                                                    className={"main-btn text-white !bg-rose-400 hover:!bg-rose-300"}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        :
                        <div className='flex flex-col justify-center items-center'>
                            <EmptyData title={"لا توجد ملفات"} >
                                <FileAddPopup />
                            </EmptyData>
                        </div>
                }
            </div>
        </div>
    )
}

export default TaskFiles