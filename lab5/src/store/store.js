import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userInfoSlice';
import customerReducer from './customerSlice';
import servicesReducer from './servicesSlice';

export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    customerInfo: customerReducer,
    services: servicesReducer,
  },
});
