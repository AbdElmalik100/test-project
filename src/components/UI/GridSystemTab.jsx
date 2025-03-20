import { Icon } from '@iconify/react/dist/iconify.js'
import Cookies from 'js-cookie'

const GridSystemTab = ({ tab, setTab, hideCards, hideTable }) => {
    const handleChange = (value) => {
        setTab(value)
        Cookies.set("tab_type", value)
    }
    return (
        <div className="grid-system flex items-center gap-3">
            {
                !hideCards &&
                <button className={`tab-btn ${tab === 'cards' ? 'active-tab' : ''}`} onClick={() => handleChange("cards")}>
                    <Icon icon='ph:cards' fontSize={22} />
                </button>
            }
            {
                !hideTable &&
                <button className={`tab-btn ${tab === 'table' ? 'active-tab' : ''}`} onClick={() => handleChange("table")}>
                    <Icon icon='circum:grid-2-h' fontSize={22} />
                </button>
            }
        </div>
    )
}

export default GridSystemTab