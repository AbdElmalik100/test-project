import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosRequest from "../../plugins/axios";
import { toast } from "sonner";

export const getEmployees = createAsyncThunk("employeesSlice/getEmployees", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.get("/employees")
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const getEmployee = createAsyncThunk("employeesSlice/getEmployee", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.get(`/employees/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getEmployeesBelongToProject = createAsyncThunk("employeesSlice/getEmployeesBelongToProject", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.get(`/projects/employee_belongs_to_project/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const getEmployeesNotBelongToProject = createAsyncThunk("employeesSlice/getEmployeesNotBelongToProject", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.get(`/projects/employee_does_not_belongs_to_project/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})


export const createEmployee = createAsyncThunk("employeesSlice/createEmployee", async (employeeData, { rejectWithValue }) => {
    try {

        const response = await axiosRequest.post("/employees", employeeData)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const updateEmployee = createAsyncThunk("employeesSlice/updateEmployee", async ({ id, employeeData }, { rejectWithValue }) => {
    try {

        const response = await axiosRequest.post(`/employees/${id}`, employeeData)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const deleteEmployee = createAsyncThunk("employeesSlice/deleteEmployee", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.delete(`/employees/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})


const employeesSlice = createSlice({
    name: "employees",
    initialState: {
        employees: null,
        employee: null,
        projectEmployees: [],
        loading: false
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getEmployees.pending, state => {
                state.loading = true
            })
            .addCase(getEmployees.fulfilled, (state, action) => {
                state.loading = false
                state.employees = action.payload.employees
            })
            .addCase(getEmployees.rejected, (state, action) => {
                state.loading = false
            })

        builder
            .addCase(getEmployee.pending, state => {
                state.loading = true
            })
            .addCase(getEmployee.fulfilled, (state, action) => {
                state.loading = false
                state.employee = action.payload.employee
            })
            .addCase(getEmployee.rejected, (state, action) => {
                state.loading = false
            })

        builder
            .addCase(getEmployeesBelongToProject.pending, state => {
                state.loading = true
            })
            .addCase(getEmployeesBelongToProject.fulfilled, (state, action) => {
                state.loading = false
                state.projectEmployees = action.payload.message
            })
            .addCase(getEmployeesBelongToProject.rejected, (state, action) => {
                state.loading = false
            })

        builder
            .addCase(getEmployeesNotBelongToProject.pending, state => {
                state.loading = true
            })
            .addCase(getEmployeesNotBelongToProject.fulfilled, (state, action) => {
                state.loading = false
                state.projectEmployees = action.payload.message
            })
            .addCase(getEmployeesNotBelongToProject.rejected, (state, action) => {
                state.loading = false
            })

        builder
            .addCase(createEmployee.pending, state => {
                state.loading = true
            })
            .addCase(createEmployee.fulfilled, (state, action) => {
                state.loading = false
                toast.success("تم اضافة الموظف بنجاح")
            })
            .addCase(createEmployee.rejected, (state, action) => {
                state.loading = false
                toast.error("هذا الموظف موجود , حاول تغيير البريد الالكتروني او رقم الهاتف")
            })

        builder
            .addCase(updateEmployee.pending, state => {
                state.loading = true
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.loading = false
                if (state.employees !== null) state.employees.data = state.employees.data.map(employee => employee.id === action.payload.employee.id ? action.payload.employee : employee)
                if (state.employee !== null) state.employee.id === action.payload.employee.id ? state.employee = action.payload.employee : null
                toast.success("تم تعديل بيانات الموظف بنجاح")
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.loading = false
                toast.error("هذا الموظف موجود , حاول تغيير البريد الالكتروني او رقم الهاتف")
            })

        builder
            .addCase(deleteEmployee.pending, state => {
                state.loading = true
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.loading = false
                state.employees.data = state.employees.data.filter(employee => employee.id !== action.payload.employee.id)
                toast.success("تم حذف الموظف بنجاح")
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.loading = false
                toast.error("حذث خطأ , حاول مره اخري لاحقا")
            })
    }
})


export default employeesSlice.reducer