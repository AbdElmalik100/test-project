import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { Toaster } from 'sonner'
import AppRouter from './router/index.jsx'
import 'react-phone-input-2/lib/bootstrap.css'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import axiosRequest from './plugins/axios.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
        <Toaster richColors theme='light' position='top-right' closeButton />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
