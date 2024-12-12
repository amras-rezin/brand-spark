import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import adminAuthSlice from './slices/adminSlice';

const adminPersistConfig = { key: 'adminAuth', storage, version: 1 };

const adminAuthPersistReducer = persistReducer(
  adminPersistConfig,
  adminAuthSlice.reducer
);

export const store = configureStore({
  reducer: {
    admin: adminAuthPersistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        serializableCheck: false,
      },
    }),
});

export const persistor = persistStore(store);
