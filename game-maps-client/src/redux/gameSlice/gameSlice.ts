import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IGame } from "../../models/game";
import axios from "../../services/axios";


const initialState: InitialState<IGame[]> = {

}

export const GetGames = createAsyncThunk("GetGames", async () => {
    let res = await axios.get<IGame[]>("/Game/GetGames");
    return res.data
})

const game = createSlice({
    name: "game",
    initialState,
    reducers: {},
    extraReducers: b => {
        b.addCase(GetGames.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        })
    }
});

export default game.reducer