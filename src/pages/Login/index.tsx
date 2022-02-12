/** @jsx jsx */
import { jsx } from '@emotion/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormWrapper, Title, TitleBlock } from './styles';

interface LoginForm {
  login: string;
  password: string;
}

const loginFormSchema = yup
  .object({
    login: yup.string().length(6, 'Login should contain 6 characters').required(),
    password: yup.string().required(),
  })
  .required();

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginFormSchema),
  });
  const onSubmit = (data: any) => console.log(data);

  const [isShowPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <Container maxWidth="sm">
      <Box css={TitleBlock}>
        <Typography variant="h1" css={Title}>
          Please activate the emitter
        </Typography>
        <SettingsInputAntennaIcon fontSize="large" />
      </Box>
      <Box css={FormWrapper}>
        <form>
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
            error={!!errors.login}
            helperText={errors.login?.message}
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
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
