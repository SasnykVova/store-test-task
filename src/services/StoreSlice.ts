import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import $api from "../api";
import { InitialState, StoreState } from "./types";

interface Product {
    name: string;
    imageUrl: string;
    count: number | null;
    width: number | null;
    height: number | null;
    weight: string;
  }
  

const initialState: InitialState = {
    getProducts: {
        productsData: [],
        loading: false,
        success: false,
        error: null,
    },
    addProduct: {
        loading: false,
        success: false,
        error: null,
        name: '',
        imageUrl: '',
        count: null,
        width: null,
        height: null,
        weight: '',
    }

}

export const getProducts = createAsyncThunk<
    StoreState[],
    void,
    { rejectValue: string }
>(
    'store/products',
    async (_, thunkApi) => {
        try {
            let response = await $api.get('/products')
            console.log(response.data)
            return thunkApi.fulfillWithValue(response.data)
        } catch (e) {
            return thunkApi.rejectWithValue("Failed to fetch products")
        }
    }
)

export const addProduct = createAsyncThunk<
StoreState, 
Product, 
{ rejectValue: string } 
>(
    'store/addProduct',
    async (product, thunkApi) => {
        try{
            const response = await $api.post("/products", product);
            return thunkApi.fulfillWithValue(response.data);
        } catch (e) {
            return thunkApi.rejectWithValue("Failed to fetch products")
        }
    }
)

export const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.addProduct.name = action.payload;
        },
        setImageUrl: (state, action: PayloadAction<string>) => {
            state.addProduct.imageUrl = action.payload;
        },
        setCount: (state, action: PayloadAction<number | null>) => {
            state.addProduct.count = action.payload;
        },
        setWidth: (state, action: PayloadAction<number | null>) => {
            state.addProduct.width = action.payload;
        },
        setHeight: (state, action: PayloadAction<number | null>) => {
            state.addProduct.height = action.payload;
        },
        setWeight: (state, action: PayloadAction<string>) => {
            state.addProduct.weight = action.payload;
        },
        resetProduct: (state) => {
            state.addProduct = {
            ...initialState.addProduct,
        }},
        setAddProductSuccess: (state) => {
            state.addProduct.success = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.getProducts.loading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.getProducts.loading = false,
                state.getProducts.success = true
                state.getProducts.productsData = action.payload
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.getProducts.loading = false
                state.getProducts.error = action.payload || "Unknown error occurred";
            })
            .addCase(addProduct.pending, (state) => {
                state.addProduct.loading = true; 
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.addProduct.loading = false;
                state.addProduct.success = true
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.addProduct.loading = false;
                state.addProduct.error = action.payload || "Failed to create product";
            });
    }

})

export const actions = storeSlice.actions;
export default storeSlice.reducer;