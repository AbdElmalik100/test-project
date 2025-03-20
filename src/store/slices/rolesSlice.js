import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosRequest from "../../plugins/axios";
import { toast } from "sonner";

export const getRoles = createAsyncThunk('rolesSlice/getRoles', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.get("/roles")
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const createRole = createAsyncThunk('rolesSlice/createRole', async (roleData, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.post("/roles", roleData)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const updateRole = createAsyncThunk('rolesSlice/updateRole', async ({ id, roleData }, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.post(`/roles/${id}`, roleData)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})



export const deleteRole = createAsyncThunk('rolesSlice/deleteRole', async (id, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.delete(`/roles/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})




export const rolesSlice = createSlice({
    name: "roles",
    initialState: {
        roles: null,
        loading: false,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getRoles.pending, state => {
                state.loading = true
            })
            .addCase(getRoles.fulfilled, (state, action) => {
                state.roles = action.payload.roles
                state.loading = false
            })
            .addCase(getRoles.rejected, (state, action) => {
                state.loading = false
            })

        builder
            .addCase(createRole.pending, state => {
                state.loading = true
            })
            .addCase(createRole.fulfilled, (state, action) => {
                state.loading = false
                state.roles.data = [...state.roles.data, action.payload.role]                
                toast.success("تم انشاء الصلاحية بنجاح")
            })
            .addCase(createRole.rejected, (state, action) => {
                state.loading = false
                toast.error("حذث خطأ , حاول مره اخري لاحقا")
            })
        
        builder
            .addCase(updateRole.pending, state => {
                state.loading = true
            })
            .addCase(updateRole.fulfilled, (state, action) => {
                state.loading = false
                state.roles.data = state.roles.data.map(role => role.id === action.payload.role.id ? action.payload.role : role )
                toast.success("تم تعديل بيانات الصلاحية بنجاح")
            })
            .addCase(updateRole.rejected, (state, action) => {
                state.loading = false
                toast.error("حذث خطأ , حاول مره اخري لاحقا")
            })

        builder
            .addCase(deleteRole.pending, state => {
                state.loading = true
            })
            .addCase(deleteRole.fulfilled, (state, action) => {
                state.loading = false
                state.roles.data = state.roles.data.filter(role => role.id !== action.payload.role.id)
                toast.success("تم حذف الصلاحية بنجاح")
            })
            .addCase(deleteRole.rejected, (state, action) => {
                state.loading = false
                toast.error("حذث خطأ , حاول مره اخري لاحقا")
            })
    }
})

export default rolesSlice.reducer