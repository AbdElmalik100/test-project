import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosRequest from "../../plugins/axios";
import { toast } from "sonner";


export const getSupervisors = createAsyncThunk("supervisorsSlice/getSupervisors", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.get("/contractors")
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const getSupervisor = createAsyncThunk("supervisorsSlice/getSupervisor", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.get(`/contractors/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const createSupervisor = createAsyncThunk("supervisorsSlice/createSupervisor", async (supervisorData, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.post("/contractors", supervisorData)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const updateSupervisor = createAsyncThunk("supervisorsSlice/updateSupervisor", async ({id, supervisorData}, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.post(`/contractors/${id}`, supervisorData)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const deleteSupervisor = createAsyncThunk("supervisorsSlice/deleteSupervisor", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.delete(`/contractors/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})


const supervisorsSlice = createSlice({
    name: "supervisors",
    initialState: {
        supervisors: null,
        supervisor: null,
        loading: false
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getSupervisors.pending, state => {
                state.loading = true
            })
            .addCase(getSupervisors.fulfilled, (state, action) => {
                state.loading = false
                state.supervisors = action.payload.contractors
            })
            .addCase(getSupervisors.rejected, (state, action) => {
                state.loading = false
            })
        
        builder
            .addCase(getSupervisor.pending, state => {
                state.loading = true
            })
            .addCase(getSupervisor.fulfilled, (state, action) => {
                state.loading = false
                state.supervisor = action.payload.contractor
            })
            .addCase(getSupervisor.rejected, (state, action) => {
                state.loading = false
            })

        builder
            .addCase(createSupervisor.pending, state => {
                state.loading = true
            })
            .addCase(createSupervisor.fulfilled, (state, action) => {
                state.loading = false
                toast.success("تم اضافة المقاول بنجاح")
            })
            .addCase(createSupervisor.rejected, (state, action) => {
                state.loading = false
                toast.error("هذا المقاول موجود بالفعل")
            })
        
        builder
            .addCase(updateSupervisor.pending, state => {
                state.loading = true
            })
            .addCase(updateSupervisor.fulfilled, (state, action) => {
                state.loading = false                
                if (state.supervisors !== null) state.supervisors.data = state.supervisors.data.map(supervisor => supervisor.id === action.payload.contractor.id ? action.payload.contractor : supervisor)
                if (state.supervisor !== null) state.supervisor.id === action.payload.contractor.id ? state.supervisor = action.payload.contractor : null
                toast.success("تم تعديل بيانات المقاول بنجاح")
            })
            .addCase(updateSupervisor.rejected, (state, action) => {
                state.loading = false
                toast.error("حدث خطأ , حاول مره اخري لاحفا")
            })

        builder
            .addCase(deleteSupervisor.pending, state => {
                state.loading = true
            })
            .addCase(deleteSupervisor.fulfilled, (state, action) => {
                state.loading = false
                state.supervisors.data = state.supervisors.data.filter(supervisor => supervisor.id !== action.payload.contractor.id)
                toast.success("تم حذف المقاول بنجاح")
            })
            .addCase(deleteSupervisor.rejected, (state, action) => {
                state.loading = false
                toast.error("حذث خطأ , حاول مره اخري لاحقا")
            })
    }
})


export default supervisorsSlice.reducer