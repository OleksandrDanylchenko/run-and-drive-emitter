import { yupResolver } from '@hookform/resolvers/yup';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMockLogin } from '@pages/Login/useMockLogin';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { PasswordInput } from 'run-and-drive-lib';
import * as yup from 'yup';

import { isEmpty, loginSchema, passwordSchema } from '../../utils';
import { Form, FormWrapper, LoginWrapper, Title } from './styles';

export interface LoginForm {
  login: string;
  password: string;
}

const loginFormSchema = yup
  .object({ login: loginSchema, password: passwordSchema })
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
          <PasswordInput
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password', { required: true })}
          />
          <Collapse in={!!error}>
            <Alert severity="error">
              <AlertTitle>Authentication failed</AlertTitle>
              {error}
            </Alert>
          </Collapse>
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
      </Paper>
    </Container>
  );
};

export default Login;
