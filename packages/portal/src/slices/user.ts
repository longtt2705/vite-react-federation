import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { authService } from 'src/services';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (userInfo: { email: string; password: string }, thunkApi) => {
    try {
      const user = await authService.signIn(userInfo.email, userInfo.password);
      const idToken = await user.getIdToken(true);

      return { user, idToken };
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userInfo: { email: string; password: string }, thunkApi) => {
    try {
      const user = await authService.signUp(userInfo.email, userInfo.password);
      const idToken = await user.getIdToken(true);

      return { user, idToken };
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const setUser = createAsyncThunk(
  'auth/get-user',
  async (user: User, thunkApi) => {
    try {
      let idToken = null;
      if (user) {
        idToken = await user.getIdToken(true);
      } else {
        throw new Error('User is null');
      }

      return { user, idToken };
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const signOut = createAsyncThunk('auth/signOut', async (_, thunkApi) => {
  try {
    await authService.signOut();
    return null;
  } catch (err) {
    return thunkApi.rejectWithValue(err);
  }
});

interface InitialState {
  isLoading: boolean;
  idToken: string;
  isAuth: boolean;
  user: User | null;
}

const initialState: InitialState = {
  isLoading: true,
  idToken: '',
  isAuth: false,
  user: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.idToken = action.payload.idToken;
      state.isAuth = true;
      state.user = action.payload.user;
      state.isLoading = false;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.idToken = action.payload.idToken;
      state.isAuth = true;
      state.user = action.payload.user;
      state.isLoading = false;
    });
    builder.addCase(setUser.fulfilled, (state, action) => {
      state.idToken = action.payload.idToken;
      state.isAuth = true;
      state.user = action.payload.user;
      state.isLoading = false;
    });
    builder.addCase(signOut.fulfilled, (state, action) => {
      state.isAuth = false;
      state.user = action.payload;
    });
  }
});

export const { setLoading } = authSlice.actions;

export default authSlice.reducer;
