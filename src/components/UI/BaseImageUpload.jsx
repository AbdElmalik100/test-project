import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const BaseImageUpload = ({ register, watch, setValue, fieldName }) => {    
    return (
        <label className='cursor-pointer'>
            <input type="file" accept='images/*' name='image' className='hidden' {...register(fieldName)} onChange={event => setValue(fieldName, event.target.files[0], { shouldValidate: true })} />
            {
                (typeof watch(fieldName) === 'string' && watch(fieldName) !== null)
                    ?
                    <div className='image-wrapper w-[250px] h-[250px]'>
                        <img className='rounded-lg object-cover w-full h-full object-top' src={`${import.meta.env.VITE_MEDIA_URL}/${watch(fieldName)}`} alt="Employee Image Preview" />
                    </div>
                    :
                    (typeof watch(fieldName) === 'object' && watch(fieldName) !== null)
                        ?
                        <div className='image-wrapper w-[250px] h-[250px]'>
                            <img className='rounded-lg object-cover w-full h-full object-top' src={URL.createObjectURL(watch(fieldName))} alt="Employee Image Preview" />
                        </div>
                        :
                        <div className='grid rounded-lg place-items-center p-6 py-10 bg-white border-gray-200 border-dashed border transition-all ease-out hover:border-primary-400'>
                            <div className='my-4 flex flex-col items-center gap-1 text-gray-400'>
                                <Icon icon="iconamoon:cloud-upload-fill" fontSize={60} />
                                <span>قم برفع صورة (PNG, JPG, JPEG)</span>
                            </div>
                        </div>
            }
        </label>
    )
}

export default BaseImageUpload