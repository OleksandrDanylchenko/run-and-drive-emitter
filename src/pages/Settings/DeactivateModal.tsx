import PasswordInput from '@components/PasswordInput';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import CancelIcon from '@mui/icons-material/Cancel';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LoginForm } from '@pages/Login';
import { useMockLogin } from '@pages/Login/useMockLogin';
import { isEmpty } from '@utils/index';
import { passwordSchema } from '@utils/validation';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { BindingAction } from 'run-and-drive-lib/dist/models/functions';
import * as yup from 'yup';

interface DeactivateModalProps {
  open: boolean;
  onClose: BindingAction;
}

const deactivateSchema = yup.object({ password: passwordSchema }).required();

const DeactivateModal: FC<DeactivateModalProps> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: 'onBlur',
    resolver: yupResolver(deactivateSchema),
    defaultValues: {
      password: '',
    },
  });

  const [isLoading, onSubmit, error] = useMockLogin();

  const handleCancel = () => {
    onClose();
    reset();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Deactivate emitter</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Provide the password to confirm the deactivation
        </DialogContentText>
        <PasswordInput
          margin="dense"
          variant="standard"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register('password', { required: true })}
        />
      </DialogContent>
      <Collapse in={!!error}>
        <Alert severity="error">
          <AlertTitle>Deactivation failed</AlertTitle>
          {error}
        </Alert>
      </Collapse>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <LoadingButton
          variant="contained"
          color="error"
          endIcon={<CancelIcon />}
          disabled={!isEmpty(errors)}
          loading={isLoading}
          loadingPosition="end"
          onClick={handleSubmit(onSubmit)}>
          Deactivate
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeactivateModal;
