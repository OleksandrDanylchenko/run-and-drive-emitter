import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterPayload } from '@models/api';
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
import { history } from '@navigation/Routing';
import { useRegisterMutation } from '@redux/queries/authentication';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { PasswordInput } from 'run-and-drive-lib/components';
import * as yup from 'yup';

import {
  activationLoginSchema,
  carActivationCodeSchema,
  isEmpty,
  passwordSchema,
} from '../../utils';
import { Form, FormWrapper, LoginWrapper, Title } from './styles';

const registerFormSchema = yup
  .object({
    activationLogin: activationLoginSchema,
    carActivationCode: carActivationCodeSchema,
    password: passwordSchema,
  })
  .required();

const Register: FC = () => {
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isDirty },
  } = useForm<RegisterPayload>({
    mode: 'onBlur',
    resolver: yupResolver(registerFormSchema),
    defaultValues: {
      activationLogin: '',
      carActivationCode: '',
      password: '',
    },
  });

  const [registerEmitter, { isLoading, isSuccess, error, reset: resetRegister }] =
    useRegisterMutation();

  useEffect(() => {
    if (!isSuccess) return;

    history.replace('/');
  }, [isSuccess]);

  const handleReset = () => {
    resetForm();
    resetRegister();
  };

  const errorMessage = useMemo(() => {
    if (!error) return null;
    if (!('status' in error)) return error.message;

    const messageData = error.data as { message: string };
    return `${error.status} ${messageData.message}`;
  }, []);

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
            error={!!errors.activationLogin}
            helperText={errors.activationLogin?.message}
            {...register('activationLogin', { required: true })}
          />
          <TextField
            label="Car code"
            fullWidth
            margin="normal"
            error={!!errors.carActivationCode}
            helperText={errors.carActivationCode?.message}
            {...register('carActivationCode', { required: true })}
          />
          <PasswordInput
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password', { required: true })}
          />
          <Collapse in={!!error}>
            <Alert severity="error">
              <>
                <AlertTitle>Authentication failed</AlertTitle>
                {errorMessage}
              </>
            </Alert>
          </Collapse>
          <Stack direction="row" alignItems="center" justifyContent="end" spacing={2}>
            <Fade in={isDirty && !isLoading}>
              <Button onClick={handleReset}>Reset</Button>
            </Fade>
            <LoadingButton
              variant="contained"
              endIcon={<VpnKeyIcon />}
              disabled={!isEmpty(errors)}
              loading={isLoading}
              loadingPosition="end"
              onClick={handleSubmit(registerEmitter)}>
              Sign In
            </LoadingButton>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
