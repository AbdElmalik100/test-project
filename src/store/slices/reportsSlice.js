import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosRequest from "../../plugins/axios";

export const getReports = createAsyncThunk('reportsSlice/getReports', async ({month = '', type = ''}, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.get(`/reports?month=${month}&type=${type}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const getProjectsCount = createAsyncThunk("reportsSlice/getProjectsCount", async (year, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.get(`/monthly_count?year=${year}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const getLatestProject = createAsyncThunk("reportsSlice/getLatestProject", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.get("/latest_projects")
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})


const reportsSlice = createSlice({
    name: "reports",
    initialState: {
        reports: null,
        projectsCount: null,
        latestProjects: [],
        loading: false
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getReports.pending, state => {
                state.loading = true
            })
            .addCase(getReports.fulfilled, (state, actions) => {
                state.loading = false
                state.reports = actions.payload.reports
            })
            .addCase(getReports.rejected, (state, actions) => {
                state.loading = false
            })
        builder
            .addCase(getProjectsCount.pending, state => {
                state.loading = true
            })
            .addCase(getProjectsCount.fulfilled, (state, actions) => {
                state.loading = false
                state.projectsCount = actions.payload.monthly_count
            })
            .addCase(getProjectsCount.rejected, (state, actions) => {
                state.loading = false
            })
        builder
            .addCase(getLatestProject.pending, state => {
                state.loading = true
            })
            .addCase(getLatestProject.fulfilled, (state, actions) => {
                state.loading = false
                state.latestProjects = actions.payload.latest_projects_with_completion.map(el => ({
                    ...el.project,
                    completion_percentage: el.completion_percentage,
                    finished_tasks_count: el.finished_tasks_count,
                    on_going_tasks_count: el.on_going_tasks_count,
                    pending_tasks_count: el.pending_tasks_count
                }))
            })
            .addCase(getLatestProject.rejected, (state, actions) => {
                state.loading = false
            })
    }
})


export default reportsSlice.reducer