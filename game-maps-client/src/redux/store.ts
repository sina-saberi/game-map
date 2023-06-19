import { configureStore } from "@reduxjs/toolkit";
import game from "./gameSlice/gameSlice";
import map from "./mapSlice/mapSlice";
import groups from "./groupSlice/groupSlice";
import location from "./locationSlice/locationSlice";
import filters from "./filtersSlice/filtersSlice";

const store = configureStore({
    reducer: {
        game, map, groups, location, filters
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store;