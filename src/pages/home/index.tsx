import { toast } from 'react-toastify';
import { Button, Stack } from '@mui/material';
import { SearchForm } from './components/search-form';
import { OpenButton } from './components/test-modal';

export default function Home() {
  return (
    <Stack spacing={2} p={3}>
      <SearchForm />
      <div>
        <OpenButton />
      </div>
      <div>
        <Button variant="outlined" onClick={() => toast.success('This is a success toast')}>
          Toast
        </Button>
      </div>
    </Stack>
  );
}
