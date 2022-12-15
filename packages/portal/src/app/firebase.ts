import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBfy5ZfBIPHrfYGNviVl-JJe6OmI29rpJA',
  authDomain: 'portal.longthanhtran.com',
  databaseURL: 'https://poke-31d84.firebaseio.com',
  projectId: 'poke-31d84',
  storageBucket: 'poke-31d84.appspot.com',
  messagingSenderId: '654733102961',
  appId: '1:654733102961:web:591a37fbf12a7003b070d0',
  measurementId: 'G-LVWV7T7VN2'
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export default { app, analytics, auth };
