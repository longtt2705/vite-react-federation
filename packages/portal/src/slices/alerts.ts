import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type serverity = 'error' | 'info' | 'warning' | 'success';

export interface SnackbarMessage {
  message: string;
  severity: serverity;
  id: number;
}

interface AlertState {
  messages: SnackbarMessage[];
  open: boolean;
}

const initialState: AlertState = {
  messages: [],
  open: false
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    createAlert(state, action: PayloadAction<SnackbarMessage>) {
      state.messages.push({
        message: action.payload.message,
        severity: action.payload.severity || 'success',
        id: action.payload.id
      });
    },
    setOpenAlert(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
    skipAlert(state) {
      state.messages = state.messages.slice(1);
    }
  }
});

export const { createAlert, setOpenAlert, skipAlert } = alertSlice.actions;

export default alertSlice.reducer;
