import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
    startDate: string;
    endDate: string;
    q: string | null;
}

const date = new Date();
const startDate = new Date(date.getFullYear(), date.getMonth(), 2);

const initialState: FiltersState = {
    startDate: startDate.toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
    q: null,
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setStartDate(state, action: PayloadAction<string>) {
            state.startDate = action.payload;
        },
        setEndDate(state, action: PayloadAction<string>) {
            state.endDate = action.payload;
        },
        setSearch(state, action: PayloadAction<string | null>) {
            state.q = action.payload;
        },
    },
});

export const { setStartDate, setEndDate, setSearch } = filtersSlice.actions;

export default filtersSlice.reducer;
