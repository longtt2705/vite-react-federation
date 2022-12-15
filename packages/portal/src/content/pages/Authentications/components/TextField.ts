import { styled, TextField } from '@mui/material';

export default styled(TextField)(({ theme }) => ({
  '& label': {
    color: theme.colors.alpha.white[100]
  },

  '&:hover': {
    '& label': {
      color: theme.colors.primary.light
    }
  },

  '& .MuiInput-underline:after': {
    borderBottomColor: 'green'
  },
  '& .MuiOutlinedInput-root': {
    color: theme.colors.alpha.white[100],

    '& fieldset': {
      borderColor: theme.colors.alpha.white[100]
    },
    '&:hover fieldset': {
      borderColor: theme.colors.primary.light
    }
  }
}));
