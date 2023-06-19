import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import Leaflet from 'leaflet';
import markers from "./marker.json";
import LocationDetail from './LocationDetail';
import { updateLocation } from '../redux/locationSlice/locationSlice';
import CreateNewLcationComponent from './CreateNewLcationComponent';
import { ILocation } from '../models/location';

const Locations: React.FC<{ onZoomChange?: (zoom: number) => void }> = ({ onZoomChange, }) => {
    const locations = useAppSelector(x => x.location);
    const filter = useAppSelector(s => s.filters.data);
    const PopupRef = React.useRef<Leaflet.Popup>(null);
    
    const dispatch = useAppDispatch()
    const [detail, setDetail] = React.useState<number | undefined>(undefined);

    useMapEvents({
        zoomend: (props) => { onZoomChange && onZoomChange(props.sourceTarget._animateToZoom); },
    });

    const defaultMarkImage = `<img style="width:26px;height:40px;object-fit:cover;right: 6px;position: relative;" src="/assets/images/custom-marker.png"/>`

    const filters = (x: ILocation) => {
        if (x.categorieName) {
            return filter?.filters[x.categorieName] === undefined || filter.filters[x.categorieName]
        }
        return true;
    }

    const isDoneFilter = (x: ILocation) => {
        if (filter && !filter.showDone)
            return x.isDone !== true
        return true;
    }

    const searchfilter = (x: ILocation) => {
        if (filter && filter.search)
            return x.title.toLocaleLowerCase().match(filter.search.toLowerCase())
        return true
    }



    return (
        <React.Fragment>
            {locations.data && locations.data
                .filter(filters)
                .filter(isDoneFilter)
                .filter(searchfilter)
                .map((loc, index) => {
                    const icon = markers[loc.icon as keyof typeof markers];
                    return <Marker
                        opacity={loc.isDone ? 0.2 : 1.0}
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
                        <Popup ref={PopupRef}>
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
export default React.memo(Locations)