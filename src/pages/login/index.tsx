import { Box, Divider, Grid2, Typography } from '@mui/material';
import LoginForm from './components/login-form';

export default function Login() {
  return (
    <Grid2 container className="min-h-screen">
      <Grid2 size={{ lg: 4 }} className="bg-black"></Grid2>
      <Grid2 size={{ xs: 12, lg: 8 }} className="flex items-center justify-center">
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 420,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" component="h1" align="center" sx={{ py: 2 }}>
            Sign In
          </Typography>
          <Divider />
          <LoginForm />
        </Box>
      </Grid2>
    </Grid2>
  );
}
