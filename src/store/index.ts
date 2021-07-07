import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER 
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {authReducer} from './auth/auth'

const reducer = combineReducers({
  // here we will be adding reducers
  auth: authReducer,
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth',"event", "meeting"]
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})

let persistor = persistStore(store)

export {store, persistor};
