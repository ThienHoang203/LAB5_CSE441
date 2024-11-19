import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  service: {},
};

export const serviceDetailSlice = createSlice({
  name: 'serviceDetail',
  initialState,
  reducers: {
    getServiceDetail: (state, action) => {
      state.info = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {getServiceDetail} = serviceDetailSlice.actions;

export default serviceDetailSlice.reducer;
