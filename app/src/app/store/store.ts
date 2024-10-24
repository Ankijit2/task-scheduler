// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user-slice';

const store = configureStore({
  reducer: {
    userData: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
