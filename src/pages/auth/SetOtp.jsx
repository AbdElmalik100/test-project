import React, { useState } from 'react'
import AuthHeader from '../../components/AuthSections/AuthHeader'
import BaseButton from '../../components/UI/BaseButton'
import Countdown, { zeroPad } from 'react-countdown'
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { resendCode, setOTPCode } from '../../store/slices/userSlice';
import { useNavigate, useSearchParams } from 'react-router';

const SetOtp = () => {
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const [resendEnabled, setResendEnabled] = useState(false); // Use ref instead of state
    const [countdownKey, setCountdownKey] = useState(0) // ✅ Track key to force re-render
    const [otpCode, setOtpCode] = useState("")
    const { loading } = useSelector(state => state.users)
    const navigate = useNavigate()


    const handleResendClick = () => {
        setResendEnabled(false) // Disable button
        setCountdownKey(prevKey => prevKey + 1) // Reset countdown
        dispatch(resendCode(searchParams.get("email")))
    }

    const handleTimerComplete = () => {
        setResendEnabled(true);
    };

    const onChange = async (text) => {
        console.log('onChange:', text);
        setOtpCode(text)
        const OTPData = { email: searchParams.get("email"), otp: text }
        const response = await dispatch(setOTPCode(OTPData))
        if (setOTPCode.fulfilled.match(response)) navigate({
            pathname: "/set-password",
            search: OTPData,
        })
    };
    const onInput = (value) => {
        console.log('onInput:', value.join(""));
        setOtpCode(value.join(""))
    };

    const onSubmit = async (event) => {
        event.preventDefault()        
        const OTPData = { email: searchParams.get("email"), otp: otpCode }
        const response = await dispatch(setOTPCode(OTPData))
        if (setOTPCode.fulfilled.match(response)) navigate(`/set-password?email=${OTPData.email}&otp=${OTPData.otp}`)
    }

    const sharedProps = {
        onChange,
        onInput,
    };


    return (
        <section className="set-top grid place-items-center w-full p-10">
            <div className="w-3/4 max-md:w-full">
                <AuthHeader title={"كود OTP"} desc={"برجاء ادخال الكود الذي وصل اليك"} />
                <form className="mt-8 flex flex-col gap-6" onSubmit={onSubmit}>
                    <div className="w-full flex justify-center" dir='ltr'>
                        <Input.OTP className='otp-input' length={6} formatter={(str) => str.toUpperCase()} {...sharedProps} />
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <span>سيتم ارسال الكود خلال</span>
                        <Countdown
                            key={countdownKey}
                            date={Date.now() + 30000}
                            renderer={({ minutes, seconds }) => {
                                if (resendEnabled) {
                                    return <span>00:00</span>
                                } else return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>
                            }}
                            onComplete={handleTimerComplete}
                        />
                    </div>
                    <BaseButton title={"تغير كلمة المرور"} isLoading={loading} />
                </form>
                <p className='text-sm mt-4'>
                    <span>لم يتم إرسال الرمز؟ إعادة </span>
                    <button className='hover:underline text-primary-400 disabled:opacity-50 disabled:pointer-events-none'
                        disabled={!resendEnabled}
                        onClick={handleResendClick}>إرسال</button>                    
                </p>
            </div>
        </section>
    )
}

export default SetOtp