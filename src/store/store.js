import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './features/categoriesSlice';
import typesReducer from './features/typesSlice';

export const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        types: typesReducer,
    },
});
