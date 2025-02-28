import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { ChevronLeft, ChevronRight, Dashboard, ExpandLess, ExpandMore, Home, Settings } from '@mui/icons-material';
import GroupIcon from '@mui/icons-material/Group';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem as MuiMenuItem,
  Paper,
  Tooltip,
} from '@mui/material';
import { useAtom } from 'jotai';
import { collapsedAtom } from '~/stores/common';

type TMenuItem = {
  label: string;
  key: string;
  icon?: React.ReactNode;
  children?: TMenuItem[];
};

const menuItems: TMenuItem[] = [
  {
    label: 'Home',
    key: '/',
    icon: <Home />,
  },
  {
    label: 'Posts',
    key: '/posts',
    icon: <LocalPostOfficeIcon />,
  },
  {
    label: 'Users',
    key: '/user-list',
    icon: <GroupIcon />,
  },
  {
    label: 'Dashboard',
    key: '/upload',
    icon: <Dashboard />,
  },
  {
    label: 'Settings',
    key: '/settings',
    icon: <Settings />,
    children: [
      { label: 'Profile', key: '/settings/profile' },
      { label: 'Account', key: '/settings/account' },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();

  const [collapsed, setCollapsed] = useAtom(collapsedAtom);

  return (
    <Box
      sx={{
        width: collapsed ? 56 : 240,
        height: 'calc(100vh - 64px)',
        borderRight: '1px solid',
        borderColor: 'divider',
        transition: 'width 0.3s',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 64,
      }}
    >
      <List disablePadding sx={{ flex: 1 }}>
        {menuItems.map(item => {
          if (collapsed) {
            return <MiniMenuItem key={item.key} item={item} pathname={location.pathname} />;
          }
          return <MenuItem key={item.key} item={item} pathname={location.pathname} />;
        })}
      </List>

      <ListItem disablePadding>
        <ListItemButton
          onClick={() => setCollapsed(!collapsed)}
          sx={{
            borderRadius: 2,
            px: 2,
            minHeight: 48,
            justifyContent: collapsed ? 'center' : 'initial',
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: collapsed ? 'auto' : 2,
              justifyContent: 'center',
            }}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Collapse" />}
        </ListItemButton>
      </ListItem>
    </Box>
  );
}

export function MenuItem({ item, depth = 1, pathname }: { item: TMenuItem; depth?: number; pathname: string }) {
  const [open, setOpen] = useState(() => {
    return item.children?.some(child => pathname === child.key) || false;
  });

  const hasSubItems = item.children && item.children.length > 0;
  const isActive = pathname === item.key;
  const hasActiveChild = item.children?.some(child => pathname === child.key);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem disablePadding sx={{ position: 'relative' }}>
        {hasSubItems ? (
          <ListItemButton
            onClick={handleClick}
            sx={{
              pr: 2,
              pl: depth * 2,
              borderRadius: 0,
              bgcolor: hasActiveChild ? 'action.hover' : 'initial',
              '&:hover': {
                bgcolor: hasActiveChild ? 'action.selected' : 'action.hover',
              },
            }}
          >
            {item.icon && (
              <ListItemIcon sx={{ minWidth: 0, mr: 1, justifyContent: 'center' }}>{item.icon}</ListItemIcon>
            )}
            <ListItemText primary={item.label} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        ) : (
          <ListItemButton
            sx={{
              pr: 2,
              pl: depth * 2,
              borderRadius: 0,
              bgcolor: isActive ? 'action.selected' : 'inherit',
              color: isActive ? 'primary.main' : 'inherit',
              '&:hover': {
                bgcolor: isActive ? 'action.selected' : 'action.hover',
              },
            }}
            component={Link}
            to={item.key}
          >
            {item.icon && (
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 1,
                  justifyContent: 'center',
                  color: isActive ? 'primary.main' : 'action.active',
                }}
              >
                {item.icon}
              </ListItemIcon>
            )}
            <ListItemText primary={item.label} />
          </ListItemButton>
        )}
      </ListItem>
      {hasSubItems && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {item.children!.map(subItem => (
              <MenuItem key={subItem.key} item={subItem} depth={depth + 2} pathname={pathname} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

export function MiniMenuItem({ item, pathname }: { item: TMenuItem; pathname: string }) {
  const isActive = pathname === item.key;

  return (
    <ListItem disablePadding sx={{ position: 'relative' }}>
      {item.children?.length ? (
        <MiniSubMenuV2 icon={item.icon} item={item} pathname={pathname} />
      ) : (
        <Tooltip
          title={item.label}
          arrow
          placement="right"
          slotProps={{
            popper: {
              sx: { '.MuiTooltip-tooltip': { marginLeft: '8px !important' } },
            },
          }}
        >
          <ListItemButton
            component={Link}
            to={item.key}
            sx={{
              p: 0,
              height: 48,
              borderRadius: 0,
              bgcolor: isActive ? 'action.selected' : 'inherit',
              '&:hover': {
                bgcolor: isActive ? 'action.selected' : 'action.hover',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 24, px: 2, py: 1, color: isActive ? 'primary.main' : 'action.active' }}>
              {item.icon}
            </ListItemIcon>
          </ListItemButton>
        </Tooltip>
      )}
    </ListItem>
  );
}

function MiniSubMenuV2({ icon, item, pathname }: { icon: React.ReactNode; item: TMenuItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const hasActiveChild = item.children?.some(child => pathname === child.key);

  return (
    <Tooltip
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      placement="right"
      disableFocusListener
      arrow={false}
      slotProps={{
        popper: {
          disablePortal: true,
          sx: {
            '.MuiTooltip-tooltip': {
              p: 0,
              marginLeft: '8px !important',
            },
          },
        },
      }}
      title={
        <Paper
          elevation={0}
          sx={{
            py: 0.5,
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: '50%',
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translate(-50%, -50%) rotate(45deg)',
              zIndex: 0,
            },
          }}
        >
          {item.children?.map(child => (
            <MuiMenuItem
              key={child.key}
              component={Link}
              to={child.key}
              onClick={() => setOpen(false)}
              sx={{ color: child.key === pathname ? 'primary.main' : undefined }}
            >
              {child.label}
            </MuiMenuItem>
          ))}
        </Paper>
      }
    >
      <ListItemButton
        sx={{
          p: 0,
          height: 48,
          borderRadius: 0,
          bgcolor: hasActiveChild ? 'action.hover' : 'inherit',
          color: hasActiveChild ? 'primary.light' : 'inherit',
        }}
        onClick={() => setOpen(!open)}
      >
        <ListItemIcon sx={{ minWidth: 0, px: 2, py: 1 }}>{icon}</ListItemIcon>
      </ListItemButton>
    </Tooltip>
  );
}

// function MiniSubMenu({ icon, item, pathname }: { icon: React.ReactNode; item: TMenuItem; pathname: string }) {
//   const ref = useRef(null);
//   const [isOpen, setOpen] = useState(false);
//   const { anchorProps, hoverProps } = useHover(isOpen, setOpen);

//   const hasActiveChild = item.children?.some(child => pathname === child.key);

//   return (
//     <>
//       <ListItemButton
//         sx={{
//           p: 0,
//           height: 48,
//           borderRadius: 0,
//           bgcolor: hasActiveChild ? 'action.hover' : 'inherit',
//           color: hasActiveChild ? 'primary.light' : 'inherit',
//         }}
//       >
//         <ListItemIcon sx={{ minWidth: 0, px: 2, py: 1 }} ref={ref} {...anchorProps}>
//           {icon}
//         </ListItemIcon>
//       </ListItemButton>

//       <Box
//         component={ControlledMenu}
//         {...hoverProps}
//         state={isOpen ? 'open' : 'closed'}
//         anchorRef={ref as unknown as RefObject<Element>}
//         onClose={() => setOpen(false)}
//         direction="right"
//         sx={{
//           '.szh-menu': {
//             bgcolor: 'background.paper',
//             borderRadius: 0.5,
//             color: 'text.primary',
//             zIndex: theme => theme.zIndex.appBar,
//             boxShadow: 'var(--shadows-2)',
//             py: 0.5,
//           },
//         }}
//       >
//         {item.children!.map(subItem => (
//           <MuiMenuItem
//             key={subItem.key}
//             sx={{ color: subItem.key === pathname ? 'primary.main' : undefined }}
//             onClick={() => setOpen(false)}
//           >
//             <Link to={subItem.key}>{subItem.label}</Link>
//           </MuiMenuItem>
//         ))}
//       </Box>
//     </>
//   );
// }
