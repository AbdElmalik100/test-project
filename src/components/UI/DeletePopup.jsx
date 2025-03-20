import { useState } from 'react'
import BaseButton from './BaseButton'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useClickAway } from '@uidotdev/usehooks'
import { useNavigate } from 'react-router'

const DeletePopup = ({ handleDelete, itemObj, className, btnTitle, navigation }) => {
    const navigate = useNavigate()
    const [togglePopup, setTogglePopup] = useState(false)
    const popupRef = useClickAway(() => setTogglePopup(false))
    const [loading, setLoading] = useState(false)
    
    const handlePopupDelete = async () => {
        setLoading(true)
        const response = await handleDelete()

        if (response) {
            setTogglePopup(false)
            setLoading(false)
            if(navigation) navigate(navigation)
            // else location.reload()
        } else setLoading(false)
    }

    return (
        <div>
            <button className={`flex justify-center transition-all ease-out items-center text-rose-400 hover:text-rose-300 ${className}`}
                onClick={() => setTogglePopup(true)}>
                <Icon icon="meteor-icons:trash" fontSize={22} />
                {btnTitle && <span>{btnTitle}</span>}
            </button>
            <AnimatePresence>
                {
                    togglePopup &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: "easeOut", duration: 0.1 }}
                        className='overlay grid place-items-center'
                    >
                        <motion.div
                            ref={popupRef}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ ease: "easeOut", duration: 0.1 }}
                            className='box rounded-lg shadow-md bg-white p-6'
                        >
                            <h3 className='font-bold text-xl'>هل انت متأكد من حذف هذه البيانات {itemObj.name && `"${itemObj.name}"`} ؟</h3>
                            <p className='text-paragrah-color mt-1'>
                                مع حذفك لهذه البيانات لن تستطيع استراجعها ابدا , حيث سيتم حذفها من قواعد البيانات الخاصة بنا
                            </p>
                            <div className='mt-6 flex items-center gap-2'>
                                <BaseButton className={"!bg-rose-500 !text-white hover:!bg-rose-400"} title={"حذف"} onClick={handlePopupDelete} isLoading={loading} />
                                <button className='main-btn !bg-gray-200 !text-black hover:!bg-gray-100'
                                    onClick={() => setTogglePopup(false)}
                                >
                                    الغاء
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default DeletePopup