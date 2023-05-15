// src/store/reducers/index.js

import { combineReducers } from 'redux';
import gamesReducer from './games';
import usersReducer from './users';
import authReducer from './auth';
import sessionReducer from './sessions';

const rootReducer = combineReducers({
  games: gamesReducer,
  users: usersReducer,
  auth: authReducer,
  sessions: sessionReducer,
});

export default rootReducer;
