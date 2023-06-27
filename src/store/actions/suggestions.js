// src/store/actions/suggestions.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';


  // Thunks
  export const fetchSubdivisionSuggestion = createAsyncThunk(
    `suggestions/fetchSubdivisionSuggestion`,
    async (data, { rejectWithValue }) => {
      try {
        const response = await api.post(`/suggestions`, data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

