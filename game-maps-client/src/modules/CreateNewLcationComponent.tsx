import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { deleteLocation, SubmitLocation } from "../redux/locationSlice/locationSlice";

const CreateNewLcationComponent: React.FC<{ id: number, lat: number, lng: number }> = ({ id, lat, lng }) => {
    const dispatch = useAppDispatch();
    const map = useAppSelector(s => s.map.detail);
    const [data, setData] = React.useState<{ title: string, description: string }>({ title: "", description: "" });

    const onClickSaveLocation = () => {
        if (map)
            dispatch(SubmitLocation({
                id: id,
                description: data.description,
                title: data.title,
                latitude: lat,
                longitude: lng,
                mapSlug: map.slug
            }))
    }

    return (
        <div className="py-3">
            <div className="my-5 flex flex-col gap-3">
                <label className="flex flex-col text-sm">
                    <input onChange={(e) => setData(p => ({ ...p, title: e.target.value }))} value={data.title} placeholder="title" className="bg-gray-100 rounded-md px-4 py-1" />
                </label>
                <label style={{ objectFit: "fill" }} className="flex flex-col text-lg">
                    <textarea onChange={(e) => setData(p => ({ ...p, description: e.target.value }))} value={data.description} placeholder="description" rows={4} className="text-sm bg-gray-100 rounded-md px-4 py-1 resize-none outline-none" ></textarea>
                </label>
            </div>
            <div className='flex gap-2'>
                <button onClick={() => dispatch(deleteLocation(id))} className='bg-red-600 px-2 rounded-md py-1 text-white'>remove location</button>
                <button onClick={() => onClickSaveLocation()} className='bg-green-600 px-2 rounded-md py-1 text-white'>save location</button>
            </div>
        </div >
    )
}

export default CreateNewLcationComponent