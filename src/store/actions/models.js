// src/store/actions/models.js

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

  export const fetchModelDataArray = createAsyncThunk(
    'model/fetchModelDataArray',
    async ({ ids, modelName }, { rejectWithValue }) => {
      try {
        const validIds = ids.filter(Boolean);
        if(!validIds.length) return [];
        const response = await api.get(`/${modelName}/batch`, { params: { ids: validIds.join(',') }});
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
  

  export const fetchModelContext = createAsyncThunk(
    `model/fetchModelContext`,
    async ({ id, modelName }, { rejectWithValue }) => {
      try {
        const response = await api.get(`/contexts/${modelName}/${id}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  

  export const changeCharacteristic = createAsyncThunk(
    `model/changeCharacteristic`,
    async ({ characterId, char, amount }, { rejectWithValue }) => {
      try {
        const response = await api.put(`/games/mgt2e/chargen/${characterId}/cc/${char}/${amount}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  

  export const updateLifePath = createAsyncThunk(
    `model/updateLifePath`,
    async ({ characterId }, { rejectWithValue }) => {
      try {
        const response = await api.get(`/games/mgt2e/chargen/${characterId}/lp`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  

  export const updateCurrentTerm = createAsyncThunk(
    `model/updateCurrentTerm`,
    async ({ characterId, field, term, changes }, { rejectWithValue }) => {
      try {
        const response = await api.put(`/games/mgt2e/chargen/${characterId}/lp/${term}/${field}`, changes);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const addModel = createAsyncThunk(
    `model/addModel`,
    async ({ modelData, modelName, characterId}, { rejectWithValue }) => {
      if(['pdf', 'cc', 'ss', 'lp'].includes(modelName)) {
        try {
          const response = await api.post(`/games/mgt2e/chargen/${characterId}/${modelName}`, modelData);
          return response.data;
        } catch (error) {
          return rejectWithValue(error.response.data);
        }
      } else {
        try {
          const response = await api.post(`/${modelName}`, modelData);
          return response.data;
        } catch (error) {
          return rejectWithValue(error.response.data);
        }
      }
    }
  );

  export const createPortrait = createAsyncThunk(
    `model/createPortrait`,
    async ({ modelData, characterId}, { rejectWithValue }) => {
        try {
          const { data: character } = await api.post(`/games/mgt2e/chargen/${characterId}/pdf/portrait`, modelData);
          const pdf = character.personalDataFile
          const { data: portrait } = await api.get(`/portraits/${pdf.currentPortraitId}`);
          return {character, portrait};
        } catch (error) {
          return rejectWithValue(error.response.data);
        }
    }
  );

  export const createAssoc = createAsyncThunk(
    `model/createAssoc`,
    async ({ modelData, modelName, characterId}, { rejectWithValue }) => {
      try {
        const response = await api.post(`/games/mgt2e/chargen/${characterId}/${modelName}`, modelData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const updatePortraitSrc = createAsyncThunk(
    `model/updatePortraitSrc`,
    async ({ portraitId }, { rejectWithValue }) => {
      console.log('updatePortraitSrc portraitId', {portraitId})
        try {
            const { data: portrait } = await api.get(`/portraits/update/${portraitId}`);
            return portrait;
          
        } catch (error) {
          return rejectWithValue(error.response.data);
        }
    }
  );

  export const fetchControlledCharacters = createAsyncThunk(
    `model/fetchControlledCharacters`,
    async ({ gameId}, { rejectWithValue }) => {
      try {
        const { data: characters } = await api.get(`/games/mgt2e/chargen/pc/${gameId}`);
        const pdfs = characters.map(c => c.personalDataFile)
        //console.log('fetchControlledCharacters', {gameId, portraitIds, pdfs})
        const portraits = []
        //console.log('fetchControlledCharacters', {characters, portraitIds, portraits})
        return {characters, portraits};
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const fetchCharacters = createAsyncThunk(
    `model/fetchCharacters`,
    async ({ gameId}, { rejectWithValue }) => {
      try {
        const { data: characters } = await api.get(`/games/mgt2e/chargen/available/${gameId}`);
        const pdfs = characters.map(c => c.personalDataFile)
        //select expired portraits
        const portraits = []
        //console.log('fetchCharacters', {characters, portraitIds, portraits})
        return {characters, portraits};
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const fetchCharacter = createAsyncThunk(
    `model/fetchCharacter`,
    async ({ characterId}, { rejectWithValue }) => {
      try {
        const { data: character } = await api.get(`/games/mgt2e/chargen/inclusive/${characterId}`);
        const characters = [character];
        const pdfs = characters.map(c => c.personalDataFile)
        const portraits = []
        //console.log('fetchCharacter', {characters, portraitIds, portraits})
        return {characters, portraits};
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const fetchUniverseSubdivisions = createAsyncThunk(
    `model/fetchUniverseSubdivisions`,
    async ({modelName, universeId}, { rejectWithValue }) => {
      try {
        const response = await api.get(`/${modelName}/universe/${universeId}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );