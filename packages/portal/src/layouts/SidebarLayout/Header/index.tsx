import { useContext } from 'react';

import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import {
  alpha,
  Box,
  darken,
  IconButton,
  ListItemText,
  Stack,
  styled,
  Tooltip,
  useTheme
} from '@mui/material';
import { SidebarContext } from 'src/contexts/SidebarContext';

import AddBoxIcon from '@mui/icons-material/AddBox';
import { formatNumber } from 'src/utils/functions';
import HeaderButtons from './Buttons';
import HeaderMenu from './Menu';
import HeaderUserbox from './Userbox';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
        background: transparent;
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        border-bottom: '1px solid ${theme.colors.alpha.white[100]}';
        width: 100%;
`
);

function Header() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const theme = useTheme();

  return (
    <HeaderWrapper
      display="flex"
      alignItems="center"
      sx={{
        boxShadow:
          theme.palette.mode === 'dark'
            ? `0 1px 0 ${alpha(
                darken(theme.colors.primary.main, 0.7),
                0.15
              )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
            : `0px 2px 8px -3px ${alpha(
                theme.colors.alpha.black[100],
                0.2
              )}, 0px 5px 22px -4px ${alpha(
                theme.colors.alpha.black[100],
                0.1
              )}`
      }}
    >
      <HeaderMenu />
      <Box display="flex" alignItems="center">
        <Stack
          direction="row"
          spacing={1}
          alignContent="center"
          justifyContent="center"
          sx={{
            border: `1px solid ${alpha(theme.colors.alpha.white[100], 0.5)}`,
            borderRadius: '9px',
            p: 1,
            mr: 3
          }}
        >
          <img src="/static/images/icons/diamond.png" width={24} height={24} />
          <ListItemText
            primaryTypographyProps={{
              noWrap: true,
              fontWeight: 'bold',
              fontSize: '1.28em',
              color: 'white'
            }}
            primary={formatNumber('999999')}
          />
          <IconButton
            sx={({ palette }) => ({
              p: 0,
              color: palette.primary.light
            })}
          >
            <AddBoxIcon />
          </IconButton>
        </Stack>
        <HeaderButtons />
        <HeaderUserbox />
        <Box
          component="span"
          sx={{
            ml: 2,
            display: { lg: 'none', xs: 'inline-block' }
          }}
        >
          <Tooltip arrow title="Toggle Menu">
            <IconButton color="primary" onClick={toggleSidebar}>
              {!sidebarToggle ? (
                <MenuTwoToneIcon fontSize="small" />
              ) : (
                <CloseTwoToneIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
