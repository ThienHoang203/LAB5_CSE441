import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  customer: {},
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    updateCustomer: (state, action) => {
      state.customer = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateCustomer} = customerSlice.actions;

export default customerSlice.reducer;
