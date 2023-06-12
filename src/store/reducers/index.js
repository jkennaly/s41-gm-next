// src/store/reducers/index.js

import { combineReducers } from 'redux';
import gamesReducer from './games';
import usersReducer from './users';
import authReducer from './auth';
import sessionReducer from './sessions';
import contextsReducer from './contexts';
import charReducer from './characters';

const rootReducer = combineReducers({
  games: gamesReducer,
  users: usersReducer,
  auth: authReducer,
  sessions: sessionReducer,
  contexts: contextsReducer,
  characters: charReducer,
});

export default rootReducer;
