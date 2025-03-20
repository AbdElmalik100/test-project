import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const BaseButton = ({ title, isLoading, className, icon, onClick }) => {
    return (
        <button className={`main-btn ${className}`} disabled={isLoading} onClick={onClick}>
            {
                isLoading ?
                    <>
                        <Icon icon="mingcute:loading-line" className='animate-spin' fontSize={22} />
                        <span>تحميل ...</span>
                    </>
                    :
                    <>
                        {icon && <Icon icon={icon} fontSize={22} />}
                        <span>{title}</span>
                    </>
            }
        </button>
    )
}

export default BaseButton