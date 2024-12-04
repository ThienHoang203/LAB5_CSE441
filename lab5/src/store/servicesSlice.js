import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  services: {},
};

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    updateServices: (state, action) => {
      state.services = action.payload;
    },
    addServiceDetail: (state, action) => {
      state.services[action.payload._id] = {
        _id: action.payload._id,
        quantity: action.payload.quantity,
        userID:
          typeof action.payload.userID === 'undefined'
            ? 'unknown'
            : action.payload.userID,
        basePrice: action.payload.basePrice,
      };
    },
    updateServiceQuantity: (state, action) => {
      state.services[action.payload._id].quantity = action.payload.quantity;
    },
    deleteServiceDetail: (state, action) => {
      const result = delete state.services[action.payload];
      if (result) {
        console.log(`sevices ${action.payload} deleted`);
      } else {
        console.log(`sevices ${action.payload} delete fail`);
      }
    },
    changeUserID: (state, action) => {
      state.services[action.payload._id].userID = action.payload.userID;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateServices,
  addServiceDetail,
  deleteServiceDetail,
  updateServiceQuantity,
  changeUserID,
} = servicesSlice.actions;

export default servicesSlice.reducer;
