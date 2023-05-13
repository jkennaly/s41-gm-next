// src/store/actions/games.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';

// Action Types
export const FETCH_GAMES_SUCCESS = 'games/fetchGamesSuccess';
export const FETCH_GAMES_FAILURE = 'games/fetchGamesFailure';
export const ADD_GAME_SUCCESS = 'games/addGameSuccess';
export const ADD_GAME_FAILURE = 'games/addGameFailure';

// Thunks
export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/games');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addGame = createAsyncThunk(
  'games/addGame',
  async (gameData, { rejectWithValue }) => {
    try {
      const response = await api.post('/games', gameData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
