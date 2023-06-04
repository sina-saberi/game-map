import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { Marker, Popup, useMapEvents, } from 'react-leaflet';
import Leaflet from 'leaflet';
import markers from "./marker.json";
import LocationDetail from './LocationDetail';
import { updateLocation } from '../redux/locationSlice/locationSlice';
import CreateNewLcationComponent from './CreateNewLcationComponent';

const Locations: React.FC<{ onZoomChange?: (zoom: number) => void, filter: { [name: string]: boolean } }> = ({ onZoomChange, filter }) => {
    const locations = useAppSelector(x => x.location);
    const dispatch = useAppDispatch()
    const [detail, setDetail] = React.useState<number | undefined>(undefined);

    useMapEvents({
        zoomend: (props) => { onZoomChange && onZoomChange(props.sourceTarget._animateToZoom); },
    });
    const defaultMarkImage = `<img style="width:26px;height:40px;object-fit:cover;right: 6px;position: relative;" src="/assets/images/custom-marker.png"/>`

    return (
        <React.Fragment>
            {locations.data && locations.data?.filter(x => x.categorieName ? filter[x.categorieName] == undefined ? true : filter[x.categorieName] : true)
                ?.map((loc, index) => {
                    const icon = markers[loc.icon as keyof typeof markers];
                    return <Marker
                        opacity={loc.isDone ? 0.4 : 1.0}
                        icon={Leaflet.divIcon({
                            html: icon ?
                                `<img style="position: absolute;top: -59px;left: -27.5px;scale: 0.5;width: ${icon.width}px;height: ${icon.height}px;object-fit: cover;object-position: 0 -${icon.y}px;" src="${require("./markers.png")}"/>`
                                :
                                defaultMarkImage
                        })}
                        eventHandlers={{
                            click: () => setDetail(loc.id),
                            popupclose: () => setDetail(undefined),
                            dragend: (e) => {
                                dispatch(updateLocation({ ...loc, latitude: e.target._latlng.lat, longitude: e.target._latlng.lng }))
                            }
                        }}
                        autoPan
                        key={index}
                        position={[loc.latitude, loc.longitude]}
                        draggable={loc.isNewItem}
                        zIndexOffset={loc.isNewItem ? 99999 : undefined}
                    >
                        <Popup>
                            {(detail && !loc.isNewItem) &&
                                <LocationDetail id={detail} />
                            }
                            {(loc.isNewItem) &&
                                <CreateNewLcationComponent lng={loc.longitude} lat={loc.latitude} id={loc.id} />
                            }
                        </Popup>
                    </Marker>
                })}
        </React.Fragment>
    )
}



export default Locations