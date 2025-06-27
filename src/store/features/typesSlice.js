import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '@/api/Api';

export const fetchTypes = createAsyncThunk(
    'types/fetchTypes',
    async (cat_id) => {
        const response = await axios.get(`${API_URL}cards/types?cat_id=${cat_id}`);
        return response.data;
    }
);

const typesSlice = createSlice({
    name: 'types',
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
            .addCase(fetchTypes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTypes.fulfilled, (state, action) => {
                state.list = action.payload;
                state.selectedId = action.payload[0]?.id || null;
                state.loading = false;
            })
            .addCase(fetchTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setSelectedId } = typesSlice.actions;
export default typesSlice.reducer;
