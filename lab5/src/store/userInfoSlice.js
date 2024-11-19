import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  info: {},
};

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.info = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {getUser} = userSlice.actions;

export default userSlice.reducer;
