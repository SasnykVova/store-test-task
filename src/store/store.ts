import { configureStore } from "@reduxjs/toolkit";
import { storeSlice } from "../services/StoreSlice";

export const store = configureStore({
    reducer: {
        productPage: storeSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch