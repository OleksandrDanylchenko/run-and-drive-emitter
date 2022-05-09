import React, { FC } from 'react';
import { BindingAction } from 'run-and-drive-lib/models';

interface DeactivateModalProps {
  open: boolean;
  onClose: BindingAction;
}

// const deactivateSchema = yup.object({ password: passwordSchema }).required();

const DeactivateModal: FC<DeactivateModalProps> = ({ open, onClose }) => {
  return <h2>Hello!</h2>;

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm<RegisterForm>({
  //   mode: 'onBlur',
  //   resolver: yupResolver(deactivateSchema),
  //   defaultValues: {
  //     password: '',
  //   },
  // });

  // const [isLoading, onSubmit, error] = useMockLogin();

  // const handleCancel = () => {
  //   onClose();
  //   reset();
  // };
  //
  // return (
  //   <Dialog open={open} onClose={onClose}>
  //     <DialogTitle>Deactivate emitter</DialogTitle>
  //     <DialogContent>
  //       <DialogContentText>
  //         Provide the password to confirm the deactivation
  //       </DialogContentText>
  //       <PasswordInput
  //         margin="dense"
  //         variant="standard"
  //         error={!!errors.password}
  //         helperText={errors.password?.message}
  //         {...register('password', { required: true })}
  //       />
  //     </DialogContent>
  //     <Collapse in={!!error}>
  //       <Alert severity="error">
  //         <AlertTitle>Deactivation failed</AlertTitle>
  //         {error}
  //       </Alert>
  //     </Collapse>
  //     <DialogActions>
  //       <Button onClick={handleCancel}>Cancel</Button>
  //       <LoadingButton
  //         variant="contained"
  //         color="error"
  //         endIcon={<CancelIcon />}
  //         disabled={!isEmpty(errors)}
  //         loading={isLoading}
  //         loadingPosition="end"
  //         onClick={handleSubmit(onSubmit)}>
  //         Deactivate
  //       </LoadingButton>
  //     </DialogActions>
  //   </Dialog>
  // );
};

export default DeactivateModal;
