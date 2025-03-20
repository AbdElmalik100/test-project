import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosRequest from "../../plugins/axios";
import { toast } from "sonner";

export const getProjects = createAsyncThunk("projectsSlice/getProjects", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.get("/projects")
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})


export const getProject = createAsyncThunk("projectsSlice/getProject", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.get(`/projects/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const getProjectStages = createAsyncThunk("projectsSlice/getProjectStages", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.get(`/stages_belong_to_project/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const createProject = createAsyncThunk("projectsSlice/createProject", async (projectData, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.post("/projects", projectData)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const updateProject = createAsyncThunk("projectsSlice/updateProject", async ({ id, projectData }, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.patch(`/projects/${id}`, projectData, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const deleteProject = createAsyncThunk("projectsSlice/deleteProject", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.delete(`/projects/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})


const projectsSlice = createSlice({
    name: "projects",
    initialState: {
        projects: null,
        project: null,
        stages: [],
        loading: false
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getProjects.pending, state => {
                state.loading = true
            })
            .addCase(getProjects.fulfilled, (state, action) => {
                state.loading = false
                state.projects = {
                    ...action.payload.projects, data: action.payload.projects.data.map(el => ({
                        ...el.project,
                        completion_percentage: el.completion_percentage,
                        finished_tasks_count: el.finished_tasks_count,
                        on_going_tasks_count: el.on_going_tasks_count,
                        pending_tasks_count: el.pending_tasks_count
                    }))
                }
            })
            .addCase(getProjects.rejected, (state, action) => {
                state.loading = false
            })

        builder
            .addCase(getProject.pending, state => {
                state.loading = true
            })
            .addCase(getProject.fulfilled, (state, action) => {
                state.loading = false
                state.project = action.payload.project
            })
            .addCase(getProject.rejected, (state, action) => {
                state.loading = false
            })

        builder
            .addCase(getProjectStages.pending, state => {
                state.loading = true
            })
            .addCase(getProjectStages.fulfilled, (state, action) => {
                state.loading = false
                state.stages = action.payload.stages.data
            })
            .addCase(getProjectStages.rejected, (state, action) => {
                state.loading = false
            })

        builder
            .addCase(createProject.pending, state => {
                state.loading = true
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.loading = false
                toast.success("تم اضافة المشروع بنجاح")
            })
            .addCase(createProject.rejected, (state, action) => {
                state.loading = false
                toast.error("حدث خطأ , حاول مره اخري لاحقا")
            })

        builder
            .addCase(updateProject.pending, state => {
                state.loading = true
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.loading = false
                if (state.projects !== null) state.projects.data = state.projects.data.map(project => project.id === action.payload.project[0].project.id ? {
                    ...action.payload.project[0].project,
                    completion_percentage: action.payload.project[0].completion_percentage,
                    finished_tasks_count: action.payload.project[0].finished_tasks_count,
                    on_going_tasks_count: action.payload.project[0].on_going_tasks_count,
                    pending_tasks_count: action.payload.project[0].pending_tasks_count
                } : project)
                if (state.project !== null) state.project.id === action.payload.project[0].project.id ? state.project = action.payload.project[0].project : null
                toast.success("تم تعديل بيانات المشروع بنجاح")
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.loading = false
                toast.error("حدث خطأ , حاول مره اخري لاحقا")
            })

        builder
            .addCase(deleteProject.pending, state => {
                state.loading = true
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.loading = false
                state.projects.data = state.projects.data.filter(project => project.id !== action.payload.project.id)
                toast.success("تم حذف المشروع بنجاح")
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.loading = false
                toast.error("حدث خطأ , حاول مره اخري لاحقا")
            })
    }
})

export default projectsSlice.reducer