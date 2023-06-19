import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILocation } from "../../models/location";
import axios from "../../services/axios";
import { ILocationDetail } from "../../models/locationDetail";
import { IMarker } from "../../models/marker";

const initialState: InitialState<ILocation[], { data?: ILocationDetail, loading: boolean }> = {};

export const GetLocations = createAsyncThunk("getLocations", async (slug: string) => {
    let res = await axios.get<ILocation[]>("/Location/GetLocations", { params: { slug } });
    return res.data;
})

export const GetLocation = createAsyncThunk("GetLocation", async (id: number) => {
    let res = await axios.get<ILocationDetail>("/Location/GetLocation", { params: { id } });
    return res.data;
})

export const SetMarker = createAsyncThunk("SetMarker", async (marker: IMarker) => {
    let res = await axios.post<IMarker>("/Location/MarkLocation", marker);
    return res.data;
});

export const SubmitLocation = createAsyncThunk("SubmitLocation", async (model: {
    id: number,
    "title": string,
    "description": string,
    "latitude": number,
    "longitude": number,
    "mapSlug": string
}) => {
    let res = await axios.post<ILocation>("/Location/AddLocation", model);
    return res.data;
});

export const DeleteLocation = createAsyncThunk("DeleteLocation", async (Id: number) => {
    let res = await axios.delete<ILocation>("/Location/RemoveLocation", { params: { Id } });
    return res.data;
});

const location = createSlice({
    name: "location",
    initialState,
    reducers: {
        addLocation: (state, action: PayloadAction<ILocation>) => {
            if (state.data)
                state.data = [...state.data, action.payload];
        },
        deleteLocation: (state, action: PayloadAction<number>) => {
            if (state.data) {
                state.data = state.data.filter((item) => {
                    return item.id !== action.payload;
                })
            }
        },
        updateLocation: (state, action: PayloadAction<ILocation>) => {
            if (state.data)
                state.data = [
                    ...state.data.filter(x => x.id !== action.payload.id), action.payload]
        }
    },
    extraReducers(builder) {
        builder.addCase(GetLocations.pending, (state, action) => {
            state.data = undefined;
            state.loading = true;
        });
        builder.addCase(GetLocations.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(GetLocation.pending, (state) => {
            state.detail = {
                loading: false,
            }
        })
        builder.addCase(GetLocation.fulfilled, (state, action) => {
            state.detail = {
                ...state.detail,
                loading: false,
                data: action.payload
            }
        });
        builder.addCase(SetMarker.fulfilled, (state, action) => {
            if (state.data) {
                state.data = state.data.map(x => {
                    if (x.id === action.payload.locationId) {
                        const ong = { ...x, isDone: action.payload.isDone } as ILocation
                        return ong
                    }
                    return x
                })
            }
        });
        builder.addCase(SubmitLocation.fulfilled, (state, action) => {
            if (state.data) {
                let arr = state.data.filter(x => x.id !== action.meta.arg.id);
                state.data = [...arr, action.payload];
            }

        });
        builder.addCase(DeleteLocation.fulfilled, (state, action) => {
            if (state.data)
                state.data = state.data.filter(x => x.id !== action.meta.arg);
        })
    },
})

export const { addLocation, deleteLocation, updateLocation } = location.actions
export default location.reducer