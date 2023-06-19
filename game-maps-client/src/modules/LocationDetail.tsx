import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import { DeleteLocation, GetLocation, SetMarker } from '../redux/locationSlice/locationSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useMap } from 'react-leaflet';

const LocationDetail: React.FC<{ id: number, onClose?: () => void }> = ({ id, onClose }) => {
    const [checked, setChekec] = React.useState<boolean>(false);
    const state = useAppSelector(x => x.location.detail);
    const filter = useAppSelector(x => x.filters.data);
    const map = useMap();
    const dispatch = useAppDispatch();

    const getData = React.useCallback(async () => {
        try {
            let res = unwrapResult(await dispatch(GetLocation(id)));
            setChekec(res.isDone);
        } catch (er) { }
    }, [dispatch, id]);

    React.useEffect(() => {
        getData();
    }, [getData]);

    const onChangeStatus = React.useCallback((isDone: boolean) => {
        dispatch(SetMarker({ isDone, locationId: id }));
        setChekec(isDone);
        onClose && onClose();
        if (filter && !filter.showDone) {
            map.closePopup();
        }
    }, [dispatch, onClose, id, map, filter])

    if (state && state.data)
        return (
            <div>
                {(state && state.data) && (
                    <div>
                        <h2 className='font-bold'>{state.data.title}</h2>
                        <div>
                            {(state.data.medias) && (
                                <div>
                                    {state.data.medias.map((media, index) => (
                                        <div key={index}>
                                            <img alt='' src={`https://media.mapgenie.io/storage/media/${media.fileName}`} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <p>
                            {state.data.description}
                        </p>
                        {state.data.type !== "mark" &&
                            <div>
                                <label className='select-none font-bold flex gap-3 my-3 justify-center items-center'>
                                    mark as faund
                                    <button onClick={(p) => { onChangeStatus(!checked); p.preventDefault(); }} className='w-6 h-6 p-0.5 rounded border flex justify-center items-center'>
                                        {checked && <svg className='w-full h-full' xmlns="http://www.w3.org/2000/svg" zoomAndPan="magnify" viewBox="0 0 30 30.000001" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="id1"><path d="M 2.328125 4.222656 L 27.734375 4.222656 L 27.734375 24.542969 L 2.328125 24.542969 Z M 2.328125 4.222656 " clipRule="nonzero" /></clipPath></defs><g clipPath="url(#id1)"><path fill="rgb(13.729858%, 12.159729%, 12.548828%)" d="M 27.5 7.53125 L 24.464844 4.542969 C 24.15625 4.238281 23.65625 4.238281 23.347656 4.542969 L 11.035156 16.667969 L 6.824219 12.523438 C 6.527344 12.230469 6 12.230469 5.703125 12.523438 L 2.640625 15.539062 C 2.332031 15.84375 2.332031 16.335938 2.640625 16.640625 L 10.445312 24.324219 C 10.59375 24.472656 10.796875 24.554688 11.007812 24.554688 C 11.214844 24.554688 11.417969 24.472656 11.566406 24.324219 L 27.5 8.632812 C 27.648438 8.488281 27.734375 8.289062 27.734375 8.082031 C 27.734375 7.875 27.648438 7.679688 27.5 7.53125 Z M 27.5 7.53125 " fillOpacity="1" fillRule="nonzero" /></g></svg>}
                                    </button>
                                </label>
                            </div>
                        }
                        {state.data.type === "mark" &&
                            <div className='flex gap-2'>
                                <button onClick={() => { dispatch(DeleteLocation(id)) }} className='bg-red-600 px-2 rounded-md py-1 text-white'>remove location</button>
                            </div>
                        }
                    </div>
                )}
            </div>
        )
    else {
        return <div></div>
    }
}

export default LocationDetail