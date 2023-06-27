// src/store/actions/rooms.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import { rollEnterMessage } from '@/utils/room';


  // Thunks
  export const sendMessage = createAsyncThunk(
    `rooms/sendMessage`,
    async ({room, msg, roomId}, { rejectWithValue }) => {
      try {
        rollEnterMessage({room, msg, roomId})
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

