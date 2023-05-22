// src/store/actions/settings.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';

//updateSettings thunk will update the users settings in the database
export const updateSettings = createAsyncThunk(
    `settings/updateSettings`,
    async (formData, { rejectWithValue }) => {
        try {
            const response = await api.put(`/users/settings`, formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);