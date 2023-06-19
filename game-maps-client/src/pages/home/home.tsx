import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { GetGames } from '../../redux/gameSlice/gameSlice';
import { Link } from 'react-router-dom';

const Home = () => {
    const state = useAppSelector(s => s.game);
    const dispatch = useAppDispatch()

    const getData = React.useCallback(() => {
        dispatch(GetGames());
    }, [dispatch]);

    React.useEffect(() => {
        getData()
    }, [getData]);

    return (
        <div className='p-4'>
            <ul className='flex flex-wrap'>
                {state.data && state.data.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link to={`/map/${item.slug}`}>
                                <div className='flex flex-col justify-center items-center'>
                                    <div className='w-52 h-52 rounded-lg overflow-hidden'>
                                        <img className='w-full h-full object-cover' alt={item.image} src={`${window.settings.url}/${item.image}`} />
                                    </div>
                                    <h4 className='font-bold mt-4 text-2xl'>
                                        {item.title}
                                    </h4>
                                </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Home