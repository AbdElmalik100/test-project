import { Icon } from '@iconify/react/dist/iconify.js'

const StatusBadge = ({ statusType, className }) => {
    const renderBadge = () => {
        switch (statusType) {
            case "منتهي":
                return (
                    <span className={`badge p-1 px-2.5 flex justify-center items-center ms-auto w-fit gap-1 rounded-full text-xs bg-green-100 text-green-500 font-semibold ${className}`}>
                        <span>{statusType}</span>
                        <Icon icon="icon-park-solid:check-one" fontSize={18} />
                    </span>
                )
            case "ملغي":
                return (
                    <span className={`badge p-1 px-2.5 flex justify-center items-center ms-auto w-fit gap-1 rounded-full text-xs bg-rose-100 text-rose-500 font-semibold ${className}`}>
                        <span>{statusType}</span>
                        <Icon icon="gravity-ui:circle-xmark-fill" fontSize={18} />
                    </span>
                )
            case "معلق":
                return (
                    <span className={`badge p-1 px-2.5 flex justify-center items-center ms-auto w-fit gap-1 rounded-full text-xs bg-sky-100 text-sky-500 font-semibold ${className}`}>
                        <span>{statusType}</span>
                        <Icon icon="tabler:clock-filled" fontSize={18} />
                    </span>
                )
            default:
                return (
                    <span className={`badge p-1 px-2.5 flex justify-center items-center ms-auto w-fit gap-1 rounded-full text-xs bg-primary-100 text-primary-400 font-semibold ${className}`}>
                        <span>{statusType}</span>
                        <Icon icon="material-symbols:settings-rounded" className='animate-spin' fontSize={18} />
                    </span>
                )
        }
    }
    return renderBadge()
}

export default StatusBadge