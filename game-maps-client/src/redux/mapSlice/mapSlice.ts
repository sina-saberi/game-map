import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMap, IMapDetail } from "../../models/map";
import axios from "../../services/axios";

const initialState: InitialState<IMap[], IMapDetail> = {}


export const GetMaps = createAsyncThunk("GetMaps", async (slug: string) => {
    let res = await axios.get<IMap[]>("/Map/GetMaps", { params: { slug } });
    return res.data;
})

export const GetMap = createAsyncThunk("GetMap", async (slug: string) => {
    let res = await axios.get<IMapDetail>("/Map/GetMap", { params: { slug } });
    return res.data;
})

const map = createSlice({
    name: "map",
    initialState,
    reducers: {
    },
    extraReducers: (b) => {
        b.addCase(GetMaps.pending, (state) => {
            state.data = undefined;
            state.loading = true;
        });
        b.addCase(GetMaps.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        });
        b.addCase(GetMap.pending, (state) => {
            state.detail = undefined;
            state.loading = true;
        })
        b.addCase(GetMap.fulfilled, (state, action) => {
            state.detail = action.payload;
            state.loading = false;
        });
    }
})


export const { } = map.actions;
export default map.reducer;