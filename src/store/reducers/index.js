// src/store/reducers/index.js

import { combineReducers } from 'redux';
import gamesReducer from './games';
import usersReducer from './users';
import authReducer from './auth';

const rootReducer = combineReducers({
  games: gamesReducer,
  users: usersReducer,
  auth: authReducer,
});

export default rootReducer;
