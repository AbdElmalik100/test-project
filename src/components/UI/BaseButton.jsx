import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const BaseButton = ({title, isLoading}) => {
    return (
        <button className="main-btn" disabled={isLoading}>
            {isLoading && <Icon icon="svg-spinners:270-ring" fontSize={20} />}
            <span>{isLoading ? 'تحميل ...' : title}</span>
        </button>
    )
}

export default BaseButton