// src/store/reducers/users.js

import { createSlice } from '@reduxjs/toolkit';
import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
} from '../actions/users';
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  users: [],
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FETCH_USERS_SUCCESS, (state, action) => {
        state.users = action.payload;
        state.error = null;
      })
      .addCase(FETCH_USERS_FAILURE, (state, action) => {
        state.users = [];
        state.error = action.payload;
      })
      .addCase(ADD_USER_SUCCESS, (state, action) => {
        state.users.push(action.payload);
        state.error = null;
      })
      .addCase(ADD_USER_FAILURE, (state, action) => {
        state.error = action.payload;
      })
      .addCase(HYDRATE, (state, action) => {
        return {
          ...state,
          ...action.payload.users,
        };
      });
  },
});

export default usersSlice.reducer;
