import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosRequest from "../../plugins/axios";
import Cookies from 'js-cookie'
import { toast } from "sonner";

export const login = createAsyncThunk('userSlice/login', async (loginData, {rejectWithValue}) => {
    try {
        console.log(loginData)
        const response = await axiosRequest.post("login", loginData)
        return response
    } catch (error) {
        return rejectWithValue(error)
    }
}) 
export const resetPassword = createAsyncThunk('userSlice/resetPassword', async (resetPasswordData, {rejectWithValue}) => {
    try {
        console.log(resetPasswordData)
        const response = await axiosRequest.post("send_code_for_forget_password", resetPasswordData)
        return response
    } catch (error) {
        return rejectWithValue(error)
    }
}) 


export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false,
    },
    reducers: {
        logout: (state) => {
            Cookies.remove("ser_token")
            state.user = null
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, state => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                toast.error("البريد الالكتروني او كلمة المرور خاطئة")
            })
    }
})

// export const {logout} = userSlice.actions
export default userSlice.reducer