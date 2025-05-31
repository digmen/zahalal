import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './features/categoriesSlice';

export const store = configureStore({
    reducer: {
        categories: categoriesReducer,
    },
});
