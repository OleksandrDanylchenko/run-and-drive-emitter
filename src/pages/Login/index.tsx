/** @jsx jsx */
import { jsx } from '@emotion/react';
import { yupResolver } from '@hookform/resolvers/yup';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormWrapper, Title, TitleBlock } from './styles';

const loginSchema = yup
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
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = (data: any) => console.log(data);

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
            error={!!errors['login']}
            helperText={errors['login']?.message}
            {...register('login', { required: true })}
          />
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
