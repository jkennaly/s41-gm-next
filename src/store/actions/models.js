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

  export const addModel = createAsyncThunk(
    `model/addModel`,
    async ({ modelData, modelName, characterId}, { rejectWithValue }) => {
      if(modelName === 'pdf') {
        try {
          const response = await api.post(`/games/mgt2e/chargen/${characterId}/${modelName}`, modelData);
          return response.data;
        } catch (error) {
          return rejectWithValue(error.response.data);
        }
      } else if(modelName === 'cc') {
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

  export const updatePortraitSrc = createAsyncThunk(
    `model/updatePortraitSrc`,
    async ({ portraitId }, { rejectWithValue }) => {
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
        const portraitIds = pdfs
          .filter(Boolean)
          .map(p => p.currentPortraitId)
          .filter(Boolean)
        console.log('fetchControlledCharacters', {gameId, portraitIds, pdfs})
        const portraitResponses = await Promise.all(portraitIds.map(id => api.get(`/portraits/${id}`)));
        const portraits = portraitResponses.map(r => r.data);
        console.log('fetchControlledCharacters', {characters, portraitIds, portraits})
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
        const portraitIds = pdfs
          .filter(Boolean)
          .map(p => p.currentPortraitId)
          .filter(Boolean)
        console.log('fetchCharacters', {gameId, portraitIds, pdfs})
        const portraitResponses = await Promise.all(portraitIds.map(id => api.get(`/portraits/${id}`)));
        const portraits = portraitResponses.map(r => r.data);
        console.log('fetchCharacters', {characters, portraitIds, portraits})
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
        const portraitIds = pdfs
          .filter(Boolean)
          .map(p => p.currentPortraitId)
          .filter(Boolean)
        console.log('fetchCharacter', {characterId, portraitIds, pdfs})
        const portraitResponses = await Promise.all(portraitIds.map(id => api.get(`/portraits/${id}`)));
        const portraits = portraitResponses.map(r => r.data);
        console.log('fetchCharacter', {characters, portraitIds, portraits})
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