import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Layout } from './components/Layout/Layout'
import './index.css'
import { AppContextProvider } from './context/AppContext/AppContextProvider'

ReactDOM.render(
  <AppContextProvider >
    <Layout />
  </AppContextProvider>,
  document.getElementById('root')
);