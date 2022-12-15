import { LoadingButton } from '@mui/lab';
import { Link } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Form, FormikProvider, useFormik } from 'formik';
import { FunctionComponent, useState } from 'react';
import { useAppDispatch } from 'src/app/hook';
import { signIn } from 'src/slices/user';
import * as Yup from 'yup';
import StyledTextField from './TextField';

interface SignUpProps {
  toSignUp: () => void;
}

const SignIn: FunctionComponent<SignUpProps> = ({ toSignUp }) => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    username: Yup.string().email().required(),
    password: Yup.string().min(6).required()
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema,
    onSubmit: async (values, formikHelper) => {
      try {
        setLoading(true);
        await dispatch(signIn({ email: '', password: '' })).unwrap();
      } catch (err) {
        formikHelper.setErrors({
          username: 'Username or password is incorrect!'
        });
      } finally {
        setLoading(false);
      }
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <Form
        autoComplete="off"
        onSubmit={handleSubmit}
        style={{ width: '100%' }}
      >
        <Box
          height={300}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          width="100%"
        >
          <StyledTextField
            margin="normal"
            required
            fullWidth
            id="username"
            {...getFieldProps('username')}
            label="Username"
            name="username"
            autoComplete="username"
            error={Boolean(errors.username && touched.username)}
            helperText={touched.username && errors.username}
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            {...getFieldProps('password')}
            autoComplete="current-password"
            error={Boolean(errors.password && touched.password)}
            helperText={touched.password && errors.password}
            color="primary"
          />
          <Link
            sx={{
              textAlign: 'end',
              textDecoration: 'none',
              cursor: 'pointer',
              px: 1
            }}
            onClick={toSignUp}
          >
            <Typography variant="body2">Forget your password?</Typography>
          </Link>
        </Box>
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mb: 2, textTransform: 'uppercase' }}
          loading={isLoading}
        >
          Sign In
        </LoadingButton>
        <Link
          sx={{
            textAlign: 'center',
            textDecoration: 'none',
            cursor: 'pointer'
          }}
          onClick={toSignUp}
        >
          <Typography variant="body2">
            Don't have an account? Sign Up now!
          </Typography>
        </Link>
      </Form>
    </FormikProvider>
  );
};

export default SignIn;
