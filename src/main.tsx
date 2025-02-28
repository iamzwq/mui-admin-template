import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { router } from './router';
import { theme } from './theme';
import { queryClient } from './utils';

import.meta.glob('./styles/*.css', { eager: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme} noSsr>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
