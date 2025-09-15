import { createTheme, MantineProvider, Table } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';
import './styles.css';

const queryClient = new QueryClient();

const theme = createTheme({
    components: {
        Table: Table.extend({
            styles: () => ({
                tr: {
                    borderBottom: '1px solid rgba(0, 0, 0, 0.09)',
                },
            }),
        }),
    },
});

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <MantineProvider theme={theme}>
                    <App />
                </MantineProvider>
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>
);
