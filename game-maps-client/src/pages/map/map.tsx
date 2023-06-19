import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useNavigate, useParams } from 'react-router-dom';
import { GetMap, GetMaps } from '../../redux/mapSlice/mapSlice';
import { GetLocations, addLocation } from '../../redux/locationSlice/locationSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { GetGroups } from '../../redux/groupSlice/groupSlice';
import Leaflet from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import Locations from '../../modules/Locations';
import Select from '../../components/Select';
import { ICategorie } from '../../models/categorie';
import { useCookies } from 'react-cookie';
import LocationGroupMenu from '../../modules/LocationGroupMenu';

const Map = () => {
    const { slug } = useParams<{ slug: string }>();
    const [track, setTrack] = React.useState<string>("");
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
                type: "mark",
                title: ""
            }))
    }

    return (
        <div className='w-full h-full'>
            {map.detail && (
                <React.Fragment>
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
                        <LocationGroupMenu />
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


                        <TileLayer
                            ref={TileRef}
                            bounds={[
                                [map.detail.endtLatBound, map.detail.endtLonBound],
                                [map.detail.startLatBound, map.detail.startLonBound]
                            ]}

                            url={`https://tiles.mapgenie.io${map.detail.path}/{z}/{x}/{y}.${map.detail.extension}`} />
                        <Locations />
                    </MapContainer>
                </React.Fragment>
            )}
        </div>
    )
}



export default React.memo(Map)