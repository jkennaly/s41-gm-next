// src/store/reducers/games.js

import { createSlice } from '@reduxjs/toolkit';
import {
  FETCH_GAMES_SUCCESS,
  FETCH_GAMES_FAILURE,
  ADD_GAME_SUCCESS,
  ADD_GAME_FAILURE,
} from '../actions/games';
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  games: [],
  error: null,
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FETCH_GAMES_SUCCESS, (state, action) => {
        state.games = action.payload;
        state.error = null;
      })
      .addCase(FETCH_GAMES_FAILURE, (state, action) => {
        state.games = [];
        state.error = action.payload;
      })
      .addCase(ADD_GAME_SUCCESS, (state, action) => {
        state.games.push(action.payload);
        state.error = null;
      })
      .addCase(ADD_GAME_FAILURE, (state, action) => {
        state.error = action.payload;
      })
      .addCase(HYDRATE, (state, action) => {
        return {
          ...state,
          ...action.payload.games,
        };
      })
  },
});

export default gamesSlice.reducer;
