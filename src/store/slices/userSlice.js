import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosRequest from "../../plugins/axios";
import Cookies from 'js-cookie'
import { toast } from "sonner";


export const me = createAsyncThunk("userSlice/me", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.get("/profile")
        return response.data
    } catch (error) {
        rejectWithValue(error)
    }
})

export const updateProfile = createAsyncThunk("userSlice/updateProfile", async (userData, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.post('/edit_profile', userData)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const updatePassword = createAsyncThunk("userSlice/updatePassword", async (userData, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.post('/edit_password', userData)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const login = createAsyncThunk('userSlice/login', async ({ data: loginData, rememberMe }, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.post("/login", loginData)
        return { response: response.data, remember_me: rememberMe }
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const resetPassword = createAsyncThunk('userSlice/resetPassword', async (resetPasswordData, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.post("/send_code_for_forget_password", resetPasswordData)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const resendCode = createAsyncThunk('userSlice/resendCode', async (resendData, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.post("/resend_code", resendData)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const setOTPCode = createAsyncThunk('userSlice/setOTPCode', async (OTPData, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.post("/set_otp_for_forget_password", OTPData)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const changePassword = createAsyncThunk('userSlice/changePassword', async (changePasswordData, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.post("/change_password", changePasswordData)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const logout = createAsyncThunk('userSlice/logout', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosRequest.post('/logout')
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})


export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false,
        updateLoading: false
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(me.pending, state => {
                state.loading = true
            })
            .addCase(me.fulfilled, (state, action) => {
                state.user = action.payload.employee
                state.loading = false
            })
            .addCase(me.rejected, (state, action) => {
                state.loading = false
            })

        builder
            .addCase(updateProfile.pending, state => {
                state.updateLoading = true
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                toast.success("تم تعديل البيانات الشخصية بنجاح")
                state.updateLoading = false
                state.user = action.payload.employee
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.updateLoading = false
                toast.error("حدث خطأ , حاول مره اخري لاحقا")
            })

        builder
            .addCase(updatePassword.pending, state => {
                state.updateLoading = true
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.updateLoading = false
                toast.success("تم تعديل البيانات الشخصية بنجاح")
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.updateLoading = false
                toast.error("كلمة المرور القديمة خاطئة")
            })

        builder
            .addCase(login.pending, state => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                action.payload.remember_me ? Cookies.set("user_token", action.payload.response.token, { expires: 36500 }) : Cookies.set("user_token", action.payload.response.token)
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                toast.error("البريد الالكتروني او كلمة المرور خاطئة")
            })
        builder
            .addCase(resetPassword.pending, state => {
                state.loading = true
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false
                toast.success("تم ارسال كود التفعيل الي بريدك الالكتروني")
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false
                toast.error("هناك خطأ , حاول مره اخري لاحقا")
            })

        builder
            .addCase(resendCode.pending, state => {
                state.loading = true
            })
            .addCase(resendCode.fulfilled, (state, action) => {
                state.loading = false
                toast.success("تم ارسال كود التفعيل الي بريدك الالكتروني")
            })
            .addCase(resendCode.rejected, (state, action) => {
                state.loading = false
                toast.error("هناك خطأ , حاول مره اخري لاحقا")
            })

        builder
            .addCase(setOTPCode.pending, state => {
                state.loading = true
            })
            .addCase(setOTPCode.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(setOTPCode.rejected, (state, action) => {
                state.loading = false
                toast.error("كود التفعيل غير صحيح , برجاء ادخال كود تفعيل صحيح")
            })

        builder
            .addCase(changePassword.pending, state => {
                state.loading = true
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.loading = false
                toast.success("تم تغيير كلمة المرور بنجاح")
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false
                toast.error("هناك خطأ , حاول مره اخري لاحقا")
            })

        builder
            .addCase(logout.pending, state => {
                state.updateLoading = true
            })
            .addCase(logout.fulfilled, (state, action) => {
                Cookies.remove("user_token")
                state.user = null
                state.updateLoading = false
            })
            .addCase(logout.rejected, (state, action) => {
                state.updateLoading = false
            })
    }
})

export default userSlice.reducer