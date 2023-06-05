import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useNavigate, useParams } from 'react-router-dom';
import { GetMap, GetMaps } from '../../redux/mapSlice/mapSlice';
import { GetLocations, addLocation } from '../../redux/locationSlice/locationSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { GetGroups } from '../../redux/groupSlice/groupSlice';
import Icon from '../../components/Icon';
import Leaflet from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import Locations from '../../modules/Locations';
import Select from '../../components/Select';
import { ICategorie } from '../../models/categorie';
import { useCookies } from 'react-cookie';
import { IGroups } from '../../models/group';

const Map = () => {
    const { slug } = useParams<{ slug: string }>();
    const [menu, setMenu] = React.useState(true);
    const [filters, setFilters] = React.useState<{ [name: string]: boolean }>({});
    const [search, setSearch] = React.useState<string>("");
    const [track, setTrack] = React.useState<string>("");
    const [showDone, setShowDone] = React.useState<boolean>(true);
    const groups = useAppSelector(s => s.groups);
    const location = useAppSelector(s => s.location);
    const map = useAppSelector(s => s.map);
    const TileRef = React.useRef<Leaflet.TileLayer>(null);
    const [coockie] = useCookies(["GameMaps"]);
    const MapRef = React.useRef<Leaflet.Map>(null);
    const dispatch = useAppDispatch();
    const nav = useNavigate();

    const ChangeMapSetting = React.useCallback(async (mapSlug: string) => {
        try {
            await dispatch(GetMap(mapSlug));
            await dispatch(GetGroups(mapSlug));
            await dispatch(GetLocations(mapSlug));
        } catch (er) { }
    }, [dispatch]);

    const GetData = React.useCallback(async () => {
        if (slug) {
            var res = unwrapResult(await dispatch(GetMaps(slug)));
            if (res && res[0]) {
                ChangeMapSetting(res[0].slug)
            }
        }
    }, [dispatch, slug, ChangeMapSetting]);

    React.useEffect(() => {
        GetData();
    }, [GetData]);

    const getTrack = React.useCallback(() => {
        let cat: ICategorie | undefined;
        if (track === "") return "";
        groups.data?.forEach(x => {
            let a = x.categories.find(c => c.title === track);
            if (a)
                cat = a;
        })
        if (cat && location.data)
            return `${cat.title} ${cat.count}/${location.data?.filter(x => x.categorieName === cat?.title && x.isDone).length}`
        else return ""
    }, [track, location, groups.data]);

    const onAddLocation = () => {
        if (MapRef.current)
            dispatch(addLocation({
                id: Math.random(),
                isNewItem: true,
                latitude: MapRef.current.getCenter().lat,
                longitude: MapRef.current.getCenter().lng,
                isDone: false,
                type: "mark"
            }))
    }

    const onGroupClick = (group: IGroups) => {
        setFilters(x => ({
            ...x, ...group.categories.reduce((p, c) => {
                p[c.title] = x[c.title] === undefined ? false : !x[c.title];
                return p
            }, {} as { [name: string]: boolean })
        }))
    }

    return (
        <div className='w-full h-full'>
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
                                        onClick={() => groups.data &&
                                            setFilters(groups.data.reduce((p, c) => {
                                                c.categories.forEach(x => {
                                                    p[x.title] = false
                                                })
                                                return p
                                            }, {} as { [name: string]: boolean }))}
                                        className='hover:shadow-xl text-sm shadow-md rounded-md px-2'>hidde all</button>
                                    <button onClick={() => setFilters({})} className='hover:shadow-xl text-sm shadow-md rounded-md px-2'>show all</button>
                                    <button onClick={() => setShowDone(!showDone)} className={`hover:shadow-xl text-sm shadow-md rounded-md px-2 ${showDone ? "" : "bg-yellow-100"}`}>{showDone ? "dont show done" : "show dones"}</button>
                                </div>
                                <div className='border flex rounded-md overflow-hidden my-4 shadow p-1 text-xs'>
                                    <input value={search} onChange={(e) => setSearch(e.target.value)} className='w-full h-full' placeholder='search' />
                                    {search && <button onClick={() => setSearch("")}>clear</button>}
                                </div>
                            </div>
                            {groups.data &&
                                <ul className='w-full'>
                                    {groups.data.map((group, index) =>
                                        <li key={index} className='w-full'>
                                            <button
                                                onClick={() => onGroupClick(group)}
                                                className='font-bold text-sm mt-5 mb-3 hover:shadow-md px-2 rounded-md' >{group.title}</button>
                                            {group.categories &&
                                                <ul className='w-full grid gap-2 grid-cols-2'>
                                                    {group.categories.map((cat, index) =>
                                                        <li className='col-span-1' key={index}>
                                                            <button
                                                                onClick={() => setFilters(p => ({ ...p, [cat.title]: p[cat.title] === undefined ? false : !p[cat.title] }))}
                                                                className={`${filters[cat.title] === false ? "line-through opacity-75" : ""} hover:shadow-lg px-1 text-gray-700 w-full text-sm flex items-center justify-between whitespace-nowrap gap-2`}>
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
            <div style={{ zIndex: 9999 }} className='fixed right-0 bg-white p-3'>
                {(groups.data && map.detail && coockie.GameMaps) ?
                    <React.Fragment>
                        <div className='max-h-[300px]'>
                            <Select
                                name=''
                                value=''
                                onChange={(e) => { setTrack(e) }}
                                placeholder={track ? getTrack() : `select a category`}
                                data={groups.data.reduce((p, c, i) => {
                                    c.categories.forEach((cat) => {
                                        p.push({ id: cat.title, value: cat.title })
                                    })
                                    return p
                                }, [] as { value: string, id: string }[])} />
                        </div>
                        <button
                            onClick={() => onAddLocation()}
                            className='text-xs'>add mark</button>
                    </React.Fragment>
                    :
                    <div>
                        <button onClick={() => nav("/auth/login")} className='bg-cyan-600 px-2 rounded-md py-1 text-white'>login / register</button>
                    </div>
                }
            </div>
            {map.detail && (
                <MapContainer
                    ref={MapRef}
                    style={{ width: "100%", height: "100%" }}
                    center={[map.detail.initialLat, map.detail.initialLon]}
                    zoom={map.detail.initialZoom}
                    minZoom={map.detail.minZoom}
                    maxZoom={map.detail.maxZoom}
                    zoomControl={false}
                    maxBoundsViscosity={1.0}
                    boundsOptions={{
                        animate: false,
                        duration: 0,
                        padding: [0, 0],
                        easeLinearity: 0,
                        noMoveStart: false,
                    }}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        ref={TileRef}
                        bounds={[
                            [map.detail.endtLatBound, map.detail.endtLonBound],
                            [map.detail.startLatBound, map.detail.startLonBound]
                        ]}

                        url={`https://tiles.mapgenie.io${map.detail.path}/{z}/{x}/{y}.${map.detail.extension}`} />
                    <Locations search={search} showDone={showDone} filter={filters} />
                </MapContainer>
            )}
        </div>
    )
}



export default Map