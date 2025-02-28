import { Chip } from '@mui/material';

export function BetaChip({ collapsed }: { collapsed: boolean }) {
  return (
    <Chip
      color="primary"
      size="small"
      sx={[{ ml: 'auto', scale: 0.8 }, collapsed && { position: 'absolute', right: -4, top: 0, scale: 0.7 }]}
      label="Beta"
    />
  );
}
