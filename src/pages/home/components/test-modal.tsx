import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export function OpenButton() {
  return (
    <Button
      onClick={() => {
        NiceModal.show(TestModalNice, { title: 'Hello World' }).then(res => {
          console.log(res); // eslint-disable-line no-console
        });
      }}
    >
      Open Test Modal
    </Button>
  );
}

function TestModal({ title }: { title: React.ReactNode }) {
  const modal = useModal();
  return (
    <Dialog scroll="paper" open={modal.visible}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText tabIndex={-1}>
          {Array.from(new Array(50))
            .map(
              () =>
                `Cras mattis consectetur purus sit amet fermentum.Cras justo odio, dapibus ac facilisis in, egestas eget quam.Morbi leo risus, porta ac consectetur ac, vestibulum at eros.Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join('\n')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={modal.remove} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => {
            modal.resolve({ msg: 'Hello World' });
            modal.remove();
          }}
          variant="contained"
          autoFocus
        >
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const TestModalNice = NiceModal.create(TestModal);
