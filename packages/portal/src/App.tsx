import { Box, CssBaseline, styled } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import router from 'src/router';
import firebase from './app/firebase';
import { useAppDispatch, useAppSelector } from './app/hook';
import ConsecutiveSnackbars from './components/ConsecutiveSnackbars';
import { setLoading, setUser } from './slices/user';

const LoadingScreen = styled(Box)(() => ({
  position: 'absolute',
  zIndex: 500,
  backgroundColor: '#181B1D',
  width: '100vw',
  height: '100vh',

  img: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
}));

function App() {
  const isAuth = useAppSelector((store) => store.user.isAuth);
  const isLoading = useAppSelector((store) => store.user.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth.onAuthStateChanged(
      function (user) {
        if (user) {
          dispatch(setUser(user));
        } else {
          dispatch(setLoading(false));
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );

    return () => unregisterAuthObserver();
  }, []);

  const content = useRoutes(router(isAuth));

  return isLoading ? (
    <LoadingScreen>
      <img src="/static/images/background/loading.gif" alt="loading" />
    </LoadingScreen>
  ) : (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CssBaseline />
      {content}
      <ConsecutiveSnackbars />
    </LocalizationProvider>
  );
}
export default App;
