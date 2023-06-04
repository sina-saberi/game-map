import React from 'react'
import { IRegister } from '../../models/register';
import { useAppDispatch } from '../../hooks/useRedux';
import { RegisterUser } from '../../redux/userSlice/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [data, setData] = React.useState<IRegister>({ email: "", password: "", userName: "" });
    const disabled = (data.email == "" || data.password == "" || data.password == "");

    const submit = React.useCallback(async () => {
        try {
            unwrapResult(await dispatch(RegisterUser(data)));
            navigate("/auth/login")
        } catch (er) {

        }
    }, [disabled, data, dispatch, navigate])

    return (
        <div className='flex flex-col gap-5'>
            <label className='flex flex-col font-bold'>
                User Name
                <div className='border px-2 py-1 rounded-md font-normal'>
                    <input value={data.userName} onChange={(e) => setData(x => ({ ...x, userName: e.target.value }))} />
                </div>
            </label>
            <label className='flex flex-col font-bold'>
                Email
                <div className='border px-2 py-1 rounded-md font-normal'>
                    <input value={data.email} onChange={(e) => setData(x => ({ ...x, email: e.target.value }))} />
                </div>
            </label>
            <label className='flex flex-col font-bold'>
                Password
                <div className='border px-2 py-1 rounded-md font-normal'>
                    <input value={data.password} onChange={(e) => setData(x => ({ ...x, password: e.target.value }))} />
                </div>
            </label>
            <div>
                <button onClick={() => !disabled && submit()} disabled={disabled} className={`${disabled ? "bg-gray-400" : "bg-green-400"} w-full text-white rounded-sm px-1 py-1`}>Submit</button>
            </div>
        </div>
    )
}

export default Register