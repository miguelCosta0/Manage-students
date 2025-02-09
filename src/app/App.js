import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistedStore } from '../store/store';

import router from './router';

import './App.css';

function App() {
  return (
  <>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>

        <ToastContainer autoClose={3000}/>  
        <RouterProvider router={router}/>

      </PersistGate>
    </Provider>
  </>
  );
}

export default App;
