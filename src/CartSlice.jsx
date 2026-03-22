import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  // ✅ Initial state
  initialState: {
    items: []
  },

  reducers: {

    // ✅ ADD ITEM
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.name === action.payload.name
      );

      if (existingItem) {
        // If already exists → increase quantity
        existingItem.quantity += 1;
      } else {
        // If new → add with quantity = 1
        state.items.push({
          ...action.payload,
          quantity: 1
        });
      }
    },

    // ✅ REMOVE ITEM
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.name !== action.payload
      );
    },

    // ✅ UPDATE QUANTITY
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;

      const item = state.items.find(
        (item) => item.name === name
      );

      if (item) {
        item.quantity = amount;
      }
    }
  }
});

// ✅ EXPORT ACTIONS
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// ✅ EXPORT REDUCER
export default cartSlice.reducer;