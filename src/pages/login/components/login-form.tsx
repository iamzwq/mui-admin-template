import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { Box, Button, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { ControlledCheckbox, ControlledTextField } from '~/components/controlled-form';
import { fetchLogin } from '../api';

export default function LoginForm() {
  const navigate = useNavigate();
  const methods = useForm<LoginFormValues>({
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });

  const { handleSubmit } = methods;

  const { mutate, isPending } = useMutation({
    mutationFn: fetchLogin,
    onSuccess: data => {
      // TODO: set token to local storage
      console.log('success', data); // eslint-disable-line no-console
      const searchParams = new URLSearchParams(window.location.search);
      const redirect = searchParams.get('redirect');
      navigate(redirect ? decodeURIComponent(redirect) : '/project');
    },
    onError: () => navigate('/'), // TODO: delete
  });

  const onSubmit = handleSubmit(data => {
    console.log(data); // eslint-disable-line no-console
    mutate(data);
  });

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={onSubmit} sx={{ p: 3 }}>
        <ControlledTextField
          name="username"
          fullWidth
          label="Email/User ID"
          variant="outlined"
          margin="normal"
          rules={{
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters',
            },
          }}
        />
        <ControlledTextField
          name="password"
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          sx={{ mb: 3 }}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
        />
        <span style={{ cursor: isPending ? 'not-allowed' : 'unset' }}>
          <Button fullWidth type="submit" variant="contained" size="large" disabled={isPending}>
            Sign in
          </Button>
        </span>
        <Box
          className="mt-2 flex justify-between"
          sx={{
            '& .MuiCheckbox-root, & .MuiFormControlLabel-label': {
              color: 'primary.main',
            },
          }}
        >
          <ControlledCheckbox name="rememberMe" label="Remember Me" />
          <Typography
            variant="body1"
            color="primary"
            component={Link}
            lineHeight="42px"
            to="/reset-password"
            className="hover:underline"
          >
            Forgot Password
          </Typography>
        </Box>
      </Box>
    </FormProvider>
  );
}
