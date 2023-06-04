import React from 'react';
import { Cookies, useCookies } from 'react-cookie';
import axios from '../services/axios';
import { createSearchParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

interface IMainLayout {
    children: React.ReactElement
}
const MainLayout: React.FC<IMainLayout> = ({ children }) => {
    const [cookie, _, remove] = useCookies(["GameMaps"]);
    const navigate = useNavigate();

    axios.interceptors.request.use(x => {
        const cookies = new Cookies("GameMaps");
        const token = cookies.get("GameMaps");
        if (token)
            x.headers.Authorization = "Bearer " + token;
        return x;
    }, e => e)

    axios.interceptors.response.use(x => x, e => {
        if (e.response.status && e.response.status === 401) {
            const cookies = new Cookies("GameMaps");
            if (cookies.get("GameMaps")) {
                cookies.remove("GameMaps")
            }
            navigate("/auth/login");
        }
        throw e
    })

    const goToLogin = React.useCallback(() => {
        navigate({
            pathname: "/auth/login",
            search: `${createSearchParams({ url: window.location.href })}`
        });
    }, [navigate])

    return (
        <div className='h-screen flex flex-col'>
            {children}
        </div>
    )
}

export default MainLayout