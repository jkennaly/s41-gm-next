import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import localforage from "localforage";
import { persistStore, persistReducer } from "redux-persist";

import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage: localforage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = typeof window === 'undefined' ?
  configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware],
  }) :
  configureStore({
    reducer: persistedReducer,
    middleware: [thunkMiddleware],
  });

  const persistor = persistStore(store, null, () => {
    if (store.getState().auth.token) {
      store.dispatch(reloadUser());
    }
  });


export { store, persistor };