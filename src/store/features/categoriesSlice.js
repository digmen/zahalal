import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '@/api/Api';

// Async thunk для запроса
export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const response = await axios.get(`${API_URL}categories/`);
        return response.data;
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        list: [],
        selectedId: null,
        loading: false,
        error: null,
    },
    reducers: {
        setSelectedId: (state, action) => {
            state.selectedId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.list = action.payload;
                state.selectedId = action.payload[0]?.id || null;
                state.loading = false;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setSelectedId } = categoriesSlice.actions;
export default categoriesSlice.reducer;
