import { configureStore } from '@reduxjs/toolkit';
import { pokemartSlice } from 'src/slices/pokemart';
import userReducer from 'src/slices/user';
import alertReducer from 'src/slices/alerts';

export const store = configureStore({
  reducer: {
    user: userReducer,
    alerts: alertReducer,
    [pokemartSlice.reducerPath]: pokemartSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(pokemartSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
