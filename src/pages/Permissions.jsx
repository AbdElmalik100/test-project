
import { useDispatch, useSelector } from 'react-redux'
import SearchBox from '../components/UI/SearchBox'
import TableGrid from '../components/UI/TableGrid'
import { deleteRole, getRoles } from '../store/slices/rolesSlice'
import { useEffect, useState } from 'react'


const Permissions = () => {
    const dispatch = useDispatch()

    const [searchInput, setSearchInput] = useState("")
    const { roles } = useSelector(state => state.roles)
    const [filterationData, setFilterationData] = useState([])


    const handleDelete = async (roleObj) => {
        const response = await dispatch(deleteRole(roleObj.id))
        return deleteRole.fulfilled.match(response)
    }

    useEffect(() => {
        dispatch(getRoles())
    }, [dispatch])

    return (
        roles &&
        <div className='mt-10'>
            <SearchBox searchInput={searchInput} setSearchInput={setSearchInput} searchData={roles} setFilterationData={setFilterationData} />
            <TableGrid
                type="roles"
                header={"عدد الصلاحيات"}
                title={"اضافة صلاحية جديد"}
                tableData={roles}
                filterationData={filterationData}
                modal={true}
                deleteItem={handleDelete}
            />
        </div>
    )
}

export default Permissions