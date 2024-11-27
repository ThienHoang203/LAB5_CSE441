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
    clearUser: state => {
      console.log('clear user done');

      state.info = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const {getUser, clearUser} = userSlice.actions;

export default userSlice.reducer;
