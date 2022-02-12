import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMockLogin } from '@pages/Login/useMockLogin';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { isEmpty } from '../../utils';
import { Form, FormWrapper, LoginWrapper, Title } from './styles';

export interface LoginForm {
  login: string;
  password: string;
}

const loginFormSchema = yup
  .object({
    login: yup.string().length(6, 'Login should contain 6 characters').required(),
    password: yup
      .string()
      .min(8, 'Password should container at least 8 characters')
      .required(),
  })
  .required();

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<LoginForm>({
    mode: 'onBlur',
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const [isShowPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const [isLoading, onSubmit, error] = useMockLogin();

  return (
    <Container maxWidth="sm" css={LoginWrapper}>
      <Paper elevation={9} css={FormWrapper}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={4}>
          <Typography variant="h1" css={Title}>
            Please authenticate the emitter
          </Typography>
          <SettingsInputAntennaIcon fontSize="large" />
        </Stack>
        <form css={Form}>
          <TextField
            label="Activation login"
            fullWidth
            margin="normal"
            error={!!errors.login}
            helperText={errors.login?.message}
            {...register('login', { required: true })}
          />
          <TextField
            label="Password"
            type={isShowPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    edge="end">
                    {isShowPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register('password', { required: true })}
          />
          <Stack direction="row" alignItems="center" justifyContent="end" spacing={2}>
            <Fade in={isDirty && !isLoading}>
              <Button onClick={() => reset()}>Reset</Button>
            </Fade>
            <LoadingButton
              variant="contained"
              endIcon={<VpnKeyIcon />}
              disabled={!isEmpty(errors)}
              loading={isLoading}
              loadingPosition="end"
              onClick={handleSubmit(onSubmit)}>
              Sign In
            </LoadingButton>
          </Stack>
        </form>
        <Collapse in={!!error}>
          <Alert severity="error">
            <AlertTitle>Authentication failed</AlertTitle>
            {error}
          </Alert>
        </Collapse>
      </Paper>
    </Container>
  );
};

export default Login;
