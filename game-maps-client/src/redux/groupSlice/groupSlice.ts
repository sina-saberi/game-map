import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IGroups } from "../../models/group";
import axios from "../../services/axios";

const initialState: InitialState<IGroups[]> = {};

export const GetGroups = createAsyncThunk("GetGroups", async (slug: string) => {
    let res = await axios.get<IGroups[]>("/Group/GetGroups", { params: { slug } });
    return res.data;
})

const group = createSlice({
    name: "group",
    initialState,
    reducers: {},
    extraReducers: (b) => {
        b.addCase(GetGroups.pending, (state) => {
            state.data = undefined;
            state.loading = true;
        })
        b.addCase(GetGroups.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        })
    }
})

export default group.reducer