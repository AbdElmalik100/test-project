import { useState } from 'react'
import SettingsTabs from '../components/SettingsSections/SettingsTabs'
import ProfileSetting from '../components/SettingsSections/ProfileSetting'
import SecuritySetting from '../components/SettingsSections/SecuritySetting'

const Settings = () => {
    const [tab, setTab] = useState("profile")


    return (
        <div className='mt-10'>
            <SettingsTabs tab={tab} setTab={setTab} />
            {
                tab === 'profile'
                    ?
                    <ProfileSetting />
                    :
                    <SecuritySetting />
            }
        </div>
    )
}

export default Settings