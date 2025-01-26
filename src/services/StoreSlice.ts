import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import $api from "../api";
import { InitialState, AddProduct, GetProducts, GetOne } from "./types";

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
    name: "",
    imageUrl: "",
    count: null,
    size: {
      width: null,
      height: null,
    },
    weight: "",
    comments: [],
  },
  deleteProduct: {
    loading: false,
    success: false,
    error: null,
    modalOpen: false,
  },
  getOne: {
    data: {
        id: '',
        imageUrl: '',
        name: '',
        count: null,
        size: {
            width: null,
            height: null
        },
        weight: '',
        comments: []
    },
    loading: false,
    success: false,
    error: null,
  },
};

export const getProducts = createAsyncThunk<
  GetProducts[],
  void,
  { rejectValue: string }
>("store/products", async (_, thunkApi) => {
  try {
    let response = await $api.get("/products");
    console.log(response.data);
    return thunkApi.fulfillWithValue(response.data);
  } catch (e) {
    return thunkApi.rejectWithValue("Failed to fetch products");
  }
});

export const addProduct = createAsyncThunk<
  AddProduct,
  AddProduct,
  { rejectValue: string }
>("store/addProduct", async (product, thunkApi) => {
  try {
    const response = await $api.post("/products", product);
    return thunkApi.fulfillWithValue(response.data);
  } catch (e) {
    return thunkApi.rejectWithValue("Failed to fetch products");
  }
});

export const deleteProduct = createAsyncThunk<
  void,
  String | Number,
  { rejectValue: string }
>("store/deleteProduct", async (id, thunkApi) => {
  try {
    await $api.delete(`/products/${id}`);
    thunkApi.dispatch(getProducts());
  } catch (e) {
    return thunkApi.rejectWithValue("Failed to delete product");
  }
});

export const getOne = createAsyncThunk<GetOne, Number | String, { rejectValue: string }>(
  "store/getOne",
  async (id, thunkApi) => {
    try {
      let response = await $api.get(`products/${id}`);
      return thunkApi.fulfillWithValue(response.data);
    } catch (e) {
      return thunkApi.rejectWithValue("Failed to get product");
    }
  }
);

export const storeSlice = createSlice({
  name: "store",
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
      state.addProduct.size.width = action.payload;
    },
    setHeight: (state, action: PayloadAction<number | null>) => {
      state.addProduct.size.height = action.payload;
    },
    setWeight: (state, action: PayloadAction<string>) => {
      state.addProduct.weight = action.payload;
    },
    resetProduct: (state) => {
      state.addProduct = {
        ...initialState.addProduct,
      };
    },
    setAddProductSuccess: (state) => {
      state.addProduct.success = false;
    },
    setDeleteModal: (state, action: PayloadAction<boolean>) => {
      state.deleteProduct.modalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.getProducts.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        (state.getProducts.loading = false), (state.getProducts.success = true);
        state.getProducts.productsData = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.getProducts.loading = false;
        state.getProducts.error =
          action.error.message || "Unknown error occurred";
      })
      .addCase(addProduct.pending, (state) => {
        state.addProduct.loading = true;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.addProduct.loading = false;
        state.addProduct.success = true;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addProduct.loading = false;
        state.addProduct.error =
          action.error.message || "Unknown error occurred";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.deleteProduct.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.deleteProduct.loading = false;
        state.deleteProduct.success = true;
        state.deleteProduct.modalOpen = false;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.deleteProduct.loading = false;
      })
      .addCase(getOne.pending, (state) => {
        state.getOne.loading = true;
      })
      .addCase(getOne.fulfilled, (state, action) => {
        state.getOne.loading = false;
        state.getOne.success = true;
        state.getOne.data = action.payload;
      })
      .addCase(getOne.rejected, (state, action) => {
        state.getOne.loading = false;
        state.getOne.error = action.error.message || "Unknown error occurred";
      });
  },
});

export const actions = storeSlice.actions;
export default storeSlice.reducer;
