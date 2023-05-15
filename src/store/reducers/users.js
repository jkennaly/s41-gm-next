// src/store/reducers/users.js

import { createSlice } from '@reduxjs/toolkit';
import {
  fetchModels
} from '../actions/models';
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
    .addCase(fetchModels.fulfilled, (state, action) => {
      if(action.meta.arg === 'users'){
        console.log('fetch users success', action, state);
        state.users = action.payload;
        state.error = null;
      }
    })
      .addCase(fetchModels.rejected, (state, action) => {
        if(action.meta.arg === 'users'){
        state.users = [];
        state.error = action.payload;
      }
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
