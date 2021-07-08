import {
    configureStore,
    getDefaultMiddleware,
  } from "@reduxjs/toolkit";
  import { combineReducers } from "redux";
  import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import { createLogger } from "redux-logger";
  import storage from "redux-persist/lib/storage";
  import { authReducer } from "./reducer";

  const logger = createLogger({ collapsed: true });
  const reducers = combineReducers({
    auth: authReducer
  });
  
  const persistConfig = {
    key: "root",
    // version: 1,
    storage,
    whitelist: ["auth"],
  };
  
  const persistedReducer = persistReducer(persistConfig, reducers);
  
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  });
  
  const persistor = persistStore(store);
  
  export { store, persistor };
  