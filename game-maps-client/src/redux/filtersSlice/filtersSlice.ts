import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type filterTypes = { [name: string]: boolean }

const initialState: InitialState<{ filters: filterTypes, search: string, showDone: boolean }> = {
    data: {
        filters: {},
        search: "",
        showDone: true
    }
}

const filters = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setShowDone: (state, action: PayloadAction<(state: boolean) => boolean>) => {
            if (state.data)
                state.data.showDone = action.payload(state.data.showDone)
        },
        setSearch: (state, action: PayloadAction<string>) => {
            if (state.data) {
                state.data.search = action.payload;
                state.data.filters = {};
                state.data.showDone = false;
            }
        },
        setFilters: (state, action: PayloadAction<(state: filterTypes) => filterTypes>) => {
            if (state.data)
                state.data.filters = action.payload(state.data.filters);
        }
    }
});

export const { setFilters, setSearch, setShowDone } = filters.actions;
export default filters.reducer;