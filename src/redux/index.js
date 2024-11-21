import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import todosSlice from './async/todosSlice';
import languageReducer from './slices/languageSlice';
import { combineReducers } from 'redux';

// Gabungkan Reducer
const rootReducer = combineReducers({
  todos: todosSlice,
  language: languageReducer,
});

// Konfigurasi Persist
const persistConfig = {
  key: 'root',
  storage,
  transforms: [
    encryptTransform({
      secretKey: 'my-very-secure-secret-key',
      onError: (error) => {
        console.error('Encryption error:', error);
      },
    }),
  ],
};

// Bungkus Root Reducer dengan Persist Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Konfigurasi Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);
