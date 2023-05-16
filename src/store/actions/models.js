// src/store/actions/modelActions.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';


  // Thunks
  export const fetchModels = createAsyncThunk(
    `model/fetchModel`,
    async (modelName, { rejectWithValue }) => {
      try {
        const response = await api.get(`/${modelName}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const fetchModelData = createAsyncThunk(
    `model/fetchModelData`,
    async ({ id, modelName }, { rejectWithValue }) => {
      try {
        const response = await api.get(`/${modelName}/${id}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const fetchAssocData = createAsyncThunk(
    `model/fetchAssocData`,
    async ({ id, modelName }, { rejectWithValue }) => {
      try {
        const response = await api.get(`/${modelName}/inclusive/${id}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const addModel = createAsyncThunk(
    `model/addModel`,
    async ({ modelData, modelName}, { rejectWithValue }) => {
      try {
        const response = await api.post(`/${modelName}`, modelData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
