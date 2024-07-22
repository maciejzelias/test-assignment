import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthContextProvider } from './context/auth-context.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from './theme.ts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 36000,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ToastContainer />
        <ChakraProvider theme={customTheme}>
          <App />
        </ChakraProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
