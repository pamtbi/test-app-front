import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@/styles/index.scss';
import App from './App.tsx';
import { UserProvider } from './providers/userProvider/index.tsx';
import { ModalProvider } from './providers/modalProvider/index.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <UserProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </UserProvider>
  </BrowserRouter>
);
