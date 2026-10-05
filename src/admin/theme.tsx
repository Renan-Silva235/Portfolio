import type { ReactNode } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#4FD1C5' },
    secondary: { main: '#5468FF' },
    background: { default: '#0a0d14', paper: '#111522' },
  },
  shape: { borderRadius: 12 },
});

export default function AdminTheme({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
