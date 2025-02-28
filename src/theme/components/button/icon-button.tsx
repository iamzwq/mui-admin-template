import type { Components, CssVarsTheme, Theme } from '@mui/material';

export const MuiIconButton: Components<Omit<Theme, 'components' | 'palette'> & CssVarsTheme>['MuiIconButton'] = {
  defaultProps: {
    size: 'small',
  },
};
