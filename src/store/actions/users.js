// src/store/actions/users.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';

// Action Types
export const FETCH_USERS_SUCCESS = 'users/fetchUsersSuccess';
export const FETCH_USERS_FAILURE = 'users/fetchUsersFailure';
export const ADD_USER_SUCCESS = 'users/addUserSuccess';
export const ADD_USER_FAILURE = 'users/addUserFailure';

// Thunks
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addUser = createAsyncThunk(
  'users/addUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
