import { useNavigate } from 'react-router';
import { Box, Button, Container, Typography } from '@mui/material';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          gap: 4,
        }}
      >
        <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M120 240C186.274 240 240 186.274 240 120C240 53.7258 186.274 0 120 0C53.7258 0 0 53.7258 0 120C0 186.274 53.7258 240 120 240Z"
            fill="#F5F5F5"
          />
          <path
            d="M85 95C85 102.732 78.7322 109 71 109C63.2678 109 57 102.732 57 95C57 87.2678 63.2678 81 71 81C78.7322 81 85 87.2678 85 95Z"
            fill="#333333"
          />
          <path
            d="M183 95C183 102.732 176.732 109 169 109C161.268 109 155 102.732 155 95C155 87.2678 161.268 81 169 81C176.732 81 183 87.2678 183 95Z"
            fill="#333333"
          />
          <path
            d="M167 157C167 157 147 137 120 137C93 137 73 157 73 157"
            stroke="#333333"
            strokeWidth="12"
            strokeLinecap="round"
          />
        </svg>

        <Typography variant="h3" component="h1" fontWeight="bold" color="primary">
          404
        </Typography>

        <Typography variant="h5" component="h2" color="text.secondary">
          Oops! Page not found
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 2, maxWidth: '600px' }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={() => navigate('/')}>
            Go to Home
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
