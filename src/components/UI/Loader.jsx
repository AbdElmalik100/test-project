import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const Loader = ({className}) => {
    return (
        <div className={`grid place-items-center col-span-4 ${className}`}>
            <Icon icon="mingcute:loading-line" className='animate-spin' fontSize={64} />
        </div>
    )
}

export default Loader