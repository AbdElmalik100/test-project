import { Icon } from '@iconify/react/dist/iconify.js'

const BaseFileUpload = ({ register, watch, setValue, fieldName }) => {
    return (
        <label className='cursor-pointer'>
            <input
                type="file"
                accept='image/*,.pdf'
                name='file'
                className='hidden'
                {...register(fieldName)}
                onChange={event => setValue(fieldName, event.target.files[0], { shouldValidate: true })}
            />
            {
                (typeof watch(fieldName) === 'string' && watch(fieldName) !== null)
                    ?
                    <div className='file-wrapper w-[250px] h-[250px]'>
                        <img className='rounded-lg object-cover w-full h-full object-top' src={`${import.meta.env.VITE_MEDIA_URL}/${watch(fieldName)}`} alt="Task File Or Image Preview" />
                    </div>
                    :
                    (typeof watch(fieldName) === 'object' && watch(fieldName) !== null)
                        ?
                        watch(fieldName).type.includes("image")
                            ?
                            <div className='image-wrapper w-[250px] h-[250px] shadow-lg rounded-lg'>
                                <img className='rounded-lg object-cover w-full h-full object-top' src={URL.createObjectURL(watch(fieldName))} alt="Task File Or Image Preview" />
                            </div>
                            :
                            <div className='file-wrapper w-[250px] p-4 text-center h-[250px] shadow-lg bg-primary-50 grid place-items-center rounded-lg'>
                                <div className='flex items-center flex-col gap-2'>
                                    <div className='w-18 h-18 rounded-full grid place-items-center text-white bg-primary-400'>
                                        <Icon icon="bxs:file-pdf" fontSize={42} />
                                    </div>
                                    <span>{watch(fieldName).name}</span>
                                </div>
                            </div>
                            
                        :
                        <div className='grid rounded-lg place-items-center p-6 py-10 bg-white border-gray-200 border-dashed border transition-all ease-out hover:border-primary-400'>
                            <div className='my-4 flex flex-col items-center gap-1 text-gray-400'>
                                <Icon icon="iconamoon:cloud-upload-fill" fontSize={60} />
                                <span>قم برفع صورة او ملف (JPG, JPEG, PNG, PDF)</span>
                            </div>
                        </div>
            }
        </label>
    )
}

export default BaseFileUpload