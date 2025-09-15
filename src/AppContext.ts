import { createContext, useContext } from 'react';
import type { ReportItem } from './api/postReport';

interface AppContextType {
    isLoading: boolean;
    entries: ReportItem[];
}

const initialState: AppContextType = {
    isLoading: true,
    entries: [],
};

const AppContext = createContext(initialState);

export const useAppContext = () => {
    return useContext(AppContext);
};

export const AppContextProvider = AppContext.Provider;
