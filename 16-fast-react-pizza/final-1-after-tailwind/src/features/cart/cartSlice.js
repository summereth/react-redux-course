import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],

  //   cart: [
  //     {
  //       id: 12,
  //       name: 'Hawaii',
  //       unitPrice: 12,
  //       quantity: 2,
  //       totalPrice: 24,
  //     },
  //   ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // NOTE: redux toolkit allows us to "mutate" state instead of returning a new object of state
    addItem(state, action) {
      //payload: item
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload: itemId
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseQuantity(state, action) {
      // payload: itemId
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseQuantity(state, action) {
      // payload: itemId
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// selector
// when using it with useSelector(getCartTotalPrice)
// it's the same as useSelector((state) => ())
export const getCartTotalPrice = (state) =>
  state.cart.cart.reduce((acc, item) => acc + item.totalPrice, 0);

export const getCartTotalQuantity = (state) =>
  state.cart.cart.reduce((acc, item) => acc + item.quantity, 0);

export const getItemQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.id === id)?.quantity ?? 0;
