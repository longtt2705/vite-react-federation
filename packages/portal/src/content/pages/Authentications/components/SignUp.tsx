import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Form, FormikProvider, useFormik } from 'formik';
import { FunctionComponent, useState } from 'react';
import { useAppDispatch } from 'src/app/hook';
import { signUp } from 'src/slices/user';
import StyledTextField from './TextField';
import * as Yup from 'yup';
import { Link } from '@mui/material';

interface SignUpProps {
  toSignIn: () => void;
}

const SignUp: FunctionComponent<SignUpProps> = ({ toSignIn }) => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(6).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
    passwordConfirmation: Yup.string()
      .min(6)
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema,
    onSubmit: async (values, formikHelper) => {
      try {
        setLoading(true);
        await dispatch(signUp(values)).unwrap();
      } catch (err) {
        console.log(err);
        formikHelper.setErrors({ email: 'Email has been used!' });
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
          height={400}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          width="100%"
        >
          <StyledTextField
            margin="normal"
            required
            fullWidth
            id="email"
            {...getFieldProps('email')}
            label="Email Address"
            name="email"
            autoComplete="email"
            error={Boolean(errors.email && touched.email)}
            helperText={touched.email && errors.email}
          />
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
          <StyledTextField
            margin="normal"
            required
            fullWidth
            label="Confirm password"
            type="password"
            id="confirm-password"
            {...getFieldProps('passwordConfirmation')}
            autoComplete="current-password"
            error={Boolean(
              errors.passwordConfirmation && touched.passwordConfirmation
            )}
            helperText={
              touched.passwordConfirmation && errors.passwordConfirmation
            }
            color="primary"
          />
        </Box>
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, textTransform: 'uppercase' }}
          loading={isLoading}
        >
          Sign Up
        </LoadingButton>
        <Link
          sx={{
            textAlign: 'center',
            textDecoration: 'none',
            cursor: 'pointer'
          }}
          onClick={toSignIn}
        >
          <Typography variant="body2">
            Already have an account? Sign In!
          </Typography>
        </Link>
      </Form>
    </FormikProvider>
  );
};

export default SignUp;
