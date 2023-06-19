import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useRedux';
import { ILogin } from '../../models/login';
import { LoginUser } from '../../redux/userSlice/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useCookies } from 'react-cookie';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [data, setData] = React.useState<ILogin>({ email: "", password: "", });
    const disabled = (data.email === "" || data.password === "" || data.password === "");
    const [, setCookie] = useCookies(["GameMaps"]);

    const submit = React.useCallback(async () => {
        try {
            let res = unwrapResult(await dispatch(LoginUser(data)));
            let date = new Date();
            date.setHours(new Date().getHours() + 10);
            setCookie('GameMaps', res, {
                expires: date,
                sameSite: true,
            });
            navigate("/");
        } catch (er) {

        }
    }, [data, dispatch, navigate, setCookie])


    return (
        <form onSubmit={(e) => { !disabled && submit(); e.preventDefault(); }} className='flex flex-col gap-5'>
            <label className='flex flex-col font-bold'>
                Email
                <div className='border px-2 py-1 rounded-md font-normal'>
                    <input type='email' value={data.email} onChange={(e) => setData(x => ({ ...x, email: e.target.value }))} />
                </div>
            </label>
            <label className='flex flex-col font-bold'>
                Password
                <div className='border px-2 py-1 rounded-md font-normal'>
                    <input type='password' value={data.password} onChange={(e) => setData(x => ({ ...x, password: e.target.value }))} />
                </div>
            </label>
            <div>
                <button disabled={disabled} className={`${disabled ? "bg-gray-400" : "bg-green-400"} w-full text-white rounded-sm px-1 py-1`}>Submit</button>
            </div>
        </form>
    )
}

export default Login