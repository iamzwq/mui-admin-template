import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import { Box, IconButton, Typography } from '@mui/material';
import AccountMenu from './components/account-menu';
import { Content } from './components/content';
import { Sidebar } from './components/sidebar';

export default function Layout() {
  return (
    <div>
      <Box
        component="header"
        className="sticky top-0 flex h-8 items-center border-b border-b-(--border-color) bg-(--bg-color) px-3"
        sx={{ zIndex: theme => theme.zIndex.appBar }}
      >
        <Typography variant="h5" fontWeight={600} textTransform="uppercase">
          Layout Header
        </Typography>
        <div className="ml-auto flex items-center">
          <IconButton className="animate-spin">
            <SettingsIcon />
          </IconButton>
          <AccountMenu />
        </div>
      </Box>
      <div className="flex">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
}
