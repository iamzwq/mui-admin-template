import { Outlet } from 'react-router';
import NiceModal from '@ebay/nice-modal-react';
import { DocumentTitle } from './components/document-title';
import { Toaster } from './components/toaster';
import { useVersionChecker } from './hooks';

export default function Root() {
  useVersionChecker();
  return (
    <NiceModal.Provider>
      <DocumentTitle />
      <Outlet />
      <Toaster />
    </NiceModal.Provider>
  );
}
