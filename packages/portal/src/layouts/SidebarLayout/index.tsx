import { Box, Container, darken, useTheme } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import VideoBackground from 'src/components/VideoBackground';

import Header from './Header';
import Sidebar from './Sidebar';

interface SidebarLayoutProps {
  children?: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  const theme = useTheme();

  return (
    <>
      <VideoBackground name="main-background" />
      <Box
        sx={{
          flex: 1,
          minHeight: '100vh',
          height: 'fit-contents',
          '.MuiPageTitle-wrapper': {
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.trueWhite[5]
                : theme.colors.alpha.white[50],
            marginBottom: `${theme.spacing(4)}`,
            boxShadow: `0 1px 0 ${darken(
              theme.colors.primary.main,
              0.7
            )}, 0px 2px 4px -3px rgb(0, 0, 0), 0px 5px 12px -4px rgb(0, 0, 0)`
          }
        }}
      >
        <Header />
        <Sidebar />
        <Container
          sx={{
            position: 'relative',
            zIndex: 5,
            display: 'block',
            flex: 1,
            pt: `${theme.header.height}`
            // [theme.breakpoints.up('lg')]: {
            //   ml: `${theme.sidebar.width}`
            // }
          }}
        >
          <Box display="block">
            <Outlet />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SidebarLayout;
