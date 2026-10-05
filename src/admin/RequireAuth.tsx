import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useSession } from './useSession';

export default function RequireAuth({ children }: { children: ReactNode }) {
  const session = useSession();

  if (session === undefined) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 30 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!session) return <Navigate to="/admin/login" replace />;

  return children;
}
