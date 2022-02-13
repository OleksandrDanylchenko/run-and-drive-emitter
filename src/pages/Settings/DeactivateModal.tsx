import { BindingAction } from '@models/functions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC } from 'react';

interface DeactivateModalProps {
  open: boolean;
  onClose: BindingAction;
}

const DeactivateModal: FC<DeactivateModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Deactivate emitter</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Provide the password to confirm the deactivation
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onClose}>
          Deactivate
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeactivateModal;
