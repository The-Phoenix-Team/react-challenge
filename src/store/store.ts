import { configureStore } from '@reduxjs/toolkit';
import { pokemonApiSlice } from './pokemonApiSlice';

export const store = configureStore({
  reducer: {
    [pokemonApiSlice.reducerPath]: pokemonApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApiSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
