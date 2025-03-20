import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosRequest from "../../plugins/axios";
import { toast } from "sonner";

export const getTasks = createAsyncThunk("tasksSlice/getTasks", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.get("/tasks")
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getTask = createAsyncThunk("tasksSlice/getTask", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.get(`/tasks/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const getTasksByProjectId = createAsyncThunk("tasksSlice/getTaskByProjectId", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.get(`/tasks_belong_to_project/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const createTask = createAsyncThunk("tasksSlice/createTask", async (taskData, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.post("/tasks", taskData)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const createTaskFile = createAsyncThunk("tasksSlice/createTaskFile", async (taskFileData, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.post("/files", taskFileData)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const updateTask = createAsyncThunk("tasksSlice/updateTask", async ({ id, taskData }, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.patch(`/tasks/${id}`, taskData, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const deleteTask = createAsyncThunk("tasksSlice/deleteTask", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.delete(`/tasks/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const deleteTaskFile = createAsyncThunk("tasksSlice/deleteTaskFile", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.delete(`/files/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})


export const repeatTask = createAsyncThunk("tasksSlice/repeatTask", async ({ id, taskData }, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.post(`/duplicate_task/${id}`, taskData)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: null,
        task: null,
        loading: false
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getTasks.pending, state => {
                state.loading = true
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.loading = false
                state.tasks = action.payload.tasks
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.loading = false
            })

        builder
            .addCase(getTask.pending, state => {
                state.loading = true
            })
            .addCase(getTask.fulfilled, (state, action) => {
                state.loading = false
                state.task = action.payload.task
            })
            .addCase(getTask.rejected, (state, action) => {
                state.loading = false
            })

        builder
            .addCase(getTasksByProjectId.pending, state => {
                state.loading = true
            })
            .addCase(getTasksByProjectId.fulfilled, (state, action) => {
                state.loading = false
                state.tasks = action.payload.tasks
            })
            .addCase(getTasksByProjectId.rejected, (state, action) => {
                state.loading = false
            })

        builder
            .addCase(createTask.pending, state => {
                state.loading = true
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false
                toast.success("تم اضافة المهمة بنجاح")
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false
                toast.error("حدث خطأ , حاول مره اخري لاحقا")
            })

        builder
            .addCase(createTaskFile.pending, state => {
                state.loading = true
            })
            .addCase(createTaskFile.fulfilled, (state, action) => {
                state.loading = false
                state.task = { ...state.task, files: [...state.task.files, action.payload.file] }
                toast.success("تم اضافة الملف بنجاح")
            })
            .addCase(createTaskFile.rejected, (state, action) => {
                state.loading = false
                toast.error("حدث خطأ , حاول مره اخري لاحقا")
            })

        builder
            .addCase(updateTask.pending, state => {
                state.loading = true
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.loading = false
                if (state.tasks !== null) state.tasks.data = state.tasks.data.map(task => task.id === action.payload.task.id ? action.payload.task : task)
                if (state.task !== null) state.task.id === action.payload.task.id ? state.task = action.payload.task : null
                toast.success("تم تعديل بيانات المهمة بنجاح")
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false
                toast.error("حدث خطأ , حاول مره اخري لاحقا")
            })

        builder
            .addCase(deleteTask.pending, state => {
                state.loading = true
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false
                state.tasks.data = state.tasks.data.filter(el => el.id !== action.payload.task.id)
                toast.success("تم حذف المهمة بنجاح")
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false
                toast.error("حدث خطأ , حاول مره اخري لاحقا")
            })

        builder
            .addCase(deleteTaskFile.pending, state => {
                state.loading = true
            })
            .addCase(deleteTaskFile.fulfilled, (state, action) => {
                state.loading = false
                state.task = { ...state.task, files: state.task.files.filter(file => file.id !== action.payload.file.id) }
                toast.success("تم حذف الملف بنجاح")
            })
            .addCase(deleteTaskFile.rejected, (state, action) => {
                state.loading = false
                toast.error("حدث خطأ , حاول مره اخري لاحقا")
            })

        builder
            .addCase(repeatTask.pending, state => {
                state.loading = true
            })
            .addCase(repeatTask.fulfilled, (state, action) => {
                state.loading = false
                toast.success("تم تكرار المهمة بنجاح")
            })
            .addCase(repeatTask.rejected, (state, action) => {
                state.loading = false
                toast.error("حدث خطأ , حاول مره اخري لاحقا")
            })
    }
})

export default tasksSlice.reducer