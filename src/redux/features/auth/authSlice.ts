import {createSlice} from '@reduxjs/toolkit';

type TAuthState = {
  user: null | object;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action);
      const {user, token} = action.payload;

      state.user = user;
      state.token = token;
    },
  },
});

export const {setUser} = authSlice.actions;
export default authSlice.reducer;
