import 'focus-visible'
import '@/styles/tailwind.css'
import AuthProvider from '@/auth/auth'

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';

export default function App({ Component, pageProps }) {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
    </PersistGate>
  </Provider>
  //return <AuthProvider><Component {...pageProps} /></AuthProvider>
}
