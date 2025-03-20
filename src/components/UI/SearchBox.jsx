import { Icon } from '@iconify/react/dist/iconify.js'
import { useDebounce } from '@uidotdev/usehooks'
import { useEffect } from 'react'

const SearchBox = ({searchInput, setSearchInput, searchData, setFilterationData}) => {
    const handleSearch = (e) => setSearchInput(e.target.value)
    const searching = useDebounce(searchInput, 300)

    useEffect(() => {
        const searchedEmployees = searchData?.data?.filter(el => Object.values(el).some(ele => String(ele).toLowerCase().includes(searching.toLowerCase())))
        setFilterationData(searchedEmployees)
    }, [searching, searchData])


    return (
        <div className='search p-2 px-6 flex items-center justify-between rounded-lg shadow-md bg-white'>
            <input type="text" className='border-none w-full placeholder:text-primary-400 placeholder:font-bold' placeholder='بحث' onInput={handleSearch} />
            <Icon icon='meteor-icons:search' className='text-primary-400' fontSize={22} />
        </div>
    )
}

export default SearchBox