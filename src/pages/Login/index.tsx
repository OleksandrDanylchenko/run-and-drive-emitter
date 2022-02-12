/** @jsx jsx */
import { jsx } from '@emotion/react';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

import { FormWrapper, Title, TitleBlock } from './styles';

const Login: FC = () => {
  const { register, handleSubmit } = useForm();
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
            label="Email Address"
            type="email"
            autoComplete="email"
            fullWidth
            margin="normal"
            {...register('name', { required: true })}
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
