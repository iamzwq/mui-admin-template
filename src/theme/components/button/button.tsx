import type { Components, CssVarsTheme, Theme } from '@mui/material';

export const MuiButton: Components<Omit<Theme, 'components' | 'palette'> & CssVarsTheme>['MuiButton'] = {
  defaultProps: {
    variant: 'contained',
  },
  styleOverrides: {
    root: ({ ownerState }) => ({
      textTransform: 'none',
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none',
      },
      ...(ownerState.rounded ? { borderRadius: '50rem' } : {}),
      '.MuiButton-startIcon': { marginRight: 0 },
      '.MuiButton-endIcon': { marginLeft: 0 },
    }),
  },
  variants: [
    {
      props: { color: 'primary' },
      style: {
        '&.Mui-disabled': {
          color: 'var(--palette-primary-contrastText)',
          backgroundColor: 'var(--palette-primary-main)',
          opacity: 0.5,
        },
      },
    },
  ],
};
