import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartitems: [],
  isLoading: false,
  error: null,
};


var token = sessionStorage.getItem("Token");
var id = sessionStorage.getItem("LoginId");
console.log("tokeldkfgslfdgjdshgfkshfdgdkjfhsgkjfhdgn", token);



export const cartView = createAsyncThunk("content/cartView", async () => {
  const res = await axios.get(`http://localhost:2222/api/user/cartview/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.data.data;
  return data;
});
export const incrementqty = createAsyncThunk(
  "content/cartIncrement",
  async (id, item) => {
    console.log(id);
    // console.log(item);

    const res = await axios.get(
      `http://localhost:2222/api/user/cartincrement/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data.data;
    return data;
  }
);
export const decrementqty = createAsyncThunk(
  "content/cartdecrement",
  async (id) => {
    console.log(id);
    // console.log(item);

    const res = await axios.get(
      `http://localhost:2222/api/user/cartdecrement/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.data.data;
    return data;
  }
);

export const cartdelete = createAsyncThunk("content/cartdelete", async (id) => {
  const res = await axios.get(
    `http://localhost:2222/api/user/cartdelete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.data;
  return data;
});

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // View Cart items
    builder.addCase(cartView.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(cartView.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartitems = action.payload;
      // console.log(action.payload);
    });
    builder.addCase(cartView.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    //Increment Qty

    builder.addCase(incrementqty.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(incrementqty.fulfilled, (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      var cart_qty = action.payload.cart_qty;
      var availableQty = action.payload.availableQty;
      console.log("cart_qty", action.payload);

      var id = action.payload._id;
      const updatedData = state.cartitems.filter((details) => {
        if (details._id == id) {
          details.cart_qty = details.cart_qty + 1;
        }
        return details;
      });
      state.cartitems = updatedData;
      // console.log(action.payload);
    });
    builder.addCase(incrementqty.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    //Cart Decrement

    builder.addCase(decrementqty.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(decrementqty.fulfilled, (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      var cart_qty = action.payload.cart_qty;
      var availableQty = action.payload.availableQty;
      console.log("cart_qty", action.payload);

      var id = action.payload._id;
      const updatedData = state.cartitems.filter((details) => {
        if (details._id == id) {
          if (details.cart_qty > 1) {
            details.cart_qty = details.cart_qty - 1;
          }
        }
        return details;
      });
      state.cartitems = updatedData;
      // console.log(action.payload);
    });
    builder.addCase(decrementqty.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    //Cart Delete

    builder.addCase(cartdelete.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(cartdelete.fulfilled, (state, action) => {
      state.isLoading = false;
      var id = action.payload.id;
      console.log(id);
      const updatedData = state.cartitems.filter((details) => {
        return details._id !== id;
      });
      state.cartitems = updatedData;
    });
    builder.addCase(cartdelete.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});
// export const { extraReducers } = contentSlice.actions;
export default contentSlice.reducer;
