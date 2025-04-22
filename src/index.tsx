import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Layout } from './components/Layout/Layout'
import './index.css'
import { AppContextProvider, } from './context/AppContext/AppContextProvider'
import  {store}  from './redux/store'
import { Provider } from 'react-redux'



const container =  document.getElementById('root');
const root =  createRoot(container!) 
root.render(  <React.StrictMode>
  <Provider store={store}>
    <AppContextProvider >


      <Layout />


    </AppContextProvider>
  </Provider>
</React.StrictMode>,);
