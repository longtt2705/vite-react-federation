import { Card, Fade, Grid, Link } from '@mui/material';
import Box from '@mui/material/Box';
import { alpha, styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { CenterContainer } from 'src/components/CenterContainer';
import Logo from 'src/components/LogoSign';
import VideoBackground from 'src/components/VideoBackground';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Gameplay from 'gameplay/Gameplay';

const CharizardImage = styled('img')({
  position: 'absolute',
  left: 0,
  right: 0,
  marginLeft: 'auto',
  marginRight: 'auto',
  bottom: 150,
  width: 550
});

const HoohImage = styled('img')({
  position: 'absolute',
  left: 0,
  right: 0,
  marginLeft: 'auto',
  marginRight: 'auto',
  bottom: 50,
  width: 550
});

const LogoImage = styled('img')({
  position: 'absolute',
  left: 0,
  right: 0,
  marginLeft: 'auto',
  marginRight: 'auto',
  bottom: 70,
  width: 500
});

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundImage: 'url("/static/images/background/ember.jpeg")',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  opacity: '95%',
  zIndex: 100,
  width: '70vw',
  position: 'relative',
  boxShadow: `0px 9px 16px ${alpha(
    theme.colors.primary.main,
    0.18
  )}, 0px 2px 2px ${alpha(theme.colors.primary.main, 0.32)}`,
  height: 700
}));

function Copyright(props: any) {
  const theme = useTheme();
  return (
    <Typography
      variant="body2"
      align="center"
      {...props}
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        bottom: 20,
        color: theme.colors.alpha.white[50]
      }}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Pokemon Game by Trần Thành Long
      </Link>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const StyledGrid = styled(Grid)({
  height: '100%'
});

const FullWidthBox = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
  width: '100%'
}));

type AuthenticationPage = 'Sign In' | 'Sign Up';

export default function Authentication() {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState<AuthenticationPage>('Sign In');

  return (
    <>
      <VideoBackground name="auth-background" />
      <Gameplay />
      <CenterContainer>
        <StyledCard>
          <StyledGrid
            container
            sx={{
              height: '100%'
            }}
          >
            <StyledGrid item xs={7} sx={{ position: 'relative' }}>
              <Fade in={currentPage === 'Sign In'} timeout={1000}>
                <Box>
                  <HoohImage src="/static/images/background/hooh.png" />
                </Box>
              </Fade>
              <Fade in={currentPage === 'Sign Up'} timeout={1000}>
                <Box>
                  <CharizardImage src="/static/images/background/charizard-gigantamax.webp" />
                </Box>
              </Fade>
              <LogoImage src="/static/images/logo/Pokemon-Logo-PNG.png" />
              <Copyright />
            </StyledGrid>
            <StyledGrid item xs={5}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: theme.colors.gradients.black1,
                  width: '100%',
                  height: '100%',
                  py: theme.spacing(5),
                  opacity: '80%',
                  position: 'relative'
                }}
              >
                <Box width={140} height={50}>
                  <Logo width={140} />
                </Box>
                <Typography
                  component="h1"
                  variant="h5"
                  textTransform="uppercase"
                >
                  {currentPage}
                </Typography>
                <Fade
                  in={currentPage === 'Sign In'}
                  timeout={1000}
                  unmountOnExit
                  style={{ position: 'absolute', top: 100 }}
                >
                  <FullWidthBox>
                    <SignIn toSignUp={() => setCurrentPage('Sign Up')} />
                  </FullWidthBox>
                </Fade>
                <Fade
                  in={currentPage === 'Sign Up'}
                  timeout={1000}
                  unmountOnExit
                  style={{ position: 'absolute', top: 100 }}
                >
                  <FullWidthBox>
                    <SignUp toSignIn={() => setCurrentPage('Sign In')} />
                  </FullWidthBox>
                </Fade>
              </Box>
            </StyledGrid>
          </StyledGrid>
        </StyledCard>
      </CenterContainer>
    </>
  );
}
