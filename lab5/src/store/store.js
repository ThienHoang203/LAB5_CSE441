import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userInfoSlice';
import serviceDetailReducer from './serviceDetailSlice';

export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    serviceDetail: serviceDetailReducer,
  },
});
