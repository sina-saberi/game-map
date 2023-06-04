import React from 'react'
import { useCookies } from 'react-cookie';
import { NavLink, useNavigate } from 'react-router-dom'

interface IAuthLayout {
    children: React.ReactElement
}

const AuthLayout: React.FC<IAuthLayout> = ({ children }) => {
    
    return (
        <div className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-white px-4 py-5 min-h-[250px] justify-end flex flex-col min-w-[250px] max-w-[250px] rounded-lg'>
            {children}
            <div className='w-full justify-between flex mt-5 self-end'>
                <NavLink to={"/auth/login"} className={({ isActive }) => `${isActive ? "bg-blue-300" : "bg-gray-50"} w-full py-1 rounded-s-md flex justify-center items-center`}>Login</NavLink>
                <NavLink to={"/auth/register"} className={({ isActive }) => `${isActive ? "bg-blue-300" : "bg-gray-50"} w-full py-1 rounded-e-md flex justify-center items-center`}>register</NavLink>
            </div>
        </div>
    )
}

export default AuthLayout