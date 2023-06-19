import React from 'react'
import { IGroups } from '../models/group';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { GetMap } from '../redux/mapSlice/mapSlice';
import { GetGroups } from '../redux/groupSlice/groupSlice';
import { GetLocations } from '../redux/locationSlice/locationSlice';
import { setFilters, setSearch, setShowDone } from '../redux/filtersSlice/filtersSlice';
import Icon from '../components/Icon';
import { ICategorie } from '../models/categorie';
import { useMap } from "react-leaflet";

const LocationGroupMenu = () => {
    const [menu, setMenu] = React.useState(true);
    const dispatch = useAppDispatch();
    const lmap = useMap();
    const map = useAppSelector(s => s.map);
    const groups = useAppSelector(s => s.groups);
    const filters = useAppSelector(s => s.filters.data);
    const locations = useAppSelector(s => s.location.data);
    const ChangeMapSetting = React.useCallback(async (mapSlug: string) => {
        try {
            await dispatch(GetMap(mapSlug));
            await dispatch(GetGroups(mapSlug));
            await dispatch(GetLocations(mapSlug));
        } catch (er) { }
    }, [dispatch]);

    const onGroupClick = (group: IGroups) => {
        dispatch(setFilters(x => ({
            ...x, ...group.categories.reduce((p, c) => {
                p[c.title] = x[c.title] === undefined ? false : !x[c.title];
                return p
            }, {} as { [name: string]: boolean })
        })))
    }

    const onCategoryClick = (cat: ICategorie) => {
        dispatch(setFilters(p => ({ ...p, [cat.title]: p[cat.title] === undefined ? false : !p[cat.title] })))
    }

    return (
        <div style={{ zIndex: 99999 }} className={`h-full transition-all fixed left-0 ${menu ? "translate-x-0" : "-translate-x-full"} bg-white shadow-md w-[350px] border-t`}>
            <div className='relative h-full'>
                <button onClick={() => setMenu(!menu)} className='absolute bg-white top-1/4 right-0 translate-x-10 text-5xl p-3'>
                    {menu ? "<" : ">"}
                </button>
                <div className='max-h-full overflow-y-auto h-full p-4'>
                    <div className='flex w-full justify-around'>
                        {map.data && map.data.map((x, i) =>
                            <button onClick={() => ChangeMapSetting(x.slug)} className={` px-2 py-1 text-sm underline rounded-lg ${map.detail?.slug === x.slug ? "bg-yellow-100  shadow-md" : ""}`} key={i}>{x.title}</button>
                        )}
                    </div>
                    <div>
                        <div>
                            <div className='gap-3 flex mt-5'>
                                <button
                                    onClick={() => {
                                        if (groups.data)
                                            dispatch(setFilters(x => ({
                                                ...x, ...groups.data!.reduce((p, c) => {
                                                    c.categories.forEach(x => {
                                                        p[x.title] = false
                                                    })
                                                    return p
                                                }, {} as { [name: string]: boolean })
                                            })))
                                    }}
                                    className='hover:shadow-xl text-sm shadow-md rounded-md px-2'>hidde all</button>
                                <button onClick={() => dispatch(setFilters(x => ({})))} className='hover:shadow-xl text-sm shadow-md rounded-md px-2'>show all</button>
                                <button onClick={() => dispatch(setShowDone(x => !x))} className={`hover:shadow-xl text-sm shadow-md rounded-md px-2 ${filters?.showDone ? "" : "bg-yellow-100"}`}>{filters?.showDone ? "dont show done" : "show dones"}</button>
                            </div>
                            <div className='border flex rounded-md overflow-hidden my-4 shadow p-2 text-xs'>
                                <input value={filters?.search || ""} onChange={(e) => dispatch(setSearch(e.target.value))} className='w-full h-full' placeholder='search' />
                                {(filters && filters.search) && <button onClick={() => dispatch(setSearch(""))}>clear</button>}
                            </div>
                            {(filters && filters.search) && (
                                <div className='w-full'>
                                    {locations && locations
                                        .filter((x, index) => x.title.toLocaleLowerCase().match(filters.search.toLowerCase()))
                                        .filter((_, index) => index <= 5).map((x, i) =>
                                            <button
                                                key={i}
                                                onClick={() => {
                                                    lmap.flyTo([x.latitude, x.longitude], lmap.getMaxZoom() - 2, {
                                                        duration: 0.5
                                                    })
                                                }}
                                                className='hover:bg-gray-100 text-xs py-2 bg-gray-50 rounded-md border items-center my-2 px-2 flex w-full justify-between'>
                                                {x.title}
                                                <div>
                                                    {x.categorieName}
                                                    {x.type}
                                                </div>
                                            </button>
                                        )}
                                </div>
                            )}
                        </div>
                        {groups.data &&
                            <ul className='w-full'>
                                {groups.data.map((group, index) =>
                                    <li key={index} className='w-full'>
                                        <button
                                            onClick={() => onGroupClick(group)}
                                            className='font-bold text-sm mt-3 mb-3 hover:shadow-md px-2 rounded-md' >{group.title}</button>
                                        {group.categories &&
                                            <ul className='w-full grid gap-2 grid-cols-2'>
                                                {group.categories.map((cat, index) =>
                                                    <li className='col-span-1' key={index}>
                                                        <button
                                                            onClick={() => onCategoryClick(cat)}
                                                            className={`${filters && filters.filters[cat.title] === false ? "line-through opacity-75" : ""} hover:shadow-lg px-1 text-gray-700 w-full text-sm flex items-center justify-between whitespace-nowrap gap-2`}>
                                                            <span className='flex'>
                                                                <span className='min-w-[20px]'>
                                                                    <Icon icon={cat.icon} />
                                                                </span>
                                                                <span className=''>{cat.title}</span>
                                                            </span>
                                                            <span className=''>{cat.count}</span>
                                                        </button>
                                                    </li>
                                                )}
                                            </ul>
                                        }
                                    </li>
                                )}
                            </ul>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(LocationGroupMenu)