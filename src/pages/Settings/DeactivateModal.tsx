import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
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
import { PasswordInput } from 'run-and-drive-lib/components';
import { BindingAction } from 'run-and-drive-lib/models';
import * as yup from 'yup';

import { DeactivatePayload } from '@models/api';
import { useDeactivateMutation } from '@redux/queries/authentication';
import { getErrorMessage, isEmpty, passwordSchema } from '@utils/index';

interface DeactivateModalProps {
  open: boolean;
  onClose: BindingAction;
}

const deactivateSchema = yup.object({ password: passwordSchema }).required();

const DeactivateModal: FC<DeactivateModalProps> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<DeactivatePayload>({
    mode: 'onBlur',
    resolver: yupResolver(deactivateSchema),
    defaultValues: {
      password: '',
    },
  });

  const [deactivateEmitter, { isLoading, error, reset: resetDeactivation }] =
    useDeactivateMutation();

  const handleCancel = () => {
    onClose();
    resetForm();
    resetDeactivation();
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
          {getErrorMessage(error)}
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
          onClick={handleSubmit(deactivateEmitter)}>
          Deactivate
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeactivateModal;
