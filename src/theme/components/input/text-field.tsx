import type { Components, CssVarsTheme, Theme } from '@mui/material';

export const MuiTextField: Components<Omit<Theme, 'components' | 'palette'> & CssVarsTheme>['MuiTextField'] = {
  defaultProps: {
    size: 'small',
    slotProps: {
      inputLabel: { shrink: true },
    },
  },
};
